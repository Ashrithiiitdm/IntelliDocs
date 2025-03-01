import React, { useState, useEffect } from "react";
import { FileType, ArrowRight } from "lucide-react";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";
import ConvertFiles from "../components/ConvertFiles";

const fileFormats = [
  { value: "pdf", label: "PDF" },
  { value: "jpeg", label: "JPEG" },
  { value: "jpg", label: "JPG" },
  { value: "png", label: "PNG" },
  { value: "docx", label: "DOCX" },
  { value: "txt", label: "TXT" },
];

const FileConverter = () => {
  const [files, setFiles] = useState([]);
  const { user } = useUser();
  const api_url = import.meta.env.VITE_BACKEND_URL;
  const convert_url = import.meta.env.VITE_API_URL;

  // State for the selected file and conversion options
  const [selectedFile, setSelectedFile] = useState(null);
  const [toFormat, setToFormat] = useState("");
  const [isConverting, setIsConverting] = useState(false);

  useEffect(() => {
    const fetchFiles = async () => {
      if (!user) return; // Ensure user is logged in before fetching
      try {
        const userResponse = await axios.get(
          `${api_url}/getuser?user_name=${user.username}`
        );
        const user_id = userResponse.data.user_id;
        const response = await axios.get(`${api_url}/${user_id}/files`);

        if (response.status !== 200) {
          throw new Error("Failed to fetch files");
        }

        const filedata = response.data.files;
        const fileArray = filedata.map((file, index) => ({
          id: index + 1,
          name: `${file.fileName}.${file.fileType}`,
          modifiedAt: new Date(file.modified_at).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "2-digit",
          }),
          owner: file.owner,
          collaborators: file.collaborators || [],
          starred: false,
          url: file.fileUrl,
          fileType: file.fileType,
        }));

        setFiles(fileArray);
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    };

    fetchFiles();
  }, [user, api_url]);

  const handleSelectFile = (file) => {
    // Toggle selection: if already selected, unselect it.
    if (selectedFile && selectedFile.id === file.id) {
      setSelectedFile(null);
      setToFormat("");
    } else {
      setSelectedFile(file);
      setToFormat("");
    }
  };

  const handleConvert = async () => {
    if (!selectedFile || !toFormat) {
      alert("Please select a file and a target format");
      return;
    }

    setIsConverting(true);
    try {
      // Extract file extension from filename
      const fileExtension = selectedFile.name.split(".").pop().toLowerCase();
      const response = await axios.post(
        `${convert_url}/files/convert`,
        {
          fromFormat: fileExtension,
          toFormat,
          fileUrl: selectedFile.url,
        },
        {
          responseType: "blob",
        }
      );

      if (response.status === 200) {
        const blob = new Blob([response.data], {
          type: response.headers["content-type"],
        });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        const newFileName = `${selectedFile.name
          .split(".")
          .slice(0, -1)
          .join(".")}.${toFormat}`;
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

  const clearSelection = () => {
    setSelectedFile(null);
    setToFormat("");
  };

  return (
    <main className="flex-1 p-6 overflow-y-auto m-10 rounded-2xl bg-[#F2F6FE]">
      <h1 className="text-3xl font-semibold mb-4 text-[#3B4B76] flex items-center">
        <FileType className="mr-2" size={32} /> File Converter
      </h1>
      <hr className="h-[3px] my-5 border-0 bg-[#95ADDC]" />

      {selectedFile ? (
        <div>
          <div className="mb-6">
            <button
              onClick={clearSelection}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              ← Back to file list
            </button>
          </div>
          <div className="border p-6 bg-white shadow rounded-lg mb-6">
            <h3 className="text-lg font-medium mb-2">File Details</h3>
            <p className="mb-2">
              <strong>Name:</strong> {selectedFile.name}
            </p>
            <p className="mb-4">
              <strong>Format:</strong> {selectedFile.fileType.toUpperCase()}
            </p>

            <div className="flex justify-center mt-6 space-x-4">
              <div>
                <label className="block text-gray-700 mb-2">From</label>
                <input
                  className="border border-gray-300 p-2 rounded-lg w-40 bg-gray-200 cursor-not-allowed"
                  value={selectedFile.name.split('.').pop().toUpperCase()}
                  disabled
                />
              </div>
              <ArrowRight size={32} className="text-gray-500" />
              <div>
                <label className="block text-gray-700 mb-2">To</label>
                <select
                  className="border border-gray-300 p-2 rounded-lg w-40"
                  value={toFormat}
                  onChange={(e) => setToFormat(e.target.value)}
                >
                  <option value="">Select format</option>
                  {fileFormats
                    .filter(
                      (format) =>
                        format.value !==
                        selectedFile.name.split('.').pop().toLowerCase()
                    )
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
          </div>
        </div>
      ) : (
        <ConvertFiles
          files={files}
          onSelectFile={handleSelectFile}
          selectedFileId={selectedFile ? selectedFile.id : null}
        />
      )}
    </main>
  );
};

export default FileConverter;
