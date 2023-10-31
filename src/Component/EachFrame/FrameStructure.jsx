import React,{useState} from 'react'
import Warningtext from "../Warningtext";
import EachFrame from "./EachFrameInfo";
import SumUpEach_Input from '../SumUpEach_Input';
import '../../style/FrameStructure.css'

const FrameStructure = ({ framesArray, warningTextStatus }) => {
  
  return(
    framesArray.length >= 2 ? (
         <FrameOuterPart framesArray={framesArray}/>
    ) : (
      <div className='warning-frame-wrapper'>
        <div className="warning-frame-container">
        <Warningtext number={warningTextStatus} />
      </div>
      </div>
    )
  );
};

export default FrameStructure


const FrameOuterPart = ({framesArray})=>{
    const [shareFood, setshareFood] = useState(0);
    const [servicePercent, setServicePercent] = useState(0);
    
    const ShareFoodCalculate = (event) => {
        const inputValue = event.target.value;
        const sum = SumUpEach_Input(inputValue);
        const total = sum/framesArray.length;
        // Update the total sum for this frame
        setshareFood(total);
      };

      const percentage_service = (event)=>{
          const inputValue = event.target.value;
          setServicePercent(inputValue/100);
      }

    return(
      <>
        <div className="frame-group">
        {
         framesArray.map((frame) => (
          <div key={frame.id}>
              <div className="each-frame">
              <EachFrame shareFood={shareFood} servicePercent={servicePercent} />
            </div>
          </div>
        ))
        }
        </div>
        <div className="share-frame-wrapper">
                <div className="share-frame-container">
                <h1> Any Share Food or Service Charge?</h1>
                    <div className="share-info">
                    
                    <input onChange = {ShareFoodCalculate} placeholder="Share Food" className='input-field-share' autoComplete="off"/>
                    <div className='per-person'>Per Person: ${shareFood}</div>
                </div>

                <div className="share-info">
                   
                    <input onChange = {percentage_service}  placeholder="Service Charge %" className='input-field-share' autoComplete="off"/>
                </div>
              </div>
         </div>
      </>
    )
}