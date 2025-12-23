import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function UserProfile() {
    const userStorage = JSON.parse(localStorage.getItem('User')) || {};
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: userStorage.firstName || '',
        lastName: userStorage.lastName || '',
        email: userStorage.email || '',
        oldPassword: '',
        newPassword: '',
        FullName: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Chỉ validate nếu user đang thay đổi mật khẩu
        if (formData.newPassword) {
            // if (!formData.oldPassword) {
            //     alert('Vui lòng nhập mật khẩu hiện tại để đổi mật khẩu mới');
            //     return;
            // }
            if (formData.newPassword.length < 6) {
                alert('Mật khẩu mới phải ít nhất 6 ký tự');
                return;
            }
            // TODO: Kiểm tra oldPassword có đúng không (gọi API)
        }

        // Chỉ validate firstName/lastName nếu user có nhập ít nhất 1 trong 2
        if ((formData.firstName || formData.lastName) && (!formData.firstName || !formData.lastName)) {
            alert('Vui lòng nhập đầy đủ họ và tên');
            return;
        }

        // Chỉ cập nhật FullName nếu có thay đổi firstName hoặc lastName
        const updatedUser = {
            ...userStorage,
        };

        if (formData.firstName && formData.lastName) {
            updatedUser.FullName = formData.firstName + ' ' + formData.lastName;
        }

        // Chỉ cập nhật các trường có giá trị
        if (formData.newPassword) updatedUser.password = formData.newPassword;

        console.log('Updated fields:', updatedUser);

        // Lưu vào localStorage
        // localStorage.setItem('User', JSON.stringify(updatedUser));

        // TODO: Gọi API cập nhật thông tin

        alert('Cập nhật thông tin thành công!');

        // Reset password fields sau khi lưu
        setFormData((prev) => ({
            ...prev,
            oldPassword: '',
            newPassword: '',
        }));
    };

    return (
        <form onSubmit={handleSubmit}>
            <div
                className="bg-white border border-gray-200 rounded-lg"
                style={{ padding: '24px', maxWidth: '900px', margin: '0 auto' }}
            >
                <h2 className="text-2xl font-bold text-[#2D1B4D]" style={{ marginBottom: '24px' }}>
                    Thông tin tài khoản
                </h2>

                {/* FORM INFO */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-600">Họ</label>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md"
                            style={{ padding: '10px', marginTop: '6px' }}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-600">Tên</label>
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md"
                            style={{ padding: '10px', marginTop: '6px' }}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-600">Email</label>
                        <input
                            type="email"
                            value={formData.email}
                            disabled
                            className="w-full border border-gray-300 rounded-md bg-gray-100"
                            style={{ padding: '10px', marginTop: '6px' }}
                        />
                    </div>
                </div>

                {/* DIVIDER */}
                <div className="border-t border-gray-200" style={{ margin: '32px 0' }} />

                {/* PASSWORD */}
                <h3 className="text-lg font-bold text-[#2D1B4D]" style={{ marginBottom: '16px' }}>
                    Đổi mật khẩu
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input
                        type="password"
                        name="oldPassword"
                        value={formData.oldPassword}
                        onChange={handleChange}
                        placeholder="Mật khẩu hiện tại"
                        className="w-full border border-gray-300 rounded-md"
                        style={{ padding: '10px' }}
                    />
                    <input
                        type="password"
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleChange}
                        placeholder="Mật khẩu mới"
                        className="w-full border border-gray-300 rounded-md"
                        style={{ padding: '10px' }}
                    />
                </div>

                {/* ACTION */}
                <div className="flex justify-end" style={{ marginTop: '32px' }}>
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
