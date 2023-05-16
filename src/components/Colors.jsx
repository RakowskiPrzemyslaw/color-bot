import { useEffect, useState } from "react";
import { createDetailsWidget } from "@livechat/agent-app-sdk";
import { Pushes } from "@livechat/lc-sdk-js/lib/src/agent/structures";
import { default as AgentRTM } from "@livechat/lc-sdk-js/lib/src/agent/rtm";

import { useAuth } from "@/hooks/useAuth";
const { IncomingEvent } = Pushes;

const watchedColors = [
  "green",
  "black",
  "gray",
  "blue",
  "purple",
  "yellow",
  "red",
];

const Colors = () => {
  const { authData } = useAuth();
  const [colors, setColors] = useState([]);

  const init = async () => {
    const detailsWidget = await createDetailsWidget();

    detailsWidget.on("customer_profile", async (profile) => {
      const agentAPI = new AgentRTM();

      await agentAPI.connect();
      await agentAPI.login(`Bearer ${authData.access_token}`);

      agentAPI.on(IncomingEvent, (msg) => {
        if (
          msg.chat_id === profile.chat.chat_id &&
          msg.event.type === "message"
        ) {
          const messageValue = msg.event.text;

          const containedColors = watchedColors.filter((color) =>
            messageValue.toLowerCase().includes(color)
          );

          setColors(containedColors);
        }
      });
    });
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <div className="flex items-stretch flex-col h-full w-full justify-stretch">
      {colors.map((color) => (
        <div className="h-full" style={{ backgroundColor: color }}></div>
      ))}
    </div>
  );
};

export default Colors;
