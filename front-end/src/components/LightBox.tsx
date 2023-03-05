import React, { useRef, useState } from 'react'
import { BiLeftArrow, BiRightArrow } from 'react-icons/bi';
import { FaTimes } from 'react-icons/fa';
type Props={
imageSource:string;
current:number;
images:any[];
setShowLightBox:React.Dispatch<React.SetStateAction<boolean>>;
}
function LightBox({imageSource, current,images,setShowLightBox}:Props) {
    const [currentImage, setCurrentImage] =useState<string>(imageSource);
    let currentImageIndex = useRef<number>(current);
    function getNextImage(e: React.MouseEvent<SVGElement, MouseEvent>)
    {
        /* gets the next image in the carousel when the right arrow button is clicked */
        if(currentImageIndex.current < images.length)
        {
        setCurrentImage(images[currentImageIndex.current+1])
    }
    currentImageIndex.current = 0;
    }
    function getPrevImage(e: React.MouseEvent<SVGElement, MouseEvent>)
    {
        e.stopPropagation();
        if(currentImageIndex.current >= 0 )
        {
        setCurrentImage(images[currentImageIndex.current-1])
    }
    currentImageIndex.current = images.length -1;
    }
    function getImageIndex(e)
    {
        currentImageIndex.current = images.indexOf(e.target.src);
        setCurrentImage(images[currentImageIndex.current]);
    }
    function closeLightBox()
    {
        setShowLightBox((prevState: any)=> !prevState);
    }
  return (
    <div className={'flex fixed h-full w-full z-[150] bg-[rgba(0,0,0,0.5)]'}>
          <div className={"absolute right-[0] top-[0] p-2 mb-2"}  onClick={ closeLightBox }>
          {" "}
          <FaTimes size={20} color={"rgba(0,0,0,0.75)"} />
        </div>
        <div><BiLeftArrow size={20} color={'black'} onClick={(e)=> getPrevImage(e)}/></div>
        <img src={currentImage} alt=''/>
        <div><BiRightArrow size={20} color={'black'} onClick={(e)=> getNextImage(e)}/></div>
        < div className='flex flex-warp'>
            {
                images.map((item, index)=>(
                    <figure className='h-[75] w-[75]'>
                        <img src={item} className='h-full w-full' onClick={(e)=>getImageIndex(e)}/>
                    </figure>
                ))
                
            }
        </div>
    </div>
  )
}

export default LightBox