"use client";

import dynamic from "next/dynamic";

const InvoicePDF = dynamic(() => import("../../app/pdf"), {
  ssr: false,
});

interface ViewProps {
  modal?: boolean;
}

export default function View({ modal }: Readonly<ViewProps>) {
  return (
    <div className={`w-screen ${modal ? "h-full" : "h-screen"}`}>
      <InvoicePDF />
    </div>
  );
}
