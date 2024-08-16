// src/services/pdfService.js
import PDFDocument from 'pdfkit';
import { OrderDTO } from '../../dto/orderDto';
import { margins } from 'pdfkit/js/page';

class PDFService {
  async generatePDForder(data: OrderDTO) {
    const doc = new PDFDocument({
      margins: {
        top: 50,
        bottom: 50,
        left: 50,
        right: 50,
      },
      font: '',
    });
    const pageWidth = doc.page.width; // Largura da página
    const lineYPosition = 30; // Posição Y da linha
    const lineStartX = pageWidth * 0.1; // 20% de margem à esquerda
    const lineEndX = pageWidth * 0.9; // 80% de margem à direita
    doc.lineWidth(3);
    doc
      .lineCap('round')
      .moveTo(lineStartX, lineYPosition)
      .lineTo(lineEndX, lineYPosition)
      .stroke();

    // Adicionar conteúdo ao PDF
    doc.fontSize(15).text(`Informações sobre o Pedido`, {
      align: 'center',
    });

    doc.fontSize(16).text(data.email, 100, 150);
    doc.fontSize(16).text(data.plano, 100, 200);
    doc.fontSize(16).text(data.status, 100, 250);

    // doc.initForm();
    // doc.formText('name', 50, 50, 100, 100);

    doc.end();
    return doc;
  }
}

export default new PDFService();
