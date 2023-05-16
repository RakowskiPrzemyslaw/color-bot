import { useEffect } from "react";
import { createDetailsWidget } from "@livechat/agent-app-sdk";

import { Pushes } from "@livechat/lc-sdk-js/lib/src/agent/structures";
import { default as AgentRTM } from "@livechat/lc-sdk-js/lib/src/agent/rtm";
import { useAuth } from "@/hooks/useAuth";
const { IncomingEvent } = Pushes;
const agentAPI = new AgentRTM();

const colors = ["green", "black", "gray", "blue", "purple", "yellow", "red"];

const Colors = () => {
  const { authData } = useAuth();

  const init = async () => {
    const detailsWidget = await createDetailsWidget();

    detailsWidget.on("customer_profile", async (profile) => {
      console.log("profile", profile);

      console.log(authData);

      await agentAPI.connect();
      await agentAPI.login(`Bearer ${authData.access_token}`);

      agentAPI.on(IncomingEvent, (msg) => {
        if (
          msg.chat_id === profile.chat.chat_id &&
          msg.event.type === "message"
        ) {
          console.log(msg);

          const messageValue = msg.event.text;

          const containedColors = colors.filter((color) =>
            messageValue.toLowerCase().includes(color)
          );

          console.log("containedColors", containedColors);
        }
      });
    });
  };

  useEffect(() => {
    init();
  }, []);
  return (
    <div>
      <div>colors</div>
    </div>
  );
};

export default Colors;
