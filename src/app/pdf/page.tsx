"use client";
/* eslint-disable jsx-a11y/alt-text */
import getPlanById from "@/lib/actions/getPlan";
import { PlanType } from "@/models/plan-models";
import { PDFViewer } from "@react-pdf/renderer";
import { useState, useEffect } from "react";
import { PDFDocument } from "./pdf-document";

const PDFView = () => {
  // const { pending } = useFormStatus();
  const [planData, setPlanData] = useState<PlanType>();

  const getPlan = async () => {
    const plan = await getPlanById();
    setPlanData(plan);
  };

  useEffect(() => {
    getPlan();
  }, []);

  return <PDFViewer>{planData && <PDFDocument plan={planData} />}</PDFViewer>;
};

export default PDFView;
