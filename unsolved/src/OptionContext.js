import { createContext, useContext, useEffect, useState } from "react";

const OptionContext = createContext();

/**
 * 티어 정보를 보여줄지 여부를 설정하는 옵션
 */
export function OptionProvider({ children }) {
    const [showProblemTier, setShowProblemTier] = useState(true);
    const [showUserTier, setShowUserTier] = useState(true);

    useEffect(() => {
        // 기본값 설정
        if (localStorage.getItem('showProblemTier') === null) {
            localStorage.setItem('showProblemTier', true);
        }
        if (localStorage.getItem('showUserTier') === null) {
            localStorage.setItem('showUserTier', true);
        }

        // 로컬 스토리지에서 가져오기
        setShowProblemTier(localStorage.getItem('showProblemTier') === 'true');
        setShowUserTier(localStorage.getItem('showUserTier') === 'true');
    }, []);

    useEffect(() => { // 값이 변경될 때마다 로컬 스토리지에도 저장
        localStorage.setItem('showProblemTier', showProblemTier);
        localStorage.setItem('showUserTier', showUserTier);
    }, [showProblemTier, showUserTier]);

    return (
        <OptionContext.Provider value={{ showProblemTier, setShowProblemTier, showUserTier, setShowUserTier }}>
            {children}
        </OptionContext.Provider>
    );
}

export function useOption() {
    return useContext(OptionContext);
}