import React from 'react';
import './PopupStyles.css';
import { convertPrice } from '../../utils';

const Popup = ({ onClose, type, products }) => {
    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <h2>{type}</h2>
                <button onClick={onClose}>Close</button>
                <table className="custom-table">
                    <thead>
                        <tr>
                            <th>Dịch vụ</th>
                            <th>ĐVT</th>
                            <th>Giá tiền (VND)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product._id}>
                                <td>{product.name}</td>
                                <td>{product.unit}</td>
                                <td>{convertPrice(product.price)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Popup;
