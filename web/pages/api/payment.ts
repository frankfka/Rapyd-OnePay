import { NextApiRequest, NextApiResponse } from 'next';
import isHttpMethodAllowed from '../../util/isHttpMethodAllowed';
import createPaymentHandler, {
  CreatePaymentResponse,
  CreatePaymentRequest,
} from '../../handlers/createPaymentHandler';

export default async (
  req: NextApiRequest,
  res: NextApiResponse<CreatePaymentResponse | string>
) => {
  if (!isHttpMethodAllowed(['POST'], req, res)) {
    return;
  }

  const requestBody = req.body as CreatePaymentRequest;
  const response = await createPaymentHandler(requestBody);

  res.status(200).json(response);
};
