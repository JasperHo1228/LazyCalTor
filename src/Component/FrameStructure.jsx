import React from 'react'
import Warningtext from "./FrameGenerator/Warningtext";
import FrameChoosing from './MainFramePart/FrameChoosing'
import '../style/FrameStructure.css'

const FrameStructure = ({ framesArray, warningTextStatus,toggled,language}) => {
  
  return(
    framesArray.length >= 2 && framesArray.length <= 200? (
         //print out array of frame
         <FrameChoosing framesArray={framesArray} toggled={toggled} language={language}/>
    ) : (
      <div className='warning-frame-wrapper'>
        <div className="warning-frame-container">
        <Warningtext number={warningTextStatus} language={language}/>
      </div>
      </div>
    )
  );
};

export default FrameStructure


