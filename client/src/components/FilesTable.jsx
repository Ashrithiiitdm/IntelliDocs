/* eslint-disable react/prop-types */
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Star } from "lucide-react";
import React, { useEffect, useState } from "react";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import "@cyntler/react-doc-viewer/dist/index.css";
import { useNavigate, useLocation } from "react-router-dom";

const colorClasses = [
  { bg: "bg-red-300", text: "text-red-500" },
  { bg: "bg-blue-300", text: "text-blue-500" },
  { bg: "bg-green-300", text: "text-green-500" },
  { bg: "bg-yellow-300", text: "text-yellow-500" },
  { bg: "bg-purple-300", text: "text-purple-500" },
  { bg: "bg-pink-300", text: "text-pink-500" },
  { bg: "bg-indigo-300", text: "text-indigo-500" },
  { bg: "bg-orange-300", text: "text-orange-500" },
];

export default function FileTable({ files, isStarredPage, location}) {
  const navigate = useNavigate();
  // const location = useLocation();

  const [fileData, setFileData] = useState([]);

  // Extract selected file URL from query parameters
  const queryParams = new URLSearchParams(location.search);
  const selectedUrl = queryParams.get("file");

  useEffect(() => {
    if (files && files.length > 0) {
      setFileData(files.filter((file) => (isStarredPage ? file.starred : true)));
    }

    console.log(selectedUrl);

    const handlePopState = () => {
      if (selectedUrl) {
        navigate(location.pathname);
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [selectedUrl, navigate, location, setFileData, files, isStarredPage]);

  const toggleStar = (fileId) => {
    setFileData((prevFiles) => {
      return prevFiles
        .map((file) =>
          file.id === fileId ? { ...file, starred: !file.starred } : file
        )
        .filter((file) => (isStarredPage ? file.starred : true));
    });
  };

  const handleRowClick = (fileUrl) => {
    console.log(fileUrl);
    navigate(`?file=${encodeURIComponent(fileUrl)}`);
  };

  const handleBack = () => {
    navigate(location.pathname);
  };

  return (
    <div>
      {selectedUrl ? (
        <div className="h-screen flex flex-col">
          {/* Button stays at the top */}
          <button
            onClick={handleBack}
            className="mb-4 p-2 bg-gray-300 hover:bg-gray-400 rounded self-start"
          >
            ⬅ Back to Files
          </button>
        
          {/* Centered DocViewer */}
          <div className="flex-grow flex items-center justify-center">
            <DocViewer
              pluginRenderers={DocViewerRenderers}
              documents={[{ uri: selectedUrl.includes("http") ? `${selectedUrl}?nocors=true` : selectedUrl }]}
              style={{ width: "80%", height: "80vh" }}
            />
          </div>
        </div>      
      ) : (
        <Card className="p-4 bg-blue-50">
          <Table>
            <TableHeader>
              <TableRow className="bg-blue-100">
                <TableHead className="w-12"></TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Modified at</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Collaborators</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {fileData.map((file, index) => (
                <TableRow key={index} className="border-b">
                  <TableCell className="text-center cursor-pointer" onClick={() => toggleStar(file.id)}>
                    <Star
                      key={index}
                      className={`h-5 w-5 transition-colors ${
                        file.starred ? "text-yellow-500 fill-yellow-500" : "text-gray-400"
                      }`}
                    />
                  </TableCell>
                  <TableCell className="gap-2 cursor-pointer" onClick={() => handleRowClick(file.url)}>
                    <span className="text-blue-500">📄</span> {file.name}
                  </TableCell>
                  <TableCell onClick={() => handleRowClick(file.url)}>{file.modifiedAt}</TableCell>
                  <TableCell onClick={() => handleRowClick(file.url)}>
                    <div className="flex items-center">
                      <Avatar className="h-10 w-10 mr-4 shadow-md">
                        <AvatarFallback>👤</AvatarFallback>
                      </Avatar>
                      {file.owner}
                    </div>
                  </TableCell>
                  <TableCell onClick={() => handleRowClick(file.url)}>
                    <div className="flex items-center">
                      {file.collaborators.map((col, i) => {
                        const colorIndex = i % colorClasses.length;
                        const { bg, text } = colorClasses[colorIndex];
                        return (
                          <Avatar
                            key={i}
                            className={`h-10 w-10 flex items-center justify-center ${text} font-bold shadow-md -ml-2`}
                          >
                            <AvatarFallback className={bg}>{col}</AvatarFallback>
                          </Avatar>
                        );
                      })}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}
    </div>
  );
}
