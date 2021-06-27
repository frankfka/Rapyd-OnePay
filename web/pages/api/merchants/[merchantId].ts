import { NextApiRequest, NextApiResponse } from 'next';
import { databaseService } from '../../../services/database/databaseService';
import isHttpMethodAllowed from '../../../util/isHttpMethodAllowed';
import Merchant from '../../../models/Merchant';

type GetMerchantResponse = Merchant | undefined;

export default async (
  req: NextApiRequest,
  res: NextApiResponse<GetMerchantResponse>
) => {
  if (!isHttpMethodAllowed(['GET'], req, res)) {
    return;
  }
  const { merchantId } = req.query;
  const merchantData = await databaseService.getMerchant(merchantId as string);
  res.status(200).json(merchantData);
};
