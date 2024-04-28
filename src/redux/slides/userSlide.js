import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  name: '',
  email: '',
  access_token: ''
}

export const userSlide = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Dùng redux để lấy ra thông tin của user, quản lý nó trên trình duyệt
    updateUser: (state, action)=>{
      const { name, email, access_token } = action.payload
      state.name = name || email;
      state.email = email;
      state.access_token = access_token;
    },
    // Để khi logout reset lại mấy cái này
    resetUser: (state)=>{
     
      state.name = '';
      state.email = '';
      state.access_token = '';
    },
   
  
  },
})

// Action creators are generated for each case reducer function
export const { updateUser, resetUser } = userSlide.actions

export default userSlide.reducer