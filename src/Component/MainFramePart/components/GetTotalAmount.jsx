import Calculator_DineOutMode  from '../../PaidByOnePeople/Calculator_DineOutMode ';
import CalculatorMessyMode from '../../PaidByMultiplePeople/ComponentMessyFrame/CalculatorMessyMode';
export function getTotalAmount_DineOutMode(state) {
  return state.frameTotals.reduce((total, frameTotal, index) => {
    const currentTotal = Calculator_DineOutMode ({
      totalAmount: frameTotal,
      shareFood: state.shareFood,
      notAllShare: state.notAllShare,
      servicePercent: state.servicePercent,
      noNeedPay: state.frameNoNeedToPay[index]  // this is an array !!!! So you cannot directly to add it up by each value
    });
    return total + currentTotal;
  }, 0);
}

export function getTotalAmount_PartyMode(state){
  return state.frameTotals.reduce((total, frameTotal) => {
    const currentTotal = CalculatorMessyMode({
      totalAmount: frameTotal,
      shareFood: state.shareFood,
      notAllShare: state.notAllShare,
      servicePercent: state.servicePercent,
    });
    return total + currentTotal;
  }, 0);
}
