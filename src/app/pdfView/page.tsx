"use client";

import dynamic from "next/dynamic";

const InvoicePDF = dynamic(() => import("../pdf"), {
  ssr: false,
});

export default function View() {
  return (
    <div className={`w-screen h-screen`}>
      <InvoicePDF />
    </div>
  );
}
