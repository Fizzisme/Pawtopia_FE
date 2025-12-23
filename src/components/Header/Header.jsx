import { useState, useEffect, useRef } from 'react'; // Import hooks
import { Navigate } from '@/components/Header/Navigate/Navigate.jsx';

import pawtopiaLogo from '@/assets/pawtopiaDesscription.png';
import { Search, Heart, ShoppingBasket, User, X, Loader2 } from 'lucide-react'; // Thêm icon X và Loader
import { Link, useNavigate } from 'react-router-dom';

// Dữ liệu giả để test search (Bạn có thể thay bằng API call)
const MOCK_PRODUCTS = [
    { id: 1, name: 'Thức ăn hạt Royal Canin', price: '150.000đ', image: 'https://placehold.co/50' },
    { id: 2, name: 'Pate cho mèo Whiskas', price: '35.000đ', image: 'https://placehold.co/50' },
    { id: 3, name: 'Đồ chơi gặm xương', price: '50.000đ', image: 'https://placehold.co/50' },
    { id: 4, name: 'Chuồng chó Inox', price: '1.200.000đ', image: 'https://placehold.co/50' },
    { id: 5, name: 'Vòng cổ lục lạc', price: '20.000đ', image: 'https://placehold.co/50' },
];

export default function Header() {
    const typingTimeoutRef = useRef(null);
    const navigate = useNavigate();
    const userStored = localStorage.getItem('User');

    // State cho Sheet tìm kiếm
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    const handleClick = () => {
        if (!userStored) navigate('/dang-nhap');
        else navigate('/user/tai-khoan');
    };

    // Hàm xử lý tìm kiếm
    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        if (value.trim() === '') {
            setSearchResults([]);
            setIsSearching(false);
            if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
            return;
        }

        setIsSearching(true);

        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }

        typingTimeoutRef.current = setTimeout(async () => {
            try {
                const response = await fetch(
                    `https://localhost:7216/api/products/search?keyword=${encodeURIComponent(value)}`,
                );

                if (response.ok) {
                    const resData = await response.json();
                    // --- SỬA Ở ĐÂY: Lấy trường .data từ object trả về ---
                    setSearchResults(resData.data || []);
                } else {
                    setSearchResults([]);
                }
            } catch (error) {
                console.error('Lỗi gọi API search:', error);
                setSearchResults([]);
            } finally {
                setIsSearching(false);
            }
        }, 500);
    };

    return (
        <>
            {/* --- HEADER CHÍNH --- */}
            <div
                className="flex justify-between items-center h-[64px] bg-[#fff9e8] w-full z-40 relative"
                style={{ padding: '0 64px' }}
            >
                <Link to="/">
                    <img src={pawtopiaLogo} alt="pawtopia logo" className="h-10 object-contain" />
                </Link>
                <Navigate />
                <div className="flex gap-4 items-center">
                    {/* Nút mở Search Sheet */}
                    <Search
                        className="cursor-pointer hover:text-orange-500 transition-colors"
                        onClick={() => setIsSearchOpen(true)}
                    />

                    <User className="cursor-pointer hover:text-orange-500 transition-colors" onClick={handleClick} />

                    <Link to="/gio-hang">
                        <ShoppingBasket className="hover:text-orange-500 transition-colors" />
                    </Link>
                </div>
            </div>

            {/* --- SEARCH SHEET (OVERLAY & DRAWER) --- */}

            {/* 1. Lớp nền đen mờ (Backdrop) */}
            <div
                className={`fixed inset-0 bg-black/40 z-50 transition-opacity duration-300 ${
                    isSearchOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                }`}
                onClick={() => setIsSearchOpen(false)}
            ></div>

            {/* 2. Phần nội dung trượt từ phải sang (Sheet Content) */}
            <div
                className={`fixed top-0 right-0 h-full w-[400px] bg-white z-[51] shadow-2xl transform transition-transform duration-300 ease-in-out ${
                    isSearchOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                {/* Header của Sheet */}
                <div className="flex items-center justify-between border-b" style={{ padding: '16px' }}>
                    <h2 className="text-lg font-semibold text-gray-800">Tìm kiếm</h2>
                    <button
                        onClick={() => setIsSearchOpen(false)}
                        className=" hover:bg-gray-100 rounded-full transition cursor-pointer"
                        style={{ padding: '4px' }}
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Input tìm kiếm */}
                <div className="border-b" style={{ padding: '16px' }}>
                    <div className="relative">
                        <Search className="absolute left-1 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Tìm sản phẩm..."
                            className="w-full pl-10 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 transition-all"
                            value={searchTerm}
                            onChange={handleSearch}
                            autoFocus={isSearchOpen}
                            style={{ padding: '8px 16px 8px 24px' }}
                            // Tự động focus khi mở
                        />
                    </div>
                </div>

                {/* Khu vực hiển thị kết quả */}
                <div className=" overflow-y-auto h-[calc(100%-130px)]" style={{ padding: '16px' }}>
                    {isSearching ? (
                        <div className="flex justify-center items-center text-gray-500" style={{ padding: '40px' }}>
                            <Loader2 className="animate-spin mr-2" /> Đang tìm...
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {searchTerm && searchResults.length === 0 && (
                                <p className="text-center text-gray-500" style={{ marginTop: '16px' }}>
                                    Không tìm thấy sản phẩm nào.
                                </p>
                            )}

                            {!searchTerm && (
                                <div className="text-gray-400 text-sm text-center" style={{ marginTop: '16px' }}>
                                    Nhập tên sản phẩm để tìm kiếm
                                </div>
                            )}

                            {searchResults?.map((product) => (
                                <div
                                    key={product.id}
                                    className="flex items-center gap-3 hover:bg-gray-50 rounded-lg cursor-pointer transition group"
                                    style={{ padding: '8px' }}
                                    onClick={() => {
                                        navigate(`/san-pham/${product.id}`); // Điều hướng khi click
                                        setIsSearchOpen(false); // Đóng sheet
                                    }}
                                >
                                    <img
                                        src={product.thumbImageLink}
                                        alt={product.name}
                                        className="w-12 h-12 rounded object-cover border"
                                    />
                                    <div>
                                        <p className="font-medium text-gray-800 group-hover:text-orange-600 transition">
                                            {product.name}
                                        </p>
                                        <p className="text-sm text-orange-500 font-bold">{product.price}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
