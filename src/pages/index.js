import { useEffect } from "react";
import LoginButton from "@/components/LoginButton";

import { createDetailsWidget } from "@livechat/agent-app-sdk";
// import { Agent, Customer } from "@livechat/lc-sdk-js";

import { Pushes } from "@livechat/lc-sdk-js/lib/src/agent/structures";
import { default as AgentRTM } from "@livechat/lc-sdk-js/lib/src/agent/rtm";
import { default as CustomerRTM } from "@livechat/lc-sdk-js/lib/src/customer/rtm";

const { IncomingEvent } = Pushes;
const agentAPI = new AgentRTM();
const customerAPI = new CustomerRTM("organization id");

export default function Home() {
  const getDetailsWidget = async () => {
    try {
      const detailsWidget = await createDetailsWidget();
      console.log(detailsWidget);

      detailsWidget.on("customer_profile", async (profile) => {
        const token = localStorage.getItem("font");

        await Promise.all([agentAPI.connect(), customerAPI.connect()]);
        await Promise.all([
          agentAPI.login(`Bearer ${token}`),
          customerAPI.login(`Bearer ${token}`),
        ]);

        console.log("profile", profile);

        const { chat_id } = customerAPI;
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getDetailsWidget();
  }, []);

  return (
    <main>
      <div>
        <LoginButton />
      </div>
    </main>
  );
}
