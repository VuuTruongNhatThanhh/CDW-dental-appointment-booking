import React, { useEffect, useRef, useState } from "react";
import { WrapperHeader, WrapperUploadFile } from "./style";
import { Button, Form, Modal, Select, Space, message } from "antd";
import {PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined} from '@ant-design/icons'
import TableComponent from "../TableComponent/TableComponent";
import InputComponent from "../InputComponent/InputComponent";
import { getBase64, renderOptions } from "../../utils";
import { useMutationHooks } from "../../hooks/useMutationHook";
import * as ProductService from '../../services/ProductService'
import Loading from "../LoadingComponent/Loading";
import { useQuery } from "@tanstack/react-query";
import DrawerComponent from "../DrawerComponent/DrawerComponent";
import { useSelector } from "react-redux";
import ModalComponent from "../ModalComponent/ModalComponent";

const AdminProduct = () =>{
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [rowSelected, setRowSelected] = useState('')
    const [isOpenDrawer, setIsOpenDrawer] = useState(false)
    const [isPendingUpdate, setIsPendingUpdate] = useState(false)
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)
    const [typeSelect, setTypeSelect] = useState('')

    // Lấy thông tin user từ Redux
    const user = useSelector((state) => state?.user)

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
     // Dùng trong handleCancel
     const initial = () =>({
      name: '',
      price: '',
      description: '',
      rating: '',
      image:'',
      type:'',
      countInStock:'',
      newType:'',
      discount:''
     })
     const [form] = Form.useForm()
    const [stateProduct, setStateProduct] = useState(initial())

    const [stateProductDetails, setStateProductDetails] = useState({
      name: '',
      price: '',
      description: '',
      rating: '',
      image:'',
      type:'',
      countInStock:'',
      discount:''
  })

   

    const mutation = useMutationHooks(
      (data) => {
          const{name, price, description, rating, image, type, countInStock, discount} = data
          // Trả về dữ liệu nghĩa là mutation thành công isSuccess
         return ProductService.createProduct({name, price, description, rating, image, type, countInStock, discount})
      }
    )

    const mutationUpdate = useMutationHooks(
      (data) => {
          const{id, token, ...rests} = data
          // Trả về dữ liệu nghĩa là mutation thành công isSuccess
         return ProductService.updateProduct(id, token, {...rests})
      }
    )

    const mutationDeleted = useMutationHooks(
      (data) => {
          const{id, token} = data
          // Trả về dữ liệu nghĩa là mutation thành công isSuccess
         return ProductService.deleteProduct(id, token)
      }
    )

    const mutationDeletedMany = useMutationHooks(
      (data) => {
        // ... vì có nhiều id
          const{ token, ...ids} = data
          // Trả về dữ liệu nghĩa là mutation thành công isSuccess
         return ProductService.deleteManyProduct(ids, token)
      }
    )

    // console.log('deleteManyP',mutationDeletedMany)

    const getAllProduct = async() =>{
      const res = await ProductService.getAllProduct()
      // console.log('res',res)
      return res
    }

    const fetchGetDetailsProduct = async ()=>{
      const res = await ProductService.getDetailsProduct(rowSelected)
      // console.log('res', res)
      // nếu có data thì hiển thị thông tin sản phẩm khi bấm vào chỉnh sửa
      if(res?.data){
        setStateProductDetails({
          name: res?.data?.name,
          price: res?.data?.price,
          description: res?.data?.description,
          rating: res?.data?.rating,
          image: res?.data?.image,
          type: res?.data?.type,
          countInStock: res?.data?.countInStock,
          discount: res?.data?.discount
        })
      }
      setIsPendingUpdate(false)
    }

    //Cái useEffect này để hiển thị thông tin sản phẩm trong form sau khi bấm vào chỉnh sửa
    useEffect(()=>{
      // Khắc phục cái lỗi khi sửa xong tạo bị lỗi
      if(!isModalOpen) {
        form.setFieldsValue(stateProductDetails)
      }else{
        form.setFieldsValue(initial())
      }
      
    },[form, stateProductDetails, isModalOpen])

    // Khắc phục cái lỗi khi lần đầu tiên nhấn vào chỉnh sửa sản phẩm thì không lấy được id
    useEffect(()=>{
        if(rowSelected && isOpenDrawer){
          setIsPendingUpdate(true)
          fetchGetDetailsProduct(rowSelected)
        }

    }, [rowSelected, isOpenDrawer])

    // console.log('statePDetail', stateProductDetails)

    const handleDetailProduct = () =>{
      // Hiển thị được cái id khi click vào
      // console.log('rowSelected', rowSelected)


      
      setIsOpenDrawer(true)
    }

    const fetchAllTypeProduct = async () =>{
      const  res = await ProductService.getAllTypeProduct()
     return res
    
    }
    

    const { data, isPending, isSuccess, isError } = mutation
    const { data: dataUpdated, isPending: isPendingUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate
    const { data: dataDeleted, isPending: isPendingDeleted, isSuccess: isSuccessDeleted, isError: isErrorDeleted } = mutationDeleted
    const { data: dataDeletedMany, isPending: isPendingDeletedMany, isSuccess: isSuccessDeletedMany, isError: isErrorDeletedMany } = mutationDeletedMany
    // console.log('dataUpdated', dataUpdated)
    // const {isPending: isPendingProducts, data: products} = useQuery(['products'],getAllProduct)
    const queryProduct = useQuery({
      queryKey: ['products'],
      queryFn: getAllProduct
    })
    const typeProduct = useQuery({
      queryKey: ['type-product'],
      queryFn: fetchAllTypeProduct
    })
    // console.log('product', products)
    // console.log('type-product', typeProduct)

    const { isPending: isPendingProducts, data: products } = queryProduct

    const renderAction = () =>{
      return (
        <div>
          <EditOutlined style={{color:'orange', fontSize:'20px', cursor:'pointer', marginRight:'10px'}} onClick={handleDetailProduct} />
          <DeleteOutlined style={{color:'red', fontSize:'20px', cursor:'pointer'}} onClick={() => setIsModalOpenDelete(true)}/>
          
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

    const columns = [
      {
        title: 'Tên sản phẩm',
        dataIndex: 'name',
        // Sắp xếp theo bảng chữ cái
        sorter: (a,b) => a.name.length - b.name.length,
        ...getColumnSearchProps('name')
      },
      {
        title: 'Giá tiền',
        dataIndex: 'price',
        sorter: (a,b) => a.price - b.price,
        filters: [
          {
            text: '>=50',
            value: '>=',
          },
          {
            text: '<50',
            value: '<',
          },
        ],
        onFilter: (value, record) => {
          // console.log('value', {value, record})
          if(value ==='>='){
            return record.price >=50
          }
          return record.price<50
        },
      },
      {
        title: 'Đánh giá',
        dataIndex: 'rating',
        sorter: (a,b) => a.rating - b.rating,
        filters: [
          {
            text: '>=4',
            value: '>=',
          },
          {
            text: '<4',
            value: '<',
          },
        ],
        onFilter: (value, record) => {
          // console.log('value', {value, record})
          if(value ==='>='){
            // return record.rating >=4
            return Number(record.rating) >=4
          }
          return  Number(record.rating) <4
        },
      },
      {
        title: 'Loại sản phẩm',
        dataIndex: 'type',

      },
      {
        title: 'Chức năng',
        dataIndex: 'action',
        render: renderAction,
      },
    ];
    const dataTable = products?.data.length && products?.data.map((product) =>{
      return {...product, key:product._id}
    })

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
      if(isSuccessDeleted && dataDeleted?.status ==='OK'){
        message.success('Xóa sản phẩm thành công')
        handleCancelDelete()
      } else if(isErrorDeleted) {
        message.error('Có lỗi trong quá trình xóa sản phẩm')
      }
    },[isSuccessDeleted])

    useEffect(()=>{
      if(isSuccessDeletedMany && dataDeletedMany?.status ==='OK'){
        message.success('Xóa sản phẩm thành công')
        // handleCancel()
      } else if(isErrorDeletedMany) {
        message.error('Có lỗi trong quá trình xóa sản phẩm')
      }
    },[isSuccessDeletedMany])

    

    const showModal = () => {
        setIsModalOpen(true);
      };
    

    const handleCancel = () => {
        setIsModalOpen(false);
        setStateProduct({
          name: '',
          price: '',
          description: '',
          rating: '',
          image:'',
          type:'',
          countInStock:'',
          discount:''
        })
        form.resetFields()
      };

      const handleCancelDelete =()=>{
        setIsModalOpenDelete(false)
      }

      const handleDeleteProduct = () => {
          mutationDeleted.mutate({id: rowSelected, token: user?.access_token},{
            // Cập nhật lại table sau khi xóa sản phẩm
            onSettled:()=>{
              queryProduct.refetch()
            }
          })
      }

      const handleCloseDrawer = () => {
       setIsOpenDrawer(false)
        setStateProductDetails({
          name: '',
          price: '',
          description: '',
          rating: '',
          image:'',
          type:'',
          countInStock:''
        })
        form.resetFields()
      };

    const onFinish=() =>{
      const params = {
        name: stateProduct.name,
        price: stateProduct.price,
        description: stateProduct.description,
        rating: stateProduct.rating,
        image:stateProduct.image,
        type:stateProduct.type === 'add_type' ? stateProduct.newType : stateProduct.type,
        countInStock:stateProduct.countInStock,
        discount: stateProduct.discount
      }
        mutation.mutate(params,{
          // Cập nhật table lại liền sau khi create
            onSettled:()=>{
              queryProduct.refetch()
            }
        })
        // console.log('stateP', stateProduct)
    }

    const handleOnChange =(e)=>{
        // name sẽ trùng với name của input
        // value sẽ là giá trị của bàn phím nhập vào
        // console.log('e.target.name', e.target.name, e.target.value)


        // Mỗi sản phẩm sẽ là 1 stateProduct, set từng name ứng với từng thuộc tính và giá trị nhập vào (mở console là hiểu)
        setStateProduct({
            ...stateProduct,
            [e.target.name]:e.target.value
        })
    }

    const handleOnChangeDetails =(e)=>{
      // name sẽ trùng với name của input
      // value sẽ là giá trị của bàn phím nhập vào
      // console.log('e.target.name', e.target.name, e.target.value)


      // Mỗi sản phẩm sẽ là 1 stateProduct, set từng name ứng với từng thuộc tính và giá trị nhập vào (mở console là hiểu)
      setStateProductDetails({
          ...stateProductDetails,
          [e.target.name]:e.target.value
      })
  }

    const handleOnChangeAvatar = async({fileList}) =>{
      const file = fileList[0]
      if(!file.url && !file.preview){
          file.preview = await getBase64(file.originFileObj);
      }
      setStateProduct({
        ...stateProduct,
        image: file.preview
      })
  }

  const handleOnChangeAvatarDetails = async({fileList}) =>{
    const file = fileList[0]
    if(!file.url && !file.preview){
        file.preview = await getBase64(file.originFileObj);
    }
    setStateProductDetails({
      ...stateProductDetails,
      image: file.preview
    })
}

const onUpdateProduct = () =>{

  mutationUpdate.mutate({id:rowSelected, token: user.access_token, ...stateProductDetails },{
    // Cập nhật table lại liền sau khi update
      onSettled:()=>{
        queryProduct.refetch()
      }
  })

}

const handleDeleteManyProducts = (ids) =>{
  // console.log('_id', {_id})

  mutationDeletedMany.mutate({ids: ids, token: user?.access_token},{
    // Cập nhật lại table sau khi xóa sản phẩm
    onSettled:()=>{
      queryProduct.refetch()
    }
  })
}

const handleChangeSelect = (value) =>{
  // value sẽ là cái giá trị của type khi nhấn vào
  // console.log('value', value)
    setStateProduct({
      ...stateProduct,
      type: value
    })
}


    return (
        <div>
            <WrapperHeader>Quản lý sản phẩm</WrapperHeader>
            <div style={{marginTop:'10px'}}>
            <Button onClick={showModal} style={{height:'50px',width:'50px', borderRadius:'6px', borderStyle:'dashed'}} ><PlusOutlined /></Button>
            </div>
            <div style={{marginTop:'20px'}}>
              {/* Đưa tên cột và data trong table qua */}
          <TableComponent handleDeleteMany={handleDeleteManyProducts} columns={columns} isPending={isPendingProducts} data={dataTable} onRow={(record, rowIndex) => {
    return {
      // onRow này dùng để lấy ra được cái id của sản phẩm khi click vào
      onClick: (event) => {
        setRowSelected(record._id)
      }
      
    };
  }}/>
          </div>
          <ModalComponent forceRender title="Tạo mới sản phẩm" open={isModalOpen} onCancel={handleCancel} footer={null} >
          <Loading isPending={isPending}>
          <Form
    name="basic"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    style={{ maxWidth: 600 }}
    onFinish={onFinish}
    autoComplete="on"
    // truyền cho nó form để sử dụng form trong handleCancel
    form={form}
  >
    <Form.Item
      label="Tên sản phẩm"
      name="name"
      rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm" }]}
    >
        {/* name phải trùng với giá trị stateProduct phía trên */}
      <InputComponent value={stateProduct.name} onChange={handleOnChange} name="name" />
    </Form.Item>

    <Form.Item
      label="Loại sản phẩm"
      name="type"
      rules={[{ required: true, message: 'Vui lòng chọn loại sản phẩm' }]}
    >
     
      <Select
// Ngược lại với cái ở dưới
      name="type"
      // defaultValue="lucy"
      // style={{ width: 120 }}
      value={stateProduct.type}
      onChange={handleChangeSelect}
      options={renderOptions(typeProduct?.data?.data)}
    />
   
     
         {/* <InputComponent value={stateProduct.type} onChange={handleOnChange} name="type" /> */}
    
    
    </Form.Item>

    {stateProduct.type === 'add_type' && (
    <Form.Item
    label='Nhập loại sản phẩm'
      name="newType"
      rules={[{ required: true, message: 'Vui lòng chọn loại sản phẩm' }]}
    >
     
     
 
         <InputComponent value={stateProduct.newType} onChange={handleOnChange} name="newType" />
    
    
    </Form.Item>
)}
    <Form.Item
      label="Số lượng"
      name="countInStock"
      rules={[{ required: true, message: 'Vui lòng nhập số lượng' }]}
    >
      <InputComponent value={stateProduct.countInStock} onChange={handleOnChange} name="countInStock" />
    </Form.Item>

    <Form.Item
      label="Giá tiền"
      name="price"
      rules={[{ required: true, message: 'Vui lòng nhập giá tiền' }]}
    >
      <InputComponent value={stateProduct.price} onChange={handleOnChange} name="price" />
    </Form.Item>

    <Form.Item
      label="Mô tả sản phẩm"
      name="description"
      rules={[{ required: true, message: 'Vui lòng nhập mô tả sản phẩm' }]}
    >
      <InputComponent value={stateProduct.description} onChange={handleOnChange} name="description" />
    </Form.Item>

    <Form.Item
      label="Đánh giá"
      name="rating"
      rules={[{ required: true, message: 'Vui lòng nhập đánh giá' }]}
    >
      <InputComponent value={stateProduct.rating} onChange={handleOnChange} name="rating" />
    </Form.Item>

    <Form.Item
      label="Giảm giá"
      name="discount"
      rules={[{ required: false, message: 'Vui lòng nhập đánh giá' }]}
    >
      <InputComponent value={stateProduct.discount} onChange={handleOnChange} name="discount" />
    </Form.Item>

    <Form.Item
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

    </Form.Item>
  
    <Form.Item wrapperCol={{ offset: 18, span: 16 }}>
      <Button type="primary" htmlType="submit">
        Tạo sản phẩm
      </Button>
    </Form.Item>
  </Form>
          </Loading>
      </ModalComponent>
      <DrawerComponent title="Chỉnh sửa thông tin sản phẩm" isOpen={isOpenDrawer} onClose={()=> setIsOpenDrawer(false)} width="70%">
      <Loading isPending={isPendingUpdate || isPendingUpdated}>
          <Form
    name="basic"
    labelCol={{ span: 6 }}
    wrapperCol={{ span: 18 }}
    style={{ maxWidth: 600 }}
    onFinish={onUpdateProduct}
    autoComplete="on"
    form={form}
  >
    <Form.Item
      label="Tên sản phẩm"
      name="name"
      rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm" }]}
    >
        {/* name phải trùng với giá trị stateProduct phía trên */}
      <InputComponent value={stateProductDetails.name} onChange={handleOnChangeDetails} name="name" />
    </Form.Item>

    <Form.Item
      label="Loại sản phẩm"
      name="type"
      rules={[{ required: true, message: 'Vui lòng chọn loại sản phẩm' }]}
    >
      <InputComponent value={stateProductDetails.type} onChange={handleOnChangeDetails} name="type" />
    </Form.Item>

    <Form.Item
      label="Số lượng"
      name="countInStock"
      rules={[{ required: true, message: 'Vui lòng nhập số lượng' }]}
    >
      <InputComponent value={stateProductDetails.countInStock} onChange={handleOnChangeDetails} name="countInStock" />
    </Form.Item>

    <Form.Item
      label="Giá tiền"
      name="price"
      rules={[{ required: true, message: 'Vui lòng nhập giá tiền' }]}
    >
      <InputComponent value={stateProductDetails.price} onChange={handleOnChangeDetails} name="price" />
    </Form.Item>

    <Form.Item
      label="Mô tả sản phẩm"
      name="description"
      rules={[{ required: true, message: 'Vui lòng nhập mô tả sản phẩm' }]}
    >
      <InputComponent value={stateProductDetails.description} onChange={handleOnChangeDetails} name="description" />
    </Form.Item>

    <Form.Item
      label="Đánh giá"
      name="rating"
      rules={[{ required: true, message: 'Vui lòng nhập đánh giá' }]}
    >
      <InputComponent value={stateProductDetails.rating} onChange={handleOnChangeDetails} name="rating" />
    </Form.Item>

    <Form.Item
      label="Giảm giá"
      name="discount"
      rules={[{ required: false, message: 'Vui lòng nhập đánh giá' }]}
    >
      <InputComponent value={stateProductDetails.discount} onChange={handleOnChangeDetails} name="discount" />
    </Form.Item>

    <Form.Item
      label="Hình ảnh"
      name="image"
      rules={[{ required: true, message: 'Vui lòng chọn hình ảnh cho sản phẩm' }]}
    >
       <WrapperUploadFile onChange={handleOnChangeAvatarDetails} maxCount={1}>
                            <Button>Chọn ảnh</Button>
                            {stateProductDetails?.image &&(
                        <img src={stateProductDetails?.image} style={{
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

      <ModalComponent  title="Xoá sản phẩm" open={isModalOpenDelete} onCancel={handleCancelDelete} onOk={handleDeleteProduct} >
          <Loading isPending={isPendingDeleted}>
        <div>Bạn có chắc muốn xóa sản phẩm này không?</div>
          </Loading>
      </ModalComponent>
        </div>
    )
}

export default AdminProduct