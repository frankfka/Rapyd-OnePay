import { NextApiRequest, NextApiResponse } from 'next';
import getOrderHandler, {
  GetOrderResponse,
} from '../../../handlers/getOrderHandler';
import isHttpMethodAllowed from '../../../util/isHttpMethodAllowed';

export default async (
  req: NextApiRequest,
  res: NextApiResponse<GetOrderResponse>
) => {
  if (!isHttpMethodAllowed(['GET'], req, res)) {
    return;
  }
  const { orderId } = req.query;
  const response = await getOrderHandler({
    orderId: orderId as string,
  });
  res.status(200).json(response);
};
