const fs = require('fs');
const PDFDocument = require('pdfkit');

function createInvoice(invoice, path) {
	let doc = new PDFDocument({ size: "A4", margin: 50 });

	generateHeader(doc)  // Invoke `generateHeader` function.
	generateHr(doc, 100)
    generateCustomerInformation(doc, invoice)
    generateInvoiceTable(doc, invoice)
	generateHr(doc, 755)
	generateFooter(doc)  // Invoke `generateFooter` function.

	doc.end()
	doc.pipe(fs.createWriteStream(path));
}

function generateHeader(doc) {
    doc.image('./src/images/LogoACME.jpg', 50, 45, { width: 50 })
        .fillColor('#444444')
        .fontSize(18)
        .text('ACME Inc.', 110, 57)
        .fontSize(10)
        .text('123 Main Street', 200, 65, { align: 'right' })
        .text('Córdoba, CBA, 5005', 200, 85, { align: 'right' })
        .moveDown();
}

function generateFooter(doc) {
    doc.fontSize(
        10,
    ).text(
        'Payment is due within 15 days. Thank you for your business.',
        50,
        780,
        { align: 'center', width: 500 },
    );
}

function generateCustomerInformation(doc, invoice) {
	const shipping = invoice.shipping;
	doc
    	.fillColor("#444444")
    	.fontSize(11)
    	.text("Invoice", 50, 140)

		.text(`Invoice Number: ${invoice.invoice_nr}`, 50, 180)
		.text(`Invoice Date: ${new Date()}`, 50, 200)
		.text(`Customer Name: ${shipping.name}`, 60, 220)
		.text(`Customer LastName: ${shipping.lastName}`, 60, 240)
		.text(`Customer Em@il: ${shipping.email}`, 60, 260)
		.text(`Customer Username: ${shipping.username}`, 60, 280)
		.text(formatDate(new Date()), 480, 300)
		.moveDown();
}

  function generateInvoiceTable(doc, invoice) {
	let i;
	const invoiceTableTop = 340;
  
	doc.font("Helvetica-Bold");
	generateTableRow(
	  doc,
	  invoiceTableTop,
	  "Item Id",
	  "Description",
	  "Unit Cost",
	  "Quantity",
	  "Line Total"
	);
	generateHr(doc, invoiceTableTop + 20);
	doc.font("Helvetica");
  
	for (i = 0; i < invoice.items.length; i++) {
	  const item = invoice.items[i]
	  const position = invoiceTableTop + (i + 1) * 30
	  generateTableRow(
		doc,
		position,
		item.productId,
		item.description,
		formatCurrency(item.price),
      	item.quantity,
      	formatCurrency(item.total)
	  );
  
	  generateHr(doc, position + 20);
	}
  
	const subtotalPosition = invoiceTableTop + (i + 1) * 30;
	generateTableRow(
	  doc,
	  subtotalPosition,
	  "",
	  "",
	  "Subtotal",
	  "",
	);
  
	const paidToDatePosition = subtotalPosition + 20;
	generateTableRow(
	  doc,
	  paidToDatePosition,
	  "",
	  "",
	  "Paid To Date",
	  "",
	  "",
	)

	const duePosition = paidToDatePosition + 25;
	doc.font("Helvetica-Bold");
	generateTableRow(
	  doc,
	  duePosition,
	  "",
	  "",
	  "Balance Due",
	  "",
	  formatCurrency(invoice.subtotal)
	);
	doc.font("Helvetica")
  }

  const subtotal = invoice.subtotal
  
  function generateTableRow(
	  doc,
	  y,
	  item,
	  description,
	  price,
	  quantity,
	  subtotal,
	  ) {
	doc
	  .fontSize(10)
	  .text(item, 50, y)
	  .text(description, 150, y)
	  .text(price, 280, y, { width: 90, align: "right" })
	  .text(quantity, 370, y, { width: 90, align: "right" })
	  .text(subtotal, 0, y, { align: "right" });
  }


	function generateHr(doc, y) {
		doc
		.strokeColor("#aaaaaa")
		.lineWidth(1)
		.moveTo(50, y)
		.lineTo(550, y)
		.stroke();
	}

	function formatDate(date) {
		const day = date.getDate()
		const month = date.getMonth() + 1
		const year = date.getFullYear()
	
		return day + "/" + month + "/" + year
	}

	function formatCurrency(price) {
		return "$" + (price).toFixed(2);
	  }

module.exports = {
	createInvoice
}