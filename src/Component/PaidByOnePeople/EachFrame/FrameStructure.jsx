import React,{useState} from 'react'
import Warningtext from "../Warningtext";
import EachFrame from "./EachFrameInfo";
import EachMessyFrame from '../../PaidByMultiplePeople/EachMessyFrame';
import SumUpEach_Input from '../SumUpEach_Input';
import {
   evaluate
} from 'mathjs'
import '../../../style/FrameStructure.css'

const FrameStructure = ({ framesArray, warningTextStatus,toggled }) => {
  
  return(
    framesArray.length >= 2 ? (
         //print out array of frame
         <FrameOuterPart framesArray={framesArray} toggled={toggled}/>
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


const FrameOuterPart = ({framesArray,toggled})=>{
    const [shareFood, setshareFood] = useState(0);
    const [servicePercent, setServicePercent] = useState(0);
    const [inputValue, setInputValue] = useState('');
    const [inputValue2, setInputValue2] = useState('');
    const [inputValue3, setInputValue3] = useState('');
    const [results, setResults] = useState('');
    const[notAllShare,setNotAllShare] = useState(0);

   

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

      const handleInputChange = (event) => {
        const inputValue = event.target.value;
        const filteredValue = inputValue.replace(/[^0-9*()/.+-| ]/g, '');
        setInputValue3(filteredValue);
        fuckingAssholeFrd(filteredValue);
      };
     
     const fuckingAssholeFrd =  (inputValue) => {
      // Split the input by the | symbol to separate calculations
      const calculations = inputValue.split('|');
      let total = 0; // Initialize a total variable
      const results = calculations.map((calculation, index) => {
        // Evaluate each calculation using the eval() function
        try {
          const result = evaluate(calculation.trim()); // Use trim to remove leading/trailing spaces
          total += result;
          return `Result ${index + 1}: $${result.toFixed(3)}`;
        } catch (error) {
          total=0;
          return `Result ${index + 1}: $0.000`;
        }
      });
        setNotAllShare(total);
        setResults(results.join(', '));
    };
    
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
            {
            toggled?
              <EachFrame shareFood={shareFood} servicePercent={servicePercent} notAllShare={notAllShare}/> 
                :
              <EachMessyFrame />
            }
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
                  <div className='example2-assholefrd-wrapper'>
                    <div className='example2-assholefrd-container'>
                  <h3>Split the food who didn't have</h3>
                  <h4>Input example: (3+3)/2 | 3*7 <br/>
                      | means split two equations    
                      <p>Output:</p>            
                      Result 1: $ 3,
                      Result 2: $ 21
                      <p className='waring-text-assholefrd'>Be Careful If you see Result: $0 all <br/>
                         the money in this part won't be added 
                      </p>
                  </h4>
                  </div>
                  </div>
                 
                <input placeholder = "Fucking Asshole Frd" className='input-field-share' value={inputValue3}  onChange={handleInputChange}/>
                <div className='assholeFrd-container'>
                  <div className='assholeFrd-info'>
                        {results}
                  </div>
                </div>
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