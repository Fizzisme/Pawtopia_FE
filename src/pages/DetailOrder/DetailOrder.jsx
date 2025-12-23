import Header from '@/components/Header/Header.jsx';
import Footer from '@/components/Footer/Footer.jsx';
import Help from '@/components/Help/Help.jsx';
import { useEffect, useState } from 'react';

export default function DetailOrder() {
    const [detailOrder, setDetailOrder] = useState(null);
    const orderId = localStorage.getItem('orderId');

    useEffect(() => {
        if (!orderId) return;

        fetch(`https://localhost:7216/api/order/detail/${orderId}`)
            .then((res) => res.json())
            .then((data) => {
                setDetailOrder(data);
                console.log(data);
            });
    }, [orderId]);

    if (!detailOrder) return null;

    return (
        <div>
            <Header />

            <div
                className="bg-[#fff7ec] rounded-[20px]"
                style={{ maxWidth: '900px', margin: '40px auto', padding: '24px' }}
            >
                {/* HEADER */}
                <div className="text-center" style={{ marginBottom: '24px' }}>
                    <h2 className="text-[26px] font-semibold text-[#ff6b9f]">Chi tiết đơn hàng</h2>
                    <p className="text-[13px] text-gray-500">Mã đơn: {detailOrder.orderId}</p>
                </div>

                {/* INFO */}
                <div
                    className="flex justify-between bg-white rounded-[16px]"
                    style={{ padding: '20px', marginBottom: '20px' }}
                >
                    <div className="text-[14px] text-gray-700 leading-6">
                        <p>
                            <strong>Người nhận:</strong> {detailOrder.receiverName}
                        </p>
                        <p>
                            <strong>SĐT:</strong> {detailOrder.receiverPhone}
                        </p>
                        <p>
                            <strong>Địa chỉ:</strong> {detailOrder.shippingAddress}
                        </p>
                    </div>

                    <div className="text-right">
                        <p className="text-[14px] text-gray-600">Ngày đặt: {detailOrder.createdAt}</p>
                        <span
                            className="inline-block text-[13px] font-semibold text-white rounded-full"
                            style={{
                                marginTop: '8px',
                                padding: '6px 14px',
                                backgroundColor: detailOrder.status < 0 ? '#f87171' : '#34d399',
                            }}
                        >
                            {detailOrder.statusName}
                        </span>
                    </div>
                </div>

                {/* ITEMS */}
                <div className="bg-white rounded-[16px]" style={{ padding: '20px' }}>
                    {detailOrder.items.map((item, index) => (
                        <div
                            key={item.productId}
                            className={`flex items-center ${
                                index !== detailOrder.items.length - 1 ? 'border-b border-gray-200' : ''
                            }`}
                            style={{
                                paddingBottom: '16px',
                                marginBottom: index !== detailOrder.items.length - 1 ? '16px' : '0',
                            }}
                        >
                            <img
                                src={item.imageUrl}
                                className="rounded-[12px] object-cover"
                                style={{
                                    width: '90px',
                                    height: '90px',
                                    marginRight: '16px',
                                }}
                            />

                            <div className="flex-1">
                                <h4 className="font-medium text-gray-800">{item.productName}</h4>
                                <p className="text-[14px] text-gray-500">Giá: {item.price.toLocaleString()} ₫</p>
                                <p className="text-[14px] text-gray-500">Số lượng: {item.quantity}</p>
                            </div>

                            <div className="font-semibold text-[#ff6b9f]">{item.subTotal.toLocaleString()} ₫</div>
                        </div>
                    ))}
                </div>

                {/* SUMMARY */}
                <div
                    className="flex justify-between items-center bg-white rounded-[16px]"
                    style={{ padding: '20px', marginTop: '20px' }}
                >
                    <p className="text-gray-600">
                        Tổng sản phẩm: <strong>{detailOrder.totalItems}</strong>
                    </p>
                    <p className="text-[18px] font-semibold text-[#ff6b9f]">
                        Tổng thanh toán: {detailOrder.totalAmount.toLocaleString()} ₫
                    </p>
                </div>
            </div>

            <Help />
            <Footer />
        </div>
    );
}
