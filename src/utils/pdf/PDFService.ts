// src/services/pdfService.js
import PDFDocument from 'pdfkit';
import { OrderDTO } from '../../dto/orderDto';
import { margins } from 'pdfkit/js/page';
import fs from 'fs';
import path from 'path';

// Caminho para a pasta onde as fontes estão armazenadas
const fontsPath = path.join(__dirname, '../../assets/fonts/Poppins');

class PDFService {
  async generatePDForder(data: OrderDTO) {
    const doc = new PDFDocument({
      margins: {
        top: 50,
        bottom: 50,
        left: 50,
        right: 50,
      },
    });
    doc.registerFont(
      'Poppins-Regular',
      path.join(fontsPath, 'Poppins-Regular.ttf'),
    );
    doc.font('Poppins-Regular');

    const pageWidth = doc.page.width;
    const lineYPosition = 30;
    const lineStartX = pageWidth * 0.1;
    const lineEndX = pageWidth * 0.9;

    doc
      .lineCap('round')
      .moveTo(lineStartX, lineYPosition)
      .lineTo(lineEndX, lineYPosition)
      .stroke();

    // Adicionar conteúdo ao PDF
    doc.fontSize(15).text(`Detalhes do Pedido`, {
      align: 'center',
    });

    doc.fontSize(12).text(`Indentificador do Pedido: ${data._id}`, 50, 100);
    doc.fontSize(12).text(`Nome do Cliente: ${data.userName}`, 50, 120);
    doc.fontSize(12).text(`Endereço: ${data.address}`, 50, 140);
    doc.fontSize(12).text(`Preço: $${data.price}`, 50, 160);
    doc.fontSize(12).text(`Telefone: ${data.phone}`, 50, 180);
    doc.fontSize(12).text(`Plano: ${data.plano}`, 50, 200);
    doc.fontSize(12).text(`Email: ${data.email}`, 50, 220);

    const deliveryDate = data.deliveryDate;
    const day = deliveryDate.getDate().toString().padStart(2, '0');
    const month = (deliveryDate.getMonth() + 1).toString().padStart(2, '0');
    const year = deliveryDate.getFullYear().toString();
    const formattedDate = `${day}/${month}/${year}`;
    doc.fontSize(12).text(`Data de Entrega: ${formattedDate}`, 50, 240);
    doc.fontSize(12).text(`Status: ${data.status}`, 50, 260);

    doc.end();
    return doc;
  }
}

export default new PDFService();
