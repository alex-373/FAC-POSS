// utils/generateInvoice.js
const PDFDocument = require("pdfkit");
const fs = require("fs");

function generateInvoice(sale, details) {
  const doc = new PDFDocument();
  doc.pipe(fs.createWriteStream(`factura_${sale.id}.pdf`));

  doc.fontSize(18).text("Factura de Venta", { align: "center" });
  doc.text(`Cliente ID: ${sale.customerId}`);
  doc.text(`Fecha: ${sale.date}`);
  doc.text(`Total: $${sale.total}`);

  doc.moveDown().text("Detalles:");
  details.forEach(d => {
    doc.text(
      `Producto: ${d.productId} | Cant: ${d.quantity} | Precio: $${d.price} | Subtotal: $${d.subtotal}`
    );
  });

  doc.end();
}

module.exports = generateInvoice;
