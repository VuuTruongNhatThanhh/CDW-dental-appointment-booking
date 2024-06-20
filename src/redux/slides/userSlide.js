import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  name: '',
  email: '',
  phone: '',
  address:'',
  avatar:'',
  access_token: '',
  id: '',
  isAdmin: false,
  city:'',
  isDoctor: false
}

export const userSlide = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Dùng redux để lấy ra thông tin của user, quản lý nó trên trình duyệt
    updateUser: (state, action)=>{
      const { name ='', email='', access_token='', address='', phone='', avatar='', _id ='', isAdmin, city='',
        refreshToken ='', isDoctor
       } = action.payload
      state.name = name;
      state.email = email;
      state.address = address;
      state.phone = phone;
      state.avatar = avatar;
      state.id = _id;
      state.access_token = access_token;
      state.isAdmin = isAdmin;
      state.city = city;
      state.refreshToken = refreshToken;
      state.isDoctor = isDoctor;
    },
    // Để khi logout reset lại mấy cái này
    resetUser: (state)=>{
     
      state.name = '';
      state.email = '';
      state.address = '';
      state.phone = '';
      state.avatar = '';
      state.id = '';
      state.access_token = '';
      state.isAdmin= false;
      state.city = ''
    },
   
  
  },
})

// Action creators are generated for each case reducer function
export const { updateUser, resetUser } = userSlide.actions

export default userSlide.reducer