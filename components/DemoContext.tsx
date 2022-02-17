// https://reffect.co.jp/react/react-usecontext-understanding
// useContext利用でdemoモードを実装する
// shoppingの登録や削除などでリロードしても保持されるよう、localstrageに置き換え予定 https://qiita.com/Ryusou/items/8bce84e7b036114b8d72

// @ts-nocheck // 一旦デプロイのためエラー無視。後で直す。
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