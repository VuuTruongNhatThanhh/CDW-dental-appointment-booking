import { Upload } from "antd";
import styled from "styled-components";

export const WrapperHeader =styled.h1`
    color: #000;
    font-size: 18px;
    margin: 4px 70px;
    font-weight:300;
   
`

export const WrapperContentProfile =styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid #ccc;
    // width: 1127px;
    width: 426px;
    margin: 0 auto;
    padding: 30px;
    border-radius: 10px;
    gap: 30px;
    
`

export const WrapperLabel = styled.label`
    color: #000;
    font-size: 12px;
    line-height: 30px;
    font-weight: 600;
    width: 100px;
    text-align: left;
`

export const WrapperInput = styled.div`
    display: flex;
    align-items: center;
    gap:20px;
`

export const WrapperUploadFile = styled(Upload)`
 & .ant-upload-list, .ant-upload-list-text {
    display:none;
 }
`



