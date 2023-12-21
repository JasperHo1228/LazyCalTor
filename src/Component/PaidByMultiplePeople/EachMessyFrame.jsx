import React, { useMemo,useReducer, useEffect} from 'react';
import Decimal from 'decimal.js';
import SumUpEach_Input from '../PaidByOnePeople/SumUpEach_Input';
import AssholeFrdInfo from './ComponentMessyFrame/AssholeFrdInfo';
import NotNeedToPay from './ComponentMessyFrame/NotNeedToPay';

import '../../style/PaidByMutiplePeople/EachMessyFrame.css';

function EachMessyFrame({
  totalPerson,
  onUpdateShowMoney,
  frameId,
  shareFoodTotalAmount,
  noShareFoodTotalAmount,
  showOwnMoney,
  onUpdateArrayData,
  onUpdateArrayNoNeedPay,
  toggled,
  language
}) {

  const initialState ={
    name:'',
    shareFoodInput:'',
    totalSharePayment:0,
    noNeedPay:0,
    totalNotSharePayment:0,
    isSameNumberPeople:totalPerson
  }

  const reducer = (state, action) => {
    switch (action.type) {
      case 'NAME':
        return { ...state, name: action.value };
      case 'SHAREFOOD_INPUT':
        return {...state, shareFoodInput: action.value};
      case 'TOTAL_SHARE_PAYMENT':
         return{...state, totalSharePayment:action.value};
      case 'NO_NEED_PAY':
        return {...state, noNeedPay:action.value};
      case 'TOTAL_NOT_SHARE_PAYMENT':
        return{...state, totalNotSharePayment:action.value}
      case 'IS_SAME_NUMBER_PEOPLE':
        return {...state, isSameNumberPeople:action.value}
      default:
        return state;
    }
  }
  const [state,dispatch] = useReducer(reducer,initialState)

  const nameFrame = (event) => {
    dispatch({type:'NAME',value: event.target.value})
  };
  
  const handleUpdateNotShare = (notShareFood) => {
    const updatedNotShareTotals = notShareFood;
    dispatch({type:'TOTAL_NOT_SHARE_PAYMENT',value: updatedNotShareTotals})
  };
  
  const notShareFoodSum = (eachNotShareFood) => {
    const updateEachNonShareFood = eachNotShareFood;
    onUpdateArrayData(frameId, updateEachNonShareFood,' notShareFrame')
  };
  
  const noNeedToPay = (noNeedToPay) => {
     const updateNoNeedPay = noNeedToPay;
     onUpdateArrayNoNeedPay(frameId,updateNoNeedPay)
     dispatch({type:'NO_NEED_PAY',value: updateNoNeedPay})
  }    
  
  //share fode input field control
  const shareFoodInputChange = (event) => {
    let value = event.target.value;
    value = value.replace(/[^0-9,-.， ]/g, '');
    dispatch({type:'SHAREFOOD_INPUT',value: value})
    const sum = SumUpEach_Input(value);
    dispatch({type:'TOTAL_SHARE_PAYMENT', value: sum})
    onUpdateArrayData(frameId,sum,'ShareFrameTotals')
  };

  //check the total payment for each person
  const totalPaid = useMemo(() => {
    return (parseFloat(state.totalSharePayment) + parseFloat(state.totalNotSharePayment)).toFixed(4);
  }, [state.totalSharePayment, 
      state.totalNotSharePayment]);


  //display total not share food
const getNotShareTotal = useMemo(() => {
  const decimalNotShareFoodTotalAmount = noShareFoodTotalAmount.map((value) => new Decimal(value))
                                         .filter((decimalValue) =>  decimalValue.isFinite() && decimalValue.greaterThanOrEqualTo(0));

  const result = decimalNotShareFoodTotalAmount.reduce((total, current) => total.plus(current), new Decimal(0));

  return result.toNumber(); // Convert the Decimal back to a regular number
}, [noShareFoodTotalAmount]);

//calculate total amount each person should pay
const moneyShould = useMemo(() => {
  const decimalShare = new Decimal(state.totalSharePayment);
  const decimalNotShare = new Decimal(state.totalNotSharePayment);
  const decimalShareFoodTotal = new Decimal(shareFoodTotalAmount);
  const decimalTotalPerson = new Decimal(totalPerson);

  const decimalNotShareTotal = new Decimal(getNotShareTotal);
  const decimalNoNeedPay = new Decimal(state.noNeedPay);

  const result = (decimalShare.plus(decimalNotShare))
  .minus(decimalShareFoodTotal.dividedBy(decimalTotalPerson))
  .minus(decimalNotShareTotal)
  .plus(decimalNoNeedPay);

  return result.toNumber(); // Convert the Decimal back to a regular number
},[state.totalSharePayment, 
   state.totalNotSharePayment, 
   shareFoodTotalAmount, 
   totalPerson, 
   getNotShareTotal, 
   state.noNeedPay])


 // Determine text for how much you should pay/receive
 // here should add the input state of asshole frd 
 const calculatePayValue = useMemo(() => {
  if (moneyShould === 0 || isNaN(moneyShould)) 
      {
        return <>{language === 'english' ? 
                    <>{state.name === '' ? <>You</>:<>{state.name}</>}  don't have to pay</> 
                    : 
                    <>{state.name === '' ? <>你</>:<>{state.name} </>}唔洗俾</>}</>;
      } 
  else if (moneyShould > 0) 
      {
        return <div className='total-you-should-recieve-text-color'>
                     {state.name === '' ? <>{language === 'english' ? 'You ':'你'}</>:<>{state.name} </>} {language === 'english' ? 
                      <>should receive:</> 
                      : 
                      <>要收返:</>} ${moneyShould.toFixed(4)} 
                </div>;
      } 
  else 
      {
        return <div className='total-you-should-pay-text-color'>
                    {state.name === '' ? <>{language === 'english' ? 'You ':'你'}</>:<>{state.name}</>}{language === 'english' ? 
                    <>should pay a total of </> 
                    : 
                    <>總共要俾 </>}${Math.abs(moneyShould.toFixed(4))}
                </div>;
      }

}, [moneyShould, 
    state.name,
    language]);


 useEffect(() => {
   if(totalPerson !== state.isSameNumberPeople){
    dispatch({type:'SHAREFOOD_INPUT',value:''})
    dispatch({type:'TOTAL_SHARE_PAYMENT',value:0}) 
    dispatch({type:'NAME',value:''})
    dispatch({type:'NO_NEED_PAY',value:0})
    dispatch({type:'TOTAL_NOT_SHARE_PAYMENT',value:0})
    dispatch({type:'IS_SAME_NUMBER_PEOPLE',value:totalPerson})
   }
    onUpdateShowMoney(frameId, moneyShould, state.name);
  }, [moneyShould, 
      onUpdateShowMoney, 
      frameId, 
      state.name, 
      state.isSameNumberPeople, 
      totalPerson,state.noNeedPay]);

  //start calculating
  const positivePayments = showOwnMoney.filter((person) => person.moneyShould > 0);
  const sumOfPositivePayments = positivePayments.reduce(
    (currentTotal, person) => currentTotal + person.moneyShould,
    0
  );
  
   // Calculate the payments that who you should pay to.
   const calculateFinalResult = useMemo(() => {
      if(moneyShould < 0){
        return (
          <div className='result-container'>
            <h2 className='result-title'>{language === 'english' ? 'Who you should pay to?':'你要俾返邊條友?'}</h2>
            {positivePayments.map((person, index) => (
              <div key={index} className='should-pay-to-text-style'>
                {language === 'english' ? 
                   <>{state.name === '' ? <>You </> : <>{state.name} </>} owe</> 
                    : <>{state.name === '' ? <>你</> :<>{state.name} </>}爭</>} {person.name}: ${(
                    ((person.moneyShould / sumOfPositivePayments) * Math.abs(moneyShould)).toFixed(4))}
                <br />
              </div>
            ))}
          </div>
        );
      }
  }, [moneyShould, 
      positivePayments, 
      sumOfPositivePayments,
      language,
      state.name]);
  
  return (
    <div className="frame-wrapper">
      <div className="flexColCenter frame-container messy-version">
        <div className="frame-content">
          
          <div className="each-frame-title messy-title-color">
               {state.name === ''? <>{language === 'english' ? "Who pay for it?" : "邊條友俾？"}</>:<>{state.name}</>}
          </div>

          <input type="text" 
                 className="input-field" 
                 value={state.name} 
                 onChange={nameFrame} 
                 placeholder={language === 'english' ? "Name" : "咩名"}
                />

          <div className="messy-mode-share-food">
          {language === 'english' ? 'Shared Food':'大家有份食嘅餸'}
          </div>

          <input type="text" 
                 className="input-field" 
                 onChange={shareFoodInputChange} 
                 value={state.shareFoodInput}
                 placeholder={language === 'english' ? "Enter your payment":"輸入你俾咗幾銀"} />

          <div className="messy-mode-share-food">{language === 'english' ? 'Food NOT shared by all' :'有人冇食唔想俾既餸'}</div>
          
          <AssholeFrdInfo
            totalPerson={totalPerson}
            handleUpdateNotShare={handleUpdateNotShare}
            toggled={toggled}
            notShareFoodSum={notShareFoodSum}
            language={language}
          />

         <div className='final-total-container'>
         <div className="final-total">
           {language === 'english' ? 'You total have paid' : '你總共俾咗'}: ${totalPaid} 
          </div>
        </div>
       

          <div className="not-need-to-pay-title ">
            {language === 'english' ? 
             "Anything you don't need to pay?" 
             : 
             "有冇D咩你唔洗俾？"}
          </div>
          
           <NotNeedToPay 
           totalPerson={totalPerson}
           noNeedToPay={noNeedToPay}
           language={language}
           />
           
          <div className='total-you-should-pay'> 
               {calculatePayValue}
          </div>

          <div className='result-wrapper'>
               {calculateFinalResult}
          </div>
        
        </div>
      </div>
    </div>
  );
}

export default EachMessyFrame;

