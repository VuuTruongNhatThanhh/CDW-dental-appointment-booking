import React, { Fragment, useEffect, useState } from "react";
import NavbarComponent from "../../components/NavbarComponent/NavbarComponent";
import CardDoctorComponent from "../../components/CardDoctorComponent/CardDoctorComponent";
import {  Col, Pagination, Row } from "antd";
import { WrapperNavBar, WrapperProduct } from "./style";
import { useLocation, useNavigate } from "react-router-dom";
import * as UserService from '../../services/UserService'
import Loading from "../../components/LoadingComponent/Loading";
import { useSelector } from "react-redux";
import { useDebounce } from "../../hooks/useDebounce";

const DoctorPage = () => {
    // useLocation hiện được đường dẫn của trang và các thông tin khác khi nhấn vào type ở home
    // Lấy ra được state chữ có dấu được lưu trong url
    const {state} = useLocation()
    const user = useSelector((state) => state?.user)

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
   
    const getAllUsers = async () => {
        setLoading(true); // Hiển thị loading khi lấy dữ liệu
        try {
            const res = await UserService.getAllUser(user?.access_token);
            if (res.status === 'OK') {
                const doctors = res.data.filter(user => user.isDoctor);
                setUsers(doctors); // Cập nhật trạng thái với dữ liệu người dùng
                console.log('res',res.data)
            } else {
                console.error('Failed to fetch users:', res.message);
            }
        } catch (error) {
            console.error('Failed to fetch users:', error);
        } finally {
            setLoading(false); // Tắt loading sau khi lấy dữ liệu xong
        }
    };
    
    useEffect(() => {
        getAllUsers();
    }, []); // Chạy một lần khi component mount
    return (
       
        <Loading isPending={loading}>
            <div style={{padding: '0 120px'}}>
               <h5>
  <span style={{ cursor: 'pointer', fontWeight: 'normal' }} onClick={() => { navigate('/') }}>
    Trang chủ
  </span> 
  {' > Nha sĩ'}
</h5>
</div>
            {/* <h3>Đội ngũ nha sĩ</h3> */}
            <div style={{padding:'0 120px'}}>
                    <Row style={{ flexWrap:'nowrap', paddingTop:'10px'}}>
                        <WrapperNavBar span={4}>
                        <NavbarComponent/>
                        </WrapperNavBar>
                        <Col span={20}>
                        <WrapperProduct >
                                {/* Render danh sách người dùng */}
                                {users.map((user) => (
                                <CardDoctorComponent
                                    id={user._id}
                                    name={user.name}
                                    email={user.email}
                                    phone={user.phone}
                                    address={user.address}
                                    city={user.city}
                                    avatar={user.avatar}
                                />
                            ))}
                    
                        </WrapperProduct>
                        {/* <Pagination  defaultCurrent={panigate.page +1} total={panigate?.total} onChange={onChange} style={{textAlign:'center', marginTop:'50px', marginBottom:'10px'}} /> */}
                        </Col>
                    </Row>
                    
            </div>
        </Loading>
    )
}

export default DoctorPage