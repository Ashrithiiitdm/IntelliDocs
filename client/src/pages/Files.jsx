import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import React from 'react'
import FileTable from "@/components/FilesTable";


const files = [
  {
    name: "Analysis.txt",
    modifiedAt: "Sept 23, 2025",
    owner: "me",
    collaborators: ["KD", "GA", "GS"],
  },
  {
    name: "Analysis.txt",
    modifiedAt: "Sept 23, 2025",
    owner: "Pandiri Veeresh Kumar",
    collaborators: ["KD", "GA", "GS"],
  },
  {
    name: "Analysis.txt",
    modifiedAt: "Sept 23, 2025",
    owner: "Pandiri Veeresh Kumar",
    collaborators: ["KD", "GA", "GS"],
  },
  {
    name: "Analysis.txt",
    modifiedAt: "Sept 23, 2025",
    owner: "Pandiri Veeresh Kumar",
    collaborators: ["KD", "GA", "GS"],
  },
];

const Files = () => {
  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <Header />

      {/* Sidebar + Content */}
      <div className="flex flex-1 font-montserrat">
        <Sidebar />
        {/* Main containing the folders & recent part */}
        <main className="flex-1 p-6 overflow-y-auto m-10 rounded-2xl" style={{ backgroundColor: "#F2F6FE" }}>
          <h1 className="text-3xl font-semibold mb-4">Files</h1>
          <hr className="h-[3px] my-5 border-0" style={{backgroundColor : "#95ADDC"}}/>
          <FileTable files={files}/>
        </main>
      </div>
    </div>
  )
}

export default Files