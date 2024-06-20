import React from "react";
import DoctorDetailComponent from "../../components/DoctorDetailComponent/DoctorDetailComponent";
import { useNavigate, useParams } from "react-router-dom";

const DoctorDetailPage = () => {
    // Lấy cái id sản phẩm trên thanh url
    const {id} = useParams()
    const navigate = useNavigate()
    return (
        <div style={{padding: '0 120px'}}>
       <h5>
  <span style={{ cursor: 'pointer', fontWeight: 'normal' }} onClick={() => { navigate('/') }}>
    Trang chủ
  </span> 
  {' > Chi tiết nha sĩ'}
</h5>
            <div>
            <DoctorDetailComponent idProduct={id}/>
            </div>
        </div>
    )
}

export default DoctorDetailPage