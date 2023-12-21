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
                                     serviceChargeInput,
                                     language}) => {
    
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
        <h1>{language === 'english' ? 'Any Shared Food?':'有冇開心Share餸?'}</h1>
            <div className="share-info">
            <input onChange = {ShareFoodCalculate} 
                   value={shareFoodInputValue}
                   placeholder={language === 'english' ? 'Enter the food price' : '輸入野食價錢'}
                   className='input-field-share'  
                   name="shareFood" 
                   type='text'
                   autoComplete="off"/>
            <div className='per-person'>{language === 'english' ? 'Each Person should pay':'每人要俾'}: ${shareFood}</div>
        </div>

        {/* for some people who didn't eat the food  */}
        <div className="share-info">
          {/* show the example how to use it */}
          <h1 className="padding-bottom one-person-mode-not-share-food-text">
               {language === 'english' ? 'Any food not shared among all?' : '邊個仆街冇食到唔想俾?'}
          </h1>

          <AssholeFrdInfo
            totalPerson={totalPerson}
            language={language}
            toggled={toggled}
            notShareFoodSum={notShareFoodSum}
          />
        </div>

        {/* service charge */}
        <div className="share-info">
          <h1>{language === 'english' ? 'Enter Service Charge here below!!':'輸入服務費'}</h1>
            <input onChange = {percentage_service} 
                    name="serviceCharge"
                    type='text'
                    value = {serviceChargeInput} 
                    placeholder= {language === 'english' ? "Service Charge %" : "服務費%"}
                    className='input-field-share' 
                    autoComplete="off"/>
        </div>
      </div>
 </div> 
    );
}

export default NotShareFood_ServiceCharge;