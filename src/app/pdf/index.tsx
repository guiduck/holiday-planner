"use client";
/* eslint-disable jsx-a11y/alt-text */
import { PlanType } from "@/models/plan-models";
import { PDFViewer } from "@react-pdf/renderer";
import { useState, useEffect } from "react";
import { PDFDocument } from "./pdf-document";
import getPlanById from "@/lib/actions/get-Plan";
import { useAlertStore } from "@/stores/alert-store";

export interface PDFViewProps {
  plan?: PlanType;
  storybook?: boolean;
}

const PDFView = ({ plan, storybook = false }: PDFViewProps) => {
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
    if (!storybook) getPlan();
  }, []);

  return (
    <PDFViewer>
      {(planData || plan) && <PDFDocument plan={planData || plan} />}
    </PDFViewer>
  );
};

export default PDFView;
