import { Input } from "antd";
import React from "react";

// Tách input thành các thành phần nhỏ để có thể tái sử dụng
const InputComponent = ({size, placeholder, bordered, style, ...rests}) => {
    return (
        <Input 
        size={size} 
        placeholder={placeholder}
        bordered={bordered} 
        style={style} 
        {...rests}
        />
    )
}

export default InputComponent