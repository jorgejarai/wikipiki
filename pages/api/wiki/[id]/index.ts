import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';

import checkForAdmin from '../../../../src/auth/checkForAdmin';
import deleteArticle from '../../../../src/api/deleteArticle';
import updateArticle from '../../../../src/api/updateArticle';
import articleExists from '../../../../src/api/articleExists';

const wiki = async (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader('Allow', 'GET, DELETE, OPTIONS, POST, PUT');

  switch (req.method) {
    case 'OPTIONS':
      return res.end();
    case 'PUT':
      return editWiki(req, res);
    case 'DELETE':
      return deleteWiki(req, res);
  }

  return res.status(405).json({
    error: 'invalid_method',
    description: 'The HTTP method used is not valid',
  });
};

const editWiki = async (req: NextApiRequest, res: NextApiResponse) => {
  await checkForAdmin(req, res);

  const { title } = req.query;
  const { content } = req.body;

  if (title === '' || content === '') {
    return res.status(400).json({
      error: 'empty_content',
      description: 'Content is empty',
    });
  }

  if (!(await articleExists(title as string))) {
    return res.status(404).json({
      error: 'not_found',
      description: 'Article not found',
    });
  }

  const result = await updateArticle(title as string, content);

  if (!result) {
    return res.status(500).json({
      error: 'general_error',
      description: 'Could not update article',
    });
  }

  res.json({
    error: null,
  });
};

const deleteWiki = async (req: NextApiRequest, res: NextApiResponse) => {
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

  const result = await deleteArticle(title as string);

  if (!result) {
    return res.status(500).json({
      error: 'general_error',
      description: 'Could not delete article',
    });
  }

  res.json({
    error: null,
  });
};

export default withApiAuthRequired(wiki);
