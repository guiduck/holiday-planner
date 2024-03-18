"use client";
/* eslint-disable jsx-a11y/alt-text */
import { PlanType } from "@/models/plan-models";
import { PDFViewer } from "@react-pdf/renderer";
import { useState, useEffect } from "react";
import { PDFDocument } from "./pdf-document";
import getPlanById from "@/lib/actions/get-Plan";
import { useAlertStore } from "@/stores/snackbar-store";

const PDFView = () => {
  const [planData, setPlanData] = useState<PlanType>();
  const { setAlertData } = useAlertStore();

  const getPlan = async () => {
    const response = await getPlanById();
    if (response?.message === "success") {
      setPlanData(response.data as PlanType);
    } else {
      setAlertData({
        show: true,
        message: response?.data as string,
        time: 5000,
        type: "error",
      });
    }
  };

  useEffect(() => {
    getPlan();
  }, []);

  return <PDFViewer>{planData && <PDFDocument plan={planData} />}</PDFViewer>;
};

export default PDFView;
