import {useCallback, useContext, useMemo, useState} from "react";
import {CurrencyContext} from "../App";
import {createCalculateSum} from "../features/currencies";

export function Converter() {
    const {cc, currenciesRates} = useContext(CurrencyContext);
    const [sellOrBuy, setSellOrBuy] = useState('rateSell');
    const [sum1, setSum1] = useState(0);
    const [sum2, setSum2] = useState(0);
    const [currencyCode1, setCurrencyCode1] = useState(cc.code('UAH').number);
    const [currencyCode2, setCurrencyCode2] = useState(cc.code('USD').number);

    const currenciesList = useMemo(() => {
        return [{
            name: 'UAH',
            code: cc.code('UAH').number
        }, ...currenciesRates.filter(c => c.currencyCodeB === 980).map(rate => ({
            name: cc.number(rate.currencyCodeA)?.code,
            code: rate.currencyCodeA
        }))].filter(c => c.name);
    }, [currenciesRates]);

    const calculateSum = useCallback((sum1, currencyCode1, currencyCode2, sellOrBuy) => createCalculateSum(currenciesRates)(sum1, currencyCode1, currencyCode2, sellOrBuy), [currenciesRates])

    return (
        <main className='flex justify-center'>
            <div className='flex flex-col gap-5 border border-lightblue-600 w-fit rounded-xl p-5'>
                <div className='flex gap-3'>
                    <label htmlFor="rateSell">Sell{'  '}
                        <input id='rateSell' type="radio" name="sellOrBuy" value="rateSell"
                               onChange={() => {
                                   setSellOrBuy("rateSell");
                                   setSum2(calculateSum(sum1, currencyCode1, currencyCode2, "rateSell"));
                               }}
                               checked={sellOrBuy === "rateSell"}/>
                    </label>
                    <label htmlFor="rateBuy">Buy{'  '}
                        <input id='rateBuy' type="radio" name="sellOrBuy" value="rateBuy"
                               onChange={() => {
                                   setSellOrBuy("rateBuy");
                                   setSum2(calculateSum(sum1, currencyCode1, currencyCode2, "rateBuy"));
                               }}
                               checked={sellOrBuy === "rateBuy"}
                        />
                    </label>
                </div>
                <div>
                    <input type="number" value={sum1} onChange={(e) => {
                        setSum1(+e.target.value)
                        setSum2(calculateSum(+e.target.value, currencyCode1, currencyCode2, sellOrBuy));
                    }}
                    />
                    <select value={currencyCode1} onChange={(e) => {
                        setCurrencyCode1(e.target.value);
                        setSum2(calculateSum(sum1, e.target.value, currencyCode2, sellOrBuy));
                    }}>
                        {currenciesList.map(c => <option key={c.code} value={c.code}>{c.name}</option>)}
                    </select>
                </div>
                <div>
                    <input type="number" value={sum2} onChange={(e) => {
                        setSum2(+e.target.value);
                        setSum1(calculateSum(+e.target.value, currencyCode2, currencyCode1, sellOrBuy));
                    }}/>
                    <select value={currencyCode2} onChange={(e) => {
                        setCurrencyCode2(e.target.value);
                        setSum1(calculateSum(sum2, e.target.value, currencyCode1, sellOrBuy));
                    }}>
                        {currenciesList.map(c => <option key={c.code} value={c.code}>{c.name}</option>)}
                    </select>
                </div>
            </div>
        </main>
    );
}
