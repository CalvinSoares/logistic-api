import { Response } from 'express';
import axios from 'axios';
import { TokenUsers } from '../../../models/tokenUsers';
import { RequestSession } from '../../../@types/RequestSession';
import { TypeTokenRefreshCode } from '../../../@types/tokenUser';
import {
  urlAccountMe,
  urlGetCode,
  urlCreateUser,
  urlShipments,
} from '../config/urls';
//--------------------------------------------------------------------------------------------------------------------------------------------
class MercadoLivreController {
  async tokenIsValid(req: RequestSession, res: Response) {
    const userToken = req.user;
    req.session.userSession = { email: userToken!.email };
    const user = (await TokenUsers.findOne(
      { email: userToken?.email },
      {},
      { lean: true },
    )) as TypeTokenRefreshCode | null;

    if (!user) {
      return res.status(404).json({ message: 'usuário não encontrado' });
    }

    if (!user.token) {
      return res
        .status(404)
        .json({ message: 'usuário não possue token do mercado livre' });
    }

    const responseValidToken = await axios.get(urlAccountMe, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
      validateStatus: function (status) {
        return status >= 200 && status < 600;
      },
    });

    if (responseValidToken.status !== 200) {
      const data = {
        grant_type: 'refresh_token',
        client_id: process.env.ID_APPLICATION_ML,
        client_secret: process.env.SECRET_ML,
        refresh_token: user.refreshToken,
      };
      const responseMLRefreshToken = await axios.post(
        'https://api.mercadolibre.com/oauth/token',
        data,
        {
          headers: {
            accept: 'application/json',
            'content-type': 'application/x-www-form-urlencoded',
          },
        },
      );
      if (responseMLRefreshToken.status === 200) {
        const newUserToken = await TokenUsers.findOneAndUpdate(
          {
            email: userToken?.email,
          },
          {
            token: responseMLRefreshToken.data.access_token,
            refreshToken: responseMLRefreshToken.data.refresh_token,
          },
          { new: true },
        );
        return res.status(200).json({ message: 'refresh token generated' });
      }
    }

    if (responseValidToken.status !== 200) {
      return res.status(401).json({ message: 'token mercado livre inválido' });
    }
    res.status(200).json({ message: 'usuario possue token válido' });
    try {
    } catch (err) {
      res.status(500).send({
        message: 'Error verify Token User',
        error: (err as Error).message,
      });
    }
  }
  //--------------------------------------------------------------------------------------------------------------------------------------------
  async shippmentsOrders(req: RequestSession, res: Response) {
    const { shipments } = req.params;
    console.log(shipments);
    const userToken = req.user;
    const user = (await TokenUsers.findOne(
      { email: userToken?.email },
      {},
      { lean: true },
    )) as TypeTokenRefreshCode | null;

    const responseShipments = await axios.get(urlShipments + `${shipments}`, {
      headers: {
        Authorization: `Bearer ${user?.token}`,
        'x-format-new': true,
      },
      validateStatus: function (status) {
        return status >= 200 && status < 600;
      },
    });

    console.log(responseShipments);

    res.json(responseShipments.data);
  }
  //--------------------------------------------------------------------------------------------------------------------------------------------
  async createAccount(req: RequestSession, res: Response) {
    const user = req.user;

    const tokenUser = (await TokenUsers.findOne(
      { email: user?.email },
      {},
      { lean: true },
    )) as TypeTokenRefreshCode | null;

    const responseDataUser = await axios.post(
      urlCreateUser,
      {
        site_id: 'MLB',
      },
      {
        headers: {
          Authorization: `Bearer ${tokenUser?.token}`,
        },
        validateStatus: function (status: number) {
          return status >= 200 && status < 600;
        },
      },
    );

    console.log(responseDataUser.data);

    res.status(201).json(responseDataUser.data);
  }
  //--------------------------------------------------------------------------------------------------------------------------------------------
  async getOrders(req: RequestSession, res: Response) {
    const user = req.user;

    const tokenUser = (await TokenUsers.findOne(
      { email: user?.email },
      {},
      { lean: true },
    )) as TypeTokenRefreshCode | null;

    const responseDataUser = await axios.get(urlAccountMe, {
      headers: {
        Authorization: `Bearer ${tokenUser?.token}`,
      },
      validateStatus: function (status) {
        return status >= 200 && status < 600;
      },
    });

    try {
      const response: any = await axios.get(
        'https://api.mercadolibre.com/orders/search',
        {
          headers: {
            Authorization: `Bearer ${tokenUser?.token}`,
          },
          params: {
            seller: responseDataUser.data.id,
          },
          validateStatus: function (status) {
            return status >= 200 && status < 600;
          },
        },
      );
      res.status(200).json(response.data.results);
    } catch (error) {
      console.error('Erro ao buscar vendas:', error);
    }
  }
  //--------------------------------------------------------------------------------------------------------------------------------------------
  async getInfoAccount(req: RequestSession, res: Response) {
    const user = req.user;

    const tokenUser = (await TokenUsers.findOne(
      { email: user?.email },
      {},
      { lean: true },
    )) as TypeTokenRefreshCode | null;

    const responseDataUser = await axios.get(urlAccountMe, {
      headers: {
        Authorization: `Bearer ${tokenUser?.token}`,
      },
      validateStatus: function (status) {
        return status >= 200 && status < 600;
      },
    });
    return res.json(responseDataUser.data);
  }

  async login(req: RequestSession, res: Response) {
    res.redirect(urlGetCode);
  }
  //--------------------------------------------------------------------------------------------------------------------------------------------
  async callbackCode(req: RequestSession, res: Response) {
    const { code } = req.query;
    const emailSession = req.session.userSession?.email;
    console.log('code que chegou =', emailSession);
    console.log('code que chegou =', code);
    const data = {
      grant_type: 'authorization_code',
      client_id: process.env.ID_APPLICATION_ML,
      client_secret: process.env.SECRET_ML,
      code: code,
      redirect_uri: process.env.URL_REDIRECT,
    };

    const responseMLRefreshToken = await axios.post(
      'https://api.mercadolibre.com/oauth/token',
      data,
      {
        headers: {
          accept: 'application/json',
          'content-type': 'application/x-www-form-urlencoded',
        },
      },
    );
    if (responseMLRefreshToken.status !== 200) {
      res.status(400).json({ message: 'ocorreu um erro ao gerar token' });
    }
    const userToken = await TokenUsers.findOneAndUpdate(
      {
        email: emailSession,
      },
      {
        email: emailSession,
        token: responseMLRefreshToken.data.access_token,
        refreshToken: responseMLRefreshToken.data.refresh_token,
      },
      { upsert: true, new: true },
    );
    return res.render('successLoginML', {
      nameUser: 'Erick',
    });
  }
  async logout(req: RequestSession, res: Response) {
    try {
      const userToken = req.user;
      const user = (await TokenUsers.findOneAndDelete(
        { email: userToken?.email },
        {},
      )) as TypeTokenRefreshCode | null;
      res.status(200).json({ message: 'success logout' });
    } catch (err) {
      res.status(500).send({
        message: 'Error logout User',
        error: (err as Error).message,
      });
    }
  }
}

export default new MercadoLivreController();
