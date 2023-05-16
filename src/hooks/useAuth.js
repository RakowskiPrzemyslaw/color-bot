import { atom, useAtom } from "jotai";

const authAtom = atom(null);

export const useAuth = () => {
  const [authData, setAuthData] = useAtom(authAtom);

  return {
    authData,
    setAuthData,
  };
};
