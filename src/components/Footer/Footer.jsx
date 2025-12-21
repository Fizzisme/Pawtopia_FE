import pawtopiaLogo from '@/assets/pawtopiaDesscription.png';
import favIcon from '@/assets/Favicon-pawtopia.png';
export default function Footer() {
    return (
        <footer className="w-full">
            {/* Main Footer Section */}
            <div className="bg-[#fce4ec] h-[350px]" style={{ padding: '50px 100px' }}>
                <div className="flex justify-between gap-30">
                    {/* Left Section - Logo & Description */}
                    <div className="flex-1 space-y-4">
                        <img src={pawtopiaLogo} alt="pawtopia" />
                        <p className="text-gray-700 text-sm leading-relaxed">
                            Hướng dẫn việc trở thành nền tảng trực tuyến hàng đầu cung cấp các sản phẩm, dịch vụ và
                            thông tin dành cho những người yêu thú cưng.
                        </p>
                    </div>

                    {/* Middle Section - Store Info */}
                    <div className="flex-1 flex flex-col gap-3" style={{ marginTop: '20px' }}>
                        <h3 className="text-xl font-bold text-[#6a1f6e]">Thông tin cửa hàng</h3>
                        <div className="flex flex-col gap-3 text-sm text-gray-700">
                            <p>
                                <span className="font-semibold">Địa chỉ:</span> 279 Nguyễn Tri Phương, Phường Điện Hồng,
                                Thành phố Hồ Chí Minh, Việt Nam
                            </p>
                            <p>
                                <span className="font-semibold">Hotline:</span> +84 987 654 321
                            </p>
                            <p>
                                <span className="font-semibold">Email:</span> infopawtopia.vn@gmail.com
                            </p>
                        </div>
                    </div>

                    {/* Right Section - Support */}
                    <div className="flex-1 flex flex-col gap-3" style={{ marginTop: '20px' }}>
                        <h3 className="text-xl font-bold text-[#6a1f6e] mb-4">Hỗ Trợ</h3>
                        <ul className="flex flex-col gap-3 text-sm text-gray-700">
                            <li className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-gray-700 rounded-full"></span>
                                Điều khoản dịch vụ
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-gray-700 rounded-full"></span>
                                Chính sách miễn trừ pháp lý
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-gray-700 rounded-full"></span>
                                Chính sách đổi trả và hoàn tiền
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-gray-700 rounded-full"></span>
                                Chính sách vận chuyển
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-gray-700 rounded-full"></span>
                                Chính sách quyền riêng tư
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Copyright Section */}
            <div className="bg-white border-t border-gray-200 w-full" style={{ padding: '10px' }}>
                <div className="w-full flex items-center justify-between">
                    {/* Left - Scroll to top button */}
                    <button
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="w-8 h-8 bg-[#3e1f55] cursor-pointer text-white rounded flex items-center justify-center hover:bg-[#8a3f8e] transition-colors"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                        </svg>
                    </button>

                    {/* Center - Copyright text */}
                    <p className="text-md text-gray-600">Copyright © 2025 Pawtopia | Powered by Pawtopia</p>

                    {/* Right - Paw icon placeholder */}
                    <div
                        className="h-12 w-12 rounded-full bg-[#ffb6b8] flex items-center justify-center"
                        style={{ boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)' }}
                    >
                        <img src={favIcon} alt="fav icon" className="h-1/2 w-1/2" />
                    </div>
                </div>
            </div>
        </footer>
    );
}
