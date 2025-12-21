export default function ComingSoon() {
    return (
        <main className="flex-grow flex items-center justify-center" style={{ padding: '16px' }}>
            {/* 3. Card thông báo */}
            <div
                className="max-w-lg w-full bg-white rounded-[40px] shadow-2xl shadow-pink-100 border-2 border-dashed border-pink-200 text-center transform transition hover:scale-105 duration-300"
                style={{ padding: '40px' }}
            >
                {/* Icon trang trí */}
                <div className="text-6xl animate-bounce" style={{ marginBottom: '24px' }}>
                    🚧
                </div>

                <h2 className="text-3xl font-extrabold text-[#6B3A7A] tracking-tight" style={{ marginBottom: '16px' }}>
                    Tính năng đang phát triển
                </h2>

                <p className="text-gray-500 text-lg leading-relaxed" style={{ marginBottom: '32px' }}>
                    Chúng mình đang chăm chỉ hoàn thiện phần này.
                    <br /> Vui lòng quay lại sau bạn nhé! 🐾
                </p>

                {/* Hiệu ứng 3 chấm loading giả */}
                <div className="flex justify-center gap-2">
                    <div className="w-3 h-3 bg-pink-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="w-3 h-3 bg-pink-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-3 h-3 bg-pink-400 rounded-full animate-bounce"></div>
                </div>
            </div>
        </main>
    );
}
