// calculationUtils.js
import Calculator from '../../PaidByOnePeople/Calculator';

export function getTotalAmount(state) {
  return state.frameTotals.slice(0).reduce((total, frameTotal) => {
    const currentTotal = Calculator({
      totalAmount: frameTotal,
      shareFood: state.shareFood,
      notAllShare: state.notAllShare,
      servicePercent: state.servicePercent,
    });
    return total + currentTotal;
  }, 0);
}
