"use client";

import { getHello, getMoney, ping } from "@/components/hello-auth-actions";
import { ReactNode, useState } from "react";
import { getIconCode } from "next/dist/compiled/@vercel/og/emoji";

export default function PingButton() {
  const [pingStatus, setPingStatus] = useState("");
  const [helloStatus, setHelloStatus] = useState("");
  const [moneyStatus, setMoneyStatus] = useState("");

  const handlePing = async () => {
    setPingStatus("");
    const result = await ping();
    setPingStatus(result);
  };

  const handleGetHello = async () => {
    setHelloStatus("");
    const result = await getHello();
    setHelloStatus(result);
  };

  const handleGetMoney = async () => {
    setMoneyStatus("");
    const result = await getMoney();
    setMoneyStatus(result);
  };

  return (
    <div className="container mx-auto mb-8 flex w-full flex-col justify-center space-y-4">
      <MonsterButton
        buttonLabel={"Ping!"}
        onButtonClick={handlePing}
        status={pingStatus}
      />
      <MonsterButton
        buttonLabel={"Get Hello from service 👋"}
        onButtonClick={handleGetHello}
        status={helloStatus}
      />

      <MonsterButton
        buttonLabel={"Get Money from service 🤑"}
        onButtonClick={handleGetMoney}
        status={moneyStatus}
      />
    </div>
  );
}

function MonsterButton({
  buttonLabel,
  onButtonClick,
  status,
}: {
  buttonLabel: string;
  onButtonClick: () => void;
  status: string;
}) {
  return (
    <div className={"w-full border border-gray-300 p-4"}>
      <div className={"flex flex-col"}>
        <button className={"bg-amber-200 p-4 text-2xl"} onClick={onButtonClick}>
          {buttonLabel}
        </button>
        <div className={"border-gray-300 p-4"}>{status}</div>
      </div>
    </div>
  );
}
