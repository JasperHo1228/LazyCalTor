import React, { useState, useCallback,useMemo,useEffect} from 'react';
import SumUpEach_Input from '../PaidByOnePeople/SumUpEach_Input';
import AssholeFrdInfo from './ComponentMessyFrame/AssholeFrdInfo';
import '../../style/PaidByMutiplePeople/EachMessyFrame.css';

function EachMessyFrame({
  totalPerson,
  onUpdateTotalAmount,
  onUpdateNotShareFood,
  onUpdateShowMoney,
  frameId,
  shareFoodTotalAmount,
  noShareFoodTotalAmount,
  showOwnMoney
}) {
  const [name, setName] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);
  const [noNeedPay, setNoNeedPay] = useState(0);
  const [totalNotSharePayment, setTotalNotSharePayment] = useState(0);

  const nameFrame = (event) => {
    setName(event.target.value);
  };

  const handleUpdateNotShare = (notShareFood) => {
    const updatedNotShareTotals = notShareFood;
    setTotalNotSharePayment(updatedNotShareTotals);
  };

  const notShareFoodSum = (eachNotShareFood) => {
    const updateEachNonShareFood = eachNotShareFood;
    onUpdateNotShareFood(frameId, updateEachNonShareFood);
  };

  const shareFoodInputChange = (event) => {
    let value = event.target.value;
    value = value.replace(/[^0-9,-.，| ]/g, '');
    setInputValue(value);
    const sum = SumUpEach_Input(value);
    setTotalAmount(sum);
    onUpdateTotalAmount(frameId, sum);
    onUpdateShowMoney(frameId,moneyShould)
  };

  const totalPaid = useCallback(
    (totalNotSharePayment) => {
      return (parseFloat(totalAmount) + parseFloat(totalNotSharePayment)).toFixed(4);
    },
    [totalAmount]
  );

  const noNeedPaySum = (event) => {
    let value = event.target.value;
    value = value.replace(/[^0-9,. ]/g, '');
    const sum = SumUpEach_Input(value);
    setNoNeedPay(sum);
  };

  const moneyShould = useMemo(() => {
    return parseFloat(totalAmount) + parseFloat(totalNotSharePayment) - (parseFloat(shareFoodTotalAmount) / parseFloat(totalPerson)) - parseFloat(noShareFoodTotalAmount) + parseFloat(noNeedPay);
  }, [totalAmount, totalNotSharePayment, shareFoodTotalAmount,totalPerson, noShareFoodTotalAmount, noNeedPay]);


 useEffect(() => {
    onUpdateShowMoney(frameId, moneyShould,name);
  }, [moneyShould, onUpdateShowMoney, frameId,name]);


  const calculatePayValue = useCallback(() => {
    if (moneyShould === 0) {
      return <>{name} don't have to pay</>;
    } else if (moneyShould > 0) {
      return <>{name} should receive ${moneyShould.toFixed(4)}</>;
    } else {
      return <>{name} should pay ${Math.abs(moneyShould.toFixed(4))}</>;
    }
  },[moneyShould,name])

  //start calculating
  const positivePayments = showOwnMoney.filter((person) => person.moneyShould > 0);
  const sumOfPositivePayments = positivePayments.reduce(
    (sum, person) => sum + person.moneyShould,
    0
  );
  
  const calculateFinalResult = () => {
    if (moneyShould < 0) {
      return (
        <div className='result-container'>
          <h2 className='result-title'>Who you should pay to?</h2>
          {positivePayments.map((person, index) => (
            <div key={index} className='should-pay-to-text-style'>
              {`You have owned ${person.name}: $${((person.moneyShould / sumOfPositivePayments) * Math.abs(moneyShould)).toFixed(4)}`}
              <br />
            </div>
          ))}
        </div>
      );
    } else {
      return null;
    }
  };
  
  return (
    <div className="frame-wrapper">
      <div className="flexColCenter frame-container messy-version">
        <div className="frame-content">
          <div className="each-frame-title messy-title-color">{name}</div>
          <input type="text" className="input-field" onChange={nameFrame} placeholder="Name" />
          <div className="messy-mode-share-food">Share Food</div>
          <input type="text" className="input-field" onChange={shareFoodInputChange} value={inputValue} placeholder="Enter your payment" />
          <div className="messy-mode-share-food">Not share Food</div>
          <AssholeFrdInfo
            totalPerson={totalPerson}
            handleUpdateNotShare={handleUpdateNotShare}
            notShareFoodSum={notShareFoodSum}
          />
          <div className="final-total">
            You total have paid: ${totalPaid(totalNotSharePayment)}
          </div>
          <div className="not-need-to-pay-title">Any thing you don't have to pay?</div>
          <input type="text" className="input-field" onChange={noNeedPaySum} placeholder="Enter the price" />
          <div className='total-you-should-pay'> {calculatePayValue()}</div>
            <div className='result-wrapper'>{calculateFinalResult()}</div>
        </div>
      </div>
    </div>
  );
}

export default EachMessyFrame;
