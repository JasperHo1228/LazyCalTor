import React,{useState,useReducer} from 'react'
import Warningtext from "../Warningtext";
import EachFrame from "./EachFrameInfo";
import EachMessyFrame from '../../PaidByMultiplePeople/EachMessyFrame';
import SumUpEach_Input from '../SumUpEach_Input';
import Calculator from '../Calculator';
import {evaluate} from 'mathjs'
import '../../../style/FrameStructure.css'

const initialState = {
  shareFood: 0,
  servicePercent: 0,
  serviceChargeInput: '',
  shareFoodInput: '',
  assholeFrdInput: '',
  results: '',
  notAllShare: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_SHARE_FOOD':
      return { ...state, shareFood: action.payload };
    case 'SET_SERVICE_PERCENT':
      return { ...state, servicePercent: action.payload };
    case 'SET_SERVICE_CHARGE_INPUT':
      return { ...state, serviceChargeInput: action.payload };
    case 'SET_SHARE_FOOD_INPUT':
      return { ...state, shareFoodInput: action.payload };
    case 'SET_ASSHOLE_FRD_INPUT':
      return { ...state, assholeFrd: action.payload };
    case 'SET_RESULTS':
      return { ...state, results: action.payload };
    case 'SET_NOT_ALL_SHARE':
      return { ...state, notAllShare: action.payload };
    default:
      return state;
  }
};

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
    const [state, dispatch] = useReducer(reducer, initialState);
   
    const ShareFoodCalculate = (event) => {
      let value = event.target.value;
      value = value.replace(/[^0-9,.， ]/g, '');
      dispatch({ type: 'SET_SHARE_FOOD_INPUT', payload: value });
      const sum = SumUpEach_Input(value);
      const total = sum / framesArray.length;
      dispatch({ type: 'SET_SHARE_FOOD', payload: total });
      };

    const percentage_service = (event)=>{
        let value = event.target.value;
        value = value.replace(/[^0-9%.]/g, '');
        dispatch({ type: 'SET_SERVICE_CHARGE_INPUT', payload: value });
        const checkString = value.replace('%', '');
        dispatch({ type: 'SET_SERVICE_PERCENT', payload: checkString / 100 });
      }
  
     const assholeFrdInput = (event) => {
        const inputValue = event.target.value;
        const filteredValue = inputValue.replace(/[^0-9*()/.+-| ]/g, '');
        dispatch({ type: 'SET_ASSHOLE_FRD_INPUT', payload: filteredValue });
        assholeFrdCalculate(filteredValue);
      };
     
     const assholeFrdCalculate =  (inputValue) => {
      // Split the input by the | symbol to separate calculations
      const calculations = inputValue.split('|');
      let total = 0;
      const results = calculations.map((calculation, index) => {
        
        try {
          const result = evaluate(calculation.trim()); // Use trim to remove leading/trailing spaces
          total += result;
          return `Food  ${index + 1}: $${result.toFixed(3)}`;
        } 
        catch (error) {
          total = 0;
          return `Food ${index + 1}: $0.000`;
        }
      });

      dispatch({ type: 'SET_NOT_ALL_SHARE', payload: total });
      dispatch({ type: 'SET_RESULTS', payload: results.join(', ') });
    };
    
      // Initialize an array to store the latest total amounts
      const [frameTotals, setFrameTotals] = useState(Array(framesArray.length).fill(0));

      const handleUpdateTotalAmount = (index, frameTotal) => {
        // Update the total amount for a specific frame
        const updatedFrameTotals = [...frameTotals];
        updatedFrameTotals[index] = frameTotal;
        setFrameTotals(updatedFrameTotals);
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
            {
            toggled?
              <EachFrame shareFood={state.shareFood} 
                        servicePercent={state.servicePercent} 
                        notAllShare={state.notAllShare}
                        onUpdateTotalAmount={handleUpdateTotalAmount}
                        frameId={frame.id}
                        /> 
                :
              <EachMessyFrame />
            }
            </div>
          </div>
        ))
        }
        </div>  

            {/* extra Information to check do the user input the value correctly  */}
            <div className='TotalBill-checking-wrapper'>
            <div className='TotalBill-checking-container'>
              <h3> 
                Please confirm if the numbers below match your bill.
                <br/>
                睇吓個數係咪同你張單一樣！
              </h3>
              <div className='TotalBill-info'>
              Your Bill: $
              {
                frameTotals.slice(1).reduce((total, frameTotal) => {
                  const currentTotal = Calculator({
                    totalAmount: frameTotal,
                    shareFood: state.shareFood,
                    notAllShare: state.notAllShare,
                    servicePercent: state.servicePercent,
                  });
                  return total + currentTotal;
                }, 0).toFixed(3)
              }
              </div>
              </div>
            </div>

        {/* share food frame */}
        <div className="share-frame-wrapper">
                <div className="share-frame-container">
                <h1> Any Share Food or Service Charge?</h1>
                    <div className="share-info">
                    <input onChange = {ShareFoodCalculate} 
                          value={state.shareFoodInput}
                           placeholder="Share Food" 
                           className='input-field-share'  
                           name="shareFood" 
                           autoComplete="off"/>
                    <div className='per-person'>Per Person: ${state.shareFood.toFixed(4)}</div>
                </div>

              {/* for some people who didn't eat the food  */}
                <div className="share-info">
                  {/* show the example how to use it */}
                  <div className='example2-assholefrd-wrapper'>
                    <div className='example2-assholefrd-container'>
                    <h2>Notice!!</h2>
                    <h3>Split the bill who didn't have the food</h3>
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
                  {/* start to input the price  */}
                  <input placeholder = "Fucking Asshole Frd" className='input-field-share' value={state.assholeFrdInput}  onChange={assholeFrdInput}/>
                  <div className='assholeFrd-container'>
                    <div className='assholeFrd-info'>
                          {state.results}
                    </div>
                  </div>
                </div>

                {/* service charge */}
                <div className="share-info">
                    <input onChange = {percentage_service} 
                            name="serviceCharge"
                            value={state.serviceChargeInput} 
                            placeholder="Service Charge %" 
                            className='input-field-share' 
                            autoComplete="off"/>
                </div>
              </div>
         </div>
      </>
    )
}