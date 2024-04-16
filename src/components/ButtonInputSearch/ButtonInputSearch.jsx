import React, {useState} from "react";
import { Button } from "antd";
import {SearchOutlined} from '@ant-design/icons'
import InputComponent from "../InputComponent/InputComponent";
const ButtonInputSearch = (props) => {
    // Gán giá trị vào 1 biến để có thể dùng lại nhiều chỗ, bên header nhập thông tin thay đỔi
    const {size, placeholder, textButton, bordered, backgroundColorInput='#fff', backgroundColorButton='#fff', colorButton='#fff'} = props
    
    const [isActive, setIsActive] = useState(false);

    const handleClick = () => {
        setIsActive(!isActive); // Thay đổi trạng thái active khi button được click
    };
    return (
        <div style={{display:'flex', backgroundColor:'#fff'}}>
            {/* bordered ở đây để hiện viền xanh của input khi nhấn vào */}
            {/* Dùng inputcomponent được định nghĩa trong folder khác giống vầy
                để có thể sử dụng lại ở nhiều nơi khac
            */}
            <InputComponent 
                size={size} 
                placeholder={placeholder}
                bordered={bordered} 
                style={{ backgroundColor:  backgroundColorInput}} />
            <Button 
                size={size}  
                // bordered={bordered} 
                
                style={{
              
                    border: 'none', // Loại bỏ border
                    color: isActive ? 'black' : 'black', // Màu chữ khi active
                }}
                icon={<SearchOutlined  />}
                onClick={handleClick} // Thay đổi trạng thái khi button được click
                >{textButton}</Button>
        </div>
    )
}

export default ButtonInputSearch