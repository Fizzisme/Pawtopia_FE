import Header from '@/components/Header/Header.jsx';
import CurrentPage from '@/components/CurrentPage/CurrentPage.jsx';
import Help from '@/components/Help/Help.jsx';
import Footer from '@/components/Footer/Footer.jsx';
import { Package, MapPin, PackagePlus, User as UserIcon, Wallet, LogOut } from 'lucide-react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import Product from '@/pages/Product/Product.jsx'; // Thêm useLocation, Outlet

export default function User() {
    const navigate = useNavigate();
    const location = useLocation(); // Lấy đường dẫn hiện tại

    const user = JSON.parse(localStorage.getItem('User'));

    const handleLogout = () => {
        localStorage.removeItem('User');
        alert('Đăng xuất thành công');
        navigate('/');
    };

    // Hàm kiểm tra active dựa trên URL
    // path: đường dẫn con tương ứng
    const isActive = (path) => {
        if (path === '') {
            // Logic cho trang mặc định /user (nếu bạn muốn nó active tab Địa chỉ)
            return location.pathname === '/user' || location.pathname === '/user/dia-chi';
        }
        return location.pathname.includes(path);
    };

    const navItems = [
        {
            icon: <Package size={28} />,
            label: 'Đơn Hàng',
            path: 'don-hang', // Đường dẫn con
            onClick: () => navigate('/user/don-hang'),
        },
        {
            icon: <MapPin size={28} />,
            label: 'Địa chỉ',
            path: 'dia-chi',
            onClick: () => navigate('/user/dia-chi'),
        },
        {
            icon: <UserIcon size={28} />,
            label: 'Tài Khoản',
            path: 'tai-khoan',
            onClick: () => navigate('/user/tai-khoan'),
        },
        user?.role === 'Admin' && {
            icon: <PackagePlus size={28} />,
            label: 'Sản Phẩm',
            path: 'san-pham',
            onClick: () => navigate('/user/san-pham'),
        },
        {
            icon: <LogOut size={28} />,
            label: 'Đăng Xuất',
            path: 'logout',
            onClick: handleLogout,
        },
    ].filter(Boolean);
    const gridCols = navItems.length === 5 ? 'grid-cols-2 md:grid-cols-5' : 'grid-cols-2 md:grid-cols-4';
    return (
        <div>
            <Header />
            <CurrentPage />

            <div className="relative">
                {/* Background hình thú cưng */}
                <div
                    className="h-[350px] w-full bg-cover bg-center opacity-80"
                    style={{
                        backgroundImage: `url('https://img.freepik.com/free-vector/seamless-pattern-with-cute-pets_23-2148532450.jpg')`,
                    }}
                >
                    <div className="w-full h-full bg-yellow-100/30"></div>
                </div>

                {/* Các thẻ Menu (Cards) */}
                <div className="absolute" style={{ padding: '0 100px', bottom: '-100px', left: '0', right: '0' }}>
                    <div className={`grid grid-cols-2 ${gridCols} gap-4`}>
                        {navItems.map((item, index) => {
                            // Kiểm tra active
                            const active = item.path === 'logout' ? false : isActive(item.path);

                            return (
                                <div
                                    onClick={item.onClick}
                                    key={index}
                                    className={`aspect-square flex flex-col items-center justify-center rounded-3xl shadow-sm border transition-all cursor-pointer bg-white hover:shadow-md hover:-translate-y-1
                                    ${active ? 'border-pink-300 ring-2 ring-pink-50' : 'border-gray-100'}`}
                                    style={{ padding: '16px' }}
                                >
                                    {/* Vòng tròn chứa Icon */}
                                    <div
                                        className={`w-14 h-14 rounded-full flex items-center justify-center mb-3 transition-colors
                                        ${active ? 'bg-pink-500 text-white' : 'bg-pink-100 text-pink-400'}`}
                                    >
                                        {item.icon}
                                    </div>

                                    {/* Chữ */}
                                    <div className="text-center">
                                        <p
                                            className={`font-bold text-sm md:text-base leading-tight ${
                                                active ? 'text-pink-600' : 'text-pink-300'
                                            }`}
                                        >
                                            {item.label}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Phần nội dung chính thay đổi dynamic bằng Outlet */}
            <main className="" style={{ marginTop: '120px', padding: '0 100px' }}>
                <Outlet />
            </main>

            <Help />
            <Footer />
        </div>
    );
}
