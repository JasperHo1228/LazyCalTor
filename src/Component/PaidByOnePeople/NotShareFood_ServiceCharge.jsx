import React from "react"
const NotShareFood_ServiceCharge = ({ShareFoodCalculate, 
                                     shareFoodInputValue, 
                                     shareFood, 
                                     assholeFrdInputValue,
                                     assholeFrdInputOnChange, 
                                     result, 
                                     percentage_service,
                                     serviceChargeInput}) => {
    return(
        <div className="share-frame-wrapper">
        <div className="share-frame-container">
        <h1>Enter the price of Share Food here below</h1>
            <div className="share-info">
            <input onChange = {ShareFoodCalculate} 
                   value={shareFoodInputValue}
                   placeholder="Share Food" 
                   className='input-field-share'  
                   name="shareFood" 
                   type='text'
                   autoComplete="off"/>
            <div className='per-person'>Per Person: ${shareFood}</div>
        </div>

      {/* for some people who didn't eat the food  */}
        <div className="share-info">
          {/* show the example how to use it */}
          <div className='example2-assholefrd-wrapper'>
            <div className='example2-assholefrd-container'>
            <h1>Enter the price who don't want to pay Share Food</h1>  
            <h2>Notice!!</h2>
            <h3>Split the bill who didn't have the food</h3>
            <h4>Input example: (3+3)/2 | 3*7 <br/>
                | means split two equations    
                <p>Output:</p>            
                Food 1: $ 3,
                Food 2: $ 21
              <p className='waring-text-assholefrd'>Be Careful if Food: $0 is appeared. All <br/>
                 the money in this part won't be added 
              </p>
              </h4>
          </div>
          </div>
          
          {/* start to input the price  */}
          <input type='text' placeholder = "Fucking Asshole Frd" 
                 className='input-field-share' value={assholeFrdInputValue}  onChange={assholeFrdInputOnChange}/>
          <div className='assholeFrd-container'>
            <div className='assholeFrd-info'>
                  {result}
            </div>
          </div>
        </div>

        {/* service charge */}
        <div className="share-info">
          <h1>Enter Service Charge here below!!</h1>
            <input onChange = {percentage_service} 
                    name="serviceCharge"
                    type='text'
                    value = {serviceChargeInput} 
                    placeholder="Service Charge %" 
                    className='input-field-share' 
                    autoComplete="off"/>
        </div>
      </div>
 </div> 
    );
}

export default NotShareFood_ServiceCharge;