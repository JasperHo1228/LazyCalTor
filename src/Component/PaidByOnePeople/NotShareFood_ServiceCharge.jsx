import React,{useReducer,useEffect} from "react"
import AssholeFrdInfo from "../PaidByMultiplePeople/ComponentMessyFrame/AssholeFrdInfo";
const NotShareFood_ServiceCharge = ({ShareFoodCalculate, 
                                     shareFoodInputValue, 
                                     toggled,
                                     shareFood, 
                                     totalPerson,
                                     NotAllShareFoodOnePerson,
                                     percentage_service,
                                     getNotShareAmount,
                                     serviceChargeInput}) => {
    
    const initialState ={                               
          totalNotSharePayment:0,
          isSameNumberPeople:totalPerson
        }
                                    
    const reducer = (state, action) => {
          switch (action.type) {
          case 'TOTAL_NOT_SHARE_PAYMENT':
          return{...state, totalNotSharePayment:action.value}
          case 'IS_SAME_NUMBER_PEOPLE':
          return {...state, isSameNumberPeople:action.value}
          default:
            return state;
          }
        }

    const [state,dispatch] = useReducer(reducer,initialState)  
                                          
    const notShareFoodSum = (eachNotShareFood) => {
      dispatch({type:'TOTAL_NOT_SHARE_PAYMENT',value: eachNotShareFood})
    };
    
    useEffect(() => {
      NotAllShareFoodOnePerson(state.totalNotSharePayment);
    }, [state.totalNotSharePayment, getNotShareAmount, NotAllShareFoodOnePerson]);

    return(
        <div className="share-frame-wrapper">
        <div className="share-frame-container">
        <h1>Any Shared Food?</h1>
            <div className="share-info">
            <input onChange = {ShareFoodCalculate} 
                   value={shareFoodInputValue}
                   placeholder="Enter the price" 
                   className='input-field-share'  
                   name="shareFood" 
                   type='text'
                   autoComplete="off"/>
            <div className='per-person'>Each Person: ${shareFood}</div>
        </div>

        {/* for some people who didn't eat the food  */}
        <div className="share-info">
          {/* show the example how to use it */}
          <h1 className="padding-bottom one-person-mode-not-share-food-text">
               Any Food Not Shared among All?
          </h1>

          <AssholeFrdInfo
            totalPerson={totalPerson}
            toggled={toggled}
            notShareFoodSum={notShareFoodSum}
          />
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