"use client"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"

export default function Navbar() {
  return (
    <nav className="my-5 py-2 px-10">
      <div className="flex justify-between">
        <h1 className="font-bold text-2xl my-auto">Lang<span className="text-prime">Synth</span></h1>
        <div className="flex flex-col justify-center">
          <Button variant="outline" className="font-bold text-sm bg-prime text-black">Generate Synthetic Data</Button>
          {/* <p className="text-xs italic text-gray-400 my-2 font-bold">No Credit Card Required</p> */}
        </div>
      </div>
    </nav >
  )
}