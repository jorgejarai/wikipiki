import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';

import deleteArticle from '../../src/deleteArticle';
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
      message: 'You do not have permission to delete articles',
    });
  }

  const { title } = req.body;

  if (title === '') {
    return res.status(400).setHeader('Allow', 'POST, OPTIONS').json({
      status: 'error',
      message: 'Title is empty',
    });
  }

  const result = await deleteArticle(title);

  if (!result) {
    return res.status(500).setHeader('Allow', 'POST, OPTIONS').json({
      status: 'error',
      message: 'Could not delete article',
    });
  }

  res.setHeader('Allow', 'POST, OPTIONS').json({
    status: 'success',
  });
};

export default withApiAuthRequired(edit);
