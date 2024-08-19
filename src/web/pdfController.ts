import orderService from '../services/orderService';
import PDFService from '../utils/pdf/PDFService';
import { Request, Response } from 'express';
class PdfController {
  async createPDF(req: Request, res: Response) {
    const { idOrder } = req.params;
    try {
      const order = await orderService.findById(idOrder);
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }

      const pdf = await PDFService.generatePDForder(order);

      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename="output.pdf"');

      pdf.pipe(res);
    } catch (err) {
      res.status(500).send({
        message: 'Error generating PDF',
        error: (err as Error).message,
      });
    }
  }
}

export default new PdfController();
