"use client";

import { DataTable } from "@/components/common/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import PageTitle from "@/components/common/PageTitle";
import Container_with_nav from "@/components/ui/Container_with_nav";

type Props = {};

interface Setting {
  category: string;
  value: string | number | boolean;
}

const columns: ColumnDef<Setting>[] = [
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "value",
    header: "Value",
  },
];
const data: Setting[] = [
  {
    category: "Account",
    value: true,
  },
  {
    category: "Notifications",
    value: false,
  },
  {
    category: "Language",
    value: "English",
  },
  {
    category: "Theme",
    value: "Light",
  },
];

export default function SettingsPage({}: Props) {
  return (
    <Container_with_nav page_title="Settings">
    <div className="flex flex-col gap-5  w-full">
      <PageTitle title="Settings" className="md:hidden"/>
      <DataTable columns={columns} data={data} />
    </div>
    </Container_with_nav>
  );
}
