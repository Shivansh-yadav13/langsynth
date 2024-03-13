"use client"
import AuthContext from "@/app/contexts/authContext";
import { Button } from "@/components/ui/button"
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useEffect, useState, useContext } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Navbar() {
  const router = useRouter();
  const [username, setUsername] = useState<string | null>(null);
  const authContext = useContext(AuthContext);

  const handleLogout = async () => {
    await authContext.logout();
    setUsername(null);
    router.push("/authenticate");
  }

  useEffect(() => {
    try {
      if (authContext.session) {
        const user = authContext.session.user;
        if (user) {
          const email = user.email as string;
          if (email) {
            try {
              email.indexOf("@") > 0 && setUsername(email.substring(0, email.indexOf("@")));
            } catch {
              setUsername(email.substring(0, 8));
            }
          }
        }
      }
    } catch (e) {
      console.log(e);
    }
  }, [authContext.session])

  return (
    <nav className={`mt-5 ${username ? "" : "mb-32"} py-2 px-10`}>
      <div className="flex justify-between">
        <Link href="/">
          <div className="flex select-none">
            <Image src="/images/logo.png" alt="logo" width={100} height={50} />
            <h1 className="font-bold text-4xl my-auto">Lang<span className="text-prime">Synth</span></h1>
          </div>
        </Link>
        <div className="gap-2 items-center hidden lg:block">
          <Link href="/generator">
            <Button variant="default" className="text-sm bg-prime hover:bg-purple-950">
              Generate Synthetic Data
            </Button>
          </Link>
          {
            username &&
            <DropdownMenu>
              <DropdownMenuTrigger>
                <div className="flex gap-2 items-center rounded px-2 py-1">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn---.png" alt="profile-pic" />
                    <AvatarFallback>{username[0].toUpperCase() ? username[0].toUpperCase() : "P"}</AvatarFallback>
                  </Avatar>
                  <p>{username}</p>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Button variant="ghost" size="lg" className="text-center" onClick={handleLogout}>Logout</Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          }

        </div>
      </div>
    </nav >
  )
}