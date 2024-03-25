import React from "react";
import HeaderComponent from "../HeaderComponent/HeaderComponent";

const DefaultComponent = ({children}) => {
    return (
        <div>
            {/* Hiện header và các thẻ con ở dưới khác */}
            <HeaderComponent />
            {children}
        </div>
    )
}

export default DefaultComponent   