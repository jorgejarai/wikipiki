import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';

import articleExists from '../../src/articleExists';
import createArticle from '../../src/createArticle';
import fetchRoles from '../../src/fetchRoles';

const edit = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'OPTIONS') {
    return res.setHeader('Allow', 'POST, OPTIONS').end();
  }

  if (req.method !== 'POST') {
    return res.status(400).setHeader('Allow', 'POST, OPTIONS').json({
      status: 'error',
      message: 'Method not allowed',
    });
  }

  const roles = await fetchRoles(req, res);

  if (!roles?.includes('Administrators')) {
    return res.status(403).json({
      status: 'error',
      message: 'You do not have permission to create articles',
    });
  }

  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).setHeader('Allow', 'POST, OPTIONS').json({
      status: 'error',
      message: 'Title and content are required',
    });
  }

  if (await articleExists(title)) {
    return res.status(400).setHeader('Allow', 'POST, OPTIONS').json({
      status: 'error',
      message: 'Article already exists',
    });
  }

  const result = await createArticle(title, content);

  if (!result) {
    return res.status(500).setHeader('Allow', 'POST, OPTIONS').json({
      status: 'error',
      message: 'Could not create article',
    });
  }

  res.setHeader('Allow', 'POST, OPTIONS').json({
    status: 'success',
  });
};

export default withApiAuthRequired(edit);
