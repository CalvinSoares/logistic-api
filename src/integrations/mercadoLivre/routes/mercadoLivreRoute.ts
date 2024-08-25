import { Router } from 'express';
import mercadoLivreController from '../controller/mercadoLivreController';
import { SessionML } from '../config/sesstion';
import { authenticateJWT } from '../../../middlewares/authMiddleware';
const routerML = Router();

routerML.use(SessionML);
routerML.get(
  '/api-ml/verifyToken/',
  authenticateJWT,
  mercadoLivreController.tokenIsValid,
);
routerML.get(
  '/api-ml/shipments/:shipments',
  authenticateJWT,
  mercadoLivreController.shippmentsOrders,
);
routerML.get('/api-ml/callbackCode/', mercadoLivreController.callbackCode);
routerML.get('/api-ml/login/', mercadoLivreController.login);
routerML.get(
  '/api-ml/user/',
  authenticateJWT,
  mercadoLivreController.getInfoAccount,
);
routerML.post(
  '/api-ml/createUser/',
  authenticateJWT,
  mercadoLivreController.createAccount,
);
routerML.get(
  '/api-ml/orders/',
  authenticateJWT,
  mercadoLivreController.getOrders,
);
routerML.get('/api-ml/logout/', authenticateJWT, mercadoLivreController.logout);

export default routerML;
