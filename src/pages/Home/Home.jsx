import Header from '@/components/Header/Header.jsx';
import HeroImage from '@/pages/Home/HeroImage/HeroImage.jsx';
import feature1 from '@/assets/feature01.png';
import feature2 from '@/assets/feature02.png';
import feature3 from '@/assets/feature03.png';
import feature4 from '@/assets/feature04.png';
import slide01 from '@/assets/slide01.png';
import slide02 from '@/assets/slide02.png';
import slide03 from '@/assets/slide03.png';
import production1 from '@/assets/production1.jpg';
import NDFood from '@/assets/NDFood.png';
import RoyalCanin from '@/assets/RoyalCanin.png';
import DogToy from '@/assets/dogToy.png';
import twoCat from '@/assets/catTakeCareCat.png';
import catFurniture from '@/assets/catFurniture.png';
import { Link } from 'react-router-dom';
const categories = [
    {
        id: 1,
        title: 'Thức ăn hạt cho chó',
        link: '/cua-hang/C1',
        image: NDFood,
    },
    {
        id: 2,
        title: 'Dinh dưỡng cho mèo',
        link: '/cua-hang/C2',
        image: RoyalCanin,
    },
    {
        id: 3,
        title: 'Phụ kiện & Đồ chơi',
        link: '/cua-hang/C3',
        image: DogToy,
    },
    {
        id: 4,
        title: 'Chăm sóc Boss yêu',
        link: '/cua-hang/C4',
        image: twoCat,
    },
    {
        id: 5,
        title: 'Vật dụng nhà ở',
        link: '/cua-hang/C5',
        image: catFurniture,
    },
];
const bestSellerProducts = [
    {
        id: 1,
        name: 'Snack cho chó Natural Core Thanh Cố Tuyết sấy gói 30g',
        image: '/images/product1.png',
        price: 39000,
        oldPrice: null,
        button: 'THÊM VÀO GIỎ HÀNG',
    },
    {
        id: 2,
        name: 'Alkin Omnix Thuốc nhỏ mắt 10ml cho chó mèo',
        image: '/images/product2.png',
        price: 99000,
        oldPrice: 115000,
        button: 'THÊM VÀO GIỎ HÀNG',
    },
    {
        id: 3,
        name: 'Áo hai dây dáng bí phồng chun ngực',
        image: '/images/product3.png',
        price: 125000,
        oldPrice: null,
        button: 'CHỌN',
    },
    {
        id: 4,
        name: 'Hipi Kéo cắt móng có khóa chặn cho chó mèo',
        image: '/images/product4.png',
        price: 40000,
        oldPrice: 65000,
        button: 'THÊM VÀO GIỎ HÀNG',
    },
];
import Absorb from '@/assets/brands/thuonghieu1.webp';
import { Phone } from 'lucide-react';
import Footer from '@/components/Footer/Footer.jsx';
import Help from '@/components/Help/Help.jsx';
const brands = [
    { id: 1, name: 'Absorb Plus', logo: Absorb },
    { id: 2, name: 'Absorb Plus', logo: Absorb },
    { id: 3, name: 'Absorb Plus', logo: Absorb },
    { id: 4, name: 'Absorb Plus', logo: Absorb },
    { id: 5, name: 'Absorb Plus', logo: Absorb },
    { id: 6, name: 'Absorb Plus', logo: Absorb },
];
export default function Home() {
    return (
        <div>
            <Header />
            <HeroImage />
            {/*feature*/}
            <div className="flex " style={{ padding: '0 100px', marginTop: '40px' }}>
                <div className="flex-1">
                    <img src={feature1} alt="feature01" />
                </div>
                <div className="flex-1">
                    <img src={feature2} alt="feature02" />
                </div>
                <div className="flex-1">
                    <img src={feature3} alt="feature03" />
                </div>
                <div className="flex-1">
                    <img src={feature4} alt="feature04" />
                </div>
            </div>
            {/*Sales*/}
            <div className="flex gap-5" style={{ padding: '0 100px', marginTop: '40px' }}>
                <div className="flex-2 rounded-xl overflow-hidden">
                    <img src={slide01} alt="slide 01" className="w-full h-full object-cover" />
                </div>

                <div className="flex-1 flex flex-col gap-5">
                    <div className="flex-1 rounded-xl overflow-hidden">
                        <img src={slide02} alt="slide 02" className="w-full h-full object-cover" />
                    </div>

                    <div className="flex-1 rounded-xl overflow-hidden">
                        <img src={slide03} alt="slide 03" className="w-full h-full object-cover" />
                    </div>
                </div>
            </div>
            {/*Boss yêu cần gì*/}
            <div className="h-full flex items-center justify-center" style={{ padding: '0 100px', marginTop: '40px' }}>
                <button
                    className="bg-[#f5abc0] hover:bg-[#f38ba8] text-white text-4xl font-semibold rounded-full px-4 py-2 shadow-md h-[50px] flex justify-center items-center"
                    style={{ padding: '15px' }}
                >
                    BOSS YÊU CẦN GÌ?
                </button>
            </div>
            {/*Flash deals*/}
            <div style={{ padding: '0 100px', marginTop: '40px' }}>
                <div className="bg-[#acfffc] rounded-2xl h-[500px] w-full" style={{ padding: '24px' }}>
                    <div className="flex items-center justify-between" style={{ marginTop: '24px' }}>
                        <div className="flex items-center gap-6">
                            <h2 className="text-pink-500 font-bold text-xl flex items-center gap-1">
                                <p className="italic">⚡</p>
                                FLASH DEALS
                                <p className="italic">⚡</p>
                            </h2>

                            <div className="text-center">
                                <div className="text-pink-500 text-3xl font-mono font-semibold">00:01:59:05</div>
                                <div className="flex  text-xs text-pink-500 justify-between">
                                    <span>NGÀY</span>
                                    <span>GIỜ</span>
                                    <span>PHÚT</span>
                                    <span>GIÂY</span>
                                </div>
                            </div>
                        </div>

                        <button
                            className="bg-pink-500 text-white rounded-full text-sm font-semibold hover:bg-pink-600"
                            style={{ padding: '4px 8px' }}
                        >
                            Xem Tất Cả
                        </button>
                    </div>

                    <div className="grid grid-cols-4 gap-10" style={{ marginTop: '40px' }}>
                        {Array.from({ length: 4 }).map((_, index) => (
                            <div
                                key={index}
                                className="group bg-white rounded-xl relative p-3 cursor-pointer transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl"
                                style={{ padding: '24px 12px' }}
                            >
                                {/* Badge */}
                                <span
                                    className="absolute top-2 left-2 bg-red-500 text-white text-xs rounded-xl z-10"
                                    style={{ padding: '4px 8px' }}
                                >
                                    Giảm giá
                                </span>

                                {/* Image */}
                                <div className="overflow-hidden rounded-lg mb-2">
                                    <img
                                        src={production1}
                                        alt="production"
                                        className="w-full h-40 object-contain transition-transform duration-300 group-hover:scale-110"
                                    />
                                </div>

                                {/* Title */}
                                <h3 className="text-sm font-medium line-clamp-2" style={{ marginBot: '4px' }}>
                                    Dung dịch vệ sinh rửa tai Forcans Hàn Quốc
                                </h3>

                                {/* Price */}
                                <div className="text-xs text-gray-400 line-through">138.000 VND</div>

                                <div className="text-pink-500 font-semibold">
                                    99.000 VND <span className="text-xs">VAT</span>
                                </div>

                                {/* Rating */}
                                <div className="text-yellow-400 text-sm" style={{ marginBot: '4px' }}>
                                    ★★★★★
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {/*DANH MỤC SẢN PHẨM*/}
            <div className="h-full flex items-center justify-center" style={{ padding: '0 100px', marginTop: '40px' }}>
                <button
                    className="bg-[#f5abc0] hover:bg-[#f38ba8] text-white text-4xl font-semibold rounded-full px-4 py-2 shadow-md h-[50px] flex justify-center items-center"
                    style={{ padding: '15px' }}
                >
                    DANH MỤC SẢN PHẨM
                </button>
            </div>
            {/* */}
            <div style={{ padding: '0 100px' }}>
                {' '}
                <div className="max-w-7xl mx-auto bg-white">
                    {/* Header section */}

                    {/* Grid container */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                        {categories.map((item) => (
                            <Link
                                to={item.link}
                                key={item.id}
                                className="flex flex-col items-center group cursor-pointer"
                            >
                                {/* Circle Container */}
                                <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-full bg-white border border-gray-100 shadow-sm flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:scale-105">
                                    {/* Giả lập vòng tròn mờ bên ngoài như trong ảnh */}
                                    <div className="absolute inset-2 border border-gray-50 rounded-full pointer-events-none"></div>

                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-3/4 h-3/4 object-contain z-10"
                                    />
                                </div>

                                {/* Title */}
                                <h3
                                    className="text-center font-bold text-gray-800 text-sm md:text-base leading-tight px-2"
                                    style={{ marginTop: '16px' }}
                                >
                                    {item.title}
                                </h3>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
            {/*SẢN PHẨM BÁN CHẠY*/}
            {/*<div className="h-full flex items-center justify-center" style={{ padding: '0 100px', marginTop: '40px' }}>*/}
            {/*    <button*/}
            {/*        className="bg-[#f5abc0] hover:bg-[#f38ba8] text-white text-4xl font-semibold rounded-full px-4 py-2 shadow-md h-[50px] flex justify-center items-center"*/}
            {/*        style={{ padding: '15px' }}*/}
            {/*    >*/}
            {/*        SẢN PHẨM BÁN CHẠY*/}
            {/*    </button>*/}
            {/*</div>*/}
            {/*<div style={{ padding: '0 100px', marginTop: '40px' }}>*/}
            {/*    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">*/}
            {/*        {bestSellerProducts.map((item) => (*/}
            {/*            <div*/}
            {/*                key={item.id}*/}
            {/*                className="*/}
            {/*        group*/}
            {/*        border*/}
            {/*        rounded-lg*/}
            {/*        bg-white*/}
            {/*        flex*/}
            {/*        flex-col*/}
            {/*        cursor-pointer*/}
            {/*        transition-all*/}
            {/*        duration-300*/}
            {/*        ease-out*/}
            {/*        hover:-translate-y-1*/}
            {/*        hover:shadow-xl*/}
            {/*    "*/}
            {/*                style={{ padding: '16px' }}*/}
            {/*            >*/}
            {/*                /!* Image *!/*/}
            {/*                <div*/}
            {/*                    className="aspect-square flex items-center justify-center overflow-hidden"*/}
            {/*                    style={{ marginBottom: '16px' }}*/}
            {/*                >*/}
            {/*                    <img*/}
            {/*                        src={item.image}*/}
            {/*                        alt={item.name}*/}
            {/*                        className="*/}
            {/*                object-contain*/}
            {/*                h-full*/}
            {/*                transition-transform*/}
            {/*                duration-300*/}
            {/*                group-hover:scale-110*/}
            {/*            "*/}
            {/*                    />*/}
            {/*                </div>*/}

            {/*                /!* Name *!/*/}
            {/*                <h3 className="text-sm text-gray-700 mb-2 line-clamp-2">{item.name}</h3>*/}

            {/*                /!* Price *!/*/}
            {/*                <div style={{ margin: '16px 0' }}>*/}
            {/*                    {item.oldPrice && (*/}
            {/*                        <span className="text-sm text-gray-400 line-through" style={{ marginRight: '8px' }}>*/}
            {/*                            {item.oldPrice.toLocaleString()} VND*/}
            {/*                        </span>*/}
            {/*                    )}*/}
            {/*                    <span className="text-pink-500 font-semibold">*/}
            {/*                        {item.price.toLocaleString()} VND VAT*/}
            {/*                    </span>*/}
            {/*                </div>*/}

            {/*                /!* Button *!/*/}
            {/*                <button*/}
            {/*                    className="*/}
            {/*            mt-auto*/}
            {/*            bg-pink-500*/}
            {/*            hover:bg-pink-600*/}
            {/*            text-white*/}
            {/*            text-sm*/}
            {/*            font-medium*/}
            {/*            rounded-md*/}
            {/*            transition*/}
            {/*        "*/}
            {/*                    style={{ padding: '8px' }}*/}
            {/*                >*/}
            {/*                    {item.button}*/}
            {/*                </button>*/}
            {/*            </div>*/}
            {/*        ))}*/}
            {/*    </div>*/}
            {/*</div>*/}
            {/*+50 THƯƠNG HIỆU UY TÍN*/}
            <div className="h-full flex items-center justify-center" style={{ padding: '0 100px', marginTop: '40px' }}>
                <button
                    className="bg-[#f5abc0] hover:bg-[#f38ba8] text-white text-4xl font-semibold rounded-full px-4 py-2 shadow-md h-[50px] flex justify-center items-center"
                    style={{ padding: '15px' }}
                >
                    +50 THƯƠNG HIỆU UY TÍN
                </button>
            </div>
            <div style={{ padding: '0 100px', marginTop: '40px' }}>
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-10">
                        {brands.map((brand) => (
                            <div
                                key={brand.id}
                                className="
                                group
                                flex
                                flex-col
                                items-center
                                justify-center
                                cursor-pointer
                                transition
                                duration-300
                            "
                            >
                                {/* Logo */}
                                <div
                                    className="
                                    h-20
                                    flex
                                    items-center
                                    justify-center
                                    transition-transform
                                    duration-300
                                    group-hover:scale-110
                                "
                                >
                                    <img src={brand.logo} alt={brand.name} className="h-full object-contain" />
                                </div>

                                {/* Name */}
                                <span
                                    className="
                                    mt-3
                                    text-sm
                                    text-gray-700
                                    transition
                                    group-hover:text-pink-500
                                "
                                >
                                    {brand.name}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <Help />
            <Footer />
        </div>
    );
}
