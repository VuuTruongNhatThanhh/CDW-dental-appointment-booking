import React, {useState} from 'react'
import { Input } from 'antd'
import { WrapperInputStyle } from './style'

const InputForm = (props) => {
    const {placeholder = 'Nhập text', ...rests} = props
    const handleOnChangeInput = (e)=>{
        // lấy từng kí tự của bàn phím nhập vào
        props.onChange(e.target.value)
    }
    return(
        <>
        {/* Nhận được cái value email ở bên sign-up */}
        <WrapperInputStyle placeholder={placeholder} value={props.value} {...rests} onChange={handleOnChangeInput}/>
        </>
    )
}

export default InputForm