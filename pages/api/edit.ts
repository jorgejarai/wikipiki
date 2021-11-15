import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';
import updateArticle from '../../src/updateArticle';

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

  const { title, content } = req.body;

  if (content === '') {
    return res.status(400).setHeader('Allow', 'POST, OPTIONS').json({
      status: 'error',
      message: 'Content is empty',
    });
  }

  const result = await updateArticle(title, content);

  if (!result) {
    return res.status(500).setHeader('Allow', 'POST, OPTIONS').json({
      status: 'error',
      message: 'Could not update article',
    });
  }

  res.setHeader('Allow', 'POST, OPTIONS').json({
    status: 'success',
  });
};

export default withApiAuthRequired(edit);
