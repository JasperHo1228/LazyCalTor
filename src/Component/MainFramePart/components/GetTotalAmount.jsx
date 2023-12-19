import Calculator from '../../PaidByOnePeople/Calculator';

export function getTotalAmount(state) {
  return state.frameTotals.reduce((total, frameTotal, index) => {
    const currentTotal = Calculator({
      totalAmount: frameTotal,
      shareFood: state.shareFood,
      notAllShare: state.notAllShare,
      servicePercent: state.servicePercent,
      noNeedPay: state.frameNoNeedToPay[index]  // this is an array !!!! So you cannot directly to add it up by each value
    });
    return total + currentTotal;
  }, 0);
}
