import Header from '@/components/Header/Header.jsx';
import Footer from '@/components/Footer/Footer.jsx';
import { useState, useEffect } from 'react';
export default function Product() {
    const product = {
        name: '[Chai 400ml] Sữa tắm Yú thơm lâu cho Chó Mèo',
        category: 'Chăm sóc Chó, Chăm sóc Mèo, Flash Deal',
        originalPrice: 359000,
        salePrice: 329000,
        images: [
            'https://via.placeholder.com/400x400?text=Main+Image', // Thay bằng link ảnh thật
            'https://via.placeholder.com/100x100?text=Img1',
            'https://via.placeholder.com/100x100?text=Img2',
            'https://via.placeholder.com/100x100?text=Img3',
            'https://via.placeholder.com/100x100?text=Img4',
        ],
        variants: ['Mẫu đơn', 'Hoa trà', 'Kim đào', 'Lựu đỏ', 'Hoa sen', 'Vải thiều', 'Bạch quả'],
    };

    const [mainImage, setMainImage] = useState(product.images[0]);
    const [quantity, setQuantity] = useState(1);

    return (
        <div>
            <Header />

            <main className="h-[1000px] bg-[#fff9e8]" style={{ borderTop: '1px solid black', paddingTop: '40px' }}>
                <div className="flex flex-col md:flex-row gap-8">
                    {/* BÊN TRÁI: ẢNH SẢN PHẨM */}
                    <div className="w-full md:w-1/2">
                        {/* Ảnh chính */}
                        <div className="relative border rounded-lg overflow-hidden">
                            <img src={mainImage} alt="product" className="w-full object-cover" />
                        </div>

                        {/* Danh sách ảnh nhỏ (Thumbnails) */}
                        <div className="grid grid-cols-5 gap-2" style={{ marginTop: '16px' }}>
                            {product.images.map((img, index) => (
                                <img
                                    key={index}
                                    src={img}
                                    alt="thumb"
                                    className={`border rounded cursor-pointer hover:border-pink-500 ${
                                        mainImage === img ? 'border-pink-500' : ''
                                    }`}
                                    onClick={() => setMainImage(img)}
                                />
                            ))}
                        </div>
                    </div>

                    {/* BÊN PHẢI: THÔNG TIN SẢN PHẨM */}
                    <div className="w-full md:w-1/2">
                        <p className="text-gray-500 text-sm" style={{ marginBottom: '8px' }}>
                            {product.category}
                        </p>

                        <h1 className="text-2xl font-semibold text-gray-800" style={{ marginBottom: '16px' }}>
                            {product.name}
                        </h1>

                        <div className="" style={{ marginBottom: '16px' }}>
                            <span className="text-2xl font-bold text-black">
                                {product.salePrice.toLocaleString()} VNĐ
                            </span>
                        </div>

                        <div className="flex items-center gap-1 text-yellow-500" style={{ marginBottom: '16px' }}>
                            <span>★★★★★</span>
                            <span className="text-gray-500 text-sm">(1 đánh giá của khách hàng)</span>
                        </div>

                        {/* Số lượng và Nút bấm */}
                        <div className="flex items-center gap-4" style={{ marginBottom: '16px' }}>
                            <div className="flex border rounded">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="border-r"
                                    style={{ padding: '4px 12px' }}
                                >
                                    -
                                </button>
                                <input
                                    type="text"
                                    value={quantity}
                                    readOnly
                                    className="w-12 text-center focus:outline-none"
                                />
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="px-3 py-1 border-l"
                                    style={{ padding: '4px 12px' }}
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        <div className="flex gap-5" style={{ padding: ' 0 10px' }}>
                            <button
                                className="flex-1 bg-pink-200 text-pink-700 font-bold rounded-full hover:bg-pink-300 transition"
                                style={{ padding: '8px 0' }}
                            >
                                THÊM VÀO GIỎ HÀNG
                            </button>
                            <button
                                className="flex-1 bg-pink-400 text-white font-bold  rounded-full hover:bg-pink-500 transition"
                                style={{ padding: '8px 0' }}
                            >
                                MUA NGAY
                            </button>
                        </div>

                        <div
                            className="mt-6 text-sm text-gray-500 cursor-pointer hover:text-pink-500"
                            style={{ marginTop: '24px' }}
                        >
                            ♡ Thêm vào mục Yêu thích
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
