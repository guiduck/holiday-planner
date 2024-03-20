import { render, screen, fireEvent } from "@testing-library/react";
import { PDFModal } from "./index";
import React from "react";

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(() => "/mocked-pathname"),
  useSearchParams: jest.fn(() => new URLSearchParams()),
}));

let pdfState = true;

jest.mock("@/stores/modal-control.ts", () => ({
  useModalStore: jest.fn(() => ({
    showPDF: pdfState,
    setShowPDF: jest.fn(() => {
      pdfState = false;
    }),
  })),
}));

describe("PDFModal", () => {
  beforeEach(() => {
    pdfState = true;
  });

  it("renders PDFModal component", () => {
    render(<PDFModal />);
    const modalElement = screen.getByTestId("pdf-modal");
    expect(modalElement).toBeInTheDocument();
  });

  it("opens full document link in a new tab when clicked", () => {
    const mockSearchParams = new URLSearchParams();
    mockSearchParams.set("planId", "123");

    render(<PDFModal />);
    const fullDocumentLink = screen.getByTestId("document-link");
    fireEvent.click(fullDocumentLink);
    expect(fullDocumentLink).toHaveAttribute("target", "_blank");
    expect(fullDocumentLink).toHaveAttribute("href", "/pdfView/?planId=null");
  });
});
