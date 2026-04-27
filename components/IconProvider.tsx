'use client';

import { IconContext } from "@phosphor-icons/react";
import React from "react";

export function IconProvider({ children }: { children: React.ReactNode }) {
  return (
    <IconContext.Provider
      value={{
        color: "currentColor",
        size: "1em",
        weight: "duotone",
        mirrored: false,
      }}
    >
      {children}
    </IconContext.Provider>
  );
}
