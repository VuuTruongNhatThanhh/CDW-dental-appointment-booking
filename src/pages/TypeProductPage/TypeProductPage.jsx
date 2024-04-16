import React, { Fragment } from "react";
import NavbarComponent from "../../components/NavbarComponent/NavbarComponent";
import CardComponent from "../../components/CardComponent/CardComponent";
import {  Col, Pagination, Row } from "antd";
import { WrapperNavBar, WrapperProduct } from "./style";

const TypeProductPage = () => {
    const onChange= ()=> {}
    return (
<div style={{padding:'0 120px'}}>
        <Row style={{ flexWrap:'nowrap', paddingTop:'10px'}}>
            <WrapperNavBar span={4}>
            <NavbarComponent/>
            </WrapperNavBar>
            <Col span={20}>
            <WrapperProduct>
            <CardComponent/>
            <CardComponent/>
            <CardComponent/>
            <CardComponent/>
            <CardComponent/>
            <CardComponent/>
            <CardComponent/>
            </WrapperProduct>
            <Pagination  defaultCurrent={2} total={100} onChange={onChange} style={{textAlign:'center', marginTop:'20px'}} />
            </Col>
        </Row>
        
</div>
    )
}

export default TypeProductPage