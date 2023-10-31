import React,{useState} from 'react'
import Warningtext from "../Warningtext";
import EachFrame from "./EachFrameInfo";
import SumUpEach_Input from '../SumUpEach_Input';
import '../../style/FrameStructure.css'

const FrameStructure = ({ framesArray, warningTextStatus }) => {
  
  return(
    framesArray.length >= 2 ? (
         //print out array of frame
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
    const [inputValue, setInputValue] = useState('');
    const [inputValue2, setInputValue2] = useState('');

    const ShareFoodCalculate = (event) => {
        let value = event.target.value;
        value = value.replace(/[^0-9,.， ]/g, '')
        setInputValue2(value);
        const sum = SumUpEach_Input(value);
        const total = sum/framesArray.length;
        // Update the total sum for this frame
        setshareFood(total);
      };

    
      const percentage_service = (event)=>{
          let value = event.target.value;
          value = value.replace(/[^0-9%.]/g, '');
          setInputValue(value);
          const checkString =  value.replace('%','')
          setServicePercent(checkString/100);
      }
     
    return(
      <>
         <div className='notice-wrapper'>
        <div className='flexColCenter notice-container'>
            <div className='notice-text'>
              <h2>Notice!!</h2>
              Please use space bar or ,(comma) to split up each number<br/>
              請用空白鍵/逗號隔開價錢
            </div>
          </div>
          </div>
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
                    <input onChange = {ShareFoodCalculate} 
                           value={inputValue2} 
                           placeholder="Share Food" 
                           className='input-field-share'  
                           name="shareFood" 
                           autoComplete="off"/>
                    <div className='per-person'>Per Person: ${shareFood.toFixed(4)}</div>
                </div>

                <div className="share-info">
                    <input onChange = {percentage_service} 
                            name="shareFood"
                            value={inputValue} 
                            placeholder="Service Charge %" 
                            className='input-field-share' 
                            autoComplete="off"/>
                </div>
              </div>
         </div>
      </>
    )
}