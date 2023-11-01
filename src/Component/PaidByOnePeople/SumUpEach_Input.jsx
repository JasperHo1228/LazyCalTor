const SumUpEach_Input =  (inputValue) => {
    // Split the input by spaces and commas, and filter out any empty strings
    const values = inputValue.split(/[\s,，]+/).filter((value) => value !== "");
    // Calculate the sum of the values
    const sum = values.reduce((total, currValue) => {
      // Parse each value as a float, or 0 if it's not a valid number
      const floatValue = parseFloat(currValue) || 0;
      return total + floatValue;
    }, 0);
    return sum.toFixed(3)
}

export default SumUpEach_Input;