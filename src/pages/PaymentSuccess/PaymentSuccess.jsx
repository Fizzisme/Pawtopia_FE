import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, XCircle } from 'lucide-react';

export default function PaymentSuccess() {
    const navigate = useNavigate();
    const [status, setStatus] = useState('processing'); // processing | success | fail
    const calledApi = useRef(false); // Tránh gọi API 2 lần do React StrictMode

    useEffect(() => {
        // Lấy gói dữ liệu đã được chuẩn bị kỹ càng bên trang Cart
        // (Gói này chứa đủ AddressId, FullName, Items... y hệt logic Cart)
        const tempOrderData = JSON.parse(localStorage.getItem('temp_order_data'));

        // Nếu không tìm thấy gói dữ liệu tạm (do vào trực tiếp link hoặc đã xóa)
        if (!tempOrderData) {
            console.error('Không tìm thấy dữ liệu đơn hàng tạm (temp_order_data)');
            // Nếu muốn kỹ tính thì báo lỗi, còn không thì check giỏ hàng như cũ
            // Ở đây con cho báo lỗi để đảm bảo toàn vẹn dữ liệu
            setStatus('fail');
            return;
        }

        const handleSaveOrder = async () => {
            if (calledApi.current) return;
            calledApi.current = true;

            try {
                // Sử dụng nguyên xi cái payload đã lưu bên Cart
                // Không cần chế biến lại, đảm bảo khớp 100% với Backend
                const payload = tempOrderData;

                // Gọi API tạo đơn
                const response = await fetch('https://localhost:7216/api/payment/place-order', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                });

                if (response.ok) {
                    // Xóa sạch dữ liệu sau khi thành công
                    localStorage.removeItem('productCarts');
                    localStorage.removeItem('temp_order_data'); // Xóa luôn cái tạm
                    setStatus('success');
                } else {
                    const data = await response.json();
                    console.error('Lỗi BE trả về:', data);
                    setStatus('fail');
                }
            } catch (error) {
                console.error('Lỗi mạng hoặc lỗi xử lý:', error);
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
