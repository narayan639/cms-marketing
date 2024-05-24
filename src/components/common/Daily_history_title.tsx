/** @format */

import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  title?: string;
  className?: string;
};

export default function Daily_history_Title({ title, className }: Props) {
  return (
      <h1 className={cn("text-[1.8xl] font-semibold text-zinc-500", className)}>{title}</h1>
      
  );
}
