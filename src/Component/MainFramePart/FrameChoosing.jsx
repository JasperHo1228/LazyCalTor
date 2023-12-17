import React, {useState,useReducer,useEffect,useCallback} from 'react'
import EachFrame from "../PaidByOnePeople/EachFrame/EachFrameInfo";
import EachMessyFrame from '../PaidByMultiplePeople/EachMessyFrame';
import SumUpEach_Input from '../PaidByOnePeople/SumUpEach_Input';
import {evaluate} from 'mathjs';
import ConfirmBill from './components/ConfirmBill'
import  { getTotalAmount }  from './components/GetTotalAmount'
import NotShareFoodAndServiceCharge from '../PaidByOnePeople/NotShareFood_ServiceCharge'

const FrameChoosing = ({framesArray,toggled})=>{
    //combine two mode status setting
    const initialState = {
      shareFood: 0,
      servicePercent: 0,
      serviceChargeInput: '',
      shareFoodInput: '',
      assholeFrdInput: '',
      results: '',
      notAllShare: 0,
      frameTotals: Array.from({ length: framesArray.length }, () => 0),
      frameNotShare: Array.from({ length: framesArray.length }, () => 0),
      frameNoNeedToPay:Array.from({length:framesArray.length},() => 0)
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
          return { ...state, assholeFrdInput: action.payload };
        case 'SET_RESULTS':
          return { ...state, results: action.payload };
        case 'SET_NOT_ALL_SHARE':
          return { ...state, notAllShare: action.payload };
        case 'SET_FRAME_TOTALS_ARRAY':
          return {...state, frameTotals: action.payload };
        case 'SET_NOT_SHARE_FRAME_ARRAY':
          return {...state, frameNotShare: action.payload };
        case 'NO_NEED_TO_PAY':
          return {...state, frameNoNeedToPay: action.payload};
        default:
          return state;
      }
    };
  
      //status setting 
      const [state, dispatch] = useReducer(reducer, initialState);
  
      //this is a bit special status setting for messy mode for calculating who should pay to
      const[showOwnMoney,setShowOwnMoney] = useState(Array.from({ length: framesArray.length }, () => ({
        name: '',
        moneyShould: 0,
      })));
  
      //Calculate each person should pay in share food
      const ShareFoodCalculate = (event) => {
        let value = event.target.value;
        value = value.replace(/[^0-9,.， ]/g, '');
        dispatch({ type: 'SET_SHARE_FOOD_INPUT', payload: value });
        const sum = SumUpEach_Input(value);
        const total = sum / framesArray.length;
        dispatch({ type: 'SET_SHARE_FOOD', payload: total });
        };
     
      //change to service charge in decimal form
      const percentage_service = (event)=>{
          let value = event.target.value;
          value = value.replace(/[^0-9%.]/g, '');
          dispatch({ type: 'SET_SERVICE_CHARGE_INPUT', payload: value });
          const checkString = value.replace('%', '');
          dispatch({ type: 'SET_SERVICE_PERCENT', payload: checkString / 100 });
        }
    
       //the assholefrdInput is in one person mode
       const assholeFrdInput = (event) => {
          const inputValue = event.target.value;
          const filteredValue = inputValue.replace(/[^0-9*()/.+-| ]/g, '');
          dispatch({ type: 'SET_ASSHOLE_FRD_INPUT', payload: filteredValue });
          assholeFrdCalculate(filteredValue);
        };
      
       //not share food in one person mode
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
      
      //add share or not share food in different array prepare for sum up
      const handleUpdateArrayData = useCallback((index, array, caseName) => {
        const updatedArray = caseName === 'ShareFrameTotals' ? [...state.frameTotals] : [...state.frameNotShare];
        updatedArray[index] = array;
        dispatch({
          type: caseName === 'ShareFrameTotals' ? 'SET_FRAME_TOTALS_ARRAY' : 'SET_NOT_SHARE_FRAME_ARRAY',
          payload: updatedArray
        });
      }, [state.frameTotals, state.frameNotShare]);
      
      const handleUpdateArrayNoNeedPay = useCallback((index, array)=>{
            const updatedArray = [...state.frameNoNeedToPay];
            updatedArray[index] = array;
            dispatch({type:'NO_NEED_TO_PAY', payload: updatedArray});
      },[state.frameNoNeedToPay])

      //show all the people who you should pay  -- party mode
      //For useState set hook the following practise that can save the previous value and base on its the update
      //if you just set the value in setShowOwnMoney({name,moneyShould}) it will only save the latest value the previous will be vanish
      const handleUpdateShowMoney = useCallback((index, moneyShould, name) => {
        setShowOwnMoney((prevShowOwnMoney) => {
          const updatedShowOwnMoney = [...prevShowOwnMoney];
          updatedShowOwnMoney[index] = {
            name,
            moneyShould
          };
          return updatedShowOwnMoney;
        });
      },[])
  
     //reset the input and value 
      useEffect(() => {
          if (!toggled || framesArray.length !== state.frameTotals.length || toggled) {
            dispatch({type:'SET_FRAME_TOTALS_ARRAY',payload:Array(framesArray.length).fill(0)})
            setShowOwnMoney( Array(framesArray.length).fill().map(() => ({
              name: '',
              moneyShould: 0
            })));
            dispatch({type:'SET_NOT_SHARE_FRAME_ARRAY',payload:Array(framesArray.length).fill(0)})
            dispatch({ type: 'SET_NOT_ALL_SHARE', payload: 0 });
            dispatch({ type: 'SET_RESULTS', payload:''});
            dispatch({ type: 'SET_ASSHOLE_FRD_INPUT', payload:''});
            dispatch({ type: 'SET_SERVICE_CHARGE_INPUT', payload: '' });
            dispatch({ type: 'SET_SERVICE_PERCENT', payload: 0});
            dispatch({ type: 'SET_SHARE_FOOD_INPUT', payload: '' });
            dispatch({ type: 'SET_SHARE_FOOD', payload: 0 });
          }
        }, [framesArray,toggled,state.frameTotals.length]);
       
      //check the bill -- one person mode
      //check the share food amount -- party mode
      const totalAmount = getTotalAmount(state);

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
            <h1>Enter the price separately for what you've{toggled ? " eaten":" paid"} !!!</h1> 
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
                            onUpdateArrayData={handleUpdateArrayData}
                            frameId={frame.id}
                            arrayLength={framesArray.length}
                            /> 
                    :
                  <EachMessyFrame shareFood={state.shareFood} 
                                  servicePercent={state.servicePercent} 
                                  notAllShare={state.notAllShare}
                                  frameId={frame.id}
                                  totalPerson = {framesArray.length}
                                  shareFoodTotalAmount = {totalAmount}
                                  noShareFoodTotalAmount = {state.frameNotShare}
                                  onUpdateShowMoney={handleUpdateShowMoney}
                                  onUpdateArrayData={handleUpdateArrayData}
                                  onUpdateArrayNoNeedPay = {handleUpdateArrayNoNeedPay}
                                  showOwnMoney = {showOwnMoney}
                                  />
                }
                </div>
              </div>
            ))
            }
          </div>  
              {/* extra Information to check do the user input the value correctly */}
              <ConfirmBill totalAmount={totalAmount} toggled={toggled}/>
              {/* display service charge and not share food dine out mode? */}
               { 
                  toggled ?
                  <NotShareFoodAndServiceCharge ShareFoodCalculate = {ShareFoodCalculate}     //this component is for dine out
                  shareFoodInputValue={state.shareFoodInput}
                  shareFood = {state.shareFood.toFixed(4)}
                  assholeFrdInputValue ={state.assholeFrdInput}
                  assholeFrdInputOnChange = {assholeFrdInput}
                  result = {state.results}
                  percentage_service = {percentage_service}
                  serviceChargeInput = {state.serviceChargeInput}
                  />
                  : 
                  null
                  }
            </>
          )
  }

  export default FrameChoosing 