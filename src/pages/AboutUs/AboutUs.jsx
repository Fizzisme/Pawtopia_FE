import Header from '@/components/Header/Header.jsx';
import CurrentPage from '@/components/CurrentPage/CurrentPage.jsx';
import Description from '@/pages/AboutUs/Description/Description.jsx';
import Footer from '@/components/Footer/Footer.jsx';
import Help from '@/components/Help/Help.jsx';
import { Phone } from 'lucide-react';
import meoCam from '@/assets/meoCam.png';
import shiba from '@/assets/Shiba.jpg';
import dogBrown from '@/assets/dogBrown.jpg';
import dogWhite from '@/assets/dogWhite.webp';
import daDangSanPham from '@/assets/daDangSanPham.png';
import chonLocKyLuong from '@/assets/chonLocKyLuong.png';
import giaCaHopLy from '@/assets/giaCaHopLy.png';
import tuVanTamLy from '@/assets/tuVanTamLy.png';
import dogCatFood from '@/assets/dogCatFood.jpg';
import tamNhin from '@/assets/tamNhin.png';
import suMenh from '@/assets/suMenh.png';
export default function AboutUs() {
    return (
        <div className="w-full h-full">
            <Header />
            <CurrentPage />
            <Description />
            <main>
                <div style={{ padding: '0 100px', marginTop: '40px' }}>
                    <div>
                        <div className="flex">
                            <img src={dogCatFood} alt="dog cat and food" className="flex-1" />
                            <div className="flex-1" style={{ padding: '100px 0 0 0' }}>
                                <p className="text-3xl text-center">Your pet – Your happiness</p>
                                <p style={{ marginTop: '20px' }} className="text-xl ">
                                    Tên gọi Pawtopia được hình thành từ sự kết hợp giữa
                                    <strong> Paw </strong>
                                    Paw (đôi bàn chân nhỏ bé, đáng yêu của thú cưng), và
                                    <strong> Utopia </strong>
                                    (thế giới lý tưởng, nơi mọi thứ đều hoàn hảo và tràn đầy hạnh phúc).
                                </p>
                                <p style={{ marginTop: '20px' }} className="text-xl ">
                                    Bằng sự kết hợp đó, chúng tôi mong rằng Pawtopia không chỉ đơn thuần là một cửa hàng
                                    bán sản phẩm, mà còn là “thiên đường dành cho thú cưng”, nơi khách hàng có thể gửi
                                    gắm sự tin yêu để tạo nên một thế giới an toàn, khỏe mạnh và hạnh phúc cho “boss”
                                    của họ.
                                </p>
                            </div>
                        </div>
                        <div className="flex" style={{ marginTop: '40px' }}>
                            <div className="flex flex-col items-center flex-1">
                                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-yellow-200 via-pink-200 to-purple-200 flex items-center justify-center mb-6">
                                    <img src={tamNhin} alt="tam nhin" className="h-1/2" />
                                </div>
                                <p className="text-2xl font-semibold" style={{ margin: '30px 0 20px 0' }}>
                                    TẦM NHÌN
                                </p>
                                <p className="text-xl">
                                    Trở thành thương hiệu bán lẻ trực tuyến đáng tin cậy nhất dành cho thú cưng tại Việt
                                    Nam, nơi khách hàng không chỉ tìm thấy sản phẩm mà còn cảm nhận được sự gắn bó chân
                                    thành.
                                </p>
                            </div>
                            <div className="flex flex-col items-center flex-1">
                                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-yellow-200 via-pink-200 to-purple-200 flex items-center justify-center mb-6">
                                    <img src={suMenh} alt="su menh" className="h-1/2" />
                                </div>
                                <p className="text-2xl font-semibold" style={{ margin: '30px 0 20px 0' }}>
                                    SỨ MỆNH
                                </p>
                                <p className="text-xl">
                                    Mang đến những sản phẩm chất lượng, an toàn, phù hợp, giúp cho hành trình nuôi dưỡng
                                    thú cưng của khách hàng trở nên toàn diện và dễ dàng hơn.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{ padding: '0 100px', marginTop: '40px' }}>
                    <div className="h-[600px] bg-[#fde5e5]" style={{ padding: '20px 10px' }}>
                        <p className="text-center text-3xl">GIÁ TRỊ CỐT LÕI</p>
                        <p className="text-center text-2xl" style={{ marginTop: '20px' }}>
                            Kim chỉ nam cho mọi hoạt động của Pawtopia
                        </p>
                        <div className="flex justify-between gap-10" style={{ marginTop: '40px' }}>
                            <div className="flex flex-col items-center flex-1">
                                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-yellow-200 via-pink-200 to-purple-200 flex items-center justify-center mb-6">
                                    <img src={daDangSanPham} alt="da dang san pham" className="h-1/2" />
                                </div>
                                <p className="font-semibold" style={{ margin: '30px 0 20px 0' }}>
                                    ĐA DẠNG SẢN PHẨM
                                </p>
                                <p className="text-center">
                                    Pawtopia mang đến một thế giới phong phú các sản phẩm dành cho thú cưng, luôn có
                                    những lựa chọn phù hợp cho mọi nhu cầu – giúp khách hàng dễ dàng tìm thấy tất cả tại
                                    một nơi duy nhất.
                                </p>
                            </div>
                            <div className="flex flex-col items-center flex-1">
                                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-yellow-200 via-pink-200 to-purple-200 flex items-center justify-center mb-6">
                                    <img src={chonLocKyLuong} alt="chon loc ky luong" className="h-1/3" />
                                </div>
                                <p className="font-semibold" style={{ margin: '30px 0 20px 0' }}>
                                    CHỌN LỌC KỸ LƯỠNG
                                </p>

                                <p className="text-center">
                                    Chúng tôi hiểu rằng sức khỏe và hạnh phúc của thú cưng là ưu tiên hàng đầu, vì vậy
                                    mọi sản phẩm tại Pawtopia đều được chọn lọc cẩn thận từ các thương hiệu uy tín, đảm
                                    bảo về chất lượng, độ an toàn và nguồn gốc rõ ràng.
                                </p>
                            </div>
                            <div className="flex flex-col items-center flex-1">
                                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-yellow-200 via-pink-200 to-purple-200 flex items-center justify-center mb-6">
                                    <img src={giaCaHopLy} alt="gia ca hop ly" className="h-1/3" />
                                </div>
                                <p className="font-semibold" style={{ margin: '30px 0 20px 0' }}>
                                    GIÁ CẢ HỢP LÝ
                                </p>

                                <p className="text-center">
                                    Pawtopia cam kết mang đến sản phẩm chất lượng với mức giá hợp lý, giúp bạn chăm sóc
                                    thú cưng mà không phải lo lắng về chi phí. Chúng tôi tin rằng tình yêu dành cho thú
                                    cưng không nên bị giới hạn bởi giá cả, và mọi người đều xứng đáng được tiếp cận
                                    những sản phẩm tốt nhất.
                                </p>
                            </div>
                            <div className="flex flex-col items-center flex-1">
                                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-yellow-200 via-pink-200 to-purple-200 flex items-center justify-center mb-6">
                                    <img src={tuVanTamLy} alt="tu van tam ly" className="h-2/3" />
                                </div>
                                <p className="font-semibold" style={{ margin: '30px 0 20px 0' }}>
                                    TƯ VẤN TẬN TÂM
                                </p>

                                <p className="text-center">
                                    Đội ngũ Pawtopia luôn sẵn sàng đồng hành, lắng nghe và hỗ trợ bạn trong mọi khía
                                    cạnh của việc chăm sóc thú cưng, từ việc lựa chọn sản phẩm phù hợp đến chia sẻ kinh
                                    nghiệm nuôi dưỡng.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/**/}

                <p
                    className="text-[#e271b3] text-4xl font-light text-center italic"
                    style={{ padding: '0 100px', marginTop: '40px' }}
                >
                    "Pawtopia luôn đồng hành cùng bạn, vì hạnh phúc cảu thú cưng"
                </p>
                <div style={{ padding: '0 100px', marginTop: '40px' }} className="flex h-[500px] gap-7">
                    <div className="flex-1">
                        {' '}
                        <img src={shiba} alt="shiba" className="object-cover h-full" />
                    </div>
                    <div className="flex-1">
                        {' '}
                        <img src={dogBrown} alt="dog brown" className=" object-cover h-full " />
                    </div>
                    <div className="flex-1">
                        {' '}
                        <img src={dogWhite} alt="dog white" className="object-cover h-full" />
                    </div>
                </div>

                {/**/}

                <div style={{ padding: '0 100px', marginTop: '40px' }}>
                    <div className="w-full h-[450px] flex justify-between bg-[#fde5e5]">
                        <div className="flex-1">
                            <p className="text-4xl text-white text-center" style={{ marginTop: '80px' }}>
                                Đồng Hành Cùng Paw nhé!
                            </p>
                            <p
                                className="text-3xl text-white text-center font-extralight"
                                style={{ marginTop: '10px' }}
                            >
                                Đăng ký để bắt kịp với thông tin mới nhất
                            </p>
                            <div className="flex items-center justify-center gap-5" style={{ marginTop: '40px' }}>
                                <input
                                    className="w-[400px] h-[50px] bg-white"
                                    placeholder="Địa Chỉ email"
                                    style={{ padding: '0 0 0 10px' }}
                                />
                                <button
                                    className="bg-[#f5a4b5] cursor-pointer hover:bg-[#f38ba8] text-white font-semibold rounded-full flex items-center gap-2 transition-colors shadow-md h-1/3 "
                                    style={{ padding: '5px 20px' }}
                                >
                                    ĐĂNG KÝ
                                </button>
                            </div>
                        </div>
                        <div className="flex-1 flex items-center justify-center ">
                            <img
                                src={meoCam}
                                alt="meo cam"
                                className="h-6/7 w-7/8 rounded-l-full rounded-r-full object-cover"
                            />
                        </div>
                    </div>
                </div>

                {/**/}
            </main>
            <Help />
            <Footer />
        </div>
    );
}
