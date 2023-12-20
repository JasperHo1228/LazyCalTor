const ConfirmBill = ({totalAmount_DineOutMode, totalAmount_PartyMode ,toggled,language})=>{
    return(
            <div className='TotalBill-checking-wrapper'>
                 <div className='TotalBill-checking-container'>
                     {toggled? <h3> 
                       {language === 'english' ? 
                        <>Please confirm if the numbers below match your bill.</>:
                        <> 睇吓個數係咪同你張單一樣！</>
                      }
                     </h3>:
                     <h3>{language === 'english' ? <>Check Your total Share Food</> : <>Check下Share野食既部分</>}</h3>
                     }
                     <div className='TotalBill-info'>
                       {toggled ?
                       <>{language === 'english' ? <>Your Bill:</> : <>張單總數:</>} $ {totalAmount_DineOutMode.toFixed(3)}</>
                       :
                       <>{language === 'english' ? 'Share Food Total: ' : 'Share野食既總數:'}$ {totalAmount_PartyMode.toFixed(3)}</>}
                     </div>
                   </div>
                 </div>  
    )
}
export default ConfirmBill

