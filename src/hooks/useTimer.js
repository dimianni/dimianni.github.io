import { useState, useEffect } from "react";



export default function useTimer(maxIndex){

    let timer;
    const [picIndex, setPicIndex] = useState(1)


    const updateCount = () => {
        timer = !timer && setInterval(() => {
            setPicIndex(prevIndex => prevIndex + 1)
        }, 1000)

        if (picIndex === maxIndex) setPicIndex(1)
    }

    useEffect(() => {
        updateCount()
        return () => {
            clearInterval(timer)
            timer = null;
        }
    }, [picIndex])

    return picIndex;
}