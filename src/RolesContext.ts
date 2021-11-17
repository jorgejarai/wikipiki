import { createContext, useContext } from 'react';

const RolesContext = createContext<string[] | null>(null);

export const useRoles = () => useContext(RolesContext);

export default RolesContext;
