// src/services/pdfService.js
import PDFDocument from 'pdfkit';
import pdfController from '../../web/pdfController';

class PDFService {
  async generatePDFStream(data: any) {
    const doc = new PDFDocument();

    // Adicionar conteúdo ao PDF
    doc.fontSize(25).text(data.title, 100, 100);
    doc.fontSize(14).text(data.content, 100, 150);

    // Se tiver imagens
    if (data.imagePath) {
      doc.image(data.imagePath, {
        fit: [250, 300],
        align: 'center',
        valign: 'center',
      });
    }

    doc.end();
    return doc;
  }
}

export default new PDFService();
