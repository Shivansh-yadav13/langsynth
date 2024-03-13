"use client"
// import NextVideo from 'next-video';
export default function DemoVideo() {
  return (
    <iframe width="560" height="315" className='border-prime border-2' src="https://www.youtube.com/embed/y3wgpF546Pw?si=MVJ7fBa6Un4WwmJM" title="LangSynth" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
  )
  // return <NextVideo src={DemoVideoFile} accentColor='#AF63FF' />
  // return <CldVideoPlayer
  //   id='demo'
  //   width='1920'
  //   height='1080'
  //   src="demo"
  // />
}