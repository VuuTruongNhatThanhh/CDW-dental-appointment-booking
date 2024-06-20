import AdminPage from "../pages/AdminPage/AdminPage";
import DetailsOrderPage from "../pages/DetailsOrderPage/DetailsOrderPage";
import HomePage from "../pages/HomePage/HomePage";
import MyOrder from "../pages/MyOrderPage/MyOrder";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import OrderPage from "../pages/OrderPage/OrderPage";
import OrderSuccess from "../pages/OrderSuccess/OrderSuccess";
import PaymentPage from "../pages/PaymentPage/PaymentPage";
import ProductDetailPage from "../pages/ProductDetailPage/ProductDetailPage";
import ProductsPage from "../pages/ProductsPage/ProductsPage";
import ProfilePage from "../pages/Profile/ProfilePage";
import SignInPage from "../pages/SignInPage/SignInPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import TypeProductPage from "../pages/TypeProductPage/TypeProductPage";
import MakeAppointmentPage from "../pages/MakeAppointmentPage/MakeAppointmentPage";
import DoctorPage from "../pages/DoctorPage/DoctorPage";
import DoctorDetailPage from "../pages/DoctorDetailPage/DoctorDetailPage";
import MyAppointmentPage from "../pages/MyAppointmentPage/MyAppointmentPage";
import DoctorSchedulePage from "../pages/DoctorSchedulePage/DoctorSchedulePage";
import DoctorAppointmentPage from "../pages/DoctorAppointmentPage/DoctorAppointmentPage";

// import MakeAppointment from "../pages/MakeAppointmentPage/MakeAppointmentPage";

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
        path: '/my-order',
        page: MyOrder,
        isShowHeader: true

    },
    {
        path: '/details-order/:id',
        page: DetailsOrderPage,
        isShowHeader: true
    },
    {
        path: '/payment',
        page: PaymentPage,
        isShowHeader: true

    },
    {
        path: '/orderSuccess',
        page: OrderSuccess,
        isShowHeader: true

    },
    {
        path: '/products',
        page: ProductsPage,
        isShowHeader: true
    },
    {
        path: '/doctors',
        page: DoctorPage,
        isShowHeader: true
    },
    {
        path: '/product/:type',
        page: TypeProductPage,
        isShowHeader: true
    },
    {
        path: '/sign-in',
        page: SignInPage,
        isShowHeader: false
    },
    {
        path: '/sign-up',
        page: SignUpPage,
        isShowHeader: false
    },
    {
        path: '/make-appointment',
        page: MakeAppointmentPage,
        isShowHeader: true
    },
    {
        path: '/profile-user',
        page: ProfilePage,
        isShowHeader: true
    },
    {
        path: '/product-details/:id',
        page: ProductDetailPage,
        isShowHeader: true
    },
    {
        path: '/doctor-details/:id',
        page: DoctorDetailPage,
        isShowHeader: true
    },
    {
        path: '/appointment',
        page: MyAppointmentPage,
        isShowHeader: true
    },
    {
        path: '/schedule',
        page: DoctorSchedulePage,
        isShowHeader: true
    },
    {
        path: '/doctor_appointment',
        page: DoctorAppointmentPage,
        isShowHeader: true
    },
    {
        path: '/system/admin',
        page: AdminPage,
        isShowHeader: false,
        isPrivate: true
    },
    // Khi chọn mấy cái link không có trong đây
    {
        path: '*',
        page: NotFoundPage
    }
]