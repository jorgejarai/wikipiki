import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';

import articleExists from '../../../src/api/articleExists';
import createArticle from '../../../src/api/createArticle';
import fetchArticle from '../../../src/api/fetchArticle';
import checkForAdmin from '../../../src/auth/checkForAdmin';

const wiki = async (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader('Allow', 'GET, DELETE, OPTIONS, POST, PUT');

  switch (req.method) {
    case 'OPTIONS':
      return res.end();
    case 'GET':
      return getWiki(req, res);
    case 'POST':
      return newWiki(req, res);
  }

  return res.status(405).json({
    error: 'invalid_method',
    description: 'The HTTP method used is not valid',
  });
};

const getWiki = async (req: NextApiRequest, res: NextApiResponse) => {
  await checkForAdmin(req, res);

  const { title } = req.query;

  if (title === '') {
    return res.status(400).json({
      error: 'empty_title',
      description: 'Title is empty',
    });
  }

  if (!(await articleExists(title as string))) {
    return res.status(404).json({
      error: 'not_found',
      description: 'Article not found',
    });
  }

  const result = await fetchArticle(title as string);

  if (!result) {
    return res.status(500).json({
      error: 'general_error',
      description: 'Could not get article',
    });
  }

  res.json({
    error: null,
    title,
    content: result,
  });
};

const newWiki = async (req: NextApiRequest, res: NextApiResponse) => {
  await checkForAdmin(req, res);

  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({
      error: 'empty_fields',
      description: 'Title and content are required',
    });
  }

  if (await articleExists(title)) {
    return res.status(400).json({
      error: 'article_exists',
      description: 'Article already exists',
    });
  }

  const result = await createArticle(title, content);

  if (!result) {
    return res.status(500).json({
      error: 'general_error',
      description: 'Could not create article',
    });
  }

  res.json({
    error: null,
  });
};

export default withApiAuthRequired(wiki);
