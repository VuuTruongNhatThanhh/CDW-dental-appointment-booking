const UserService = require('../services/UserService')
const JwtService = require('../services/JwtService')

// Controller sẽ gọi qua service
const createUser = async(req, res) => {
    try{
        // Lấy ra những thuộc tính request sau khi send bằng TC
        // req.body mình có thể dùng console log in ra khi nhập thông tin từ json content vào, nó hiển thị ở cmd, hiển thị đầy đủ thuộc tính của user
        const { email, password, confirmPassword} = req.body
        // Kiểm tra xem có phải email hay không (check sau khi nhấn send trong TC)
        const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
        const isCheckEmail = reg.test(email)

        if( !email || !password || !confirmPassword ){
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'

            })
        } else if(!isCheckEmail){
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is email'

            }) 
        } else if (password !== confirmPassword){
            return res.status(200).json({
                status: 'ERR',
                message: 'The password and confirm password is not equal'

            }) 
        }
    //   Nếu không dính các trường hợp trên thì đưa cái request qua bên service (req.body)
      const response =   await UserService.createUser(req.body)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}  

const loginUser = async(req, res) => {
    try{
        // Lấy ra những thuộc tính request sau khi send bằng TC
        const {email, password} = req.body
        // Kiểm tra xem có phải email hay không (check sau khi nhấn send trong TC)
        const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
        const isCheckEmail = reg.test(email)

        if(!email || !password ){
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'

            })
        } else if(!isCheckEmail){
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is email'

            }) 
        } 
    //   Nếu không dính các trường hợp trên thì đưa cái request qua bên service (req.body)
      const response =   await UserService.loginUser(req.body)
    //   Lưu refresh_toke vào một biến riêng và các thông tin còn lại vào 1 biến riêng
    // Cái newResponse không có chứa refresh_token
      const { refresh_token,...newResponse } =response
    //   Đưa cái refresh_token này vào cookie, kiểm tra bằng TC tab cookie
      res.cookie('refresh_token', refresh_token, {
        HttpOnly: true, //chỉ lấy được nó thông qua http, ko lấy được qua js
        Secure: true,  //Thêm những bảo mật ở phía client
      })
      console.log('response',response)

        return res.status(200).json(newResponse)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}  

const updateUser = async(req, res) => {
    try{
        // Lấy ra được cái id từ access token
      const userId = req.params.id
    //   Lấy ra những thông tin cần thay đổi
    const data = req.body
        if(!userId){
            return res.status(200).json({
                status: 'ERR',
                message: 'The userId is required'

            })
        }
    //   console.log('user id', userId)
    
      const response =   await UserService.updateUser(userId, data)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}  

const deleteUser = async(req, res) => {
    try{
        // Lấy ra được cái id từ access token
      const userId = req.params.id
      const token = req.headers
        if(!userId){
            return res.status(200).json({
                status: 'ERR',
                message: 'The userId is required'

            })
        }
    //   console.log('user id', userId)
    
      const response =   await UserService.deleteUser(userId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}  

const getAllUser = async(req, res) => {
    try{
      
    
      const response =   await UserService.getAllUser()
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}  

const getDetailsUser = async(req, res) => {
    try{
        // Lấy ra được cái id từ access token
      const userId = req.params.id
        if(!userId){
            return res.status(200).json({
                status: 'ERR',
                message: 'The userId is required'

            })
        }
    //   console.log('user id', userId)
    
      const response =   await UserService.getDetailsUser(userId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}  

const refreshToken = async(req, res) => {
    try{
        // Lấy ra được cái id từ access token
      const token = req.cookies.refresh_token

        if(!token){
            return res.status(200).json({
                status: 'ERR',
                message: 'The token is required'

            })
        }
    
      const response =   await JwtService.refreshTokenJWTService(token)
        return res.status(200).json(response)
    return 
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}



// Phải export nó ra ngoài mới sử dụng được
module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUser,
    getDetailsUser,
    refreshToken
} 