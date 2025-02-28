import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import React, { useEffect, useState, useRef } from "react";

export default function UploadButton({ onClick }) {

  const fileInputRef = useRef(null);

  const handleUploadClick = () => {
    fileInputRef.current.click(); // Trigger file input click
  };

  const handleFileChange = (event) => {
    const files = event.target.files;
    console.log("Selected files:", files);
    // Handle file upload logic here
  };

  return (
    <div>
      <button
        onClick={handleUploadClick}
        className="flex items-center w-32 gap-2 px-4 py-6 rounded-3xl bg-[#F2F6FE] shadow-sm hover:bg-[#E1ECFE] transition"
      >
      <Plus className="h-5 w-5" />
      <span className="text-black font-medium">Add</span>
      </button>
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        multiple
        onChange={handleFileChange}
      />
    </div>
  );
}
