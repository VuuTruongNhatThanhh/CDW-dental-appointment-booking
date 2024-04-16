import { Image } from "antd";
import React from "react";
import Slider from "react-slick";

// Đưa cái mảng chứa hình ảnh slider vào
const SliderComponent = ({arrImages}) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        // slider tự động chạy
        autoplay: true,
        autoplaySpeed: 3000
      };
    return (
        // preview false để không bấm vô hình được
       <Slider {...settings}>
            {arrImages.map((image) => {
                return (
                    <Image src={image} alt="slider" preview={false} width="100%"/>
                )
            })}
       </Slider>
    )
}

export default SliderComponent