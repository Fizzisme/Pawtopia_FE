import { Phone } from 'lucide-react';

export default function Help() {
    return (
        <div className="w-full bg-[#fef6e4] h-[200px]" style={{ padding: '40px 100px', marginTop: '20px' }}>
            <div className="flex  justify-between">
                {/* Left - Text Content */}
                <div className="flex flex-2 flex-col">
                    <h2 className="text-3xl font-semibold text-[#6a1f6e] text-center" style={{ marginBottom: '20px' }}>
                        Bạn cần hỗ trợ cho bé cưng?
                    </h2>
                    <p className="text-[#6a1f6e] text-lg text-center">
                        Đừng chần chừ mà hãy nhấc máy gọi ngay cho chúng mình để nhận được
                        <br className="hidden md:block" />
                        hỗ trợ nhanh nhất nhé!
                    </p>
                </div>

                {/* Right - Call Button */}
                <div className="flex flex-1 justify-center items-center">
                    <button
                        className="bg-[#f5abc0] cursor-pointer hover:bg-[#f38ba8] text-[#6a1f6e] font-semibold rounded-full flex items-center gap-2 transition-colors shadow-md h-1/3 "
                        style={{ padding: '5px 10px' }}
                    >
                        <Phone />
                        GỌI NGAY
                    </button>
                </div>
            </div>
        </div>
    );
}
