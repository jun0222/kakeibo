// https://reffect.co.jp/react/react-usecontext-understanding
// useContext利用でdemoモードを実装する
import { createContext, useState, useContext } from 'react';

const CountContext = createContext();

export function useCountContext(): {count: number, setCount: number} {
    return useContext(CountContext);
}

export function CountProvider({ children }) {
    const [count, setCount] = useState(100);

    const value = {
        count,
        setCount,
    };

    return (
        <CountContext.Provider value={value}>{children}</CountContext.Provider>
    );
}