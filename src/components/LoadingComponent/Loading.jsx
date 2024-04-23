
import { Spin } from "antd";
import React from "react";

// Biểu tượng load khi đăng nhập
const Loading = ({children, isPending, delay =200})=>{
    return (
        <Spin spinning={isPending} delay={delay}>
            {children}
        </Spin>
    )
}

export default Loading