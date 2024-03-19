"use client";

import dynamic from "next/dynamic";

const InvoicePDF = dynamic(() => import("../pdf"), {
  ssr: false,
});

const View = ({ modal }: { modal?: boolean }) => {
  return (
    <div className={`w-screen ${modal ? "h-full" : "h-screen"}`}>
      <InvoicePDF />
    </div>
  );
};

export default View;
