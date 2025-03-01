import { useState, useRef } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Plus, UploadCloud, X, Pause, Play } from "lucide-react";
import { motion } from "framer-motion";

export default function UploadButton({ onUpload }) {
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (event) => {
    const uploadedFiles = Array.from(event.target.files).map((file) => ({
      file,
      name: file.name,
      progress: 0,
      paused: false,
    }));
    setFiles((prev) => [...prev, ...uploadedFiles]);
    uploadFiles(uploadedFiles);
  };

  const uploadFiles = (fileList) => {
    fileList.forEach((fileObj, fileIndex) => {
      let interval = setInterval(() => {
        setFiles((prevFiles) =>
          prevFiles.map((f) =>
            f.name === fileObj.name && !f.paused
              ? { ...f, progress: Math.min(f.progress + 10, 100) }
              : f
          )
        );
      }, 300);
  
      fileObj.interval = interval;
    });
  };
  

  const togglePause = (index) => {
    setFiles((prevFiles) =>
      prevFiles.map((file, i) =>
        i === index
          ? { ...file, paused: !file.paused }
          : file
      )
    );
  };

  const handleUploadToBackend = async () => {
    const formData = new FormData();
    files.forEach((file) => formData.append("files", file.file));

    try {
      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");

      console.log("Files uploaded successfully!");
      setFiles([]); // Clear files after successful upload
      setOpen(false); // Close the dialog box
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };



  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          className="flex items-center w-32 gap-2 px-4 py-6 rounded-3xl bg-[#F2F6FE] shadow-sm hover:bg-[#E1ECFE] transition"
          onClick={() => setOpen(true)}
        >
          <Plus className="h-5 w-5" />
          <span className="text-black font-medium">Add</span>
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-2xl md:max-w-3xl p-0 border border-gray-200 rounded-2xl overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-2xl w-full"
        >
          {/* Header */}
          <div className="p-6 pb-4 flex justify-between items-center border-b">
            <h2 className="text-2xl font-medium text-blue-400">Upload</h2>
            <button
              onClick={() => setOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              {/* <X className="h-5 w-5" /> */}
            </button>
          </div>

          {/* Upload Area */}
          <div className="p-6">
            <div
              className={`border-2 border-dashed rounded-lg p-12 flex flex-col items-center justify-center cursor-pointer transition-all ${isDragging
                  ? "border-blue-500 bg-blue-100"
                  : files.length > 0
                    ? "border-blue-500 bg-white"
                    : "border-blue-200 bg-blue-50"
                }`}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsDragging(false);
                handleFileChange(e);
              }}
              onClick={(e) => {
                e.stopPropagation();
                fileInputRef.current.click();
              }}
            >
              <p className="text-center mb-1">
                <span className="text-gray-800 font-medium">
                  {files.length > 0 ? "Files Uploaded!" : "Drop your files here (or)"}
                </span>{" "}
                <button className="text-blue-500 font-medium hover:underline">
                  Browse
                </button>
              </p>
              <p className="text-sm text-gray-500">Max file size : 20MB</p>
              <input
                type="file"
                multiple
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileChange}
              />
            </div>
          </div>

          {/* Uploaded Files with Pause/Resume */}
          {files.length > 0 && (
            <div className="px-6 pb-6">
              <div className="p-3 bg-blue-50 rounded-lg">
                <h4 className="text-sm font-medium">Uploaded Files:</h4>
                <ul className="text-sm text-gray-600 mt-2 space-y-2">
                  {files.map((file, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center bg-white px-4 py-2 rounded-lg shadow-sm"
                    >
                      <div className="flex items-center gap-2 w-full">
                        <span className="truncate">{file.name}</span>

                        {/* Progress Bar with Percentage */}
                        <div className="flex items-center gap-2 flex-1">
                          <div className="relative w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all rounded-full"
                              style={{ width: `${file.progress}%` }}
                            />
                          </div>
                          <span className="text-xs font-medium text-gray-600 w-10 text-right">{file.progress}%</span>
                        </div>

                        {/* Pause/Resume Button - Hidden when 100% */}
                        {file.progress < 100 && (
                          <button
                            onClick={() => togglePause(index)}
                            className="text-gray-600 hover:text-gray-800 transition"
                          >
                            {file.paused ? <Play className="h-5 w-5" /> : <Pause className="h-5 w-5" />}
                          </button>
                        )}

                        {/* Discard Button */}
                        <button
                          onClick={() =>
                            setFiles(files.filter((_, i) => i !== index))
                          }
                          className="text-red-500 hover:text-red-700 transition"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Upload Button (Only when all files reach 100%) */}
              {files.length > 0 && files.every(file => file.progress === 100) && (
                <button
                  onClick={handleUploadToBackend}
                  className="mt-4 w-full py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition"
                >
                  Upload to Server
                </button>
              )}
            </div>
          )}
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
