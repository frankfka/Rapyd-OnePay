import { NextApiRequest, NextApiResponse } from 'next';
import { rapydApiService } from '../../../services/rapyd/rapydApiService';
import isHttpMethodAllowed from '../../../util/isHttpMethodAllowed';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (!isHttpMethodAllowed(['GET'], req, res)) {
    return;
  }
  const data = await rapydApiService.pingRapydApi();
  res.status(200).json(data);
};
