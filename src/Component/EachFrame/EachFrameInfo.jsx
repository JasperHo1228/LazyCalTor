import React,{useState} from 'react'
import '../../style/EachFrame.css'
import SumUpEach_Input from '../SumUpEach_Input';

function EachFrame({shareFood,servicePercent }) {
    const [totalAmount, setTotalAmount] = useState(0);

    const handleInputChange = (event) => {
        const inputValue = event.target.value;
        const sum = SumUpEach_Input(inputValue)
        setTotalAmount(sum);
      };

      const calculateFinalTotal = () => {
        const temporaryTotal = parseFloat(totalAmount);
        //add up all the share food and service charge
        const finalTotal = (temporaryTotal + parseFloat(shareFood)) * (1 + parseFloat(servicePercent));
        return finalTotal.toFixed(3);
      };

  return (
    <div className='frame-wrapper'>
        <div className='flexColCenter frame-container'>
          <div className='upper-frame-section'>
                <input type='text' placeholder="Name" className='input-field' name='name' autoComplete="off"/>
                <input onChange={handleInputChange} placeholder="Enter the price amount" className='input-field' name="price" autoComplete="off"/>
                <div className="total-amount"> Total: {calculateFinalTotal()} </div>
        </div>
        </div>
    </div>
  )
}

export default EachFrame