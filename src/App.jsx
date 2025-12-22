import AboutUs from '@/pages/AboutUs/AboutUs.jsx';
import Home from '@/pages/Home/Home.jsx';
import Footer from '@/components/Footer/Footer.jsx';
import { Phone } from 'lucide-react';
import { Route, Routes } from 'react-router-dom';
import Blog from '@/pages/Blog/Blog.jsx';
import CuaHang from '@/pages/CuaHang/CuaHang.jsx';
import Login from '@/pages/Login/Login.jsx';
import Register from '@/pages/Register/Register.jsx';
import User from '@/pages/User/User.jsx';
import Product from '@/pages/Product/Product.jsx';
import LienHe from '@/pages/LienHe/LienHe.jsx';
import TuVan from '@/pages/TuVan/TuVan.jsx';
import UserAddress from '@/pages/User/UserAddress/UserAddress.jsx';
import UserOrder from '@/pages/User/UserOrder/UserOrder.jsx';
import UserProfile from '@/pages/User/UserProfile/UserProfile.jsx';
import Cart from '@/pages/Cart/Cart.jsx';
function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/lien-he" element={<LienHe />} />
            <Route path="/tu-van" element={<TuVan />} />
            <Route path="/cua-hang/:id" element={<CuaHang />} />
            <Route path="/dang-nhap" element={<Login />} />
            <Route path="/dang-ky" element={<Register />} />
            <Route path="/san-pham/:id" element={<Product />} />
            <Route path="/user" element={<User />}>
                <Route index element={<UserAddress />} />
                <Route path="dia-chi" element={<UserAddress />} />
                <Route path="don-hang" element={<UserOrder />} />
                <Route path="tai-khoan" element={<UserProfile />} />
            </Route>
            <Route path="/gio-hang" element={<Cart />} />
        </Routes>
    );
}

export default App;
