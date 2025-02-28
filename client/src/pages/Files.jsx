import React from 'react'
import FileTable from "@/components/FilesTable";

const files = [
  {
    id:1,
    name: "Analysis.txt",
    modifiedAt: "Sept 23, 2025",
    owner: "me",
    collaborators: ["KD", "GA", "GS"],
    starred: false
  },
  {
    id:2,
    name: "Analysis.txt",
    modifiedAt: "Sept 23, 2025",
    owner: "Pandiri Veeresh Kumar",
    collaborators: ["KD", "GA", "GS"],
    starred: false
  },
  {
    id:3,
    name: "Analysis.txt",
    modifiedAt: "Sept 23, 2025",
    owner: "Pandiri Veeresh Kumar",
    collaborators: ["KD", "GA", "GS"],
    starred: true
  },
  {
    id:4,
    name: "Analysis.txt",
    modifiedAt: "Sept 23, 2025",
    owner: "Pandiri Veeresh Kumar",
    collaborators: ["KD", "GA", "GS"],
    starred: true
  },
];

const Files = () => {
  return (
    <main className="flex-1 p-6 overflow-y-auto m-10 rounded-2xl" style={{ backgroundColor: "#F2F6FE" }}>
      <h1 className="text-3xl font-semibold mb-4">Files</h1>
      <hr className="h-[3px] my-5 border-0" style={{backgroundColor : "#95ADDC"}}/>
      <FileTable files={files} isStarredPage={false}/>
    </main>
  )
}

export default Files