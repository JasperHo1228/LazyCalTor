import React, { useState,useEffect } from 'react';
import '../../../style/PaidByMutiplePeople/AssholeFrdInfo.css'
function AssholeFrdInfo( {totalPerson, handleUpdateNotShare, notShareFoodSum}) {

  const [inputGroups, setInputGroups] = useState([
    {
      name: '',
      payment: '',
      numberOfFriends: '',
      totalAmount: 0.0000,
    },
  ]);

  const [isNumberPeople, setNumberPeople] = useState(totalPerson);

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const isDesktop = screenWidth > 570;

   //add up all the not sharing food price
   const getNotShareTotal = (updatedInputGroups) => {
      const totalPayment = updatedInputGroups.reduce((acc, inputGroup) => {
            let currentPrice = parseFloat(inputGroup.payment);
            if(isNaN(currentPrice)){
              currentPrice = 0
            }
            return acc + currentPrice;
          }, 0);
          handleUpdateNotShare(totalPayment);
    }
    
    //sum up the each price (per person) for not share food
    const calculateNotShareFoodSum = (currentPrice)=>{
      let price = currentPrice.reduce((total,current)=>{
         return total + parseFloat(current.totalAmount)
      },0)
      notShareFoodSum(price)
    }
  
  //(BUG) when I delete all the number in this field it still will affect the total amount
  const notShareFoodInputChange = (event, index, field) => {
    const { value } = event.target;
    const numericValue = value.replace(/[^0-9.]/g, '');
    const updatedInputGroups = [...inputGroups];
    let inputValue = value.trim() === '' ? '' : numericValue;
    updatedInputGroups[index][field] = inputValue
    setInputGroups(updatedInputGroups);
    getNotShareTotal(updatedInputGroups);
    // Ensure that both payment and numberOfFriends are numeric values
    const payment = parseFloat(updatedInputGroups[index].payment);
    const numberOfFriends =  totalPerson - parseFloat(updatedInputGroups[index].numberOfFriends);
   
    // Check if both values are numbers before performing the division
    if ((!isNaN(payment) && !isNaN(numberOfFriends)) && 
         updatedInputGroups[index].numberOfFriends >= 1) {
        const eachShouldPay = payment/numberOfFriends
        updatedInputGroups[index].totalAmount = eachShouldPay.toFixed(4)
    }
    else {
      updatedInputGroups[index].totalAmount = 0
    }
       calculateNotShareFoodSum(updatedInputGroups)
 
  };


  const nameFrame = (event, index) => {
    let { value } = event.target;
  
    // Limit the input to 18 characters (words)
    if (value.length > 18) {
      value = value.slice(0, 18);
    }
  
    const updatedInputGroups = [...inputGroups];
    updatedInputGroups[index].name = value;
    setInputGroups(updatedInputGroups);
  };
  
  
  const checkNumber = (total,numberOfFriends) => {
    const totalAssholeFrd = totalPerson - numberOfFriends;
    //isFinite(Infinity)should return false because Infinity is not finite.
    if (totalAssholeFrd === 0) {
      return <>Are you sure everyone, including yourself, is an Asshole?</>;
    } 
    else if(totalAssholeFrd <= 0){
      return <>You are an Asshole! How many frd you've got?</>;
    }
    else {
      return `each should pay: ${total}`;
    }
  };
  
  const addInputGroup = () => {
    setInputGroups([
      ...inputGroups,
      {
        name: '',
        payment: '',
        numberOfFriends: '',
        totalAmount: 0.0000
      },
    ]);
  };

  const deleteInputGroup = (index) => {
    const updatedInputGroups = [...inputGroups];
    updatedInputGroups.splice(index, 1);
    setInputGroups(updatedInputGroups);
    getNotShareTotal(updatedInputGroups);
    calculateNotShareFoodSum(updatedInputGroups);
  };

   useEffect(() => {
    if(isNumberPeople !== totalPerson || isNumberPeople > totalPerson){
      setInputGroups([{
        name: '',
        payment: '',
        numberOfFriends: '',
        totalAmount: 0.0000
      }])
        setNumberPeople(totalPerson)
    }


    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isNumberPeople,totalPerson]);


  return (
    <div className='flexColCenter'>
      {inputGroups.map((inputGroup, index) => (
        <div className='flexColCenter padding-bottom' key={index}>
          <div className={`${isDesktop ? 'flexCenter' : 'flexColCenter'}  messy-mode-notShare-Input`}>
            <input
              type='text'
              name='name'
              value={inputGroup.name}
              onChange={(event) => nameFrame(event, index)}
              className='input-field'
              placeholder='Name of the Food'
            />
            <input
              type='text'
              name='payment'
              className='input-field'
              value={inputGroup.payment}
              onChange={(event) => notShareFoodInputChange(event, index, 'payment')}
              placeholder='Enter your payment'
            />
            <input
              type='text'
              name='numberOfFriends'
              className='input-field'
              value={inputGroup.numberOfFriends}
              onChange={(event) => notShareFoodInputChange(event, index, 'numberOfFriends')}
              placeholder='Number of Asshole FRD'
            />
            <button className='asshole-frd-btn' onClick={() => deleteInputGroup(index)}>Delete</button>
          </div>
          <div className='messy-total-amount padding-top'>
             {checkNumber(inputGroup.totalAmount,inputGroup.numberOfFriends)}
          </div>
        </div>
      ))}
      <button className='asshole-frd-btn' onClick={addInputGroup}>Add more row</button>
    </div>
  );
}

export default AssholeFrdInfo;
