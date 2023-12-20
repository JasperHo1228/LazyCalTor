const Calculator_DineOutMode = ({totalAmount,shareFood,notAllShare, noNeedPay, servicePercent}) => {
      const result = (parseFloat(totalAmount) + parseFloat(shareFood) + parseFloat(notAllShare) - parseFloat(noNeedPay)) *
      (1 + parseFloat(servicePercent));
      return result 
}
export default Calculator_DineOutMode


