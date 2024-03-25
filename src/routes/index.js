import HomePage from "../pages/HomePage/HomePage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import OrderPage from "../pages/OrderPage/OrderPage";
import ProductsPage from "../pages/ProductsPage/ProductsPage";

export const routes = [
    {
        path: '/',
        page: HomePage,
        // Hiện header hay không
        isShowHeader: true
    },
    {
        path: '/order',
        page: OrderPage,
        isShowHeader: true

    },
    {
        path: '/products',
        page: ProductsPage,
        isShowHeader: true
    },
    // Khi chọn mấy cái link không có trong đây
    {
        path: '*',
        page: NotFoundPage
    }
]