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
    & :hover {
        color: #A37B53;
      
    }
`

export const WrapperProduct = styled.div`
   display: flex;
   gap: 20px;
   margin-top: 20px;
   flex-wrap: wrap;
`