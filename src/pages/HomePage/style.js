import styled from "styled-components";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";

export const WrapperTypeProduct = styled.div`
    display: flex;
    align-items: center;
    gap: 24px;
    justify-content: flex-start;
    height: 44px;
`

export const WrapperButtonMore = styled(ButtonComponent)`
    
 
    display: ${(props) => props.disabled ? 'none':''}
`

export const WrapperProduct = styled.div`
   display: flex;
   gap: 20px;
   margin-top: 40px;
   margin-bottom: 20px;
   flex-wrap: wrap;
`