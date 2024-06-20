import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import * as ProductService from '../../services/ProductService'
import * as ScheduleService from '../../services/ScheduleService'
import * as AppointmentService from '../../services/AppointmentService'
import { useMutationHooks } from '../../hooks/useMutationHook';
import { useSelector } from 'react-redux';
import { convertPrice } from '../../utils';

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
  width: 98%;
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
    const user = useSelector((state) => state.user)
    const handleNavigateHome=()=>{
        
        navigate('/')
      }
      const [formData, setFormData] = useState({
        serviceType: '',
        service: '',
        day: '',
        dentist: '',
        time: ''
      });
      const [services, setServices] = useState([]);
      const [serviceTypes, setServiceTypes] = useState([]);
      const [schedule, setSchedule] = useState([]);
      const [doctors, setDoctors] = useState([]); // Thêm trạng thái để lưu danh sách bác sĩ
  const [selectedDay, setSelectedDay] = useState(''); // Trạng thái lưu trữ ngày trong tuần được chọn
  const [selectedSchedule, setSelectedSchedule] = useState(null); // Thêm state cho selectedSchedule
  const [selectedDoctor, setSelectedDoctor] = useState(''); // State cho bác sĩ được chọn
  const [selectedServicePrice, setSelectedServicePrice] = useState('');
  const [selectedServiceUnit, setSelectedServiceUnit] = useState(''); // State cho đơn vị của dịch vụ được chọn
      useEffect(() => {
        const fetchServices = async () => {
          try {
            const res = await ProductService.getAllProduct();
            setServices(res.data); // Giả sử res.data chứa danh sách dịch vụ
    
            // Lấy các loại dịch vụ duy nhất
            const uniqueTypes = [...new Set(res.data.map(service => service.type))];
            setServiceTypes(uniqueTypes);
          } catch (error) {
            console.error('Error fetching services:', error);
          }
        };
    
        const fetchSchedules = async () => {
          try {
            const res = await ScheduleService.getAllSchedule();
            // console.log('schedule', res.data);
            // console.log('user',user?.id)
            setSchedule(res.data);
          } catch (error) {
            console.error('Error fetching schedules:', error);
          }
        };
    
        fetchServices();
        fetchSchedules();
      }, []);

      useEffect(() => {
        if (selectedDay !== '') {
          const selectedSchedule = schedule.find(schedule => schedule.dayOfWeek === parseInt(selectedDay));
          if (selectedSchedule) {
           // Lọc tên bác sĩ duy nhất
        const uniqueDoctors = new Set(selectedSchedule.workingHours.map(wh => JSON.stringify(wh.doctor)));
        setSelectedSchedule(selectedSchedule.workingHours)
        console.log('selectedSchedule.workingHours',selectedSchedule.workingHours)
        const doctorArray = Array.from(uniqueDoctors).map(doctor => JSON.parse(doctor));
        // console.log('doctorArray',doctorArray)
        setDoctors(doctorArray);
          } else {
            setDoctors([]);
          }
        }
      }, [selectedDay, schedule]);  

      // Lọc dịch vụ theo loại dịch vụ đã chọn
  const filteredServices = services.filter(service => service.type === formData.serviceType);

   // Lọc các ngày trong tuần duy nhất từ schedule
   const uniqueDaysOfWeek = [...new Set(schedule.map(schedule => schedule.dayOfWeek))];

    // Mảng chuyển đổi từ số ngày trong tuần sang tên
  const daysOfWeek = ["Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy", "Chủ Nhật"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'serviceType') {
      // Nếu chọn loại dịch vụ, reset giá trị của service và price
      setFormData({
        ...formData,
        service: '', // Reset service
        price: '', // Reset price
        [name]: value,
      });
      setSelectedServicePrice(''); // Reset selectedServicePrice
      setSelectedServiceUnit(''); // Reset selectedServiceUnit
    }
    else if (name === 'service') {
      const selectedService = services.find(service => service._id === value);
      setSelectedServicePrice(selectedService ? selectedService.price : '');
      setSelectedServiceUnit(selectedService ? selectedService.unit : '');
      setFormData({
        ...formData,
        service: value,

      });
  }
    else if (name === 'day') {
        setSelectedDay(value);
        setFormData({
            ...formData,
            day: value,
            dentist: '', // Reset giá trị của nha sĩ khi thay đổi ngày
            time: '' // Reset luôn khung giờ nếu bạn muốn
        });
        setSelectedDoctor(''); // Reset selectedDoctor khi thay đổi ngày
    } else if (name === 'dentist') {
        setSelectedDoctor(value); // Cập nhật state cho bác sĩ được chọn
        setFormData({
            ...formData,
            dentist: value
        });
    } else {
        setFormData({
            ...formData,
            [name]: value
        });
    }
};

const mutation = useMutationHooks(
  data => AppointmentService.createAppointment(data)
)
      
  

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log('Appointment data:', formData.serviceType);
    alert('Đặt lịch thành công!');
    const appointmentData = {
      customer: user?.id,
      service: formData.service,
      workingHour: formData.time
    };
    mutation.mutate(appointmentData)
    navigate('/')
  };

  const handleCancel = () => {
    setFormData({
      serviceType: '',
      service: '',
      dentist: '',
      day: '',
      time: ''  
    });
    setSelectedServicePrice(''); // Reset giá khi làm mới form
    setSelectedServiceUnit(''); // Reset unit khi làm mới form
  };

  

  

  return (
    <Container>
      <Title>Đặt Lịch Khám</Title>
      <Form onSubmit={handleSubmit}>
       
        <FormGroup>
          <Label>Loại dịch vụ</Label>
          <Select
            name="serviceType"
            value={formData.serviceType}
            onChange={handleChange}
            required
          >
            <option disabled value="">Chọn loại dịch vụ</option>
            {serviceTypes.map((type, index) => (
            <option key={index} value={type}>{type}</option>
          ))}
          </Select>
        </FormGroup>

        <FormGroup>
          <Label>Dịch vụ</Label>
          <Select
            name="service"
            value={formData.service}
            onChange={handleChange}
            required
          >
            <option disabled value="">Chọn dịch vụ</option>
            {filteredServices.map((service) => (
            <option key={service._id} value={service._id}>{service.name}</option>
          ))}
          </Select>
        </FormGroup>
        <FormGroup>
          <Label>Giá tiền (VND)</Label>
          <Input
          disabled
            type="text"
            name="price"
            value={`${convertPrice(selectedServicePrice)} / ${selectedServiceUnit}`}
            readOnly
          />
        </FormGroup>
        <FormGroup>
          <Label>Ngày trong tuần</Label>
          <Select
            name="day"
            value={formData.day}
            onChange={handleChange}
            required
          >
            <option disabled value="">Chọn ngày</option>
            {uniqueDaysOfWeek.map((day, index) => (
              <option key={index} value={day}>{daysOfWeek[day]}</option>
            ))}
          </Select>
        </FormGroup>
        <FormGroup>
          <Label>Nha sĩ</Label>
          <Select
            name="dentist"
            value={formData.dentist}
            onChange={handleChange}
            required
          >
            <option disabled value="">Chọn nha sĩ</option>
            {doctors.map((doctor, index) => (
              <option key={doctor._id} value={doctor._id}>{doctor.name}</option>
            ))}
          </Select>
        </FormGroup>

        

        <FormGroup>
          <Label>Khung giờ (Chỉ hiển thị những khung giờ còn trống)</Label>
          <Select
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
          >
            <option disabled value="">Chọn khung giờ</option>
            {selectedDoctor &&
    selectedSchedule
      .filter(wh => wh.doctor._id === selectedDoctor && wh.isAvailable)
      .map((wh, index) => (
        <option key={index} value={wh._id}>
          {`${wh.startTime} - ${wh.endTime}`}
        </option>
      ))}
          </Select>
        </FormGroup>

        <ButtonGroup>
          <Button  type="submit">Đặt Lịch</Button>
          <Button type="button" cancel onClick={handleCancel}>Làm mới form</Button>
        </ButtonGroup>
      </Form>
    </Container>
  );
};

export default MakeAppointment;
