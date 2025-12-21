import Header from '@/components/Header/Header.jsx';
import CurrentPage from '@/components/CurrentPage/CurrentPage.jsx';
import Help from '@/components/Help/Help.jsx';
import Footer from '@/components/Footer/Footer.jsx';
import { Package, MapPin, User as UserIcon, Wallet, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function AddressCard({ title, editLabel, name, address, ward, city }) {
    return (
        <div className="bg-white border border-gray-100 shadow-sm rounded-sm overflow-hidden">
            <div className="p-6" style={{ padding: '24px' }}>
                <div className="flex justify-between items-start" style={{ marginBottom: '24px' }}>
                    <h3 className="text-2xl font-bold text-[#2D1B4D]">{title}</h3>
                    <button className="text-xs text-gray-400 hover:text-pink-500 transition-colors">{editLabel}</button>
                </div>

                <div className="space-y-1 text-gray-500 italic text-sm">
                    <p>{name}</p>
                    <p>{address}</p>
                    <p>{ward}</p>
                    <p>{city}</p>
                </div>
            </div>
        </div>
    );
}

export default function User() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('User');
        alert('Đăng xất thành công');
        navigate('/');
    };
    const navItems = [
        { icon: <Package size={28} />, label: 'Đơn Hàng', active: false },
        { icon: <MapPin size={28} />, label: 'Địa chỉ', active: true },
        { icon: <UserIcon size={28} />, label: 'Tài Khoản', active: false },
        { icon: <LogOut size={28} />, label: 'Đăng Xuất', active: false, onClick: handleLogout },
    ];

    return (
        <div>
            <Header />
            <CurrentPage />
            <div className="relative">
                {/* Background hình thú cưng (Bạn thay URL hình của bạn vào đây) */}
                <div
                    className="h-[350px] w-full bg-cover bg-center opacity-80"
                    style={{
                        backgroundImage: `url('https://img.freepik.com/free-vector/seamless-pattern-with-cute-pets_23-2148532450.jpg?t=st=1715674000~exp=1715677600~hmac=...')`,
                    }}
                >
                    <div className="w-full h-full bg-yellow-100/30"></div>
                </div>

                {/* Các thẻ Menu (Cards) */}
                <div className="absolute" style={{ padding: '0 100px', bottom: '-100px', left: '0', right: '0' }}>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {navItems.map((item, index) => (
                            <div
                                onClick={item?.onClick}
                                key={index}
                                className={`aspect-square flex flex-col items-center justify-center rounded-3xl shadow-sm border transition-all cursor-pointer bg-white hover:shadow-md hover:-translate-y-1
                ${item.active ? 'border-pink-300 ring-2 ring-pink-50' : 'border-gray-100'}`}
                                style={{ padding: '16px' }}
                            >
                                {/* Vòng tròn chứa Icon */}
                                <div
                                    className={`w-14 h-14 rounded-full flex items-center justify-center mb-3 transition-colors
                ${item.active ? 'bg-pink-500 text-white' : 'bg-pink-100 text-pink-400'}`}
                                >
                                    {item.icon}
                                </div>

                                {/* Chữ */}
                                <div className="text-center">
                                    <p
                                        className={`font-bold text-sm md:text-base leading-tight ${
                                            item.active ? 'text-pink-600' : 'text-pink-300'
                                        }`}
                                    >
                                        {item.label}
                                    </p>
                                    {item.subLabel && (
                                        <p className="text-xs font-medium text-pink-400 mt-1">{item.subLabel}</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Phần nội dung chính (Địa chỉ) */}
            <main className="" style={{ marginTop: '120px', padding: '0 100px' }}>
                <p className="text-gray-400 text-sm mb-8 italic" style={{ marginBottom: '12px' }}>
                    Các địa chỉ bên dưới mặc định sẽ được sử dụng ở trang thanh toán sản phẩm.
                </p>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Địa chỉ giao hàng */}
                    <AddressCard
                        title="Địa chỉ giao hàng"
                        editLabel="Sửa Địa chỉ giao hàng"
                        name="Mạnh"
                        address="sdasdasdasdasdasdasd"
                        ward="Phường An Hội Đông"
                        city="Thành phố Hồ Chí Minh"
                    />
                </div>
            </main>
            <Help />
            <Footer />
        </div>
    );
}
