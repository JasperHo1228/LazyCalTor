import React, { useState,useEffect } from 'react';
const NotNeedToPay = ({totalPerson,noNeedToPay}) => {
    const [inputGroups, setInputGroups] = useState([
        {
          name: '',
          payment: '',
          totalAmount: 0
        },
      ]);
      
      const [isNumberPeople, setNumberPeople] = useState(totalPerson);
      const [screenWidth, setScreenWidth] = useState(window.innerWidth);
      const isDesktop = screenWidth > 570;

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

    //sum up the each price (per person) for not share food
    const calculateNoNeedPay = (currentPrice)=>{
        let price = currentPrice.reduce((total,current)=>{
           return total + parseFloat(current.totalAmount)
        },0)
        noNeedToPay(price)
      
      }

      const noNeedtoPayInputChange = (event, index, field) => {
        const { value } = event.target;
        const numericValue = value.replace(/[^0-9.]/g, '');
        const updatedInputGroups = [...inputGroups];
        let inputValue = value.trim() === '' ? '' : numericValue;
        updatedInputGroups[index][field] = inputValue
        setInputGroups(updatedInputGroups);
        // Ensure that both payment and numberOfFriends are numeric values
        const payment = parseFloat(updatedInputGroups[index].payment);
       
        // Check if both values are numbers before performing the division
        if ((!isNaN(payment))) {
            updatedInputGroups[index].totalAmount = payment.toFixed(4)
        }
        else {
          updatedInputGroups[index].totalAmount = 0
        }
          calculateNoNeedPay(updatedInputGroups)
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

      const addInputGroup = () => {
        setInputGroups([
          ...inputGroups,
          {
            name: '',
            payment: ''
          },
        ]);
      };

      const deleteInputGroup = (index) => {
        const updatedInputGroups = [...inputGroups];
        updatedInputGroups.splice(index, 1);
        setInputGroups(updatedInputGroups);
        calculateNoNeedPay(updatedInputGroups);
      };
      
      return(
        <div className='flexColCenter'>
        {
        inputGroups.map((inputGroup, index) => (
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
              onChange={(event) => noNeedtoPayInputChange(event, index, 'payment')}
              placeholder='Enter the price'
            />
            <button className='asshole-frd-btn' onClick={() => deleteInputGroup(index)}>Delete</button>
            </div>
            </div>
        ))}
            <button className='asshole-frd-btn' onClick={addInputGroup}>Add more row</button>
        </div>
      )

}

export default NotNeedToPay