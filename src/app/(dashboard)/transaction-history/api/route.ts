import { NextResponse } from 'next/server';
import puppeteer, { Browser } from 'puppeteer';
import puppeteerCore, { Browser as CoreBrowser } from 'puppeteer-core';
import chromium from '@sparticuz/chromium';

export async function POST(request: Request) {
  const { template } = await request.json();

  if (!template) {
    throw new Error('No HTML template provided!!!');
  }

  try {
    // Create a new page
    let browser: Browser | CoreBrowser;

    if (process.env.NODE_ENV !== 'development') {
      browser = await puppeteerCore.launch({
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath(),
        headless: chromium.headless,
        ignoreHTTPSErrors: true,
      });
    } else {
      browser = await puppeteer.launch({ headless: true });
    }

    const page = await browser.newPage();
    await page.setContent(template, { waitUntil: 'domcontentloaded' });

    const screenshot = await page.screenshot({
      type: 'png',
      fullPage: true,
      omitBackground: true,
    });

    await browser.close();

    return NextResponse.json(screenshot);
  } catch (error) {
    console.error(error);
    return NextResponse.json(null);
  }
}
