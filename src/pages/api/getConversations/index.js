import { Client } from '@vonage/server-sdk';
import { vonage } from '../getJWT';

export default async function handler(req, res) {
  vonage.conversations.get({}, (err, response) => {
    if (err) {
      console.log(err);
      res.status(500).send({ message: err });
    } else {
      res.send({ conversations: response?._embedded?.data?.conversations });
    }
  })
}