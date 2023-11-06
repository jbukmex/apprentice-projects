function romanTranslate(arabic) {
    const romanNumerals = [
        { numeral: "M", value: 1000 },
        { numeral: "CM", value: 900 },
        { numeral: "D", value: 500 },
        { numeral: "CD", value: 400 },
        { numeral: "C", value: 100 },
        { numeral: "XC", value: 90 },
        { numeral: "L", value: 50 },
        { numeral: "XL", value: 40 },
        { numeral: "X", value: 10 },
        { numeral: "IX", value: 9 },
        { numeral: "V", value: 5 },
        { numeral: "IV", value: 4 },
        { numeral: "I", value: 1 }
    ]

    if (arabic < 1) {
        return "Value too low, please increase to properly translate.";
    }

    let translation = "";

    for (const numeralData of romanNumerals) {
    while (arabic >= numeralData.value) {
      translation += numeralData.numeral;
      arabic -= numeralData.value;
    }
  }

    return translation;
}

console.log(romanTranslate(13));