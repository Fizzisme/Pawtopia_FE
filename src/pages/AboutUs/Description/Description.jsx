import pawtopiaLogo from '@/assets/pawtopiaDesscription.png';

export default function Description() {
    return (
        <div style={{ padding: '0 100px', marginTop: '60px' }}>
            <div className="w-full h-[450px] ">
                <div className="h-full bg-[#fde5e5] flex flex-col items-center">
                    <div className="flex justify-center items-center flex-3">
                        <img src={pawtopiaLogo} alt="pawtopia logo" className="w-1/2" />
                    </div>

                    <div className="flex justify-center items-start flex-2">
                        <p
                            className="inline-block bg-white text-4xl text-center text-[#d66689] "
                            style={{ padding: '5px' }}
                        >
                            THIÊN ĐƯỜNG DÀNH CHO THÚ CƯNG
                        </p>
                    </div>
                </div>
            </div>
            <p className="text-[#6a1f6e]" style={{ marginTop: '20px' }}>
                Xuất phát từ tình yêu dành cho những người bạn bốn chân, Pawtopia ra đời với mong muốn góp phần xây dựng
                nên một thế giới mà thú cưng có thể sống an toàn, khỏe mạnh và hạnh phúc. Bằng sự tận tâm và gần gũi,
                chúng tôi tin rằng cửa hàng sẽ trở thành điểm đến đáng tin cậy cho cộng đồng yêu thú cưng, vì mỗi sản
                phẩm, mỗi dịch vụ đều chứa đựng tình yêu và sự thấu hiểu.
            </p>
        </div>
    );
}
