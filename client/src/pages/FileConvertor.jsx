import React, { useState, useEffect } from "react";
import { FileType, ArrowRight } from "lucide-react";
import axios from "../../axios.js";

const FileConverter = () => {
  const [fileName, setFileName] = useState("sample_document.pdf");
  const [fromFormat, setFromFormat] = useState("pdf");
  const [toFormat, setToFormat] = useState("");
  const [isConverting, setIsConverting] = useState(false);

  const fileFormats = [
    { value: "pdf", label: "PDF" },
    { value: "jpeg", label: "JPEG" },
    { value: "jpg", label: "JPG" },
    { value: "png", label: "PNG" },
    { value: "docx", label: "DOCX" },
    { value: "txt", label: "TXT" },
  ];

  // useEffect(() => {
  //   // Simulating fetching file from backend (Replace with API call later)
  //   axios.get("/file-info").then((response) => {
  //     const { name, format } = response.data;
  //     setFileName(name);
  //     setFromFormat(format);
  //   }).catch(() => {
  //     console.log("Using static file details until backend is ready");
  //   });
  // }, []);

  const handleConvert = async () => {
    if (!fromFormat || !toFormat) {
      alert("Please select a target format");
      return;
    }

    setIsConverting(true);
    try {
      const response = await axios.post("/convert", {
        fromFormat,
        toFormat,
      }, {
        responseType: "blob",
      });

      if (response.status === 200) {
        const blob = new Blob([response.data], { type: response.headers["content-type"] });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        const newFileName = `${fileName.split(".").slice(0, -1).join(".")}.${toFormat}`;
        a.download = newFileName;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else {
        throw new Error("Conversion failed");
      }
    } catch (error) {
      console.error("Error converting file:", error);
      alert("Error converting file. Please try again.");
    } finally {
      setIsConverting(false);
    }
  };

  return (
    <main className="flex-1 p-6 overflow-y-auto m-10 rounded-2xl bg-[#F2F6FE]">
      <h1 className="text-3xl font-semibold mb-4 text-[#3B4B76] flex items-center">
        <FileType className="mr-2" size={32} /> File Converter
      </h1>
      <hr className="h-[3px] my-5 border-0 bg-[#95ADDC]" />

      <div className="text-center p-4 bg-white shadow rounded-lg">
        <p className="text-lg font-medium">{fileName || "No file available"}</p>
      </div>

      <div className="flex justify-center mt-6 space-x-4">
        <div>
          <label className="block text-gray-700">From</label>
          <input
            className="border border-gray-300 p-2 rounded-lg w-40 bg-gray-200 cursor-not-allowed"
            value={fromFormat.toUpperCase()}
            disabled
          />
        </div>
        <ArrowRight size={32} className="text-gray-500" />
        <div>
          <label className="block text-gray-700">To</label>
          <select
            className="border border-gray-300 p-2 rounded-lg w-40"
            value={toFormat}
            onChange={(e) => setToFormat(e.target.value)}
          >
            <option value="">Select format</option>
            {fileFormats
              .filter((format) => format.value !== fromFormat)
              .map((format) => (
                <option key={format.value} value={format.value}>
                  {format.label}
                </option>
              ))}
          </select>
        </div>
      </div>

      <button
        className="mt-6 w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition disabled:bg-gray-400 flex justify-center items-center gap-2"
        onClick={handleConvert}
        disabled={isConverting || !toFormat}
      >
        {isConverting ? "Converting..." : "Convert File"}
      </button>
    </main>
  );
};

export default FileConverter;
