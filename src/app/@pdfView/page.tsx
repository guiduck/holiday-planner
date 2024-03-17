"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const InvoicePDF = dynamic(() => import("../@pdf/page"), {
  ssr: false,
});

const View = () => {
  const [client, setClient] = useState(false);

  useEffect(() => {
    setClient(true);
  }, []);

  return (
    <div className="w-screen">
      <InvoicePDF />
    </div>
  );
};

export default View;
