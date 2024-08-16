import PDFService from '../utils/pdf/PDFService';
import { Request, Response } from 'express';
class PdfController {
  async createPDF(req: Request, res: Response) {
    const { idOrder } = req.params;

    const data = {
      title: 'Hello, PDFKit!',
      content: 'This is a sample PDF generated with PDFKit.',
    };

    try {
      const pdf = await PDFService.generatePDFStream(data);

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
