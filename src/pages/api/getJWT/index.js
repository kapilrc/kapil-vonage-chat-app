// const dotenv = require('dotenv');
// import { NextRequest, NextResponse } from 'next/server';

import dotenv from 'dotenv';
import Vonage from '@vonage/server-sdk';
import path from 'path';
import config from '../../../../vonage-config';

dotenv.config();

console.log(' ============================================= ')
console.log(__dirname + '/../../../' + process.env.PRIVATE_KEY_PATH)
// const apiKey = process.env.API_KEY;
// const apiSecret = process.env.API_SECRET;

export const vonage = new Vonage(
  {
    ...config,
    privateKey: fs.readFileSync(process.env.PRIVATE_KEY_PATH, 'utf8')
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
