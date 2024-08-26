export const urlGetCode = `https://auth.mercadolivre.com.br/authorization?response_type=code&client_id=${process.env.ID_APPLICATION_ML}&redirect_uri=${process.env.URL_REDIRECT}`;
export const urlGetToken = `https://api.mercadolibre.com/oauth/token`;
export const urlAccountMe = `https://api.mercadolibre.com/users/me`;
export const urlCreateUser = `https://api.mercadolibre.com/users/test_user`;
export const urlShipments = `https://api.mercadolibre.com/shipments/`;
