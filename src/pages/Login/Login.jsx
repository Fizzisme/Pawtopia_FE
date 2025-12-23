import Header from '@/components/Header/Header.jsx';
import Help from '@/components/Help/Help.jsx';
import Footer from '@/components/Footer/Footer.jsx';
import CurrentPage from '@/components/CurrentPage/CurrentPage.jsx';
import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Cat } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'; // 1. Import Google

export default function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [showPassword, setShowPassword] = useState(false);

    // THAY CLIENT_ID CỦA BẠN VÀO ĐÂY
    const GOOGLE_CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com';

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Xử lý đăng nhập thường
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://localhost:7216/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                const data = await response.json();
                const user = data.user;
                localStorage.setItem('User', JSON.stringify(user));
                alert('Đăng nhập thành công');
                navigate('/');
            } else {
                const errorText = await response.text();
                alert(errorText);
            }
        } catch (error) {
            console.error(error);
            alert('Lỗi kết nối server');
        }
    };

    // 2. Xử lý đăng nhập Google
    const handleGoogleLogin = async (credentialResponse) => {
        try {
            const decoded = jwtDecode(credentialResponse.credential);
            console.log('Google User info:', decoded);

            // Gọi API Backend của bạn
            const response = await fetch('https://localhost:7216/api/auth/google-login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    token: credentialResponse.credential,
                    email: decoded.email,
                    name: decoded.name,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                // Giả sử backend trả về data giống login thường
                console.log(data);
                localStorage.setItem('User', JSON.stringify(data.user || data));
                alert('Đăng nhập Google thành công!');
                navigate('/');
            } else {
                const errorText = await response.text();
                alert('Đăng nhập Google thất bại: ' + errorText);
            }
        } catch (error) {
            console.error('Error Google Login:', error);
            alert('Có lỗi xảy ra khi đăng nhập bằng Google');
        }
    };

    return (
        <GoogleOAuthProvider clientId={'873497435582-8hf9tmpqb9gp274e2monc7ae5ku37mql.apps.googleusercontent.com'}>
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
                            <h2 className="text-3xl font-extrabold text-[#6B3A7A]">Đăng Nhập</h2>
                            <p className="text-gray-400 text-sm" style={{ marginTop: '8px' }}>
                                Chào mừng bạn quay trở lại với Pawtopia! 🐾
                            </p>
                        </div>

                        <form onSubmit={handleSubmit}>
                            {/* Email */}
                            <div className="relative" style={{ marginBottom: '16px' }}>
                                <Cat className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-300" size={20} />
                                <input
                                    type="text"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Email Đăng Nhập"
                                    className="w-full bg-pink-50 border-none rounded-full outline-none focus:ring-2 focus:ring-pink-200 text-gray-700 transition-all placeholder:text-gray-400"
                                    style={{ padding: '12px 12px 12px 48px' }}
                                    required
                                />
                            </div>

                            {/* Mật khẩu */}
                            <div className="relative" style={{ marginBottom: '12px' }}>
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

                            {/* Quên mật khẩu */}
                            <div className="text-right" style={{ marginBottom: '25px' }}>
                                <a
                                    href="/forgot-password"
                                    className="text-xs text-pink-400 hover:text-pink-600 font-medium transition-colors"
                                >
                                    Quên mật khẩu?
                                </a>
                            </div>

                            {/* Nút Đăng nhập */}
                            <button
                                type="submit"
                                className="w-full bg-[#f4a7bb] text-white font-bold rounded-full shadow-lg shadow-pink-100 hover:bg-[#ef8ca8] hover:-translate-y-0.5 active:scale-95 transition-all flex items-center justify-center gap-2 group"
                                style={{ padding: '14px' }}
                            >
                                ĐĂNG NHẬP
                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </form>

                        {/* --- PHẦN GOOGLE LOGIN MỚI --- */}
                        <div className="flex items-center gap-4 " style={{ margin: '10px 0' }}>
                            <div className="h-px bg-pink-100 flex-1"></div>
                            <span className="text-xs text-gray-400 font-medium">Hoặc đăng nhập với</span>
                            <div className="h-px bg-pink-100 flex-1"></div>
                        </div>

                        <div className="flex justify-center w-full">
                            <GoogleLogin
                                onSuccess={handleGoogleLogin}
                                onError={() => {
                                    console.log('Login Failed');
                                    alert('Đăng nhập Google thất bại');
                                }}
                                useOneTap
                                theme="outline"
                                shape="pill"
                                width="370" // Điều chỉnh chiều rộng nút cho khớp form
                                text="signin_with"
                            />
                        </div>
                        {/* ----------------------------- */}

                        {/* Link chuyển sang trang Đăng ký */}
                        <div className="text-center" style={{ marginTop: '30px' }}>
                            <p className="text-gray-500 text-sm">
                                Bạn chưa có tài khoản?
                                <Link
                                    to="/dang-ky"
                                    className="font-bold text-[#6B3A7A] hover:text-pink-500 underline decoration-pink-200 underline-offset-4 transition-all"
                                    style={{
                                        marginLeft: '5px',
                                    }}
                                >
                                    Đăng ký ngay
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
                <Help />
                <Footer />
            </div>
        </GoogleOAuthProvider>
    );
}
