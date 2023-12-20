const CalculatorPartyMode = ({totalAmount,shareFood,notAllShare, servicePercent}) => {
       const result = (parseFloat(totalAmount) + parseFloat(shareFood) + parseFloat(notAllShare)) *
       (1 + parseFloat(servicePercent));
       return result 
       
    }
    export default CalculatorPartyMode