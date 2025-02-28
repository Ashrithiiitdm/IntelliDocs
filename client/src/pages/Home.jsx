import FolderCard from "@/components/FolderCard";
import RecentCard from "@/components/RecentCard";
import React, { useEffect, useState } from "react";

export default function Home() {
  const [folders, setFolders] = useState([]);
  const [recent, setRecent] = useState([]);

  // useEffect(() => {
  //   // Fetch folders from backend
  //   fetch("/api/folders")
  //     .then(response => response.json())
  //     .then(data => setFolders(data))
  //     .catch(error => console.error("Error fetching folders:", error));
  // }, []);

  return (
    <main className="p-6 overflow-y-auto m-10 rounded-2xl" style={{ backgroundColor: "#F2F6FE" }}>
      <h1 className="text-3xl font-semibold mb-4">Home</h1>
      <hr className="h-[3px] my-5 border-0" style={{backgroundColor: "#95ADDC"}}/>
      
      {/* Folders Section */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-8">Folders</h2>
        <div className="flex gap-4 overflow-x-auto">
          {["Hack 2023", "Q-4 Results", "Annual Report", "Security"].map((folder, index) => (
            <FolderCard key={index} name={folder} fileCount={5} size="10MB" />
          ))}
        </div>
      </section>

      {/* Recent Files Section */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Recent</h2>
        <div className="grid grid-cols-4 gap-4">
          {["Analysis Data July", "Analysis Data July", "Analysis Data July", "Analysis Data"].map((file, index) => (
            <RecentCard key={index} name={file} fileCount={3} size="5MB" />
          ))}
        </div>
      </section>
    </main>
  );
}