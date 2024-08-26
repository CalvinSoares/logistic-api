// src/services/pdfService.js
import PDFDocument from 'pdfkit';
import { OrderDTO } from '../../dto/orderDto';
import { margins } from 'pdfkit/js/page';
import fs from 'fs';
import path from 'path';

// Caminho para a pasta onde as fontes estão armazenadas
const fontsPath = path.join(__dirname, '../../assets/fonts/Poppins');

class PDFMercadoLivre {
  async generatePDForder(data: any) {
    console.log('valor do data sendo passado = ', data);
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
    doc.fontSize(15).text(`Detalhes do Pedido Mercado Livre`, {
      align: 'center',
    });

    doc.fontSize(12).text(`Indentificador do Pedido: ${data.id}`, 50, 100);
    doc.fontSize(12).text(`Comprador: ${data.buyer.nickname}`, 50, 120);
    doc.fontSize(12).text(`Status: ${data.status}`, 50, 140);
    doc
      .fontSize(12)
      .text(`Valor total do pedidos: ${data.paid_amount}`, 50, 160);
    doc.fontSize(12).text(`Valor total pago: ${data.total_amount}`, 50, 180);

    const dateCreated = data.date_created;
    const dateObject = new Date(dateCreated);
    const dateOnly = dateObject.toLocaleDateString('pt-BR');
    doc.fontSize(12).text(`Data da criação do pedido: ${dateOnly}`, 50, 200);
    doc.fontSize(15).text(`Itens do pedido: `, 50, 240);
    data.order_items.map((produtos: any) => {
      console.log('valor do itens: ', produtos);
      doc.fontSize(12).text(`Nome do Produto: ${produtos.item.title}`, 60);
      doc.fontSize(12).text(`Quantidade: ${produtos.quantity}`, 60);
      doc.fontSize(12).text(`preço unitário: ${produtos.unit_price}`, 60);
      doc.fontSize(12).text(`preço total: ${produtos.full_unit_price}`, 60);
    });
    doc.end();
    return doc;
  }
}

export default new PDFMercadoLivre();
