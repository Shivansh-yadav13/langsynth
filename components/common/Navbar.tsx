import { Button } from "@/components/ui/button"

export default function Navbar() {
  return (
    <nav className="bg-[#252525] my-5 py-2 px-10 rounded-full shadow-lg">
      <div className="flex justify-between">
        <h1 className="font-bold text-2xl my-auto">Lang<span className="text-prime">Synth</span></h1>
        <div className="flex flex-col justify-center">
          <Button variant="link">Get Started</Button>
          {/* <p className="text-xs italic text-gray-400 my-2 font-bold">No Credit Card Required</p> */}
        </div>
      </div>
    </nav >
  )
}