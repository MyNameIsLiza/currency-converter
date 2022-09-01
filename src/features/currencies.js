export const createGetCurrencyRate = (currenciesRates) => (currencyCode) => {
    return currenciesRates.find((el) => el.currencyCodeA === +currencyCode)
};

export const createCalculateSum = (currenciesRates) => (sum1, currencyCode1, currencyCode2, sellOrBuy) => {
    const getCurrencyRate = createGetCurrencyRate(currenciesRates);
    return (sum1 * (getCurrencyRate(currencyCode1)?.[sellOrBuy] ?? getCurrencyRate(currencyCode1)?.['rateCross'] ?? 1) /
        (getCurrencyRate(currencyCode2)?.[sellOrBuy] ?? getCurrencyRate(currencyCode2)?.['rateCross'] ?? 1)).toFixed(2) || 0;
}
