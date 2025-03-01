import FileTable from '@/components/FilesTable'
import { useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import axios from 'axios';

const api_url = import.meta.env.VITE_BACKEND_URL;

// const files = [
//   {
//     id:1,
//     name: "Analysis.txt",
//     modifiedAt: "Sept 23, 2025",
//     owner: "me",
//     collaborators: ["KD", "GA", "GS"],
//     starred: false,
//     url: '/ass7.pdf'
//   },
//   {
//     id:2,
//     name: "Analysis.txt",
//     modifiedAt: "Sept 23, 2025",
//     owner: "Pandiri Veeresh Kumar",
//     collaborators: ["KD", "GA", "GS"],
//     starred: false,
//     url: 'https://res.cloudinary.com/de40laq0k/image/upload/v1740775351/huaehzh2kdkdxx7z3yxf.png'    
//   },
//   {
//     id:3,
//     name: "Analysis.txt",
//     modifiedAt: "Sept 23, 2025",
//     owner: "Pandiri Veeresh Kumar",
//     collaborators: ["KD", "GA", "GS"],
//     starred: true,
//     url: '/PAN.jpg'
//   },
//   {
//     id:4,
//     name: "Analysis.txt",
//     modifiedAt: "Sept 23, 2025",
//     owner: "Pandiri Veeresh Kumar",
//     collaborators: ["KD", "GA", "GS"],
//     starred: true,
//     url: '/veer.png'
//   },
// ];

//from the backend itself we should get the files in sorted order

const Recent = () => {
  const location = useLocation();
  const { user } = useUser();
  const [files, setFiles]= useState([]);

  useEffect(() => {
    const fetchFiles = async () => {
      if (!user) return; // Ensure user is logged in before fetching
      try {
        const user_id = await axios.get(`${api_url}/getuser?user_name=${user.username}`);
        // const user_id = await fetch(`${api_url}/getuser?user_name=${user.username}`)
        // console.log(user_id.data.user_id);
        const response = await axios.get(`${api_url}/${user_id.data.user_id}/files`);
        if (response.status !== 200) {
          throw new Error("Failed to fetch files");
        }
        const filedata = response.data.files;

        const sortedData = filedata.sort((filea, fileb) => fileb.modified_at - filea.modified_at)
  
        const fileArray = sortedData.map((file, index) => ({
            id: index + 1,
            name: `${file.fileName}.${file.fileType}`,
            modifiedAt: new Date(file.modified_at).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short", // "Jan", "Feb", ..., "Dec"
              day: "2-digit",
            }),
            owner: file.owner,
            collaborators: file.collaborators,
            starred: false,
            url: file.fileUrl
        }));

        setFiles(fileArray);
        
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    };

    fetchFiles();
  }, [user, setFiles]);
  return (
    <main className="flex-1 p-6 overflow-y-auto m-10 rounded-2xl" style={{ backgroundColor: "#F2F6FE" }}>
          <h1 className="text-3xl font-semibold mb-4">Recent</h1>
          <hr className="h-[3px] my-5 border-0" style={{backgroundColor : "#95ADDC"}}/>
          <FileTable files={files} isStarredPage={false} location={location}/>
    </main>
  )
}

export default Recent