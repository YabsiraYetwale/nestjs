"use client";

import { Download, Fullscreen } from "lucide-react";
import React, { useState } from "react";

import { pdfjs, Document, Page } from "react-pdf";
import BarLoader from "react-spinners/BarLoader";
import { Button } from "./ui/button";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PdfViewer = () => {
  const [numPages, setNumPages] = useState<number>();

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) =>
    setNumPages(numPages);

  return (
    <div className="flex flex-col items-center h-96 overflow-y-scroll border-2 border-gray-100">
      <Document
        file="/sample.pdf"
        loading={<BarLoader />}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        {Array.from(new Array(numPages), (el, index) => (
          <Page key={`page_${index + 1}`} pageNumber={index + 1} width={500} />
        ))}
      </Document>
      <div className="h-10 flex gap-3 mt-1 absolute w-36 self-end">
        <a href={`/sample.pdf`} target="_blank">
          <Button className="bg-zinc-200 text-black hover:bg-zinc-300">
            <Fullscreen />
          </Button>
        </a>
        <a href={`/sample.pdf`} download={true}>
          <Button className="bg-zinc-200 text-black hover:bg-zinc-300">
            <Download />
          </Button>
        </a>
      </div>
    </div>
  );
};

export default PdfViewer;
