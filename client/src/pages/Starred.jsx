import FileTable from '@/components/FilesTable';
import { useLocation } from 'react-router-dom';
import { useApp } from "../context/AppContext";
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

const Starred = () => {
  const location = useLocation();
  const { files } = useApp();

  return (
    <main className="flex-1 p-6 overflow-y-auto m-10 rounded-2xl" style={{ backgroundColor: "#F2F6FE" }}>
        <h1 className="text-3xl font-semibold mb-4">Starred</h1>
        <hr className="h-[3px] my-5 border-0" style={{backgroundColor : "#95ADDC"}}/>
        <FileTable files={files} isStarredPage={true} location={location}/>
    </main>
  )
}

export default Starred