import React from "react";
import Plus from "../../icons/Plus";
import cx from "@/lib/cx";

interface ComponentProps {
  setState: (state: boolean) => void;
}

interface ButtonClassProps {
  useBrand: boolean;
}

const buttonClasses = ({ useBrand }: ButtonClassProps) => cx`
  rounded-[50%]
  w-[50px] 
  h-[50px] 
  cursor-pointer 
  shadow-md 
  ${
    useBrand
      ? "bg-gray-cool hover:bg-gray-warm-300 active:bg-gray-warm-500"
      : "bg-blue-500 hover:bg-blue-600"
  } 
`;

const RoundButton: React.FC<ComponentProps> = ({ setState }) => {
  const useBrand = true;
  return (
    <button
      className={buttonClasses({ useBrand })}
      onClick={() => setState(true)}
    >
      <div className="p-5">
        <Plus fillColor="#fff" />
      </div>
    </button>
  );
};

export default RoundButton;
