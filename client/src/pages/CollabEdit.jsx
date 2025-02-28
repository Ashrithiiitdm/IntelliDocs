import FileTable from '@/components/FilesTable';
import { Button } from '@/components/ui/button'
import { SquarePen } from 'lucide-react';
import React from 'react'

const files = [
  {
    id:1,
    name: "Analysis.docx",
    modifiedAt: "Sept 23, 2025",
    owner: "me",
    collaborators: ["KD", "GA", "GS"],
    starred: false
  },
  {
    id:2,
    name: "Analysis.docx",
    modifiedAt: "Oct 23, 2025",
    owner: "Pandiri Veeresh Kumar",
    collaborators: ["KD", "GA", "GS"],
    starred: false
  },
  {
    id:3,
    name: "Analysis.docx",
    modifiedAt: "Nov 23, 2025",
    owner: "Pandiri Veeresh Kumar",
    collaborators: ["KD", "GA", "GS"],
    starred: true
  },
  {
    id:4,
    name: "Analysis.docx",
    modifiedAt: "Dec 23, 2025",
    owner: "Pandiri Veeresh Kumar",
    collaborators: ["KD", "GA", "GS"],
    starred: true
  },
];

// files should get only the .docx files

const CollabEdit = () => {
  return (
    <main className="flex-1 p-6 overflow-y-auto m-10 rounded-2xl" style={{ backgroundColor: "#F2F6FE" }}>
          <h1 className="text-3xl font-semibold mb-4">Collaborative Editing</h1>
          <hr className="h-[3px] my-5 border-0" style={{backgroundColor : "#95ADDC"}}/>
          <Button className="mb-5 text-black rounded-md shadow-md hover:shadow-lg transition-shadow" size="lg" style={{backgroundColor : "#AFCAFF"}}>
            <SquarePen/> Create
          </Button>
          <FileTable files={files} isStarredPage={false}/>
    </main>
  )
}

export default CollabEdit