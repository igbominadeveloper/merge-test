import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import puppeteer, { Browser } from 'puppeteer';
import puppeteerCore, { Browser as CoreBrowser } from 'puppeteer-core';
import chromium from '@sparticuz/chromium';

import { AccountStatementPayload, AccountStatementResponse } from '@/types/transaction';
import walletRoute from '@/services/routes/wallet.route';
import { APIResponse } from '@/types/general';
import Encrypt from '@/utils/encrypt';
import { axiosInstance } from '@/services/api-handler';
import getAccountStatementTemplate from '@/utils/getAccountStatementTemplate';
import { formatDateString, toUrlQuery } from '@/utils/helpers';

async function getTransactions(query: string) {
  try {
    const hashedCu = cookies().get('cu');
    const hashedToken = cookies().get('token');

    if (!hashedCu || !hashedToken) {
      throw new Error('Unauthenticated user');
    }

    const userEmail = Encrypt.decrypt(hashedCu.value);
    const token = Encrypt.decrypt(hashedToken.value);

    if (!userEmail || !token) throw new Error('User is not authenticated');

    const headers = {
      authorization: token,
      'x-created-by': userEmail,
    };
    const response = await axiosInstance.get<APIResponse<AccountStatementResponse>>(
      `${walletRoute.getAccountStatementTransactions}?${query}`,
      {
        headers,
      },
    );

    return response.data?.data?.results;
  } catch {
    return [];
  }
}

export async function POST(request: Request) {
  const { accountNumber, businessAddress, businessName, endDate, startDate } =
    (await request.json()) as unknown as AccountStatementPayload;

  const urlQuery = toUrlQuery({
    startDate,
    endDate,
    pageNumber: 1,
    pageSize: 100,
    accountId: accountNumber,
  });

  try {
    const transactions = await getTransactions(urlQuery);

    const template = getAccountStatementTemplate({
      accountNumber,
      businessAddress,
      businessName,
      endDate: formatDateString(endDate, 'MMM YYYY'),
      startDate: formatDateString(startDate, 'MMM YYYY'),
      transactions,
    });

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
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
    });
    await browser.close();
    return NextResponse.json(pdfBuffer);
  } catch (error) {
    console.error(error);
    return NextResponse.json(null);
  }
}
