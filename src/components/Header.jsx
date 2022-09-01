import {useCallback, useContext} from "react";
import {CurrencyContext} from "../App";
import {createGetCurrencyRate} from "../features/currencies";

export function Header() {
    const {cc, currenciesRates} = useContext(CurrencyContext);
    const getCurrencyRate = useCallback((currencyCode)=>createGetCurrencyRate(currenciesRates)(currencyCode),[currenciesRates])

    return (
        <header className='flex justify-evenly'>
            <h1 className='text-[30px]'>Currency converter</h1>
            <div>
                <div>Currency Sell Buy</div>
                <div>USD: {getCurrencyRate(cc.code('USD').number).rateSell} {getCurrencyRate(cc.code('USD').number).rateBuy}</div>
                <div>EUR: {getCurrencyRate(cc.code('EUR').number).rateSell} {getCurrencyRate(cc.code('EUR').number).rateBuy}</div>
            </div>
        </header>
    );
}
