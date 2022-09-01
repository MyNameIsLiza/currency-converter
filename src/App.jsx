import {Header} from "./components/Header";
import {createContext, useEffect, useState} from "react";
import ReactLoading from 'react-loading';
import axios from "axios";
import cc from 'currency-codes';
import {Converter} from "./components/Converter";
export const CurrencyContext = createContext(null);

function App() {

    const [currenciesRates, setCurrenciesRates] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('https://api.monobank.ua/bank/currency').then(({data}) => {
            setCurrenciesRates(data);
            setError(null);
        }).catch(e=>setError(e))
    }, []);

    if(!currenciesRates&& error){
        return <div>{error.message}. Try again later</div>
    }

    if (!currenciesRates || !cc) {
        console.info('LOADING...')
        return <div className='flex justify-center items-center h-[100vh] w-[100vw]'>
            <ReactLoading color='lightblue'
                          type='spin'
                          height='20%'
                          width='20%'/>
        </div>
    }


    return (
        <div className='py-5 px-10 flex gap-5 flex-col'>
        <CurrencyContext.Provider value={{cc, currenciesRates}}>
            <Header/>
            <Converter/>
        </CurrencyContext.Provider>
        </div>
    );
}

export default App;
