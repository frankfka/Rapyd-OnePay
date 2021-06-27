import { NextApiRequest, NextApiResponse } from 'next';
import { databaseService } from '../../../services/database/databaseService';
import isHttpMethodAllowed from '../../../util/isHttpMethodAllowed';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (!isHttpMethodAllowed(['GET'], req, res)) {
    return;
  }
  const data = await databaseService.getData();
  res.status(200).json(data);
};
