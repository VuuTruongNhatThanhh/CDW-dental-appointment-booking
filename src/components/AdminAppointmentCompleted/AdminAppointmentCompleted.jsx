import React, { useEffect, useRef, useState } from "react";
import { WrapperHeader, WrapperUploadFile } from "./style";
import { Button, Form, Space, message } from "antd";
import TableComponent from "../TableComponent/TableComponent";
import InputComponent from "../InputComponent/InputComponent";
import DrawerComponent from "../DrawerComponent/DrawerComponent";
import Loading from "../LoadingComponent/Loading";
import ModalComponent from "../ModalComponent/ModalComponent";
import { convertPrice, getBase64 } from "../../utils";
import { useSelector } from "react-redux";
import { useMutationHooks } from "../../hooks/useMutationHook";
import * as UserService from '../../services/UserService'
import * as AppointmentService from '../../services/AppointmentService'
import { useQuery } from "@tanstack/react-query";
import {PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined, CheckOutlined, CloseOutlined} from '@ant-design/icons'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const AdminAppointmentCompleted = () =>{
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [rowSelected, setRowSelected] = useState('')
    const [isOpenDrawer, setIsOpenDrawer] = useState(false)
    const [isPendingUpdate, setIsPendingUpdate] = useState(false)
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)
    const [monthlyRevenue, setMonthlyRevenue] = useState([]);

    // Lấy thông tin user từ Redux
    const user = useSelector((state) => state?.user)

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
     // Dùng trong handleCancel
     const [form] = Form.useForm()
    const [stateUser, setStateUser] = useState({
        name: '',
        email: '',
        phone: '',
        isAdmin: false,
       
    })

    const [stateUserDetails, setStateUserDetails] = useState({
        name: '',
        email: '',
        phone: '',
        isAdmin: false,
        avatar: '',
        address: ''
  })

   

    const mutation = useMutationHooks(
      (data) => {
          const{name, email, isAdmin, phone} = data
          // Trả về dữ liệu nghĩa là mutation thành công isSuccess
         return UserService.signupUser({name, email, isAdmin : false,phone})
      }
    )

  

    const mutationDeleted = useMutationHooks(
      (data) => {
          const{id, token} = data
          // Trả về dữ liệu nghĩa là mutation thành công isSuccess
         return UserService.deleteUser(id, token)
      }
    )

    

    const mutationDeletedMany = useMutationHooks(
      (data) => {
        // ... vì có nhiều id
          const{ token, ...ids} = data
          // Trả về dữ liệu nghĩa là mutation thành công isSuccess
         return UserService.deleteManyUser(ids, token)
      }
    )

    const getAllUsers = async() =>{
      const res = await AppointmentService.getAllAppointment()
      // console.log('res',res.data)
      return res
    }

    // const completedAppointment = async() =>{
    //   const res = await AppointmentService.updateAppointment(rowSelected, {status:'Completed'})
    //   // console.log('res',res.data)
    //   return res
    // }


    const mutationUpdate = useMutationHooks(
      (data) => {
          const{id, token, ...rests} = data
          // Trả về dữ liệu nghĩa là mutation thành công isSuccess
         return UserService.updateUser(id,{...rests}, token)
      }
    )

    const mutationCompleted = useMutationHooks(
      (data) => {
          const{id, status} = data
          // Trả về dữ liệu nghĩa là mutation thành công isSuccess
         return AppointmentService.updateAppointment(id, {status})
      }
    )

    const mutationCancel = useMutationHooks(
      (data) => {
          const{id, status} = data
          // Trả về dữ liệu nghĩa là mutation thành công isSuccess
         return AppointmentService.updateAppointment(id, {status})
      }
    )

    

  //   const handleDeleteUser = () => {
  //     mutationDeleted.mutate({id: rowSelected, token: user?.access_token},{
  //       // Cập nhật lại table sau khi xóa sản phẩm
  //       onSettled:()=>{
  //         queryUser.refetch()
  //       }
  //     })
  // }
    

    const fetchGetDetailsUser = async ()=>{
      const res = await UserService.getDetailsUser(rowSelected)
      // console.log('res', res)
      // nếu có data thì hiển thị thông tin sản phẩm khi bấm vào chỉnh sửa
      if(res?.data){
        setStateUserDetails({
          name: res?.data?.name,
          email: res?.data?.email,
          phone: res?.data?.phone,
          isAdmin: res?.data?.isAdmin,
          address: res?.data?.address,
          avatar: res?.data?.avatar
        
        })
      }
      setIsPendingUpdate(false)
    }

    //Cái useEffect này để hiển thị thông tin sản phẩm trong form sau khi bấm vào chỉnh sửa
    useEffect(()=>{
      form.setFieldsValue(stateUserDetails)
    },[form, stateUserDetails])

    // Khắc phục cái lỗi khi lần đầu tiên nhấn vào chỉnh sửa sản phẩm thì không lấy được id
    useEffect(()=>{
        if(rowSelected &&  isOpenDrawer){
          setIsPendingUpdate(true)
          fetchGetDetailsUser(rowSelected)
        }

    }, [rowSelected, isOpenDrawer])

    // console.log('statePDetail', stateProductDetails)

    const handleDetailProduct = () =>{
      // Hiển thị được cái id khi click vào
      // console.log('rowSelected', rowSelected)


      
      setIsOpenDrawer(true)
    }

    const { data, isPending, isSuccess, isError } = mutation
    const { data: dataUpdated, isPending: isPendingUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate
    const { data: dataDeleted, isPending: isPendingDeleted, isSuccess: isSuccessDeleted, isError: isErrorDeleted } = mutationDeleted
    const { data: dataCompleted, isPending: isPendingCompleted, isSuccess: isSuccessCompleted, isError: isErrorCompleted } = mutationCompleted
    const { data: dataCanceled, isPending: isPendingCanceled, isSuccess: isSuccessCanceled, isError: isErrorCanceled } = mutationCancel
    const { data: dataDeletedMany, isPending: isPendingDeletedMany, isSuccess: isSuccessDeletedMany, isError: isErrorDeletedMany } = mutationDeletedMany
    // console.log('dataUpdated', dataUpdated)
    // const {isPending: isPendingProducts, data: products} = useQuery(['products'],getAllProduct)
    const queryUser = useQuery({
      queryKey: ['user'],
      queryFn: getAllUsers
    })
    // console.log('user', )

    const { isPending: isPendingUsers, data: users } = queryUser
    
    const renderAction = () =>{
      return (
        <div>
          
          <CheckOutlined style={{color:'green', fontSize:'20px', cursor:'pointer', marginRight:'10px'}}  onClick={completedAppointment}/>
          <CloseOutlined style={{color:'red', fontSize:'20px', cursor:'pointer'}} onClick={cancelAppointment} />
          
        </div>
      )
    }

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
      confirm();
      // setSearchText(selectedKeys[0]);
      // setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
      clearFilters();
      // setSearchText('');
    };
    const getColumnSearchProps = (dataIndex) => ({
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
        <div
          style={{
            padding: 8,
          }}
          onKeyDown={(e) => e.stopPropagation()}
        >
          <InputComponent
            ref={searchInput}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
            style={{
              marginBottom: 8,
              display: 'block',
            }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
              icon={<SearchOutlined />}
              size="small"
              style={{
                width: 90,
              }}
            >
              Search
            </Button>
            <Button
              onClick={() => clearFilters && handleReset(clearFilters)}
              size="small"
              style={{
                width: 90,
              }}
            >
              Reset
            </Button>
           
            <Button
              type="link"
              size="small"
              onClick={() => {
                close();
              }}
            >
              close
            </Button>
          </Space>
        </div>
      ),
      filterIcon: (filtered) => (
        <SearchOutlined
          style={{
            color: filtered ? '#1677ff' : undefined,
          }}
        />
      ),
      onFilter: (value, record) =>
        record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
      onFilterDropdownOpenChange: (visible) => {
        if (visible) {
          setTimeout(() => searchInput.current?.select(), 100);
        }
      },
      // render: (text) =>
      //   searchedColumn === dataIndex ? (
        //   <Highlighter
        //     highlightStyle={{
        //       backgroundColor: '#ffc069',
        //       padding: 0,
        //     }}
        //     searchWords={[searchText]}
        //     autoEscape
        //     textToHighlight={text ? text.toString() : ''}
        //   />
        // ) : (
        //   text
        // ),
    });
    const getDayOfWeekString = (dayOfWeek) => {
      switch (dayOfWeek) {
        case 0:
          return 'Thứ hai';
        case 1:
          return 'Thứ ba';
        case 2:
          return 'Thứ tư';
        case 3:
          return 'Thứ năm';
        case 4:
          return 'Thứ sáu';
        case 5:
          return 'Thứ bảy';
        case 6:
          return 'Chủ nhật';
        default:
          return '';
      }
    };
   
const formatDate = (isoDate) => {
  const date = new Date(isoDate);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

    console.log('users',users?.data)
    const columns = [
      {
        title: 'Tên khách hàng',
        dataIndex: ['customer', 'name'],
        render: (text, record) => {
          const phone = record.customer.phone; // Lấy startTime từ dữ liệu record
          return `${text} (${phone})`;
        },
        // Sắp xếp theo bảng chữ cái
        // sorter: (a,b) => a.name.length - b.name.length,
        // ...getColumnSearchProps('name')
      },
      {
        title: 'Dịch vụ',
        dataIndex: ['service', 'name'],
        // Sắp xếp theo bảng chữ cái
        // sorter: (a,b) => a.address.length - b.address.length,
        // ...getColumnSearchProps('address')
      },
      
      {
        title: 'Thời gian',
        dataIndex: ['schedule', 'dayOfWeek'],
        // sorter: (a,b) => a.phone - b.phone,
        render: (text, record) => {
          const dayOfWeekString = getDayOfWeekString(text); // Lấy tên ngày từ số ngày trong tuần
          const startTime = record.schedule.startTime; // Lấy startTime từ dữ liệu record
          const endTime = record.schedule.endTime; // Lấy endTime từ dữ liệu record
          return `${dayOfWeekString} (${startTime} - ${endTime})`;
        },
        // ...getColumnSearchProps('phone'),
       
      },
      {
        title: 'Nha sĩ',
        dataIndex: ['schedule', 'doctor'],
        // sorter: (a,b) => a.phone - b.phone,
        // ...getColsumnSearchProps('phone'),
       
      },
      {
        title: 'Giá tiền (VND)',
        dataIndex: ['service', 'price'],
        render: (text, record) => {
          const unit = record.service.unit; // Lấy startTime từ dữ liệu record
          return `${text} / ${unit}`;
        },  
       
      },
      {
        title: 'Ngày',
        dataIndex: 'createdAt',
        render: (createdAt) => formatDate(createdAt),
      },
    ];
    const filteredData = users?.data.filter(item => item?.appointment?.status === 'Completed');
    const dataTable = filteredData.map((item, index) => ({
      key: index,
      id: item?.appointment?._id,
      createdAt: item?.appointment?.createdAt,
      status: item?.appointment?.status,
      customer: {
        name: item?.appointment?.customer?.name,
        phone: item?.appointment?.customer?.phone,
        
      },
      service: {
        name: item?.appointment?.service?.name,
        price: convertPrice(item?.appointment?.service?.price),
        unit: item?.appointment?.service?.unit,
        
      },
      schedule: {
        dayOfWeek: item?.schedule?.dayOfWeek,
        doctor: item?.workingHour?.doctor?.name,
        startTime: item?.workingHour?.startTime,
        endTime: item?.workingHour?.endTime,
      },
    }));

    useEffect(()=>{
      if(isSuccess && data?.status ==='OK'){
        message.success('Tạo sản phẩm thành công')
        handleCancel()
      } else if(isError) {
        message.error('Có lỗi trong quá trình tạo sản phẩm')
      }
    },[isSuccess])

    useEffect(()=>{
      if(isSuccessUpdated && dataUpdated?.status ==='OK'){
        message.success('Chỉnh sửa thông tin thành công')
        handleCloseDrawer()
      } else if(isErrorUpdated) {
        message.error('Có lỗi trong quá trình chỉnh sửa')
      }
    },[isSuccessUpdated])

    useEffect(()=>{
      if(isSuccessCompleted && dataCompleted?.status ==='OK'){
        message.success('Đã khám xong')
        
      } else if(isErrorCompleted) {
        message.error('Có lỗi')
      }
    },[isSuccessCompleted])

    useEffect(()=>{
      if(isSuccessCanceled && dataCanceled?.status ==='OK'){
        message.success('Hủy lịch hẹn thành công')
        
      } else if(isErrorCanceled) {
        message.error('Có lỗi')
      }
    },[isSuccessCanceled])

    useEffect(()=>{
      if(isSuccessDeleted && dataDeleted?.status ==='OK'){
        message.success('Xóa tài khoản thành công')
        handleCancelDelete()
      } else if(isErrorDeleted) {
        message.error('Có lỗi trong quá trình xóa tài khoản')
      }
    },[isSuccessDeleted])

    useEffect(()=>{
      if(isSuccessDeletedMany && dataDeletedMany?.status ==='OK'){
        message.success('Xóa tài khoản thành công')
        // handleCancel()
      } else if(isErrorDeletedMany) {
        message.error('Có lỗi trong quá trình xóa tài khoản')
      }
    },[isSuccessDeletedMany])

    const showModal = () => {
        setIsModalOpen(true);
      };
    

    const handleCancel = () => {
        setIsModalOpen(false);
        setStateUser({
          name: '',
          email: '',
          phone: '',
          isAdmin: false,
         
        })
        form.resetFields()
      };

      const handleCancelDelete =()=>{
        setIsModalOpenDelete(false)
      }

      const handleDeleteUser = () => {
          mutationDeleted.mutate({id: rowSelected, token: user?.access_token},{
            // Cập nhật lại table sau khi xóa sản phẩm
            onSettled:()=>{
              queryUser.refetch()
            }
          })
      }

      const handleCloseDrawer = () => {
       setIsOpenDrawer(false)
        setStateUserDetails({
          name: '',
          email: '',
          phone: '',
          isAdmin: false,
         
        })
        form.resetFields()
      };

    const onFinish=() =>{
        mutation.mutate(stateUser,{
          // Cập nhật table lại liền sau khi create
            onSettled:()=>{
              queryUser.refetch()
            }
        })
        // console.log('stateP', stateProduct)
    }

    const handleOnChange =(e)=>{
        // name sẽ trùng với name của input
        // value sẽ là giá trị của bàn phím nhập vào
        // console.log('e.target.name', e.target.name, e.target.value)


        // Mỗi sản phẩm sẽ là 1 stateProduct, set từng name ứng với từng thuộc tính và giá trị nhập vào (mở console là hiểu)
        setStateUser({
            ...stateUser,
            [e.target.name]:e.target.value
        })
    }

    const handleOnChangeDetails =(e)=>{
      // name sẽ trùng với name của input
      // value sẽ là giá trị của bàn phím nhập vào
      // console.log('e.target.name', e.target.name, e.target.value)


      // Mỗi sản phẩm sẽ là 1 stateProduct, set từng name ứng với từng thuộc tính và giá trị nhập vào (mở console là hiểu)
      setStateUserDetails({
          ...stateUserDetails,
          [e.target.name]:e.target.value
      })
  }

    const handleOnChangeAvatar = async({fileList}) =>{
      const file = fileList[0]
      if(!file.url && !file.preview){
          file.preview = await getBase64(file.originFileObj);
      }
      setStateUser({
        ...stateUser,
        image: file.preview
      })
  }

  const handleOnChangeAvatarDetails = async({fileList}) =>{
    const file = fileList[0]
    if(!file.url && !file.preview){
        file.preview = await getBase64(file.originFileObj);
    }
    setStateUserDetails({
      ...stateUserDetails,
      avatar: file.preview
    })
}

const onUpdateUser = () =>{

  mutationUpdate.mutate({id:rowSelected, token: user.access_token, ...stateUserDetails },{
    // Cập nhật table lại liền sau khi update
      onSettled:()=>{
        queryUser.refetch()
      }
  })

}

const completedAppointment = () =>{

  mutationCompleted.mutate({id:rowSelected, status:'Completed'},{
    // Cập nhật table lại liền sau khi update
      onSettled:()=>{
        queryUser.refetch()
      }
  })

}

const cancelAppointment = () =>{

  mutationCancel.mutate({id:rowSelected, status:'Cancelled'},{
    // Cập nhật table lại liền sau khi update
      onSettled:()=>{
        queryUser.refetch()
      }
  })

}

const handleDeleteManyUsers = (ids) =>{
  // console.log('_id', {_id})

  mutationDeletedMany.mutate({ids: ids, token: user?.access_token},{
    // Cập nhật lại table sau khi xóa sản phẩm
    onSettled:()=>{
      queryUser.refetch()
    }
  })
}

useEffect(() => {
  if (users && users.data) {
      const revenueData = Array(12).fill(0);
      users.data.forEach(user => {
          const { appointment } = user;
          if (appointment?.status === 'Completed') {
              const month = new Date(appointment?.createdAt).getMonth();
              revenueData[month] += appointment?.service?.price;
          }
      });

      const formattedData = revenueData.map((revenue, index) => ({
          month: `Tháng ${index + 1}`,
          revenue: convertPrice(revenue) +' VND'
      }));

      setMonthlyRevenue(formattedData);
  }
}, [users]);

    return (
        <div>
            {/* <WrapperHeader>Lịch sử cuộc hẹn</WrapperHeader> */}
            <div>
            <h4>Doanh thu theo tháng</h4>
            <ResponsiveContainer width="100%" height={400}>
                <BarChart
                    width={500}
                    height={300}
                    data={monthlyRevenue}
                    margin={{
                        top: 5, right: 30, left: 20, bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="revenue" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </div>

            {/* <div style={{marginTop:'10px'}}>
            <Button onClick={showModal}  style={{height:'50px',width:'50px', borderRadius:'6px', borderStyle:'dashed'}}><PlusOutlined /></Button>
            </div> */}
            <div style={{marginTop:'20px'}}>
              {/* Đưa tên cột và data trong table qua */}
          <TableComponent handleDeleteMany={handleDeleteManyUsers} columns={columns} isPending={isPendingUsers} data={dataTable} onRow={(record, rowIndex) => {
    return {
      // onRow này dùng để lấy ra được cái id của sản phẩm khi click vào
      onClick: (event) => {
       
        setRowSelected(record.id)
        console.log('rowSelected', rowSelected)
      }
      
    };
  }}/>
          </div>
          <ModalComponent forceRender title="Tạo mới sản phẩm" open={isModalOpen} onCancel={handleCancel} footer={null} >
          <Loading isPending={isPending}>
          <Form
    name="basic"
    labelCol={{ span: 6 }}
    wrapperCol={{ span: 18 }}
    style={{ maxWidth: 600 }}
    onFinish={onFinish}
    autoComplete="on"
    // truyền cho nó form để sử dụng form trong handleCancel
    form={form}
  >
    <Form.Item
      label="Tên người dùng"
      name="name"
      rules={[{ required: true, message: "Vui lòng nhập tên người dùng" }]}
    >
        {/* name phải trùng với giá trị stateProduct phía trên */}
      <InputComponent value={stateUser.name} onChange={handleOnChange} name="name" />
    </Form.Item>

    <Form.Item
      label="Email"
      name="email"
      rules={[{ required: true, message: 'Vui lòng nhập email' }]}
    >
      <InputComponent value={stateUser.email} onChange={handleOnChange} name="email" />
    </Form.Item>

    <Form.Item
      label="Số điện thoại"
      name="phone"
      rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}
    >
      <InputComponent value={stateUser.phone} onChange={handleOnChange} name="phone" />
    </Form.Item>

    {/* <Form.Item
      label="Hình ảnh"
      name="image"
      rules={[{ required: true, message: 'Vui lòng chọn hình ảnh cho sản phẩm' }]}
    >
       <WrapperUploadFile onChange={handleOnChangeAvatar} maxCount={1}>
                            <Button>Chọn ảnh</Button>
                            {stateProduct?.image &&(
                        <img src={stateProduct?.image} style={{
                            height:'30px',
                            width:'30px',
                            borderRadius:'50%',
                            objectFit:'cover',
                            outline:'none' ,
                            marginLeft:'10px'
                        }} alt='avatar'/>
                    )}
                    </WrapperUploadFile>

    </Form.Item> */}
  
    <Form.Item wrapperCol={{ offset: 18, span: 16 }}>
      <Button type="primary" htmlType="submit">
        Tạo tài khoản
      </Button>
    </Form.Item>
  </Form>
          </Loading>
      </ModalComponent>
      <DrawerComponent title="Chỉnh sửa thông tin người dùng" isOpen={isOpenDrawer} onClose={()=> setIsOpenDrawer(false)} width="70%">
      <Loading isPending={isPendingUpdate || isPendingUpdated}>
          <Form
    name="basic"
    labelCol={{ span: 6 }}
    wrapperCol={{ span: 18 }}
    style={{ maxWidth: 600 }}
    onFinish={onUpdateUser}
    autoComplete="on"
    form={form}
  >
    <Form.Item
      label="Tên người dùng"
      name="name"
      rules={[{ required: true, message: "Vui lòng nhập tên người dùng" }]}
    >
        {/* name phải trùng với giá trị stateProduct phía trên */}
      <InputComponent value={stateUserDetails.name} onChange={handleOnChangeDetails} name="name" />
    </Form.Item>

    <Form.Item
      label="Email"
      name="email"
      rules={[{ required: true, message: 'Vui lòng nhập email' }]}
    >
      <InputComponent value={stateUserDetails.email} onChange={handleOnChangeDetails} name="email" />
    </Form.Item>

    <Form.Item
      label="Số điện thoại"
      name="phone"
      rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}
    >
      <InputComponent value={stateUserDetails.phone} onChange={handleOnChangeDetails} name="phone" />
    </Form.Item>

    <Form.Item
      label="Địa chỉ"
      name="address"
      rules={[{ required: true, message: 'Vui lòng nhập địa chỉ' }]}
    >
      <InputComponent value={stateUserDetails.address} onChange={handleOnChangeDetails} name="address" />
    </Form.Item>

   

   

   

    <Form.Item
      label="Ảnh đại diện"
      name="avatar"
      rules={[{ required: true, message: 'Vui lòng chọn ảnh đại diện' }]}
    >
       <WrapperUploadFile onChange={handleOnChangeAvatarDetails} maxCount={1}>
                            <Button>Chọn ảnh</Button>
                            {stateUserDetails?.avatar &&(
                        <img src={stateUserDetails?.avatar} style={{
                            height:'30px',
                            width:'30px',
                            borderRadius:'50%',
                            objectFit:'cover',
                            outline:'none' ,
                            marginLeft:'10px'
                        }} alt='avatar'/>
                    )}
                    </WrapperUploadFile>

    </Form.Item>
  
    <Form.Item wrapperCol={{ offset: 18, span: 16 }}>
      <Button type="primary" htmlType="submit">
        Hoàn thành
      </Button>
    </Form.Item>
  </Form>
          </Loading>
      </DrawerComponent>

      <ModalComponent  title="Xoá tài khoản" open={isModalOpenDelete} onCancel={handleCancelDelete} onOk={handleDeleteUser} >
          <Loading isPending={isPendingDeleted}>
        <div>Bạn có chắc muốn xóa tài khoản này không?</div>
          </Loading>
      </ModalComponent>
        </div>
    )
}

export default AdminAppointmentCompleted