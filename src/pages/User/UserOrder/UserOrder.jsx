import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function UserOrder() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // --- State cho bộ lọc (Chỉ dùng cho Admin) ---
    const [filterStatus, setFilterStatus] = useState('');
    const [sortBy, setSortBy] = useState('date');
    const [sortDir, setSortDir] = useState('desc');

    const userString = localStorage.getItem('User');
    const user = userString ? JSON.parse(userString) : null;
    const isAdmin = user?.role === 'Admin';

    useEffect(() => {
        if (user) {
            fetchData();
        } else {
            setLoading(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterStatus, sortBy, sortDir]);

    const fetchData = async () => {
        setLoading(true);
        try {
            let url = '';
            if (isAdmin) {
                const params = new URLSearchParams();
                if (filterStatus !== '') params.append('status', filterStatus);
                if (sortBy) params.append('sortBy', sortBy);
                if (sortDir) params.append('sortDir', sortDir);

                url = `https://localhost:7216/api/order/admin/filter?${params.toString()}`;
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
            const response = await fetch(`https://localhost:7216/api/order/update-status/${orderId}`, {
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

        // Chuyển padding sang inline style
        const badgeStyle = { padding: '4px 8px', borderRadius: '0.25rem', fontSize: '0.875rem', fontWeight: 500 };

        if (status === 1 || s.includes('chờ'))
            return (
                <span className="text-yellow-700 bg-yellow-100" style={badgeStyle}>
                    Chờ xử lý
                </span>
            );
        if (status === 2 || s.includes('giao'))
            return (
                <span className="text-blue-700 bg-blue-100" style={badgeStyle}>
                    Đang giao
                </span>
            );
        if (status === 3 || s.includes('hoàn'))
            return (
                <span className="text-green-700 bg-green-100" style={badgeStyle}>
                    Hoàn thành
                </span>
            );
        if (status === -1 || s.includes('hủy'))
            return (
                <span className="text-red-700 bg-red-100" style={badgeStyle}>
                    Đã hủy
                </span>
            );

        return <span>{status}</span>;
    };

    const handleClickOrderDetails = (orderId) => {
        localStorage.setItem('orderId', orderId);
        navigate(`/chi-tiet-don-hang/${orderId}`);
    };

    if (!user)
        return (
            <div className="text-red-500" style={{ padding: '16px' }}>
                Vui lòng đăng nhập.
            </div>
        );

    return (
        <div className="container" style={{ maxWidth: '1024px', margin: '0 auto', padding: '16px' }}>
            <h2 className="text-2xl font-bold border-b" style={{ marginBottom: '24px', paddingBottom: '8px' }}>
                {isAdmin ? 'Quản lý toàn bộ đơn hàng (Admin)' : 'Lịch sử đơn hàng'}
            </h2>

            {/* --- KHU VỰC BỘ LỌC (CHỈ HIỆN CHO ADMIN) --- */}
            {isAdmin && (
                <div
                    className="bg-gray-50 border rounded-lg flex flex-col md:flex-row items-end md:items-center justify-between"
                    style={{ padding: '16px', marginBottom: '24px', gap: '16px' }}
                >
                    <div className="flex flex-wrap w-full" style={{ gap: '16px' }}>
                        {/* 1. Lọc theo trạng thái */}
                        <div className="flex flex-col">
                            <label className="text-xs font-semibold text-gray-500" style={{ marginBottom: '4px' }}>
                                Trạng thái
                            </label>
                            <select
                                className="border rounded text-sm"
                                style={{ padding: '8px', minWidth: '150px' }}
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                            >
                                <option value="">Tất cả</option>
                                <option value="1">Chờ xử lý</option>
                                <option value="2">Đang giao</option>
                                <option value="3">Hoàn thành</option>
                                <option value="-1">Đã hủy</option>
                            </select>
                        </div>

                        {/* 2. Sắp xếp theo tiêu chí */}
                        <div className="flex flex-col">
                            <label className="text-xs font-semibold text-gray-500" style={{ marginBottom: '4px' }}>
                                Sắp xếp theo
                            </label>
                            <select
                                className="border rounded text-sm"
                                style={{ padding: '8px', minWidth: '150px' }}
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                            >
                                <option value="date">Ngày đặt</option>
                                <option value="price">Tổng tiền</option>
                                <option value="status">Trạng thái</option>
                            </select>
                        </div>

                        {/* 3. Chiều sắp xếp (Tăng/Giảm) */}
                        <div className="flex flex-col">
                            <label className="text-xs font-semibold text-gray-500" style={{ marginBottom: '4px' }}>
                                Thứ tự
                            </label>
                            <select
                                className="border rounded text-sm"
                                style={{ padding: '8px', minWidth: '150px' }}
                                value={sortDir}
                                onChange={(e) => setSortDir(e.target.value)}
                            >
                                <option value="desc">{sortBy === 'price' ? 'Cao nhất trước' : 'Mới nhất trước'}</option>
                                <option value="asc">{sortBy === 'price' ? 'Thấp nhất trước' : 'Cũ nhất trước'}</option>
                            </select>
                        </div>
                    </div>
                </div>
            )}
            {/* --- HẾT KHU VỰC BỘ LỌC --- */}

            {loading ? (
                <div className="text-center" style={{ padding: '16px' }}>
                    Đang tải...
                </div>
            ) : orders.length === 0 ? (
                <p className="text-center text-gray-500" style={{ padding: '40px 0' }}>
                    Không tìm thấy đơn hàng nào phù hợp.
                </p>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {orders.map((order) => (
                        <div
                            onClick={() => handleClickOrderDetails(order.orderId)}
                            key={order.orderId}
                            className="border cursor-pointer border-gray-200 rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow"
                        >
                            {/* Header */}
                            <div
                                className="bg-gray-50 border-b flex flex-col md:flex-row justify-between items-start md:items-center"
                                style={{ padding: '12px 16px', gap: '8px' }}
                            >
                                <div>
                                    <p className="text-sm text-gray-600">
                                        Mã:{' '}
                                        <span className="font-mono font-bold text-gray-900">
                                            #{order.orderId?.substring(0, 8)}
                                        </span>
                                        <span className="text-gray-300" style={{ margin: '0 8px' }}>
                                            |
                                        </span>
                                        {isAdmin && (
                                            <span className="text-purple-600 font-semibold">
                                                {order.customerName}{' '}
                                                {order.customerPhone ? `- ${order.customerPhone}` : ''}
                                            </span>
                                        )}
                                    </p>
                                    <p className="text-xs text-gray-500" style={{ marginTop: '4px' }}>
                                        Ngày đặt: {order.date || order.createdAt}
                                    </p>
                                </div>
                                <div>{renderStatus(order.status)}</div>
                            </div>

                            {/* Body */}
                            <div
                                className="flex flex-col md:flex-row justify-between items-center"
                                style={{ padding: '16px', gap: '16px' }}
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

                                {/* Actions cho Admin */}
                                {isAdmin && (
                                    <div style={{ display: 'flex', gap: '8px' }} onClick={(e) => e.stopPropagation()}>
                                        {order.status === 1 && (
                                            <>
                                                <button
                                                    onClick={() => handleUpdateStatus(order.orderId, 2)}
                                                    className="bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                                                    style={{ padding: '8px 16px' }}
                                                >
                                                    Xác nhận giao
                                                </button>
                                                <button
                                                    onClick={() => handleUpdateStatus(order.orderId, -1)}
                                                    className="bg-red-500 text-white rounded hover:bg-red-600 transition"
                                                    style={{ padding: '8px 16px' }}
                                                >
                                                    Hủy đơn
                                                </button>
                                            </>
                                        )}
                                        {order.status === 2 && (
                                            <button
                                                onClick={() => handleUpdateStatus(order.orderId, 3)}
                                                className="bg-green-600 text-white rounded hover:bg-green-700 transition"
                                                style={{ padding: '8px 16px' }}
                                            >
                                                Hoàn tất
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
