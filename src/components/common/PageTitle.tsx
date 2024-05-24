/** @format */

import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  title?: string;
  className?: string;
};

export default function PageTitle({ title, className }: Props) {
  return (
    <div className="flex flex-col gap-[0.5] w-max">
      <h1 className={cn("text-[1.8xl] font-bold ", className)}>{title}</h1>
      <span className="h-[2px] w-[45%] rounded-[50px]  bg-primary"></span>
    </div>
  );
}
