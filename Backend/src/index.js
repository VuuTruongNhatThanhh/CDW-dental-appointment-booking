const express = require("express");
const dotenv = require("dotenv");
const mongoose  = require("mongoose");
const routes = require("./routes");
const cors = require('cors')
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser')
dotenv.config()

const app = express()
// 3001 cho khong trung voi ben front end
const port = process.env.PORT || 3001

// Chính sách bảo mật của trình duyệt web
app.use(cors())
// Nhận chuỗi json từ dưới user gửi lên
app.use(bodyParser.json())
app.use(cookieParser())
routes(app);



// connect db, file cấu hình được khai báo bên .env
mongoose.connect(`${process.env.MONGO_DB}`)
.then(() => {
    console.log('Connect db success')
})
.catch((err)=> {
    console.log(err)
})



app.listen(port, () => {
    console.log('Server is running in port:',+port)
})