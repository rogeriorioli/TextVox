import React from "react";
import {XMarkIcon} from  "@heroicons/react/24/solid"
type ToastProps = {
  text: string;
  opacity?: 0 | 100;
  response: string;
  close: () => void;
};

export default function Toast({ text, response, opacity, close }: ToastProps) {
  return (
    <div
      className={`fixed top-4 right-4 w-72 shadow-lg rounded text-white  transition-all ease-in-out 2s z-[9999999] ${
        opacity === 0 ? "opacity-0" : "opacity-100"
      } ${response !== "success" ? " bg-red-700" : "bg-green-700"}`}
    >
      <header className="flex px-4 py-2  justify-between border-b-[1px] border-white">
        <div className="flex gap-2 items-center">

          <span className="text-md ">
            {response !== "success" ? "Erro" : "Sucesso"}
          </span>
        </div>
        <button onClick={close}>
          <XMarkIcon className="h-6 w-6 text-white" />
        </button>
      </header>
      <div className="p-4 text-md font-light">{text}</div>
    </div>
  );
}
