import { Row } from "antd";
import styled from "styled-components";

// css header bên này, hoặc nhúng thẳng bên kia
  //  nowrap ko xuong dong
export const WrapperHeader = styled(Row)`
    padding: 10px 120px;
    background-color: #F6F1EB;
    align-items: center;
    gap: 16px;
    flex-wrap: nowrap;
`

export const WrapperTextHeader = styled.span`
    font-size: 18px;
    color: black;
    font-weight: bold;
     text-align: left;
    
`

export const WrapperHeaderAccount = styled.div `
    display: flex;
    align-item: center;
    color: black;
    gap: 10px;
    font-size: 12px;
`

