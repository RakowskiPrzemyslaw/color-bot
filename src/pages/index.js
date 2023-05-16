import Colors from "@/components/Colors";
import LoginButton from "@/components/LoginButton";
import { useAuth } from "@/hooks/useAuth";

export default function Home() {
  const { authData } = useAuth();

  return (
    <main className="h-full">{!authData ? <LoginButton /> : <Colors />}</main>
  );
}
