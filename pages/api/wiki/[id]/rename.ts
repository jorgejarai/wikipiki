import { NextApiRequest, NextApiResponse } from 'next';
import articleExists from '../../../../src/api/articleExists';

import renameArticle from '../../../../src/api/renameArticle';
import checkForAdmin from '../../../../src/auth/checkForAdmin';

const rename = async (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader('Allow', 'OPTIONS, POST');

  switch (req.method) {
    case 'OPTIONS':
      return res.end();
    case 'POST':
      return renameWiki(req, res);
  }

  return res.status(405).json({
    error: 'invalid_method',
    description: 'The HTTP method used is not valid',
  });
};

const renameWiki = async (req: NextApiRequest, res: NextApiResponse) => {
  await checkForAdmin(req, res);

  const { id: oldTitle } = req.query;
  const { newTitle } = req.body;

  if (newTitle === '') {
    return res.status(400).json({
      error: 'empty_title',
      description: 'Title is empty',
    });
  }

  if (!(await articleExists(oldTitle as string))) {
    return res.status(404).json({
      error: 'not_found',
      description: 'Article not found',
    });
  }

  if (await articleExists(newTitle as string)) {
    return res.status(409).json({
      error: 'already_exists',
      description: 'There already is an article with that name',
    });
  }

  const result = await renameArticle(oldTitle as string, newTitle as string);

  if (!result) {
    return res.status(500).json({
      error: 'general_error',
      description: 'Could not rename article',
    });
  }

  res.json({
    error: null,
  });
};

export default rename;
