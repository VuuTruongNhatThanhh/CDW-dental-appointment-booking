import { Card } from "antd";
import styled from "styled-components";

export const WrapperCardStyle = styled(Card)`
    width: 200px;
    & img {
        height: 200px;
        width: 200px;
    },
    position: relative;
    // hết hàng thì chuyển thành màu xám và đổi con trỏ chuột
    background-color: ${props => props.disabled ? '#ccc' : '#fff'};
    cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'}
`

export const StyleNameProduct = styled.div`
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    color: rgb(56, 56, 61);
`

// Đánh giá
export const WrapperReportText = styled.div`
    font-size: 11px;
    color: rgb(128, 128, 137);
    display: flex;
    aligns-items: center;
    margin: 7px 0 5px;
`

export const WrapperPriceText = styled.div`
    color: #696969;
    font-size: 12px;
    font-weight: 500;
`

export const WrapperDiscountText = styled.span`
    color: rgb(255,66,78);
    font-size: 12px;
    font-weight: 500;
    margin-left: 10px
`


