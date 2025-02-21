import React from "react";
import { Button } from "./ui/button.jsx";
import { Link } from "react-router-dom";
import { UserButton, useUser } from "@clerk/clerk-react";

export default function Header() {
  
  const { user, isSignedIn } = useUser();

  return (
    <div className="p-3 px-5 flex justify-between items-center shadow-md fixed w-full top-0 bg-white z-10">
      	<img src="/logo.svg" alt="logo" width={100} height={100} />

      	{isSignedIn ?
        	<div className="flex gap-2 items-center">
        		<Link to={'/dashboard'}>
          			<Button variant='outline'>Dashboard</Button>
          		</Link>
        	<UserButton />
        	</div>
        	:

        	<Link to={"/auth/login"}>
          		<Button>Get Started</Button>
        	</Link>

      	}
    </div>
  );
}
