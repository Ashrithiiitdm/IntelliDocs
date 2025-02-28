import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Star } from "lucide-react";

const avatarColors = ["red", "green", "yellow", "blue"];

// eslint-disable-next-line react/prop-types
export default function FileTable({ files }) {
  return (
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
          {files.map((file, index) => (
            <TableRow key={index} className="border-b">
              <TableCell className="text-center">
                <Star className="h-5 w-5 text-gray-400" />
              </TableCell>
              <TableCell className="gap-2">
                <span className="text-blue-500">📄</span> {file.name}
              </TableCell>
              <TableCell>{file.modifiedAt}</TableCell>
              <TableCell className="gap-2">
                <div className="flex items-center justify-start">
                    <Avatar className="h-10 w-10 m-4 shadow-md">
                        <AvatarFallback> 👤 </AvatarFallback>
                    </Avatar>
                    {file.owner}
                </div>                
                </TableCell>
                <TableCell className="gap-2 whitespace-nowrap">
                    <div className="flex items-center">
                    {file.collaborators.map((col, i) => (
                        <Avatar key={i} className={`h-10 w-10 flex items-center justify-center text-${avatarColors[i % avatarColors.length]}-400 font-semibold shadow-md -ml-2`}>
                            <AvatarFallback className={`bg-${avatarColors[i % avatarColors.length]}-300`}>{col}</AvatarFallback>
                        </Avatar>

                    ))}
                    </div>
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}