import Header from '@/components/Header/Header.jsx';
import CurrentPage from '@/components/CurrentPage/CurrentPage.jsx';
import Help from '@/components/Help/Help.jsx';
import Footer from '@/components/Footer/Footer.jsx';
import { ArrowRight, Eye, EyeOff, Lock, Mail, Cat } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
export default function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        Name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value, // Cập nhật đúng trường dựa vào thuộc tính 'name' của input
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.Name < 2) {
            setErrorMessage('Tên đăng nhập phải trên 2 ký tự');
            return;
        }

        if (formData.password.length < 8) {
            setErrorMessage('Mật khẩu phải trên 8 ký tự');
            return;
        }

        // Kiểm tra mật khẩu khớp nhau trước khi gửi
        if (formData.password !== formData.confirmPassword) {
            setErrorMessage('Mật khẩu xác nhận không khớp. Vui lòng kiểm tra lại!');
            return; // Dừng hàm ở đây, không chạy code phía dưới
        }

        // Dữ liệu sẵn sàng gửi về Backend
        console.log('Dữ liệu gửi đi:', formData);
        setErrorMessage('');
        setSuccessMessage('Đăng ký thành công');

        try {
            const response = await fetch('https://localhost:7216/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                alert('dang ky thanh cong');
                navigate('/dang-nhap');
            } else {
                const errorText = await response.text();
                alert(errorText);
            }
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div>
            <Header />
            <CurrentPage />

            <div
                className="flex justify-center items-center min-h-[85vh] bg-[#FFF5F7]"
                style={{ padding: '40px 20px' }}
            >
                <div
                    className="w-full max-w-[450px] bg-white shadow-2xl rounded-[40px] border border-pink-50"
                    style={{ padding: '50px 40px' }}
                >
                    {/* Tiêu đề */}
                    <div className="text-center" style={{ marginBottom: '35px' }}>
                        <h2 className="text-3xl font-extrabold text-[#6B3A7A]">Tạo Tài Khoản</h2>
                        <p className="text-gray-400 text-sm" style={{ marginTop: '8px' }}>
                            Gia nhập cộng đồng ngay hôm nay!
                        </p>
                    </div>

                    {errorMessage && (
                        <div
                            className=" p-3 bg-red-50 text-red-500 text-sm rounded-xl border border-red-100 text-center animate-pulse"
                            style={{ marginBottom: '12px' }}
                        >
                            {errorMessage}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        {/* Tên đăng nhập */}
                        <div className="relative" style={{ marginBottom: '16px' }}>
                            <Cat className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-300" size={20} />
                            <input
                                type="text"
                                name="Name" // QUAN TRỌNG
                                value={formData.Name} // QUAN TRỌNG
                                onChange={handleChange} // QUAN TRỌNG
                                placeholder="Tên đăng nhập"
                                className="w-full bg-pink-50 border-none rounded-full outline-none focus:ring-2 focus:ring-pink-200 text-gray-700 transition-all placeholder:text-gray-400"
                                style={{ padding: '12px 12px 12px 48px' }}
                                required
                            />
                        </div>

                        {/* Email */}
                        <div className="relative" style={{ marginBottom: '16px' }}>
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-300" size={20} />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Địa chỉ Email"
                                className="w-full bg-pink-50 border-none rounded-full outline-none focus:ring-2 focus:ring-pink-200 text-gray-700 transition-all placeholder:text-gray-400"
                                style={{ padding: '12px 12px 12px 48px' }}
                                required
                            />
                        </div>

                        {/* Mật khẩu */}
                        <div className="relative" style={{ marginBottom: '16px' }}>
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-300" size={20} />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Mật khẩu"
                                className="w-full bg-pink-50 border-none rounded-full outline-none focus:ring-2 focus:ring-pink-200 text-gray-700 transition-all placeholder:text-gray-400"
                                style={{ padding: '12px 48px 12px 48px' }}
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-pink-400 transition-colors"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>

                        {/* Xác nhận mật khẩu */}
                        <div className="relative" style={{ marginBottom: '25px' }}>
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-300" size={20} />
                            <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="Xác nhận mật khẩu"
                                className="w-full bg-pink-50 border-none rounded-full outline-none focus:ring-2 focus:ring-pink-200 text-gray-700 transition-all placeholder:text-gray-400"
                                style={{ padding: '12px 48px 12px 48px' }}
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-pink-400 transition-colors"
                            >
                                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>

                        {/* Nút Đăng ký */}
                        <button
                            type="submit"
                            className="w-full bg-[#f4a7bb] text-white font-bold rounded-full shadow-lg shadow-pink-100 hover:bg-[#ef8ca8] hover:-translate-y-0.5 active:scale-95 transition-all flex items-center justify-center gap-2 group"
                            style={{ padding: '14px' }}
                        >
                            ĐĂNG KÝ NGAY
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>

                    {/* Link chuyển sang trang Đăng nhập */}
                    <div className="text-center" style={{ marginTop: '30px' }}>
                        <p className="text-gray-500 text-sm">
                            Bạn đã có tài khoản?
                            <Link
                                to="/dang-nhap"
                                className="font-bold text-[#6B3A7A] hover:text-pink-500 underline decoration-pink-200 underline-offset-4 transition-all"
                                style={{
                                    marginLeft: '5px',
                                }}
                            >
                                Đăng nhập
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
            <Help />
            <Footer />
        </div>
    );
}
