import Header from '@/components/Header/Header.jsx';
import Footer from '@/components/Footer/Footer.jsx';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function Product() {
    const { id } = useParams(); // 3. Lấy id từ URL (ví dụ: /san-pham/1 => id = "1")
    const [product, setProduct] = useState(null);
    const [mainImage, setMainImage] = useState('');
    const [quantity, setQuantity] = useState(1);

    const productsStored = JSON.parse(localStorage.getItem('products'));
    const foundProduct = productsStored.find((item) => item.id === id);
    useEffect(() => {
        // Tìm sản phẩm trong mảng dữ liệu (lưu ý id từ URL là string nên cần chuyển sang number nếu id trong data là number)

        if (foundProduct) {
            setProduct(foundProduct);
            setMainImage(foundProduct.image);

            // Đặt ảnh đầu tiên làm ảnh chính
        }
    }, [id]);

    return (
        <div>
            <Header />

            <main
                className=" bg-[#fff9e8]"
                style={{ borderTop: '1px solid black', paddingTop: '40px', paddingBottom: '20px' }}
            >
                <div className="flex flex-col md:flex-row gap-8">
                    {/* BÊN TRÁI: ẢNH SẢN PHẨM */}
                    <div className="w-full md:w-1/2" style={{ paddingLeft: '100px' }}>
                        <div className="relative border  rounded-lg overflow-hidden">
                            <img src={mainImage} alt="product" className="w-[100%%] object-cover" />
                        </div>
                        {/*    /!* Danh sách ảnh nhỏ (Thumbnails) *!/*/}
                        {/*    /!*<div className="grid grid-cols-5 gap-2" style={{ marginTop: '16px' }}>*!/*/}
                        {/*    /!*    /!*{product.image.map((img, index) => (*!/*!/*/}
                        {/*    /!*    /!*    <img*!/*!/*/}
                        {/*    /!*    /!*        key={index}*!/*!/*/}
                        {/*    /!*    /!*        src={img}*!/*!/*/}
                        {/*    /!*    /!*        alt="thumb"*!/*!/*/}
                        {/*    /!*    /!*        className={`border rounded cursor-pointer hover:border-pink-500 ${*!/*!/*/}
                        {/*    /!*    /!*            mainImage === img ? 'border-pink-500' : ''*!/*!/*/}
                        {/*    /!*    /!*        }`}*!/*!/*/}
                        {/*    /!*    /!*        onClick={() => setMainImage(img)}*!/*!/*/}
                        {/*    /!*    /!*    />*!/*!/*/}
                        {/*    /!*    /!*))}*!/*!/*/}
                        {/*    /!*    <img src={product?.image} className={} alt="" />*!/*/}
                        {/*    /!*</div>*!/*/}
                    </div>

                    {/* BÊN PHẢI: THÔNG TIN SẢN PHẨM */}
                    <div className="w-full md:w-1/2">
                        {/*<p className="text-gray-500 text-sm" style={{ marginBottom: '8px' }}>*/}
                        {/*    {product.category}*/}
                        {/*</p>*/}

                        <h1 className="text-2xl font-semibold text-gray-800" style={{ marginBottom: '16px' }}>
                            {foundProduct.name}
                        </h1>

                        <div className="" style={{ marginBottom: '16px' }}>
                            <span className="text-2xl font-bold text-black">
                                {foundProduct.oldPrice.toLocaleString()} VNĐ
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

                        <p style={{ marginTop: '15px', padding: '0 5px' }}>{foundProduct.description}</p>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
