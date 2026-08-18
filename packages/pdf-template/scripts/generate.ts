import fs from 'fs';
import path from 'path';
import Handlebars from 'handlebars';
import { chromium } from 'playwright';

async function generatePDF() {
  console.log('Generating PDF...');
  const templatePath = path.join(__dirname, '../templates/order-form-v1/template.html');
  const stylesPath = path.join(__dirname, '../templates/order-form-v1/styles.css');
  const fixturePath = path.join(__dirname, '../templates/order-form-v1/fixture.json');
  const outputPath = path.join(__dirname, '../test-output.pdf');

  // 1. Read files
  const htmlTemplate = fs.readFileSync(templatePath, 'utf8');
  const cssStyles = fs.readFileSync(stylesPath, 'utf8');
  const data = JSON.parse(fs.readFileSync(fixturePath, 'utf8'));

  // 2. Compile Handlebars
  const template = Handlebars.compile(htmlTemplate);
  const htmlContent = template({
    ...data,
    styles: cssStyles // Inject CSS into the template
  });

  // 3. Launch Playwright
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  await page.setContent(htmlContent, { waitUntil: 'networkidle' });

  // 4. Render PDF
  await page.pdf({
    path: outputPath,
    format: 'A4',
    printBackground: true,
    margin: {
      top: '0mm',    // Margins are handled by CSS @page
      bottom: '0mm',
      left: '0mm',
      right: '0mm'
    }
  });

  await browser.close();
  console.log(`PDF successfully generated at: ${outputPath}`);
}

generatePDF().catch(console.error);
