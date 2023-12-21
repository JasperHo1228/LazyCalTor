import React,{useState} from 'react'
import '../../../style/EachFrame.css'
import SumUpEach_Input from '../SumUpEach_Input';
import Calculator_DineOutMode  from '../Calculator_DineOutMode ';
import { useEffect } from 'react';
import NotNeedToPay from '../../PaidByMultiplePeople/ComponentMessyFrame/NotNeedToPay';
function EachFrame({shareFood, 
                    servicePercent,
                    notAllShare,
                    onUpdateArrayData,
                    frameId,
                    arrayLength,
                    onUpdateArrayNoNeedPay,
                    language
                }) {

    const [totalAmount, setTotalAmount] = useState(0);
    const [inputValue, setInputValue] = useState('');
    const [name,setName] = useState('');
    const [isSameLength, setArrayLength] = useState(arrayLength);
    const [noNeedPay, setNoNeedPay] = useState(0);


    useEffect(()=>{
      if(isSameLength !== arrayLength){
        setInputValue('')
        setTotalAmount(0)
        setArrayLength(arrayLength)
        setNoNeedPay(0)
      }
    },[arrayLength,isSameLength,totalAmount])
    
    const handleInputChange = (event) => {
        let value = event.target.value;
        value = value.replace(/[^0-9,-.，| ]/g, '');
        setInputValue(value);
        const sum = SumUpEach_Input(value);
        setTotalAmount(sum);
        onUpdateArrayData(frameId,sum,'ShareFrameTotals')
      };

    //add no need to pay 
    const noNeedToPay = (noNeedToPay) => {
      const updateNoNeedPay = noNeedToPay;
      onUpdateArrayNoNeedPay(frameId,updateNoNeedPay)
      setNoNeedPay(updateNoNeedPay)
   }    
  

    const frameName = (event) => {
        if(event.target.value.length > 18){
            window.alert("No more than 18 words")
        }
        else{
            setName(event.target.value)
        }
    }
   
   const getTotalPrice3digits = ()=>{
       const EachFrameTotal =Calculator_DineOutMode({
          totalAmount: totalAmount,
          shareFood:  shareFood,
          notAllShare: notAllShare,
          servicePercent: servicePercent,
          noNeedPay : noNeedPay
        }); 
        return EachFrameTotal.toFixed(3)
   }

    return (
      <div className='frame-wrapper'>
          <div className='flexColCenter frame-container one-person-verion'>
            <div className='frame-content'>
                <div className='each-frame-title one-person-title-color'>{name === '' ? 
                  <>{language === 'english' ? "Who pay for it?" : "邊條友俾？"}</> : <>{name}</>}
                </div>
                <input type='text' onChange={frameName} placeholder={language === 'english' ? "Name" : "咩名"} className='input-field' name='name' autoComplete="off"/>
                <div className='noNeedtoPay-one-person-mode'>{language === 'english' ? "What you've eaten?" : "你食咗咩？"}</div>
                <input type='text' onChange={handleInputChange} value={inputValue} placeholder= {language === 'english' ? "Enter each food price amount" : "輸入野食價錢"} className='input-field' name="price" autoComplete="off"/>
                  
                <div className='noNeedtoPay-one-person-mode'>{language === 'english' ? "Anything you don't need to pay?" : "有冇D咩你唔洗俾？"}</div>
                
                <NotNeedToPay totalPerson={arrayLength}
                              noNeedToPay={noNeedToPay}
                              language={language}/>
                
                <div className="total-amount-bg"> 
                    <div className='total-amount'>
                      {/* Maybe apply the name at the beginning? */}
                      {name === '' ? <>{language === 'english' ? 'You ':'你'}</>:<>{name} </>}  
                      {language === 'english' ? "should pay:" : "要俾"} ${isNaN(getTotalPrice3digits()) ? '0.000' : getTotalPrice3digits()}
                    </div>
                </div>

            </div>
          </div>
      </div>
    )
  }

export default EachFrame