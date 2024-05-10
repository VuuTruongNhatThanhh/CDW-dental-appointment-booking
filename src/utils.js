export const isJsonString = (data) => {
    try {
        JSON.parse(data)
    }catch(error){
        return false
    }
   
    return true
}

//Đưa file nhận vào thành một chuỗi base64 (file avatar)
// CHuỗi base64 được lưu trong mongoDB sẽ có thể biến lại thành hình ảnh
export const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
