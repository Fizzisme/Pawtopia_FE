import React from 'react';

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

export default function UserAddress() {
    return (
        <div className="fade-in">
            {' '}
            {/* Thêm class fade-in nếu muốn animation */}
            <p className="text-gray-400 text-sm mb-8 italic" style={{ marginBottom: '12px' }}>
                Các địa chỉ bên dưới mặc định sẽ được sử dụng ở trang thanh toán sản phẩm.
            </p>
            <div className="grid md:grid-cols-2 gap-8">
                <AddressCard
                    title="Địa chỉ giao hàng"
                    editLabel="Sửa Địa chỉ giao hàng"
                    name="Mạnh"
                    address="Số nhà 123"
                    ward="Phường An Hội Đông"
                    city="Thành phố Hồ Chí Minh"
                />
            </div>
        </div>
    );
}
