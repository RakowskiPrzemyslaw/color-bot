import AccountsSDK from "@livechat/accounts-sdk";

export const accountsSdk = new AccountsSDK({
  client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
});
