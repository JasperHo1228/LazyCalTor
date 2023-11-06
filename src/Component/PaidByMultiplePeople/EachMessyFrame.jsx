import React,{useState} from 'react'
import SumUpEach_Input from '../PaidByOnePeople/SumUpEach_Input';
import AssholeFrdInfo from './ComponentMessyFrame/AssholeFrdInfo';
import '../../style/PaidByMutiplePeople/EachMessyFrame.css'

function EachMessyFrame({totalPerson,onUpdateTotalAmount,onUpdateNotShareFood,frameId,shareFoodTotalAmount,noShareFoodTotalAmount}) {
  const [name,setName] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);
  const [noNeedPay, setNoNeedPay] = useState(0);
  const [totalNotSharePayment, setTotalNotSharePayment] = useState(0);
  //add the each person frame total

  const nameFrame = (event)=>{
    setName(event.target.value)
  }  

  const handleUpdateNotShare = (notShareFood) => {
    const updatedNotShareTotals = notShareFood;
    setTotalNotSharePayment(updatedNotShareTotals);
  };
 
  const notShareFoodSum = (eachNotShareFood) =>{
    const updateEachNonShareFood = eachNotShareFood
    onUpdateNotShareFood(frameId,updateEachNonShareFood);
  };
 
  const shareFoodInputChange = (event) => {
    let value = event.target.value;
    value = value.replace(/[^0-9,-.，| ]/g, '');
    setInputValue(value);
    const sum = SumUpEach_Input(value);
    setTotalAmount(sum);
    onUpdateTotalAmount(frameId,sum);
  };
  
  const totalPaid = (totalNotSharePayment) => {
    return (parseFloat(totalAmount) + parseFloat(totalNotSharePayment)).toFixed(4);
  }

  const noNeedPaySum =  (event)=>{
    let value = event.target.value
    value = value.replace(/[^0-9,. ]/g, '');
    const sum = SumUpEach_Input(value)
    setNoNeedPay(sum);
  };
  
  const eachShouldPayShareFood = ()=>{
    return (parseFloat(shareFoodTotalAmount)/parseFloat(totalPerson)).toFixed(5)
  }

  // check the totalAmount from each price is negative or positive number 
  //total - shareFood - notshare food
  const calculatePayValue = () => {
        const moneyShould = totalPaid(totalNotSharePayment) - eachShouldPayShareFood() - parseFloat(noShareFoodTotalAmount) + parseFloat(noNeedPay)
        if(moneyShould === 0){
          return <>{name} should pay or get $</>
        }
        else if(moneyShould > 0){
          return <>{name} should receive ${moneyShould.toFixed(4)}</>
        }
        else{
          return <>{name} should pay ${Math.abs(moneyShould.toFixed(4))}</>
        }
  }


  return (
    <div className='frame-wrapper'>
        <div className='flexColCenter frame-container messy-version'>
          <div className='frame-content'>
           <div className='each-frame-title messy-title-color'>
                {name}
            </div>
            <input type='text' className='input-field' onChange={nameFrame} placeholder='Name'/>
            <div className='messy-mode-share-food'>Share Food</div>
            <input type='text' className='input-field' onChange={shareFoodInputChange} value={inputValue} placeholder='Enter your payment'/>
            <div className='messy-mode-share-food'>Not share Food</div>
            <AssholeFrdInfo totalPerson = {totalPerson} handleUpdateNotShare = {handleUpdateNotShare} notShareFoodSum = {notShareFoodSum}/>
            <div className='final-total'>You total have paid: 
                 ${totalPaid(totalNotSharePayment) }
            </div>
            <div className='not-need-to-pay-title'>Any thing you don't have to pay?</div>
            <input type='text' className='input-field' onChange={noNeedPaySum} placeholder='Enter the price'/>
             <div> 
                  {calculatePayValue()}</div>
          </div>
          </div>
    </div>
  )
}

export default EachMessyFrame