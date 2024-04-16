import { Button } from "antd";
import React from "react";

// ...rest có nghĩa là nhận thêm những tham số thêm không cố định nữa
const ButtonComponent = ({size, styleButton, styleTextButton, textButton, ...rest}) => {
    return (
        <Button
        size={size}  
        // bordered={bordered} 
        
        style={styleButton}
        
        {...rest}
        // icon={<SearchOutlined  />}
        // onClick={handleClick} // Thay đổi trạng thái khi button được click
        >{textButton}</Button>
    )
}

export default ButtonComponent