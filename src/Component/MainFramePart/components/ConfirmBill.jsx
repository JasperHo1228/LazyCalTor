const ConfirmBill = ({totalAmount,toggled})=>{
    return(
            <div className='TotalBill-checking-wrapper'>
                 <div className='TotalBill-checking-container'>
                     {toggled? <h3> 
                       Please confirm if the numbers below match your bill.
                       <br/>
                       睇吓個數係咪同你張單一樣！
                     </h3>:
                     <h3>Check Your total Share Food</h3>
                     }
                     <div className='TotalBill-info'>
                       {toggled ?
                       <>Your Bill: $</>:<>Share Food Total: $</>}
                         {
                          totalAmount.toFixed(3)
                         }
                     </div>
                   </div>
                 </div>  
    )
}
export default ConfirmBill

