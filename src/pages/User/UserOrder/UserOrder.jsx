import React, { useEffect, useState } from 'react';

export default function UserOrder() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    // Lấy User từ localStorage
    const userString = localStorage.getItem('User');
    const user = userString ? JSON.parse(userString) : null;

    // Kiểm tra role
    const isAdmin = user?.role === 'Admin';

    useEffect(() => {
        if (user) {
            fetchData();
        } else {
            setLoading(false);
        }
    }, []);

    const fetchData = async () => {
        try {
            let url = '';
            if (isAdmin) {
                url = `https://localhost:7216/api/Payment/all-orders`;
            } else {
                url = `https://localhost:7216/api/order/history/${user.id}`;
            }

            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                setOrders(data);
            } else {
                console.error('Lỗi tải dữ liệu');
            }
        } catch (error) {
            console.error('Lỗi kết nối:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateStatus = async (orderId, newStatus) => {
        if (!window.confirm('Bạn có chắc muốn cập nhật trạng thái đơn này?')) return;

        try {
            const response = await fetch(`https://localhost:7216/api/Payment/update-status/${orderId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newStatus),
            });

            if (response.ok) {
                alert('Cập nhật thành công!');
                fetchData();
            } else {
                alert('Lỗi cập nhật');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    };

    const renderStatus = (status) => {
        const s = status ? (typeof status === 'string' ? status.toLowerCase() : status.toString()) : '';

        // Style chung cho badge
        const badgeStyle = { padding: '4px 8px' }; // px-2 py-1

        if (status === 1 || s.includes('chờ'))
            return (
                <span className="text-yellow-700 bg-yellow-100 rounded text-sm font-medium" style={badgeStyle}>
                    Chờ xử lý
                </span>
            );
        if (status === 2 || s.includes('giao'))
            return (
                <span className="text-blue-700 bg-blue-100 rounded text-sm font-medium" style={badgeStyle}>
                    Đang giao
                </span>
            );
        if (status === 3 || s.includes('hoàn'))
            return (
                <span className="text-green-700 bg-green-100 rounded text-sm font-medium" style={badgeStyle}>
                    Hoàn thành
                </span>
            );
        if (status === -1 || s.includes('hủy'))
            return (
                <span className="text-red-700 bg-red-100 rounded text-sm font-medium" style={badgeStyle}>
                    Đã hủy
                </span>
            );

        return <span>{status}</span>;
    };

    if (!user)
        return (
            <div className="text-red-500" style={{ padding: '16px' }}>
                Vui lòng đăng nhập.
            </div>
        );
    if (loading)
        return (
            <div className="text-center" style={{ padding: '16px' }}>
                Đang tải...
            </div>
        );

    return (
        <div className="container max-w-5xl" style={{ margin: '0 auto', padding: '16px' }}>
            <h2 className="text-2xl font-bold border-b" style={{ marginBottom: '24px', paddingBottom: '8px' }}>
                {isAdmin ? 'Quản lý toàn bộ đơn hàng (Admin)' : 'Lịch sử đơn hàng'}
            </h2>

            {orders.length === 0 ? (
                <p
                    className="text-center text-gray-500"
                    style={{ paddingTop: '40px', paddingBottom: '40px' }} // py-10
                >
                    Danh sách trống.
                </p>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {' '}
                    {/* gap-4 */}
                    {orders.map((order) => (
                        <div
                            key={order.orderId}
                            className="border border-gray-200 rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow"
                        >
                            {/* Header */}
                            <div
                                className="bg-gray-50 border-b flex flex-col md:flex-row justify-between items-start md:items-center"
                                style={{ padding: '12px 16px', gap: '8px' }} // px-4 py-3 gap-2
                            >
                                <div>
                                    <p className="text-sm text-gray-600">
                                        Mã:{' '}
                                        <span className="font-mono font-bold text-gray-900">
                                            #{order.orderId.substring(0, 8)}
                                        </span>
                                        <span
                                            className="text-gray-300"
                                            style={{ marginLeft: '8px', marginRight: '8px' }}
                                        >
                                            |
                                        </span>{' '}
                                        {/* mx-2 */}
                                        {/* Nếu là Admin thì hiện tên khách hàng */}
                                        {isAdmin && (
                                            <span className="text-purple-600 font-semibold">
                                                {order.customerName} - {order.phoneNumber}
                                            </span>
                                        )}
                                    </p>
                                    <p className="text-xs text-gray-500" style={{ marginTop: '4px' }}>
                                        {' '}
                                        {/* mt-1 */}
                                        Ngày đặt: {order.date || order.createdAt}
                                    </p>
                                </div>
                                <div>{renderStatus(order.status)}</div>
                            </div>

                            {/* Body */}
                            <div
                                className="flex flex-col md:flex-row justify-between items-center"
                                style={{ padding: '16px', gap: '16px' }} // p-4 gap-4
                            >
                                <div>
                                    <p className="text-gray-700">
                                        Tổng tiền:{' '}
                                        <span className="text-red-600 font-bold text-lg">
                                            {formatCurrency(order.totalAmount)}
                                        </span>
                                    </p>
                                    <p className="text-gray-500 text-sm">Số lượng: {order.totalItems} sản phẩm</p>
                                </div>

                                {/* --- KHU VỰC NÚT BẤM DÀNH RIÊNG CHO ADMIN --- */}
                                {isAdmin && order.status === 1 && (
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        {' '}
                                        {/* gap-2 */}
                                        <button
                                            onClick={() => handleUpdateStatus(order.orderId, 2)}
                                            className="bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                                            style={{ padding: '8px 16px' }} // px-4 py-2
                                        >
                                            Xác nhận giao
                                        </button>
                                        <button
                                            onClick={() => handleUpdateStatus(order.orderId, -1)}
                                            className="bg-red-500 text-white rounded hover:bg-red-600 transition"
                                            style={{ padding: '8px 16px' }} // px-4 py-2
                                        >
                                            Hủy đơn
                                        </button>
                                    </div>
                                )}

                                {isAdmin && order.status === 2 && (
                                    <button
                                        onClick={() => handleUpdateStatus(order.orderId, 3)}
                                        className="bg-green-600 text-white rounded hover:bg-green-700 transition"
                                        style={{ padding: '8px 16px' }} // px-4 py-2
                                    >
                                        Hoàn tất đơn hàng
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
