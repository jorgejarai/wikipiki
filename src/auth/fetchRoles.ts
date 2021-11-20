import { getSession } from '@auth0/nextjs-auth0';

const parseJwt = (token: string): { [key: string]: any } => {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const decodedBase64 = Buffer.from(base64, 'base64').toString('ascii');

  const jsonPayload = decodeURIComponent(
    decodedBase64
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join('')
  );

  return JSON.parse(jsonPayload);
};

const fetchRoles = async (req: any, res: any): Promise<string[] | null> => {
  const session = getSession(req, res);

  if (!session || !session.idToken) {
    return null;
  }

  const { idToken } = session;
  const payload = parseJwt(idToken);
  const roles = payload['https://myapp/role'];

  return roles || [];
};

export default fetchRoles;
