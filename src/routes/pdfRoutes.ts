import { Router } from 'express';
import pdfController from '../web/pdfController';
const pdfRouter = Router();

pdfRouter.get('/pdf/:idOrder', pdfController.createPDF);

export default pdfRouter;
