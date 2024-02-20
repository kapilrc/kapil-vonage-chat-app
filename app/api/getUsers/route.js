import { vonage } from '../getJWT/route';

export async function GET(req, res) {
  vonage.users.get({ ...req.query }, (err, response) => {
    if (err) {
      res.status(401).send({ message: err });
    } else {
      res.send({ users: response?._embedded?.data?.users });
    }
  });
}