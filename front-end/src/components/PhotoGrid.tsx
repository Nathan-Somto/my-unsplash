import React, { useState } from 'react'
import LightBox from './LightBox';

function PhotoGrid({images}:{images:any[]}) {
  const [showLightBox, setShowLightBox] = useState(false);
  const [current, setCurrent] = useState<number>(-1);
  const [imageSource, setImageSource] = useState<string>('');
  function getImageSource(e: React.MouseEvent<HTMLImageElement, MouseEvent>,index:number, source:string){
    setCurrent(index);
    setImageSource(source);
    setShowLightBox(true);
    return;
  }
  return (
    /* rendered in the Profile Page  */
    /* shows a gallery grid of the pictures a user has */
    /* when a particular pic is clicked it shows a carousel  like layout with a right and left arrow */
    /* when a particular pic is clicked a delete icon is displayed */
    <div>
      {showLightBox && <LightBox current={current} imageSource={imageSource} images={images} setShowLightBox={setShowLightBox}/>}
      
      {images&& images.map((image, index )=>(
        <figure className='h-[30vh] w-[30vw]' key={`${image.description}-${index}`}>
          <img src={image.url} alt={image.caption} className='h-full w-full' onClick={(e)=>getImageSource(e,index,image.url)} />
        </figure>
      ))}
    </div>
  )
}

export default PhotoGrid