import React from "react";
import folderIcon from "@/assets/folder.svg"; // Ensure you have the folder icon in the assets folder

export default function FolderCard({ name, fileCount, size }) {
  return (
    <div className="bg-blue-100 rounded-xl p-4 shadow-md flex flex-col items-center w-40 min-w-[160px]">
      <img src={folderIcon} alt="Folder Icon" className="w-12 h-12 mb-2" />
      <h3 className="font-bold text-center text-sm">{name}</h3>
      <p className="text-xs text-gray-600 text-center">{fileCount} Files • {size} MB</p>
    </div>
  );
}
