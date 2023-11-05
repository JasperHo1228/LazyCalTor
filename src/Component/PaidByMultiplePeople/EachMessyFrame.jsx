import React,{useState} from 'react'
import SumUpEach_Input from '../PaidByOnePeople/SumUpEach_Input';
import AssholeFrdInfo from './ComponentMessyFrame/AssholeFrdInfo';
import '../../style/PaidByMutiplePeople/EachMessyFrame.css'
function EachMessyFrame({onUpdateTotalAmount,frameId,totalPerson}) {
  const [name,setName] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);
  const [noNeedPay, setNoNeedPay] = useState(0);

  const nameFrame = (event)=>{
    setName(event.target.value)
  }  
  
  const shareFoodInputChange = (event) => {
    let value = event.target.value;
    value = value.replace(/[^0-9,-.，| ]/g, '');
    setInputValue(value);
    const sum = SumUpEach_Input(value);
    setTotalAmount(sum);
    onUpdateTotalAmount(frameId,sum)
  };

  const noNeedPaySum =  (event)=>{
    let value = event.target.value
    value = value.replace(/[^0-9, ]/g, '');
    const sum = SumUpEach_Input(value)
    setNoNeedPay(sum);
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
            <AssholeFrdInfo totalPerson = {totalPerson}/>

            <div className='final-total'>You have paid: $</div>
            <div className='not-need-to-pay-title'>Any thing you don't have to pay?</div>
            <input type='text' className='input-field' onChange={noNeedPaySum} placeholder='Enter the price'/>
             <div>Total: {noNeedPay}</div>
          </div>
          </div>
    </div>
  )
}

export default EachMessyFrame