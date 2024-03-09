"use client"
import { LayoutDashboard, Gauge, Settings, Inbox, File, Send, Archive, ArchiveX, Trash2 } from "lucide-react";
import { Nav } from "./Nav";
import { cn } from "@/lib/utils";
import { useState } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

export default function WrapperNav() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <div className="mt-10 h-screen sticky rounded-r-2xl min-w-64 mr-10">
      <div className={cn("flex gap-2 h-[52px] items-center justify-center", isCollapsed ? 'h-[52px]' : 'px-2')}>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn---.png" alt="profile-pic" />
          <AvatarFallback>SY</AvatarFallback>
        </Avatar>
        <p>Shivansh Yadav</p>
      </div>
      <Nav
        isCollapsed={isCollapsed}
        links={[
          {
            title: "Home",
            // label: "128",
            icon: Inbox,
            variant: "default",
          },
          {
            title: "Synthetic Generator",
            // label: "9",
            icon: Gauge,
            variant: "ghost",
          },
          // {
          //   title: "Sent",
          //   label: "",
          //   icon: Send,
          //   variant: "ghost",
          // },
          // {
          //   title: "Junk",
          //   label: "23",
          //   icon: ArchiveX,
          //   variant: "ghost",
          // },
          // {
          //   title: "Trash",
          //   label: "",
          //   icon: Trash2,
          //   variant: "ghost",
          // },
          // {
          //   title: "Archive",
          //   label: "",
          //   icon: Archive,
          //   variant: "ghost",
          // },
        ]}
      />
    </div>
  )
}