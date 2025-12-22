import { ChevronsRight } from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';
export default function CurrentPage() {
    const location = useLocation();
    const pathname = location.pathname;

    if (pathname === '/') return null;

    const breadcrumbMap = {
        '/about-us': 'Về Chúng Tôi',
        '/blog': 'Chuyện Boss',
        '/flash-deals': 'Flash Deals',
        '/lien-he': 'Liên Hệ',
        '/tu-van': 'Tư Vấn',
        '/dang-nhap': 'Đăng Nhập',
        '/dang-ky': 'Đăng Ký',
        '/user': 'Người Dùng',
        '/cua-hang/C1': 'Thức ăn hạt cho chó',
        '/user/don-hang': 'Đơn Hàng',
        '/user/dia-chi': 'Địa Chỉ',
        '/user/tai-khoan': 'Tài Khoản',
    };

    const currentPageName = breadcrumbMap[pathname] || pathname.split('/').pop();
    return (
        <div className="h-[40px] bg-[#fde5e5] flex items-center gap-2 text-[#6a1f6e]" style={{ padding: '0 100px' }}>
            <Link
                to="/"
                className="inline-block text-gray-600 cursor-pointer transition duration-300 hover:text-pink-500 hover:underline"
            >
                Trang chủ
            </Link>
            <ChevronsRight className="size-4" />
            <p>{currentPageName}</p>
        </div>
    );
}
