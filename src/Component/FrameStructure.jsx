import React from 'react'
import Warningtext from "./FrameGenerator/Warningtext";
import FrameChoosing from './MainFramePart/FrameChoosing'
import '../style/FrameStructure.css'


const FrameStructure = ({ framesArray, warningTextStatus,toggled }) => {
  
  return(
    framesArray.length >= 2 && framesArray.length <= 200? (
         //print out array of frame
         <FrameChoosing framesArray={framesArray} toggled={toggled}/>
    ) : (
      <div className='warning-frame-wrapper'>
        <div className="warning-frame-container">
        <Warningtext number={warningTextStatus} toggled={toggled}/>
      </div>
      </div>
    )
  );
};

export default FrameStructure


