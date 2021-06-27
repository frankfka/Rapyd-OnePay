import { NextApiRequest, NextApiResponse } from 'next';
import isHttpMethodAllowed from '../../../util/isHttpMethodAllowed';
import getCustomerHandler, {
  GetCustomerResponse,
} from '../../../handlers/getCustomerHandler';

export default async (
  req: NextApiRequest,
  res: NextApiResponse<GetCustomerResponse>
) => {
  if (!isHttpMethodAllowed(['GET'], req, res)) {
    return;
  }
  const { customerId } = req.query;
  const response = await getCustomerHandler({
    customerId: customerId as string,
  });
  res.status(200).json(response);
};
