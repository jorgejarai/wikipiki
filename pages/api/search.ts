import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';

import { searchDocuments } from '../../src/util/search';

const search = async (req: NextApiRequest, res: NextApiResponse) => {
  const search = req.query['q'] as string;

  if (search === '') {
    return res.json({ results: [] });
  }

  const results = await searchDocuments(search);

  res.json({ results });
};

export default withApiAuthRequired(search);
