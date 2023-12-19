const Calculator = ({totalAmount,shareFood,notAllShare, noNeedPay, servicePercent}) => {
   const result = (parseFloat(totalAmount) + parseFloat(shareFood) + parseFloat(notAllShare)) *
   (1 + parseFloat(servicePercent)) - parseFloat(noNeedPay);
   return result
}
export default Calculator
