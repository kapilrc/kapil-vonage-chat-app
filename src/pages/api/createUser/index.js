import { vonage } from '../getJWT';

export default async function POST(req, res) {
  vonage.users.create(
    {
      name: req.body.name,
      display_name: req.body.display_name || req.body.name,
    },
    (err, response) => {
      if (err) {
        return res.status(400).send(err?.body);
      } else {
        res.send({ id: response.id });
      }
    },
  );
}