import { accountsSdk } from "@/sdk/accounts";

const LoginButton = () => {
  const handleLogin = () => {
    console.log("handleLogin");
    accountsSdk
      .popup()
      .authorize()
      .then((authorizeData) => {
        const transaction = accountsSdk.verify(authorizeData);

        localStorage.setItem("token", authorizeData.access_token);

        console.log("authorizeData", authorizeData);
        console.log("transaction", transaction);

        if (transaction != null) {
          console.log(transaction);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return <button onClick={handleLogin}>Login</button>;
};

export default LoginButton;
