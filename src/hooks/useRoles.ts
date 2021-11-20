import { useUser } from '@auth0/nextjs-auth0';

const useRoles = () => {
  const { user, error, isLoading } = useUser();

  if (!user || isLoading || error) {
    return null;
  }

  return (user['https://myapp/role'] as string[]) || null;
};

export default useRoles;
