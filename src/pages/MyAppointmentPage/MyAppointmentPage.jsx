import React, { useEffect, useRef, useState } from "react";
import { WrapperHeader, WrapperUploadFile } from "./style";
import { Button, Form, Space, message } from "antd";
import TableComponent from "../../components/TableComponent/TableComponent";
import InputComponent from "../../components/InputComponent/InputComponent";
import DrawerComponent from "../../components/DrawerComponent/DrawerComponent";
import Loading from "../../components/LoadingComponent/Loading";
import ModalComponent from "../../components/ModalComponent/ModalComponent";
import { convertPrice, getBase64 } from "../../utils";
import { useSelector } from "react-redux";
import { useMutationHooks } from "../../hooks/useMutationHook";
import * as UserService from '../../services/UserService'
import * as AppointmentService from '../../services/AppointmentService'
import { useQuery } from "@tanstack/react-query";
import {PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined, CheckOutlined, CloseOutlined} from '@ant-design/icons'

const MyAppointmentPage = () =>{
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [rowSelected, setRowSelected] = useState('')
    const [isOpenDrawer, setIsOpenDrawer] = useState(false)
    const [isPendingUpdate, setIsPendingUpdate] = useState(false)
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)

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

    const getAllAppointment = async() =>{
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
  //         queryAppointment.refetch()
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
    const queryAppointment = useQuery({
      queryKey: ['user'],
      queryFn: getAllAppointment
    })
    // console.log('user', )

    const { isPending: isPendingUsers, data: appointments } = queryAppointment
    
    const renderAction = () =>{
      return (
        <div>
          
          {/* <CheckOutlined style={{color:'green', fontSize:'20px', cursor:'pointer', marginRight:'10px'}}  onClick={completedAppointment}/> */}
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

    // console.log('users',users?.data)
    const columns = [
      {
        title: 'Tên khách hàng',
        dataIndex: ['customer', 'name'],
        render: (text, record) => {
          const phone = record.customer.phone; // Lấy startTime từ dữ liệu record
          return `${text} (${phone})`;
        },
        // Sắp xếp theo bảng chữ cái
        sorter: (a,b) => a.name.length - b.name.length,
        ...getColumnSearchProps('name')
      },
      {
        title: 'Dịch vụ',
        dataIndex: ['service', 'name'],
        // Sắp xếp theo bảng chữ cái
        sorter: (a,b) => a.address.length - b.address.length,
        ...getColumnSearchProps('address')
      },
      
      {
        title: 'Thời gian',
        dataIndex: ['schedule', 'dayOfWeek'],
        sorter: (a,b) => a.phone - b.phone,
        render: (text, record) => {
          const dayOfWeekString = getDayOfWeekString(text); // Lấy tên ngày từ số ngày trong tuần
          const startTime = record.schedule.startTime; // Lấy startTime từ dữ liệu record
          const endTime = record.schedule.endTime; // Lấy endTime từ dữ liệu record
          return `${dayOfWeekString} (${startTime} - ${endTime})`;
        },
        ...getColumnSearchProps('phone'),
       
      },
      {
        title: 'Nha sĩ',
        dataIndex: ['schedule', 'doctor'],
        sorter: (a,b) => a.phone - b.phone,
        ...getColumnSearchProps('phone'),
       
      },
      {
        title: 'Giá tiền (VND)',
        dataIndex: ['service', 'price'],
        render: (text, record) => {
          const unit = record.service.unit; // Lấy startTime từ dữ liệu record
          return `${text} / ${unit}`;
        },  
        filters: [
            {
              text: 'True',
              value: true,
            },
            {
              text: 'False',
              value: false,
            },
          ],

      },
      {
        title: 'Hủy lịch khám',
        dataIndex: 'action',
        render: renderAction,
      },
    ];
    const filteredData = appointments && appointments?.data ? appointments?.data.filter(item => item?.appointment?.customer?._id === user?.id && item?.appointment?.status ==='Confirmed'): [];
    const dataTable = filteredData.map((item, index) => ({
      key: index,
      id: item?.appointment?._id,
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
              queryAppointment.refetch()
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
              queryAppointment.refetch()
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
        queryAppointment.refetch()
      }
  })

}

const completedAppointment = () =>{

  mutationCompleted.mutate({id:rowSelected, status:'Completed'},{
    // Cập nhật table lại liền sau khi update
      onSettled:()=>{
        queryAppointment.refetch()
      }
  })

}

// const cancelAppointment = () =>{

//   mutationCancel.mutate({id:rowSelected, status:'Cancelled'},{
//     // Cập nhật table lại liền sau khi update
//       onSettled:()=>{
//         queryAppointment.refetch()
//       }
//   })

// }

const cancelAppointment = () => {
  setIsModalOpenDelete(true); // Open confirmation modal
};

const confirmCancelAppointment = () => {
  AppointmentService.updateAppointment(rowSelected, { status: 'Cancelled' })
      .then(() => {
          message.success('Hủy lịch hẹn thành công');
          queryAppointment.refetch();
          setIsModalOpenDelete(false); // Close modal after action
      })
      .catch((error) => {
          message.error('Có lỗi trong quá trình hủy lịch hẹn');
          console.error('Error canceling appointment:', error);
      });
};

const handleDeleteManyUsers = (ids) =>{
  // console.log('_id', {_id})

  mutationDeletedMany.mutate({ids: ids, token: user?.access_token},{
    // Cập nhật lại table sau khi xóa sản phẩm
    onSettled:()=>{
      queryAppointment.refetch()
    }
  })
}
    return (
        <div style={{padding:'0 120px'}}>
            <WrapperHeader>Lịch khám đã đặt</WrapperHeader>
            <div style={{marginTop:'10px'}}>
            {/* <Button onClick={showModal}  style={{height:'50px',width:'50px', borderRadius:'6px', borderStyle:'dashed'}}><PlusOutlined /></Button> */}
            </div>
            <div style={{marginTop:'20px'}}>
              {/* Đưa tên cột và data trong table qua */}
          <TableComponent  columns={columns} isPending={isPendingUsers} data={dataTable} onRow={(record, rowIndex) => {
    return {
      // onRow này dùng để lấy ra được cái id của sản phẩm khi click vào
      onClick: (event) => {
       
        setRowSelected(record.id)
        console.log('rowSelected', rowSelected)
      }
      
    };
  }}/>
          </div>
   

      <ModalComponent
                title="Xác nhận hủy lịch hẹn"
                open={isModalOpenDelete}
                onCancel={handleCancelDelete}
                onOk={confirmCancelAppointment}
            >
                <div>Bạn có chắc muốn hủy lịch hẹn này không?</div>
            </ModalComponent>
        </div>
    )
}

export default MyAppointmentPage
