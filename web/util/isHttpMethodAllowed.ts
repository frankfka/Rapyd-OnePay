import { NextApiRequest, NextApiResponse } from 'next';

export type HttpMethod = 'POST' | 'GET';

const isHttpMethodAllowed = (
  acceptedHttpMethods: HttpMethod[],
  req: NextApiRequest,
  res: NextApiResponse
): boolean => {
  const method = req.method;
  if (method != null && acceptedHttpMethods.includes(method as HttpMethod)) {
    return true;
  }

  res.status(405).json(`${method} not allowed on this endpoint.`);
  return false;
};

export default isHttpMethodAllowed;
