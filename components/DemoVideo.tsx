"use client"
// import NextVideo from 'next-video';
export default function DemoVideo() {
  return (
    <div>
      <iframe width="560" height="315" className='hidden 2xl:block border-prime border-2' src="https://www.youtube.com/embed/y3wgpF546Pw?si=MVJ7fBa6Un4WwmJM" title="LangSynth" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
      <iframe width="380" height="215" className='block 2xl:hidden border-prime border-2' src="https://www.youtube.com/embed/y3wgpF546Pw?si=MVJ7fBa6Un4WwmJM" title="LangSynth" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
    </div>
  )
}