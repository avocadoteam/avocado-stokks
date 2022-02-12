import { useState } from "react"

export const useDoubleClick = (callback: () => void) => {
    const [clickCount, setClickCount] = useState(0)
    let timer:number;

    return () => {
        setClickCount(prev => (prev + 1))
        if (clickCount === 2) {
            setClickCount(0)
            clearTimeout(timer)
            callback()
        } else {
            timer = setTimeout(() => {
                setClickCount(0)
            }, 3000)
        }
    }
}
