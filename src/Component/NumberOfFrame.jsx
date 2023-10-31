import React,{useState} from "react";
import '../style/NumberOfFrame.css';
import FrameStructure from "./EachFrame/FrameStructure";

function NumberOfFrame() {
    const [frames,setNumberFrames] = useState([]);
    const [frameCount,setFrameCount] = useState("");
    const [warning,setWarning] = useState(null);
    const [inputValue, setInputValue] = useState('');

    const generateFrame = (count) => {
      setWarning(parseInt(count));
    
      const frames = Array.from({ length: count }, (_, index) => ({
        id: index + 1,
      }));
    
      setNumberFrames(frames);
    };

    const inputOnChange = (event) => {
      let value = event.target.value;
      value = value.replace(/[^0-9]/g, '')
      setInputValue(value);
      const inputValue = event.target.value
      setFrameCount(inputValue)
    }
    
  return (
    <div className="numberofFrameContainer">
      <div className="input-group">
      <input
        placeholder="Enter number of people"
        id="fname"
        className="input-field"
        value={inputValue}
        onChange={inputOnChange}
      />
      </div>
       <div className="btn-container">
       <button className='tap-me' onClick = {()=> generateFrame(frameCount)}>撳掣</button>
       </div>
       
       <FrameStructure framesArray = {frames}  warningTextStatus={warning} className="output-frame-container" />
      
    </div>
  )
}

export default NumberOfFrame

