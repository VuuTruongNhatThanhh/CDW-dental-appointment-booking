import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// Styled Components
const Container = styled.div`
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 30px;
  color: #333;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  margin-bottom: 5px;
  font-weight: bold;
  display: block;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const Select = styled.select`
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 10px 15px;
  margin-top: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  color: #fff;
  background-color: ${props => props.cancel ? '#bbb' : '#007bff'};
  &:hover {
    background-color: ${props => props.cancel ? '#999' : '#0056b3'};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
`;



const MakeAppointment = () => {
    const navigate = useNavigate()
    const handleNavigateHome=()=>{
        
        navigate('/')
      }
  const [formData, setFormData] = useState({
    fullName: '',
    dob: '',
    service: '',
    dentist: '',
    day: '',
    time: ''
  });

 
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Appointment data:', formData);
    alert('Đặt lịch thành công!');
  };

  const handleCancel = () => {
    setFormData({
      fullName: '',
      dob: '',
      service: '',
      dentist: '',
      day: '',
      time: ''
    });
  };

  return (
    <Container>
      <Title>Đặt Lịch Khám</Title>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Họ và Tên</Label>
          <Input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Ngày Sinh</Label>
          <Input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Dịch Vụ</Label>
          <Select
            name="service"
            value={formData.service}
            onChange={handleChange}
            required
          >
            <option value="">Chọn dịch vụ</option>
            <option value="Tẩy trắng răng">Tẩy trắng răng</option>
            <option value="Niềng răng">Niềng răng</option>
            <option value="Răng sứ">Răng sứ</option>
          </Select>
        </FormGroup>

        <FormGroup>
          <Label>Nha Sĩ</Label>
          <Select
            name="dentist"
            value={formData.dentist}
            onChange={handleChange}
            required
          >
            <option value="">Chọn nha sĩ</option>
            <option value="Nguyễn Văn A">Nguyễn Văn A</option>
            <option value="Nguyễn Văn B">Nguyễn Văn B</option>
            <option value="Nguyễn Văn C">Nguyễn Văn C</option>
          </Select>
        </FormGroup>

        <FormGroup>
          <Label>Ngày trong tuần</Label>
          <Select
            name="day"
            value={formData.day}
            onChange={handleChange}
            required
          >
            <option value="">Chọn ngày</option>
            <option value="Thứ 7">Thứ 7</option>
            <option value="Chủ nhật">Chủ nhật</option>
          </Select>
        </FormGroup>

        <FormGroup>
          <Label>Khung giờ</Label>
          <Select
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
          >
            <option value="">Chọn khung giờ</option>
            <option value="7h đến 9h">7h đến 9h</option>
            <option value="14h đến 16h">14h đến 16h</option>
          </Select>
        </FormGroup>

        <ButtonGroup>
          <Button onClick={handleNavigateHome} type="submit">Đặt Lịch</Button>
          <Button type="button" cancel onClick={handleCancel}>Hủy</Button>
        </ButtonGroup>
      </Form>
    </Container>
  );
};

export default MakeAppointment;
