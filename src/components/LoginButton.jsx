import { accountsSdk } from "@/sdk/accounts";

import { useAuth } from "@/hooks/useAuth";

const LoginButton = () => {
  const { setAuthData } = useAuth();

  const handleLogin = () => {
    console.log("handleLogin");
    accountsSdk
      .popup()
      .authorize()
      .then(async (authorizeData) => {
        setAuthData(authorizeData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return <button onClick={handleLogin}>Login</button>;
};

export default LoginButton;
