import { Home, FileText, Star, Edit3, FileSymlink, Clock, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import UploadButton from "./UploadButton";

function SidebarItem({ icon: Icon, label, isActive = false, onClick, path }) {
    const navigate = useNavigate();
  
    return (
      <Button
        variant={isActive ? "secondary" : "ghost"}
        className={cn("w-full justify-start gap-3 px-4 py-3 rounded-lg", isActive && "bg-muted")}
        onClick={() => {
            if (onClick) {
              onClick(); // Custom click handler
            }
            if (path) {
              navigate(path); // Navigate if path is provided
            }
          }}
      >
        <Icon className="h-5 w-5" />
        <span>{label}</span>
      </Button>
    );
  }

export default function Sidebar() {
  const [activeItem, setActiveItem] = useState("Home");
  const navigate = useNavigate();

  const handleItemClick = (label, path) => {
    setActiveItem(label);
    navigate(path);
  };
  

  return (
    <Card className="w-64 border-r bg-background flex flex-col h-full p-4">
      <div className="flex-1 space-y-5 mt-10">
        <UploadButton onClick={() => console.log("Upload clicked!")} />
        <SidebarItem icon={Home} label="Home" isActive={activeItem === "Home"} onClick={() => handleItemClick("Home", "/")} />
        <SidebarItem icon={FileText} label="Files" isActive={activeItem === "Files"} onClick={() => handleItemClick("Files", "/files")} />
        <SidebarItem icon={Star} label="Starred" isActive={activeItem === "Starred"} onClick={() => handleItemClick("Starred", "/starred")} />
        <SidebarItem icon={Edit3} label="Collab Edit" isActive={activeItem === "Collab Edit"} onClick={() => handleItemClick("Collab Edit", "/collab")} />
        <SidebarItem icon={FileSymlink} label="File Convertor" isActive={activeItem === "File Convertor"} onClick={() => handleItemClick("File Convertor", "/convertor")} />
        <SidebarItem icon={Clock} label="Recent" isActive={activeItem === "Recent"} onClick={() => handleItemClick("Recent", "/recent")} />
      </div>
      <div className="pt-4">
        <SidebarItem icon={Settings} label="Settings" />
      </div>
    </Card>
  );
}
