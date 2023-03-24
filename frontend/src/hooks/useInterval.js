// polling 

import React, {useEffect, useRef} from "react";

export const useInterval = (callback, delay) => { // Поллинг

    const saveCallback = useRef(); 

    useEffect(() => {
        saveCallback.current = callback
    }, [callback])

    useEffect(() => {

        if (callback && delay) {
            const update = setInterval(saveCallback.current, delay)
            return () => clearInterval(update)
        }
    }, [delay])

}