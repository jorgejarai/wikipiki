import { NextApiRequest, NextApiResponse } from 'next';

import fetchRoles from './fetchRoles';

const checkForAdmin = async (req: NextApiRequest, res: NextApiResponse) => {
  const roles = await fetchRoles(req, res);

  if (!roles?.includes('Administrators')) {
    return res.status(403).json({
      status: 'error',
      description: 'You do not have permission for this operation',
    });
  }
};

export default checkForAdmin;
