import { useMutation } from "@tanstack/react-query"
import { useEffect, useState } from "react"

// Tác dụng của cái này là để delay thời gian
export const useDebounce = (value, delay) => {
    const [valueDebounce, setValueDebounce] = useState('')
    useEffect(() =>{
        const handle = setTimeout(()=>{
            setValueDebounce(value)
        },[delay])
        return () =>{
            clearTimeout(handle)
        }
    }, [value])
    return valueDebounce

}