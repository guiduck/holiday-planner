"use client";

import dynamic from "next/dynamic";

const InvoicePDF = dynamic(() => import("../pdf"), {
  ssr: false,
});

const View = () => {
  return (
    <div className="w-screen h-full">
      <InvoicePDF />
    </div>
  );
};

export default View;
