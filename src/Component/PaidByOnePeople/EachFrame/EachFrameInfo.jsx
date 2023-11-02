import React,{useState} from 'react'
import '../../../style/EachFrame.css'
import SumUpEach_Input from '../SumUpEach_Input';
import Calculator from '../Calculator';
function EachFrame({shareFood,servicePercent,notAllShare,onUpdateTotalAmount,frameId}) {

    const [totalAmount, setTotalAmount] = useState(0);
    const [inputValue, setInputValue] = useState('');
    const [name,setName] = useState('');

    const handleInputChange = (event) => {
        let value = event.target.value;
        value = value.replace(/[^0-9,-.，| ]/g, '');
        setInputValue(value);
        const sum = SumUpEach_Input(value);
        setTotalAmount(sum);
        onUpdateTotalAmount(frameId,sum)
      };
    const frameName = (event)=>{
        if(event.target.value.length > 18){
            window.alert("No more than 18 words")
        }
        else{
            setName(event.target.value)
        }
      }
   const getTotalPrice3digits = ()=>{
       const EachFrameTotal = Calculator({
          totalAmount: totalAmount,
          shareFood:  shareFood,
          notAllShare: notAllShare,
          servicePercent: servicePercent,
        }); 
        return EachFrameTotal.toFixed(3)
   }

    return (
      <div className='frame-wrapper'>
          <div className='flexColCenter frame-container one-person-verion'>
            <div className='frame-content'>
                <div className='each-frame-title one-person-title-color'>{name}</div>
                  <input type='text' onChange={frameName} placeholder="Name" className='input-field' name='name' autoComplete="off"/>
                  <input type='text' onChange={handleInputChange} value={inputValue} placeholder="Enter the price amount" className='input-field' name="price" autoComplete="off"/>
                <div className="total-amount"> Total: ${getTotalPrice3digits()}</div>
          </div>
          </div>
      </div>
    )
  }

export default EachFrame