import Colors from "@/components/Colors";
import LoginButton from "@/components/LoginButton";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";

export default function Home() {
  const { authData } = useAuth();

  useEffect(() => {
    console.log("auth changed!", authData);
  }, [authData]);

  return (
    <main>
      <div>{!authData ? <LoginButton /> : <Colors />}</div>
    </main>
  );
}
