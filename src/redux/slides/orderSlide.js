import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  orderItems: [],
  orderItemsSlected: [],
  shippingAddress: {
  },
  paymentMethod: '',
  itemsPrice: 0,
  shippingPrice: 0,
  taxPrice: 0,
  totalPrice: 0,
  user: '',
  isPaid: false,
  paidAt: '',
  isDelivered: false,
  deliveredAt: '',
  isSucessOrder: false,

}

export const orderSlide = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addOrderProduct: (state, action) => {
      // console.log({state, action})
      // lấy ra cái orderItem của action payload
      const {orderItem} = action.payload
      // console.log('oderItem', orderItem)
      // Xem coi sản phẩm đã có trong giỏ hàng chưa, nếu có rồi thì tăng số lượng
      // state là đưa vô cái console redux
      const itemOrder = state?.orderItems?.find((item) => item?.product === orderItem.product)
      if(itemOrder){
        if(itemOrder.amount <= itemOrder.countInstock) {
          itemOrder.amount += orderItem?.amount
          state.isSucessOrder = true
          state.isErrorOrder = false
        }
      }else {
        // Chưa có thì thêm vào
        state.orderItems.push(orderItem)
      }
    },
    resetOrder: (state) => {
      state.isSucessOrder = false
    },
    // Cái idProduct được truyền qua từ trang OrderPage
    increaseAmount: (state, action) => {
      const {idProduct} = action.payload
      // console.log(action.payload)
      // console.log('idP', idProduct)
      const itemOrder = state?.orderItems?.find((item) => item?.product === idProduct)
      const itemOrderSelected = state?.orderItemsSlected?.find((item) => item?.product === idProduct)
      itemOrder.amount++;
      if(itemOrderSelected) {
        itemOrderSelected.amount++;
      }
    },
    decreaseAmount: (state, action) => {
      const {idProduct} = action.payload
      const itemOrder = state?.orderItems?.find((item) => item?.product === idProduct)
      const itemOrderSelected = state?.orderItemsSlected?.find((item) => item?.product === idProduct)
      itemOrder.amount--;
      if(itemOrderSelected) {
        itemOrderSelected.amount--;
      }
    },
    removeOrderProduct: (state, action) => {
      const {idProduct} = action.payload
      // kiếm cái id bị bấm delete xem nó trùng cái nào với cái đang trong giỏ hàng, rồi gán giỏ hàng mới bằng mấy cái khác với cái id đó
      const itemOrder = state?.orderItems?.filter((item) => item?.product !== idProduct)
      const itemOrderSeleted = state?.orderItemsSlected?.filter((item) => item?.product !== idProduct)

      state.orderItems = itemOrder;
      state.orderItemsSlected = itemOrderSeleted;
    },
    removeAllOrderProduct: (state, action) => {
      const {listChecked} = action.payload
      
      // bỏ đi những cái có trong listcheck, giữ lại những cái không có
      const itemOrders = state?.orderItems?.filter((item) => !listChecked.includes(item.product))
      const itemOrdersSelected = state?.orderItems?.filter((item) => !listChecked.includes(item.product))
      state.orderItems = itemOrders
      state.orderItemsSlected = itemOrdersSelected

    },
    selectedOrder: (state, action) => {
      const {listChecked} = action.payload
      const orderSelected = []
      state.orderItems.forEach((order) => {
        if(listChecked.includes(order.product)){
          orderSelected.push(order)
        };
      });
      state.orderItemsSlected = orderSelected
    }
  },
})

// Action creators are generated for each case reducer function
export const { addOrderProduct,increaseAmount,decreaseAmount,removeOrderProduct,removeAllOrderProduct, selectedOrder,resetOrder } = orderSlide.actions

export default orderSlide.reducer