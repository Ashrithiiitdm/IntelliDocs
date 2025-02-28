import React from "react";
import fileIcon from "@/assets/file.svg"

export default function RecentFiles({ name, date, size }) {
  return (
        <div className="bg-white rounded-xl p-4 shadow-md flex items-center gap-3">
          <img src={fileIcon} alt={name} className="w-5 h-5" />
          <div>
            <h3 className="font-bold">{name}</h3>
            <p className="text-sm text-gray-600">{date} • {size}</p>
          </div>
        </div>
  );
}