import React, { useState } from 'react';

function AssholeFrdInfo( {totalPerson} ) {
  const [inputGroups, setInputGroups] = useState([
    {
      name: '',
      payment: '',
      numberOfFriends: '',
      totalAmount: 0.0000,
    },
  ]);

  const notShareFoodInputChange = (event, index, field) => {
    const { value } = event.target;
    const numericValue = value.replace(/[^0-9]/g, '');
    const updatedInputGroups = [...inputGroups];
    updatedInputGroups[index][field] = numericValue;
    setInputGroups(updatedInputGroups);
    // Ensure that both payment and numberOfFriends are numeric values
    const payment = parseFloat(updatedInputGroups[index].payment);
    const numberOfFriends =  totalPerson - parseFloat(updatedInputGroups[index].numberOfFriends);
   
    // Check if both values are numbers before performing the division
    if (!isNaN(payment) && !isNaN(numberOfFriends)) {
        const eachShouldPay = payment/numberOfFriends
        updatedInputGroups[index].totalAmount = eachShouldPay.toFixed(4)
    }
    else if(!isNaN(payment) && isNaN(numberOfFriends)){
        updatedInputGroups[index].totalAmount = payment
    } 
    else {
        updatedInputGroups[index].totalAmount = 0
    }
  };

  const checkNumber = (total) => {
    if (total === 0) {
        return `each should pay: ${total}`;
    } 
    //isFinite(Infinity)should return false because Infinity is not finite.
    else if (!isFinite(total)) {
      return "Are you sure everyone, including yourself, is an Asshole?";
    } 
    else if(total <= 0){
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
  };

  return (
    <div>
      {inputGroups.map((inputGroup, index) => (
        <div className='flexColCenter padding-bottom' key={index}>
          <div className='flexCenter messy-mode-notShare-Input'>
            <input
              type='text'
              name='name'
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
            <button onClick={() => deleteInputGroup(index)}>Delete</button>
          </div>
          <div className='messy-total-amount padding-top'>
             {checkNumber(inputGroup.totalAmount)}
          </div>
        </div>
      ))}
      <button onClick={addInputGroup}>add not share food</button>
    </div>
  );
}

export default AssholeFrdInfo;
