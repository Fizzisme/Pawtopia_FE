import Header from '@/components/Header/Header.jsx';

export default function Checkout() {
    // Mock Data giống trong hình
    const orderInfo = {
        id: '5628',
        date: '17/11/2025',
        email: 'infopawtopia.vn@gmail.com',
        total: '455.186 VND',
        paymentMethod: 'Tiền mặt (COD)',
    };

    const orderDetails = {
        product: '[1.5kg] Thức ăn hạt Royal Canin Diabetic cho mèo bị tiểu đường',
        quantity: 1,
        subTotal: 419000,
        shippingFee: 57136,
        shippingMethod: 'Giao hàng tiết kiệm',
        discount: 20950, // Giảm giá
        vat: 36186,
        finalTotal: 455186,
    };

    const userInfo = {
        name: 'Mạnh',
        address: 'sdasdasdasdasdasdasd',
        ward: 'Phường An Hội Đồng',
        city: 'Thành phố Hồ Chí Minh',
        phone: '0999911212',
        email: 'infopawtopia.vn@gmail.com',
    };
    return (
        <div>
            <Header />
            <div
                className=""
                style={{ paddingLeft: '50px', paddingRight: '16px', paddingTop: '40px', paddingBottom: '40px' }}
            >
                {/* --- TIÊU ĐỀ --- */}
                <h1 className="text-2xl font-normal text-pink-400" style={{ marginBottom: '8px' }}>
                    Thanh Toán
                </h1>
                <p className="text-gray-600" style={{ marginBottom: '32px' }}>
                    Cảm ơn bạn. Đơn hàng của bạn đã được nhận.
                </p>

                {/* --- THÔNG TIN TÓM TẮT --- */}
                {/* Lưu ý: gap-4 và md:gap-0 cần giữ class để đảm bảo responsive hoạt động */}
                <div
                    className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-0 border-y-2 border-dashed border-gray-200 text-sm"
                    style={{ paddingTop: '20px', paddingBottom: '20px', marginBottom: '32px' }}
                >
                    <div className="md:border-r md:border-gray-200 md:pr-4">
                        <span className="block text-gray-400 text-xs uppercase" style={{ marginBottom: '4px' }}>
                            Mã đơn hàng:
                        </span>
                        <span className="font-bold text-gray-800">{orderInfo.id}</span>
                    </div>
                    <div className="md:border-r md:border-gray-200 md:px-4">
                        <span className="block text-gray-400 text-xs uppercase" style={{ marginBottom: '4px' }}>
                            Ngày:
                        </span>
                        <span className="font-bold text-gray-800">{orderInfo.date}</span>
                    </div>
                    <div className="md:border-r md:border-gray-200 md:px-4">
                        <span className="block text-gray-400 text-xs uppercase" style={{ marginBottom: '4px' }}>
                            Email:
                        </span>
                        <span className="font-bold text-gray-800 break-words">{orderInfo.email}</span>
                    </div>
                    <div className="md:border-r md:border-gray-200 md:px-4">
                        <span className="block text-gray-400 text-xs uppercase" style={{ marginBottom: '4px' }}>
                            Tổng cộng:
                        </span>
                        <span className="font-bold text-gray-800">{orderInfo.total}</span>
                    </div>
                    <div className="md:pl-4">
                        <span className="block text-gray-400 text-xs uppercase" style={{ marginBottom: '4px' }}>
                            Phương thức thanh toán:
                        </span>
                        <span className="font-bold text-gray-800">{orderInfo.paymentMethod}</span>
                    </div>
                </div>

                <p className="text-gray-500 italic" style={{ marginBottom: '32px' }}>
                    Thanh toán khi hoàn tất giao hàng
                </p>

                {/* --- CHI TIẾT ĐƠN HÀNG --- */}
                <div style={{ marginBottom: '40px' }}>
                    <h2 className="text-xl font-bold text-[#2D1B4D]" style={{ marginBottom: '16px' }}>
                        Chi tiết đơn hàng
                    </h2>

                    <div className="border border-gray-200 rounded-sm">
                        {/* Header Table */}
                        <div
                            className="flex justify-between border-b border-gray-200 font-bold text-gray-700 bg-gray-50"
                            style={{ padding: '16px' }}
                        >
                            <span>Sản phẩm</span>
                            <span>Tổng</span>
                        </div>

                        {/* Sản phẩm */}
                        <div
                            className="flex justify-between border-b border-gray-100 text-sm"
                            style={{ padding: '16px' }}
                        >
                            <span className="text-pink-500 font-medium">
                                {orderDetails.product}{' '}
                                <strong className="text-gray-800">× {orderDetails.quantity}</strong>
                            </span>
                            <span className="font-bold text-gray-600">
                                {orderDetails.subTotal.toLocaleString()} VND
                            </span>
                        </div>

                        {/* Tổng số phụ */}
                        <div
                            className="flex justify-between border-b border-gray-100 text-sm"
                            style={{ padding: '16px' }}
                        >
                            <span className="font-bold text-gray-600">Tổng số phụ:</span>
                            <span className="font-bold text-gray-600">
                                {orderDetails.subTotal.toLocaleString()} VND
                            </span>
                        </div>

                        {/* Vận chuyển */}
                        <div
                            className="flex justify-between border-b border-gray-100 text-sm"
                            style={{ padding: '16px' }}
                        >
                            <span className="font-bold text-gray-600">Vận chuyển:</span>
                            <div className="text-right">
                                <span className="font-bold text-gray-600">
                                    {orderDetails.shippingFee.toLocaleString()} VND
                                </span>
                                <span className="text-gray-400 text-xs" style={{ marginLeft: '4px' }}>
                                    qua {orderDetails.shippingMethod}
                                </span>
                            </div>
                        </div>

                        {/* Giảm giá */}
                        <div
                            className="flex justify-between border-b border-gray-100 text-sm"
                            style={{ padding: '16px' }}
                        >
                            <span className="font-bold text-gray-600">Giảm giá hạng Bạc:</span>
                            <span className="font-bold text-gray-600">
                                -{orderDetails.discount.toLocaleString()} VND
                            </span>
                        </div>

                        {/* Tổng cộng */}
                        <div
                            className="flex justify-between border-b border-gray-100 text-sm"
                            style={{ padding: '16px' }}
                        >
                            <span className="font-bold text-gray-600">Tổng cộng:</span>
                            <div className="text-right">
                                <span className="font-bold text-gray-800 text-base">
                                    {orderDetails.finalTotal.toLocaleString()} VND
                                </span>
                                <span className="text-gray-400 text-xs" style={{ marginLeft: '4px' }}>
                                    (bao gồm {orderDetails.vat.toLocaleString()} VND VAT)
                                </span>
                            </div>
                        </div>

                        {/* Phương thức thanh toán */}
                        <div
                            className="flex justify-between border-b border-gray-100 text-sm"
                            style={{ padding: '16px' }}
                        >
                            <span className="font-bold text-gray-600">Phương thức thanh toán:</span>
                            <span className="text-gray-600">Tiền mặt (COD)</span>
                        </div>

                        {/* Hành động */}
                        <div className="flex justify-between items-center text-sm" style={{ padding: '16px' }}>
                            <span className="font-bold text-gray-600">Hành động:</span>
                            <button
                                className="bg-[#f4a7bb] text-white text-xs font-bold rounded-full hover:bg-pink-500 transition-colors uppercase"
                                style={{ padding: '8px 16px' }}
                            >
                                Yêu cầu hủy
                            </button>
                        </div>
                    </div>
                </div>

                {/* NÚT NHẮN TIN */}
                <button
                    className="bg-[#f4a7bb] text-white font-bold rounded-full hover:bg-pink-500 transition-colors uppercase text-sm shadow-sm"
                    style={{ padding: '12px 24px', marginBottom: '40px' }}
                >
                    Nhắn tin với cửa hàng
                </button>

                {/* --- ĐỊA CHỈ --- */}
                <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: '32px' }}>
                    {/* Cột Trái: Địa chỉ thanh toán */}
                    <div>
                        <h3
                            className="text-lg font-bold text-[#2D1B4D] border-l-4 border-[#f4a7bb] bg-gray-50"
                            style={{
                                marginBottom: '16px',
                                paddingLeft: '12px',
                                paddingTop: '8px',
                                paddingBottom: '8px',
                            }}
                        >
                            Địa chỉ thanh toán
                        </h3>
                        <div
                            className="border border-gray-100 rounded-sm text-sm text-gray-600"
                            style={{ padding: '20px' }}
                        >
                            {/* Thay thế space-y-2 bằng margin-bottom cho từng thẻ p */}
                            <p className="font-bold text-gray-800" style={{ marginBottom: '8px' }}>
                                {userInfo.name}
                            </p>
                            <p style={{ marginBottom: '8px' }}>{userInfo.address}</p>
                            <p style={{ marginBottom: '8px' }}>{userInfo.ward}</p>
                            <p style={{ marginBottom: '8px' }}>{userInfo.city}</p>
                            <div className="flex items-center" style={{ marginTop: '8px', gap: '8px' }}>
                                <span className="text-gray-400">📞</span>
                                <span className="font-bold">{userInfo.phone}</span>
                            </div>
                            <div className="flex items-center" style={{ gap: '8px' }}>
                                <span className="text-gray-400">✉️</span>
                                <span className="break-all">{userInfo.email}</span>
                            </div>
                        </div>
                    </div>

                    {/* Cột Phải: Địa chỉ giao hàng */}
                    <div>
                        <h3
                            className="text-lg font-bold text-[#2D1B4D] border-l-4 border-[#f4a7bb] bg-gray-50"
                            style={{
                                marginBottom: '16px',
                                paddingLeft: '12px',
                                paddingTop: '8px',
                                paddingBottom: '8px',
                            }}
                        >
                            Địa chỉ giao hàng
                        </h3>
                        <div
                            className="border border-gray-100 rounded-sm text-sm text-gray-600"
                            style={{ padding: '20px' }}
                        >
                            <p className="font-bold text-gray-800" style={{ marginBottom: '8px' }}>
                                {userInfo.name}
                            </p>
                            <p style={{ marginBottom: '8px' }}>{userInfo.address}</p>
                            <p style={{ marginBottom: '8px' }}>{userInfo.ward}</p>
                            <p style={{ marginBottom: '8px' }}>{userInfo.city}</p>
                            <div className="flex items-center" style={{ marginTop: '8px', gap: '8px' }}>
                                <span className="text-gray-400">📞</span>
                                <span className="font-bold">{userInfo.phone}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="text-sm text-gray-500" style={{ marginTop: '32px' }}>
                    Số điện thoại người nhận: <span className="font-bold text-gray-700">{userInfo.phone}</span>
                </div>
            </div>
        </div>
    );
}
