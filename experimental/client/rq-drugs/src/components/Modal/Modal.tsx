import React, { useState } from "react";

interface ComponentProps {
  state: boolean;
  setState: (state: boolean) => void;
  component: React.ReactNode;
}

const Modal: React.FC<ComponentProps> = ({ state, setState, component }) => {
  return (
    <>
      {state && (
        <>
          <div
            className={
              "fixed left-0 top-0 bg-black bg-opacity-50 w-screen h-screen"
            }
            onClick={() => {
              setState(false);
            }}
          >
            {component}
          </div>
        </>
      )}
    </>
  );
};

export default Modal;
