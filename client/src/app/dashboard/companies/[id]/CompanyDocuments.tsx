import PdfViewer from "@/components/PdfViewer";
import React from "react";

const CompanyDocuments = () => {
  const sampleDocuments = [1, 2, 3, 4];
  return (
    <div className="flex flex-col gap-2 ">
      <p className="text-xl">Documents</p>
      <div className="grid sm:grid-cols-1 xl:grid-cols-2 gap-10 mt-3">
        {sampleDocuments.map((s) => (
          <div key={s}>
            <p className="text-sm">Document {s}</p>
            <PdfViewer />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanyDocuments;
