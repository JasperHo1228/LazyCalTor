import React,{useState} from "react";
import '../style/NumberOfFrame.css';
import FrameStructure from "./EachFrame/FrameStructure";

function NumberOfFrame() {
    const [frames,setNumberFrames] = useState([]);
    const [frameCount,setFrameCount] = useState("");
    const [warning,setWarning] = useState(null);
   
    const generateFrame = (count) => {
      setWarning(parseInt(count));
    
      const frames = Array.from({ length: count }, (_, index) => ({
        id: index + 1,
      }));
    
      setNumberFrames(frames);
    };

  return (
    <div className="numberofFrameContainer">
      <div className="input-group">
      <input
        placeholder="Input number of people"
        id="fname"
        type="number"
        className="input-field"
        value={frameCount}
        onChange={(e) => setFrameCount(e.target.value)}
      />
      </div>
       <div className="btn-container">
       <button className='tap-me' onClick = {()=> generateFrame(frameCount)}>撳掣</button>
       </div>
       <>
       <FrameStructure framesArray = {frames}  warningTextStatus={warning} className="output-frame-container" />
       </>
      
    </div>
  )
}

export default NumberOfFrame

