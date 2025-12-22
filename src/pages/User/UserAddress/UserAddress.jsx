import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function UserAddress() {
    const userStorage = JSON.parse(localStorage.getItem('User')) || {};
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        PhoneNumber: userStorage.PhoneNumber || '',
        DetailAddress: userStorage.DetailAddress || '',
        Province: userStorage.Province || '',
        ProvinceId: userStorage.ProvinceId || '',
        District: userStorage.District || '',
        DistrictId: userStorage.DistrictId || '',
        Ward: userStorage.Ward || '',
        WardId: userStorage.WardId || '',
    });

    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);

    const [loadingDistricts, setLoadingDistricts] = useState(false);
    const [loadingWards, setLoadingWards] = useState(false);

    // Load danh sách tỉnh/thành phố khi component mount
    useEffect(() => {
        fetch('https://esgoo.net/api-tinhthanh/1/0.htm')
            .then((response) => response.json())
            .then((data) => {
                if (data.error === 0) {
                    setProvinces(data.data);
                }
            })
            .catch((error) => console.error('Error loading provinces:', error));
    }, []);

    // Load danh sách quận/huyện khi chọn tỉnh/thành phố
    const handleProvinceChange = (e) => {
        const selectedId = e.target.value;
        const selectedProvince = provinces.find((p) => p.id === selectedId);

        // Reset district và ward khi đổi province
        setFormData((prev) => ({
            ...prev,
            ProvinceId: selectedId,
            Province: selectedProvince ? selectedProvince.full_name : '',
            District: '',
            DistrictId: '',
            Ward: '',
            WardId: '',
        }));

        setDistricts([]);
        setWards([]);

        if (selectedId) {
            setLoadingDistricts(true);
            fetch(`https://esgoo.net/api-tinhthanh/2/${selectedId}.htm`)
                .then((response) => response.json())
                .then((data) => {
                    if (data.error === 0) {
                        setDistricts(data.data);
                    }
                    setLoadingDistricts(false);
                })
                .catch((error) => {
                    console.error('Error loading districts:', error);
                    setLoadingDistricts(false);
                });
        }
    };

    // Load danh sách phường/xã khi chọn quận/huyện
    const handleDistrictChange = (e) => {
        const selectedId = e.target.value;
        const selectedDistrict = districts.find((d) => d.id === selectedId);

        // Reset ward khi đổi district
        setFormData((prev) => ({
            ...prev,
            DistrictId: selectedId,
            District: selectedDistrict ? selectedDistrict.full_name : '',
            Ward: '',
            WardId: '',
        }));

        setWards([]);

        if (selectedId) {
            setLoadingWards(true);
            fetch(`https://esgoo.net/api-tinhthanh/3/${selectedId}.htm`)
                .then((response) => response.json())
                .then((data) => {
                    if (data.error === 0) {
                        setWards(data.data);
                    }
                    setLoadingWards(false);
                })
                .catch((error) => {
                    console.error('Error loading wards:', error);
                    setLoadingWards(false);
                });
        }
    };

    // Handle chọn phường/xã
    const handleWardChange = (e) => {
        const selectedId = e.target.value;
        const selectedWard = wards.find((w) => w.id === selectedId);

        setFormData((prev) => ({
            ...prev,
            WardId: selectedId,
            Ward: selectedWard ? selectedWard.full_name : '',
        }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate số điện thoại
        if (formData.PhoneNumber && !/^[0-9]{10}$/.test(formData.PhoneNumber)) {
            alert('Số điện thoại phải có 10 chữ số');
            return;
        }

        // Validate địa chỉ đầy đủ
        if (!formData.Province || !formData.District || !formData.Ward) {
            alert('Vui lòng chọn đầy đủ Tỉnh/Thành phố, Quận/Huyện và Phường/Xã');
            return;
        }

        const updatedUser = {
            UserId: userStorage.id,
            PhoneNumber: formData.PhoneNumber,
            DetailAddress: formData.DetailAddress,
            Province: formData.Province,
            District: formData.District,
            Ward: formData.Ward,
            FullName: userStorage.displayName || 'PHi',
        };

        if (!updatedUser) return;

        fetch('https://localhost:7216/api/Address/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedUser),
        })
            .then((res) => {
                if (!res.ok) throw new Error('API error');
                return res.json();
            })
            .then((data) => {
                console.log('Save success', data);
                const userToStore = {
                    ...updatedUser,
                    id: updatedUser.UserId,
                    displayname: updatedUser.FullName,
                };
                delete userToStore.UserId;
                delete userToStore.FullName;
                localStorage.setItem('User', JSON.stringify(userToStore));
                alert('Cập nhật địa chỉ thành công!');
            })
            .catch((err) => {
                console.error('Save failed', err);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div
                className="bg-white border border-gray-200 rounded-lg"
                style={{ padding: '24px', maxWidth: '900px', margin: '0 auto' }}
            >
                <h2 className="text-2xl font-bold text-[#2D1B4D]" style={{ marginBottom: '24px' }}>
                    Thông tin liên hệ & địa chỉ
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-600">Số điện thoại</label>
                        <input
                            type="text"
                            name="PhoneNumber"
                            value={formData.PhoneNumber}
                            onChange={handleChange}
                            placeholder="Nhập số điện thoại (10 chữ số)"
                            className="w-full border border-gray-300 rounded-md"
                            style={{ padding: '10px', marginTop: '6px' }}
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-600">Địa chỉ chi tiết</label>
                        <input
                            type="text"
                            name="DetailAddress"
                            value={formData.DetailAddress}
                            onChange={handleChange}
                            placeholder="Số nhà, tên đường..."
                            className="w-full border border-gray-300 rounded-md"
                            style={{ padding: '10px', marginTop: '6px' }}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-600">Tỉnh / Thành phố</label>
                        <select
                            name="ProvinceId"
                            value={formData.ProvinceId}
                            onChange={handleProvinceChange}
                            className="w-full border border-gray-300 rounded-md"
                            style={{ padding: '10px', marginTop: '6px' }}
                        >
                            <option value="">-- Chọn tỉnh/thành phố --</option>
                            {provinces.map((p) => (
                                <option key={p.id} value={p.id}>
                                    {p.full_name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-600">Quận / Huyện</label>
                        <select
                            name="DistrictId"
                            value={formData.DistrictId}
                            onChange={handleDistrictChange}
                            disabled={!formData.ProvinceId || loadingDistricts}
                            className="w-full border border-gray-300 rounded-md disabled:bg-gray-100 disabled:cursor-not-allowed"
                            style={{ padding: '10px', marginTop: '6px' }}
                        >
                            <option value="">{loadingDistricts ? '-- Đang tải... --' : '-- Chọn quận/huyện --'}</option>
                            {districts.map((d) => (
                                <option key={d.id} value={d.id}>
                                    {d.full_name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-600">Phường / Xã</label>
                        <select
                            name="WardId"
                            value={formData.WardId}
                            onChange={handleWardChange}
                            disabled={!formData.DistrictId || loadingWards}
                            className="w-full border border-gray-300 rounded-md disabled:bg-gray-100 disabled:cursor-not-allowed"
                            style={{ padding: '10px', marginTop: '6px' }}
                        >
                            <option value="">{loadingWards ? '-- Đang tải... --' : '-- Chọn phường/xã --'}</option>
                            {wards.map((w) => (
                                <option key={w.id} value={w.id}>
                                    {w.full_name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="flex justify-end" style={{ marginTop: '32px', gap: '12px' }}>
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="bg-gray-200 text-gray-700 font-bold rounded-lg hover:bg-gray-300 transition-colors cursor-pointer"
                        style={{ padding: '12px 32px' }}
                    >
                        Hủy
                    </button>
                    <button
                        type="submit"
                        className="bg-[#f4a7bb] text-white font-bold rounded-lg hover:bg-pink-400 transition-colors cursor-pointer"
                        style={{ padding: '12px 32px' }}
                    >
                        Lưu thay đổi
                    </button>
                </div>
            </div>
        </form>
    );
}
