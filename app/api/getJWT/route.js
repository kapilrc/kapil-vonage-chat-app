// const dotenv = require('dotenv');
// import { NextRequest, NextResponse } from 'next/server';

import dotenv from 'dotenv';
import Vonage from '@vonage/server-sdk';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname + '/../../../.env.local') });
// const apiKey = process.env.API_KEY;
// const apiSecret = process.env.API_SECRET;

export const vonage = new Vonage(
  {
    apiKey: process.env.API_KEY,
    apiSecret: process.env.API_SECRET,
    applicationId: process.env.APP_ID,
    privateKey: path.resolve(__dirname + '/../../../' + process.env.PRIVATE_KEY_PATH)
  },
  { debug: true }
);

export async function POST(request, response) {
  const body = await request.json();
  const jwt = vonage.generateJwt({
    sub: body.name,
    acl: {
      paths: {
        '/*/users/**': {},
        '/*/conversations/**': {},
        '/*/sessions/**': {},
        '/*/applications/**': {},
        '/*/push/**': {},
        '/*/knocking/**': {},
        '/*/legs/**': {}
      }
    }
  });
  res.send({ jwt });
}
