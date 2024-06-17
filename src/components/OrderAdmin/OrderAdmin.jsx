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
import * as OrderService from '../../services/OrderService'
import { useQuery } from "@tanstack/react-query";
import {PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined} from '@ant-design/icons'
import { orderContant } from "../../contant";
import PieChartComponent from "./PieChart";

const OrderAdmin = () =>{
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

   

    // const mutation = useMutationHooks(
    //   (data) => {
    //       const{name, email, isAdmin, phone} = data
    //       // Trả về dữ liệu nghĩa là mutation thành công isSuccess
    //      return UserService.signupUser({name, email, isAdmin : false,phone})
    //   }
    // )

    // const mutationUpdate = useMutationHooks(
    //   (data) => {
    //       const{id, token, ...rests} = data
    //       // Trả về dữ liệu nghĩa là mutation thành công isSuccess
    //      return UserService.updateUser(id,{...rests}, token)
    //   }
    // )

    // const mutationDeleted = useMutationHooks(
    //   (data) => {
    //       const{id, token} = data
    //       // Trả về dữ liệu nghĩa là mutation thành công isSuccess
    //      return UserService.deleteUser(id, token)
    //   }
    // )

    // const mutationDeletedMany = useMutationHooks(
    //   (data) => {
    //     // ... vì có nhiều id
    //       const{ token, ...ids} = data
    //       // Trả về dữ liệu nghĩa là mutation thành công isSuccess
    //      return UserService.deleteManyUser(ids, token)
    //   }
    // )

    const getAllOrder = async() =>{
      const res = await OrderService.getAllOrder(user?.access_token)
      // console.log('res',res)
      return res
    }

    // const fetchGetDetailsUser = async ()=>{
    //   const res = await UserService.getDetailsUser(rowSelected)
    //   // console.log('res', res)
    //   // nếu có data thì hiển thị thông tin sản phẩm khi bấm vào chỉnh sửa
    //   if(res?.data){
    //     setStateUserDetails({
    //       name: res?.data?.name,
    //       email: res?.data?.email,
    //       phone: res?.data?.phone,
    //       isAdmin: res?.data?.isAdmin,
    //       address: res?.data?.address,
    //       avatar: res?.data?.avatar
        
    //     })
    //   }
    //   setIsPendingUpdate(false)
    // }

    //Cái useEffect này để hiển thị thông tin sản phẩm trong form sau khi bấm vào chỉnh sửa
    // useEffect(()=>{
    //   form.setFieldsValue(stateUserDetails)
    // },[form, stateUserDetails])

    // Khắc phục cái lỗi khi lần đầu tiên nhấn vào chỉnh sửa sản phẩm thì không lấy được id
    // useEffect(()=>{
    //     if(rowSelected &&  isOpenDrawer){
    //       setIsPendingUpdate(true)
    //       fetchGetDetailsUser(rowSelected)
    //     }

    // }, [rowSelected, isOpenDrawer])

    // console.log('statePDetail', stateProductDetails)

    const handleDetailProduct = () =>{
      // Hiển thị được cái id khi click vào
      // console.log('rowSelected', rowSelected)


      
      setIsOpenDrawer(true)
    }

    // const { data, isPending, isSuccess, isError } = mutation
    // const { data: dataUpdated, isPending: isPendingUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate
    // const { data: dataDeleted, isPending: isPendingDeleted, isSuccess: isSuccessDeleted, isError: isErrorDeleted } = mutationDeleted
    // const { data: dataDeletedMany, isPending: isPendingDeletedMany, isSuccess: isSuccessDeletedMany, isError: isErrorDeletedMany } = mutationDeletedMany
    // console.log('dataUpdated', dataUpdated)
    // const {isPending: isPendingProducts, data: products} = useQuery(['products'],getAllProduct)
    const queryOrder = useQuery({
      queryKey: ['orders'],
      queryFn: getAllOrder
    })
    // console.log('product', products)

    const { isPending: isPendingOders, data: orders } = queryOrder

    // const renderAction = () =>{
    //   return (
    //     <div>
    //       <EditOutlined style={{color:'orange', fontSize:'20px', cursor:'pointer', marginRight:'10px'}} onClick={handleDetailProduct} />
    //       <DeleteOutlined style={{color:'red', fontSize:'20px', cursor:'pointer'}} onClick={() => setIsModalOpenDelete(true)}/>
          
    //     </div>
    //   )
    // }

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

    const columns = [
      {
        title: 'Tên người mua',
        dataIndex: 'userName',
        // Sắp xếp theo bảng chữ cái
        sorter: (a,b) => a.userName.length - b.userName.length,
        ...getColumnSearchProps('userName')
      },
      {
        title: 'Số điện thoại',
        dataIndex: 'phone',
        // Sắp xếp theo bảng chữ cái
        sorter: (a,b) => a.phone.length - b.phone.length,
        ...getColumnSearchProps('phone')
      },
      {
        title: 'Địa chỉ',
        dataIndex: 'address',
        // Sắp xếp theo bảng chữ cái
        sorter: (a,b) => a.address.length - b.address.length,
        ...getColumnSearchProps('address')
      },
      // {
      //   title: 'Price Items',
      //   dataIndex: 'itemPrice',
      //   // Sắp xếp theo bảng chữ cái
      //   sorter: (a,b) => a.itemPrice.length - b.itemPrice.length,
      //   ...getColumnSearchProps('itemPrice')
      // },
      // {
      //   title: 'Price Ship',
      //   dataIndex: 'shippingPrice',
      //   // Sắp xếp theo bảng chữ cái
      //   sorter: (a,b) => a.shippingPrice.length - b.shippingPrice.length,
      //   ...getColumnSearchProps('shippingPrice')
      // },
      
      {
        title: 'Đã thanh toán',
        dataIndex: 'isPaid',
        // Sắp xếp theo bảng chữ cái
        sorter: (a,b) => a.isPaid.length - b.isPaid.length,
        ...getColumnSearchProps('isPaid')
      },
      {
        title: 'Đã giao',
        dataIndex: 'isDelivered',
        // Sắp xếp theo bảng chữ cái
        sorter: (a,b) => a.isDelivered.length - b.isDelivered.length,
        ...getColumnSearchProps('isDelivered')
      },
      {
        title: 'Phương thức thanh toán',
        dataIndex: 'paymentMethod',
        // Sắp xếp theo bảng chữ cái
        sorter: (a,b) => a.paymentMethod.length - b.paymentMethod.length,
        ...getColumnSearchProps('paymentMethod')
      },
      {
        title: 'Tổng tiền',
        dataIndex: 'totalPrice',
        // Sắp xếp theo bảng chữ cái
        sorter: (a,b) => a.totalPrice.length - b.totalPrice.length,
        ...getColumnSearchProps('totalPrice')
      },
      
      // {
      //   title: 'Chức năng',
      //   dataIndex: 'action',
      //   render: renderAction,
      // },
    ];
    const dataTable = orders?.data.length && orders?.data.map((order) =>{
      // console.log('order', order)
      return {...order, key:order._id, userName: order?.shippingAddress?.fullName, phone: order?.shippingAddress?.phone,
        address: order?.shippingAddress?.address, paymentMethod: orderContant.payment[order?.paymentMethod],
        isPaid: order?.isPaid ? 'TRUE' : 'FALSE', isDelivered: order?.isDelivered ? 'TRUE' : 'FALSE',
        totalPrice: convertPrice(order?.totalPrice)
       }
    })

    // useEffect(()=>{
    //   if(isSuccess && data?.status ==='OK'){
    //     message.success('Tạo sản phẩm thành công')
    //     handleCancel()
    //   } else if(isError) {
    //     message.error('Có lỗi trong quá trình tạo sản phẩm')
    //   }
    // },[isSuccess])

    // useEffect(()=>{
    //   if(isSuccessUpdated && dataUpdated?.status ==='OK'){
    //     message.success('Chỉnh sửa thông tin thành công')
    //     handleCloseDrawer()
    //   } else if(isErrorUpdated) {
    //     message.error('Có lỗi trong quá trình chỉnh sửa')
    //   }
    // },[isSuccessUpdated])

    // useEffect(()=>{
    //   if(isSuccessDeleted && dataDeleted?.status ==='OK'){
    //     message.success('Xóa tài khoản thành công')
    //     handleCancelDelete()
    //   } else if(isErrorDeleted) {
    //     message.error('Có lỗi trong quá trình xóa tài khoản')
    //   }
    // },[isSuccessDeleted])

    // useEffect(()=>{
    //   if(isSuccessDeletedMany && dataDeletedMany?.status ==='OK'){
    //     message.success('Xóa tài khoản thành công')
    //     // handleCancel()
    //   } else if(isErrorDeletedMany) {
    //     message.error('Có lỗi trong quá trình xóa tài khoản')
    //   }
    // },[isSuccessDeletedMany])

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

      // const handleDeleteUser = () => {
      //     mutationDeleted.mutate({id: rowSelected, token: user?.access_token},{
      //       // Cập nhật lại table sau khi xóa sản phẩm
      //       onSettled:()=>{
      //         queryUser.refetch()
      //       }
      //     })
      // }

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

    // const onFinish=() =>{
    //     mutation.mutate(stateUser,{
    //       // Cập nhật table lại liền sau khi create
    //         onSettled:()=>{
    //           queryUser.refetch()
    //         }
    //     })
    //     // console.log('stateP', stateProduct)
    // }

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

// const onUpdateUser = () =>{

//   mutationUpdate.mutate({id:rowSelected, token: user.access_token, ...stateUserDetails },{
//     // Cập nhật table lại liền sau khi update
//       onSettled:()=>{
//         queryUser.refetch()
//       }
//   })

// }

// const handleDeleteManyUsers = (ids) =>{
//   // console.log('_id', {_id})

//   mutationDeletedMany.mutate({ids: ids, token: user?.access_token},{
//     // Cập nhật lại table sau khi xóa sản phẩm
//     onSettled:()=>{
//       queryUser.refetch()
//     }
//   })
// }
    return (
        <div>
            <WrapperHeader>Quản lý đơn hàng</WrapperHeader>
           <div style={{height:'200px', width:'200px'}}>
           <PieChartComponent data={orders?.data} />
           </div>
            {/* <div style={{marginTop:'10px'}}>
            <Button onClick={showModal}  style={{height:'50px',width:'50px', borderRadius:'6px', borderStyle:'dashed'}}><PlusOutlined /></Button>
            </div> */}
            <div style={{marginTop:'20px'}}>
              {/* Đưa tên cột và data trong table qua */}
          <TableComponent columns={columns} isPending={isPendingOders} data={dataTable} onRow={(record, rowIndex) => {
    return {
      // onRow này dùng để lấy ra được cái id của sản phẩm khi click vào
      onClick: (event) => {
        setRowSelected(record._id)
      }
      
    };
  }}/>
          </div>
     
     

      {/* <ModalComponent  title="Xoá tài khoản" open={isModalOpenDelete} onCancel={handleCancelDelete} onOk={handleDeleteUser} >
          <Loading isPending={isPendingDeleted}>
        <div>Bạn có chắc muốn xóa tài khoản này không?</div>
          </Loading>
      </ModalComponent> */}
        </div>
    )
}

export default OrderAdmin
