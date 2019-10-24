const chromium = require('chrome-aws-lambda');
const puppeteer = require('puppeteer-core');

exports.handler = async (event, context) => {

    console.log("TEST=====")
    console.log("AWS_LAMBDA_FUNCTION_NAME:", process.env.AWS_LAMBDA_FUNCTION_NAME)
    console.log("chromium.headless:", chromium.headless)

    const browser = await puppeteer.launch({
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath,
        headless: chromium.headless,
    });
    
    const page = await browser.newPage();

    await page.goto(`https://bitsofco.de/`, { waitUntil: 'networkidle2' });

    const screenshot = await page.screenshot({ encoding: 'binary' });

    await browser.close();

    console.log(screenshot);
  
    return {
        statusCode: 200,
        body: JSON.stringify({ message: `Hello World` })
    }

}
