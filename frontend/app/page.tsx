import Image from "next/image";
import {auth} from "@/auth";
import Login from "@/components/login";
import Logout from "@/components/logout";
import Link from "next/link";
import {getSessionToken} from "@/app/get-session-token";
import {ping} from "@/components/hello-auth-actions";
import PingButton from "@/components/PingButton";

export default async function Home() {

  const session = await auth()
  const loggedIn = !!session;

  console.log("SESSION IN HOME RSC", session)

  const token = await getSessionToken()
  console.log("TOKEN IN HOME RSC", token);

  return (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-sans sm:p-20">
      {loggedIn ? <Logout  /> :<Login />}
      <PingButton />
      <p><Link href={"/user"} prefetch={false}>User</Link></p>
    </div>
  );
}
