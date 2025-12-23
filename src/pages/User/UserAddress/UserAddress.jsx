import { useEffect, useState } from 'react';

export default function UserAddress() {
    const userStorage = JSON.parse(localStorage.getItem('User')) || {};
    const [addresses, setAddresses] = useState([]);
    const [isEditing, setIsEditing] = useState(false);

    const [formData, setFormData] = useState({
        id: '',
        fullName: '',
        phoneNumber: '',
        detailAddress: '',
        province: '',
        provinceId: '',
        district: '',
        districtId: '',
        ward: '',
        wardId: '',
        isDefault: false,
    });

    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);

    const loadAddresses = () => {
        fetch(`https://localhost:7216/api/Address/my-addresses/${userStorage.id}`)
            .then((res) => res.json())
            .then((data) => setAddresses(data));
    };

    useEffect(() => {
        loadAddresses();
        fetch('https://esgoo.net/api-tinhthanh/1/0.htm')
            .then((res) => res.json())
            .then((data) => {
                if (data.error === 0) setProvinces(data.data);
            });
    }, []);

    const handleProvinceChange = (e) => {
        const id = e.target.value;
        const name = provinces.find((p) => p.id === id)?.full_name || '';
        setFormData({ ...formData, provinceId: id, province: name, districtId: '', wardId: '' });
        fetch(`https://esgoo.net/api-tinhthanh/2/${id}.htm`)
            .then((res) => res.json())
            .then((data) => setDistricts(data.data));
    };

    const handleDistrictChange = (e) => {
        const id = e.target.value;
        const name = districts.find((d) => d.id === id)?.full_name || '';
        setFormData({ ...formData, districtId: id, district: name, wardId: '' });
        fetch(`https://esgoo.net/api-tinhthanh/3/${id}.htm`)
            .then((res) => res.json())
            .then((data) => setWards(data.data));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            ...formData,
            userId: userStorage.id,
            fullName: formData.fullName || 'Khách',
            isDefault: addresses.length === 0 ? true : formData.isDefault,
        };

        fetch('https://localhost:7216/api/Address/save', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        }).then(() => {
            alert('Lưu địa chỉ thành công!');
            setIsEditing(false);
            loadAddresses();
        });
    };

    // --- GIAO DIỆN DANH SÁCH ---
    if (!isEditing) {
        return (
            <div className="flex justify-center" style={{ padding: '24px' }}>
                <div
                    className="w-full max-w-4xl bg-white rounded-3xl shadow-xl border border-pink-50 h-auto"
                    style={{ padding: '32px' }}
                >
                    <div
                        className="flex justify-between items-center border-b border-pink-50"
                        style={{ marginBottom: '32px', paddingBottom: '24px' }}
                    >
                        <h2 className="text-2xl font-bold text-gray-800">Địa chỉ của tôi</h2>
                        <button
                            onClick={() => {
                                setFormData({ id: '', fullName: userStorage.displayname || '', isDefault: false });
                                setIsEditing(true);
                            }}
                            className="bg-[#f4a7bb] hover:bg-pink-400 text-white font-bold rounded-xl shadow-lg transition-all active:scale-95"
                            style={{ padding: '12px 32px' }}
                        >
                            + Thêm địa chỉ mới
                        </button>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {addresses.map((addr) => (
                            <div
                                key={addr.id}
                                className="rounded-2xl bg-[#fdfafb] border border-pink-50 flex justify-between items-center hover:bg-white hover:shadow-md transition-all"
                                style={{ minHeight: '140px', padding: '24px' }}
                            >
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                    <div className="flex items-center" style={{ gap: '12px' }}>
                                        <span className="font-bold text-black text-lg">{addr.fullName}</span>
                                        <span className="text-gray-300">|</span>
                                        <span className="text-black font-medium">{addr.phoneNumber}</span>
                                    </div>
                                    <div className="text-black text-sm">
                                        <p className="font-medium text-gray-700">{addr.detailAddress}</p>
                                        <p className="text-gray-500">
                                            {addr.ward}, {addr.district}, {addr.province}
                                        </p>
                                    </div>
                                    {addr.isDefault && (
                                        <span
                                            className="inline-block bg-pink-500 text-white font-bold text-[9px] rounded uppercase"
                                            style={{ padding: '2px 8px', marginTop: '8px' }}
                                        >
                                            Mặc định
                                        </span>
                                    )}
                                </div>
                                <div className="flex flex-col text-right" style={{ gap: '12px' }}>
                                    <div className="flex justify-end" style={{ gap: '16px' }}>
                                        <button
                                            onClick={() => {
                                                setFormData(addr);
                                                setIsEditing(true);
                                            }}
                                            className="text-black font-bold text-sm hover:text-pink-500"
                                        >
                                            Cập nhật
                                        </button>
                                        {!addr.isDefault && (
                                            <button
                                                onClick={() => {
                                                    if (window.confirm('Bố muốn xóa?'))
                                                        fetch(`https://localhost:7216/api/Address/delete/${addr.id}`, {
                                                            method: 'DELETE',
                                                        }).then(() => loadAddresses());
                                                }}
                                                className="text-black font-bold text-sm hover:text-red-500"
                                            >
                                                Xóa
                                            </button>
                                        )}
                                    </div>
                                    {!addr.isDefault && (
                                        <button
                                            onClick={() => {
                                                const updated = { ...addr, isDefault: true, userId: userStorage.id };
                                                fetch('https://localhost:7216/api/Address/save', {
                                                    method: 'POST',
                                                    headers: { 'Content-Type': 'application/json' },
                                                    body: JSON.stringify(updated),
                                                }).then(() => loadAddresses());
                                            }}
                                            className="border border-black rounded-lg text-xs font-bold text-black hover:bg-gray-50 transition-all"
                                            style={{ padding: '6px 16px' }}
                                        >
                                            Thiết lập mặc định
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    // --- GIAO DIỆN FORM ---
    return (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
            <div
                className="w-full max-w-xl bg-white rounded-[32px] shadow-2xl border border-pink-100"
                style={{ padding: '10px 40px' }}
            >
                <h2 className="text-2xl font-bold text-gray-800 text-center uppercase tracking-tight">
                    {formData.id ? 'Cập nhật địa chỉ' : 'Thêm địa chỉ mới'}
                </h2>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            <label
                                className="text-[11px] font-bold text-gray-400 uppercase tracking-widest"
                                style={{ marginLeft: '8px' }}
                            >
                                Họ và Tên
                            </label>
                            <input
                                type="text"
                                placeholder="Nhập họ và tên"
                                className="w-full bg-[#fafafa] border border-pink-100 rounded-xl outline-none focus:border-pink-300 focus:bg-white transition-all text-black font-bold"
                                style={{ padding: '16px 20px' }}
                                value={formData.fullName}
                                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                required
                            />
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            <label
                                className="text-[11px] font-bold text-gray-400 uppercase tracking-widest"
                                style={{ marginLeft: '8px' }}
                            >
                                Số điện thoại
                            </label>
                            <input
                                type="text"
                                placeholder="Nhập số điện thoại"
                                className="w-full bg-[#fafafa] border border-pink-100 rounded-xl outline-none focus:border-pink-300 focus:bg-white transition-all text-black font-bold"
                                style={{ padding: '16px 20px' }}
                                value={formData.phoneNumber}
                                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                                required
                            />
                        </div>

                        <div className="grid grid-cols-2" style={{ gap: '16px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                <label
                                    className="text-[11px] font-bold text-gray-400 uppercase tracking-widest"
                                    style={{ marginLeft: '8px' }}
                                >
                                    Tỉnh / Thành
                                </label>
                                <select
                                    className="w-full bg-[#fafafa] border border-pink-100 rounded-xl outline-none focus:border-pink-300 focus:bg-white cursor-pointer appearance-none text-black font-bold"
                                    style={{ padding: '16px 20px' }}
                                    value={formData.provinceId}
                                    onChange={handleProvinceChange}
                                    required
                                >
                                    <option value="">Chọn tỉnh</option>
                                    {provinces.map((p) => (
                                        <option key={p.id} value={p.id}>
                                            {p.full_name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                <label
                                    className="text-[11px] font-bold text-gray-400 uppercase tracking-widest"
                                    style={{ marginLeft: '8px' }}
                                >
                                    Quận / Huyện
                                </label>
                                <select
                                    className="w-full bg-[#fafafa] border border-pink-100 rounded-xl outline-none focus:border-pink-300 focus:bg-white cursor-pointer disabled:opacity-50 appearance-none text-black font-bold"
                                    style={{ padding: '16px 20px' }}
                                    value={formData.districtId}
                                    onChange={handleDistrictChange}
                                    required
                                    disabled={!districts.length}
                                >
                                    <option value="">Chọn quận</option>
                                    {districts.map((d) => (
                                        <option key={d.id} value={d.id}>
                                            {d.full_name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            <label
                                className="text-[11px] font-bold text-gray-400 uppercase tracking-widest"
                                style={{ marginLeft: '8px' }}
                            >
                                Phường / Xã
                            </label>
                            <select
                                className="w-full bg-[#fafafa] border border-pink-100 rounded-xl outline-none focus:border-pink-300 focus:bg-white appearance-none text-black font-bold"
                                style={{ padding: '16px 20px' }}
                                value={formData.wardId}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        wardId: e.target.value,
                                        ward: wards.find((w) => w.id === e.target.value)?.full_name,
                                    })
                                }
                                required
                                disabled={!wards.length}
                            >
                                <option value="">Chọn xã</option>
                                {wards.map((w) => (
                                    <option key={w.id} value={w.id}>
                                        {w.full_name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            <label
                                className="text-[11px] font-bold text-gray-400 uppercase tracking-widest"
                                style={{ marginLeft: '8px' }}
                            >
                                Địa chỉ chi tiết
                            </label>
                            <textarea
                                placeholder="Số nhà, tên đường..."
                                className="w-full bg-[#fafafa] border border-pink-100 rounded-xl outline-none focus:border-pink-300 focus:bg-white transition-all text-black font-bold min-h-[100px]"
                                style={{ padding: '16px 20px' }}
                                value={formData.detailAddress}
                                onChange={(e) => setFormData({ ...formData, detailAddress: e.target.value })}
                                required
                            />
                        </div>

                        <label className="flex items-center cursor-pointer" style={{ gap: '12px', padding: '4px' }}>
                            <input
                                type="checkbox"
                                checked={formData.isDefault}
                                onChange={(e) => setFormData({ ...formData, isDefault: e.target.checked })}
                                className="w-5 h-5 accent-pink-500 rounded-md transition-all"
                            />
                            <span className="text-sm font-bold text-gray-700">Đặt làm địa chỉ mặc định</span>
                        </label>
                    </div>

                    <div className="flex" style={{ gap: '16px', paddingTop: '24px' }}>
                        <button
                            type="button"
                            onClick={() => setIsEditing(false)}
                            className="flex-1 font-bold text-gray-400 hover:text-black transition-colors uppercase text-xs tracking-widest"
                            style={{ padding: '16px 0' }}
                        >
                            Hủy bỏ
                        </button>
                        <button
                            type="submit"
                            className="flex-[2] bg-[#f4a7bb] hover:bg-pink-400 text-white font-bold rounded-2xl shadow-lg transition-all active:scale-95 text-sm uppercase tracking-widest"
                            style={{ padding: '16px 0' }}
                        >
                            Hoàn thành
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
