import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, XCircle } from 'lucide-react';

export default function PaymentSuccess() {
    const navigate = useNavigate();
    const [status, setStatus] = useState('processing'); // processing | success | fail
    const calledApi = useRef(false); // Tránh gọi API 2 lần do React StrictMode

    useEffect(() => {
        // Lấy dữ liệu cần thiết
        const user = JSON.parse(localStorage.getItem('User'));
        const productCarts = JSON.parse(localStorage.getItem('productCarts')) || [];

        // Nếu không có giỏ hàng (do f5 lại trang sau khi đã mua), coi như thành công
        if (productCarts.length === 0) {
            setStatus('success');
            return;
        }

        if (!user) {
            setStatus('fail');
            return;
        }

        const handleSaveOrder = async () => {
            if (calledApi.current) return;
            calledApi.current = true;

            try {
                const payload = {
                    UserId: user.id,
                    FullName: user.displayname,
                    PhoneNumber: user.PhoneNumber,
                    AddressLine: user.DetailAddress,
                    Ward: user.Ward,
                    Province: user.Province,
                    District: user.District,

                    // Quan trọng: Báo cho BE biết đây là Banking
                    PaymentMethod: 'Banking',

                    Items: productCarts.map((item) => ({
                        ProductId: item.id.toString(),
                        Quantity: item.quantity,
                        Price: item.newPrice,
                    })),
                };

                // Gọi API tạo đơn
                const response = await fetch('https://localhost:7216/api/payment/place-order', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                });

                if (response.ok) {
                    // Xóa giỏ hàng sau khi lưu DB thành công
                    localStorage.removeItem('productCarts');
                    setStatus('success');
                } else {
                    const data = await response.json();
                    console.error('Lỗi BE:', data);
                    setStatus('fail');
                }
            } catch (error) {
                console.error('Lỗi mạng:', error);
                setStatus('fail');
            }
        };

        handleSaveOrder();
    }, []);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md w-full">
                {status === 'processing' && (
                    <div className="flex flex-col items-center">
                        <div className="animate-spin w-12 h-12 border-4 border-pink-400 border-t-transparent rounded-full mb-4"></div>
                        <h2 className="text-xl font-bold text-gray-700">Đang xử lý đơn hàng...</h2>
                        <p className="text-gray-500 mt-2">Vui lòng không tắt trình duyệt.</p>
                    </div>
                )}

                {status === 'success' && (
                    <div className="flex flex-col items-center">
                        <CheckCircle size={64} className="text-green-500 mb-4" />
                        <h2 className="text-2xl font-bold text-[#2D1B4D] mb-2">Thanh toán thành công!</h2>
                        <p className="text-gray-600 mb-6">Đơn hàng của bạn đã được thanh toán và lưu vào hệ thống.</p>
                        <button
                            onClick={() => navigate('/')}
                            className="w-full bg-[#f4a7bb] text-white font-bold py-3 rounded-xl hover:bg-pink-500 transition-colors"
                        >
                            Tiếp tục mua sắm
                        </button>
                    </div>
                )}

                {status === 'fail' && (
                    <div className="flex flex-col items-center">
                        <XCircle size={64} className="text-red-500 mb-4" />
                        <h2 className="text-xl font-bold text-red-600 mb-2">Có lỗi xảy ra!</h2>
                        <p className="text-gray-500 mb-6">
                            Giao dịch có thể đã thành công nhưng hệ thống gặp lỗi khi lưu đơn hàng. Vui lòng liên hệ
                            Admin hoặc chụp màn hình bill thanh toán.
                        </p>
                        <button onClick={() => navigate('/')} className="text-blue-500 underline">
                            Về trang chủ
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
