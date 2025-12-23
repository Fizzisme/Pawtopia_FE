import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

export default function UserProfile() {
    // 1. Lấy user từ LocalStorage
    const [userStorage, setUserStorage] = useState(() => JSON.parse(localStorage.getItem('User')) || {});

    // 2. State riêng cho phần Thông tin
    const [profileData, setProfileData] = useState({
        firstName: userStorage.firstName || '',
        lastName: userStorage.lastName || '',
        email: userStorage.email || '',
    });

    // 3. State riêng cho phần Mật khẩu
    const [passData, setPassData] = useState({
        oldPassword: '',
        newPassword: '',
    });

    const [loadingInfo, setLoadingInfo] = useState(false);
    const [loadingPass, setLoadingPass] = useState(false);

    // --- HÀM XỬ LÝ 1: CẬP NHẬT THÔNG TIN ---
    const handleUpdateInfo = async (e) => {
        e.preventDefault();

        if (!profileData.firstName || !profileData.lastName) {
            alert('Vui lòng nhập đầy đủ Họ và Tên');
            return;
        }

        setLoadingInfo(true);
        try {
            // --- GỌI API UPDATE PROFILE Ở ĐÂY ---
            const payload = {
                UserId: userStorage.id, // Giả sử có ID
                displayName: `${profileData.firstName} ${profileData.lastName}`.trim(),
            };

            console.log('Gửi API Info:', payload);

            const res = await fetch(`https://localhost:7216/api/user/update-profile`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (res.ok) {
                // Cập nhật lại LocalStorage để hiển thị ngay
                const newUser = { ...userStorage, ...payload };
                localStorage.setItem('User', JSON.stringify(newUser));
                setUserStorage(newUser); // Update state để UI render lại
                alert('Đã cập nhật thông tin thành công!');
            } else {
                alert('Lỗi khi cập nhật thông tin!');
            }
        } catch (error) {
            console.error(error);
            alert('Lỗi kết nối server');
        } finally {
            setLoadingInfo(false);
        }
    };

    // --- HÀM XỬ LÝ 2: ĐỔI MẬT KHẨU ---
    const handleChangePassword = async (e) => {
        e.preventDefault();

        if (!passData.oldPassword || !passData.newPassword) {
            alert('Vui lòng nhập đầy đủ mật khẩu cũ và mới');
            return;
        }

        if (passData.newPassword.length < 6) {
            alert('Mật khẩu mới phải từ 6 ký tự trở lên');
            return;
        }

        setLoadingPass(true);
        try {
            // --- GỌI API ĐỔI PASS Ở ĐÂY ---
            const payload = {
                userId: userStorage.id,
                CurrentPassword: passData.oldPassword,
                newPassword: passData.newPassword,
            };

            console.log('Gửi API Pass:', payload);

            const res = await fetch(`https://localhost:7216/api/user/change-password`, {
                method: 'POST', // Hoặc POST tùy backend
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (res.ok) {
                alert('Đổi mật khẩu thành công!');
                setPassData({ oldPassword: '', newPassword: '' }); // Reset ô nhập
            } else {
                alert('Mật khẩu cũ không đúng hoặc lỗi hệ thống!');
            }
        } catch (error) {
            console.error(error);
            alert('Lỗi kết nối server');
        } finally {
            setLoadingPass(false);
        }
    };

    return (
        <div style={{ padding: '24px', maxWidth: '900px', margin: '0 auto' }}>
            {/* --- PHẦN 1: THÔNG TIN TÀI KHOẢN --- */}
            <form
                onSubmit={handleUpdateInfo}
                className="bg-white border border-gray-200 rounded-lg shadow-sm mb-8"
                style={{ padding: '24px' }}
            >
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-[#2D1B4D]">Thông tin cá nhân</h2>
                    <button
                        type="submit"
                        disabled={loadingInfo}
                        className="bg-[#f4a7bb] text-white font-bold rounded-lg hover:bg-pink-400 transition-colors flex items-center gap-2 disabled:opacity-50"
                        style={{ padding: '8px 24px' }}
                    >
                        {loadingInfo && <Loader2 size={16} className="animate-spin" />}
                        Lưu thông tin
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-600 mb-1">Họ</label>
                        <input
                            type="text"
                            value={profileData.firstName}
                            onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                            className="w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-200 outline-none"
                            style={{ padding: '10px' }}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-600 mb-1">Tên</label>
                        <input
                            type="text"
                            value={profileData.lastName}
                            onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                            className="w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-200 outline-none"
                            style={{ padding: '10px' }}
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-600 mb-1">
                            Email (Không thể thay đổi)
                        </label>
                        <input
                            type="email"
                            value={profileData.email}
                            disabled
                            className="w-full border border-gray-200 rounded-md bg-gray-100 text-gray-500 cursor-not-allowed"
                            style={{ padding: '10px' }}
                        />
                    </div>
                </div>
            </form>

            {/* --- PHẦN 2: ĐỔI MẬT KHẨU --- */}
            <form
                onSubmit={handleChangePassword}
                className="bg-white border border-gray-200 rounded-lg shadow-sm"
                style={{ padding: '24px' }}
            >
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-[#2D1B4D]">Đổi mật khẩu</h2>
                    <button
                        type="submit"
                        disabled={loadingPass}
                        className="bg-[#2D1B4D] text-white font-bold rounded-lg hover:bg-purple-900 transition-colors flex items-center gap-2 disabled:opacity-50"
                        style={{ padding: '8px 24px' }}
                    >
                        {loadingPass && <Loader2 size={16} className="animate-spin" />}
                        Lưu mật khẩu
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-600 mb-1">Mật khẩu hiện tại</label>
                        <input
                            type="password"
                            value={passData.oldPassword}
                            onChange={(e) => setPassData({ ...passData, oldPassword: e.target.value })}
                            placeholder="••••••"
                            className="w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-200 outline-none"
                            style={{ padding: '10px' }}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-600 mb-1">Mật khẩu mới</label>
                        <input
                            type="password"
                            value={passData.newPassword}
                            onChange={(e) => setPassData({ ...passData, newPassword: e.target.value })}
                            placeholder="Ít nhất 6 ký tự"
                            className="w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-200 outline-none"
                            style={{ padding: '10px' }}
                        />
                    </div>
                </div>
            </form>
        </div>
    );
}
