// https://reffect.co.jp/react/react-usecontext-understanding
// useContext利用でdemoモードを実装する
import { createContext, useState, useContext } from 'react';

const CountContext = createContext();

export function useCountContext(): {demoMode: boolean, setDemoMode: boolean} {
    return useContext(CountContext);
}

export function CountProvider({ children }) {
    const [demoMode, setDemoMode] = useState(false);

    const value = {
        demoMode,
        setDemoMode,
    };

    return (
        <CountContext.Provider value={value}>{children}</CountContext.Provider>
    );
}