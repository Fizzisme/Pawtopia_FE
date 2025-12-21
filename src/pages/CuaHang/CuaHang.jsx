import Header from '@/components/Header/Header.jsx';
import CurrentPage from '@/components/CurrentPage/CurrentPage.jsx';
import ComingSoon from '@/components/ComingSoon/ComingSoon.jsx';
import Footer from '@/components/Footer/Footer.jsx';
import Help from '@/components/Help/Help.jsx';
import { useState, useEffect } from 'react';
import ProductCard from './ProductCard/ProductCard.jsx';
export default function CuaHang() {
    const allProducts = Array.from({ length: 100 }).map((_, i) => ({
        id: i,
        name: `Sản phẩm Pawtopia mẫu số ${i + 1}`,
        image: 'https://picsum.photos/400/400?random=' + i,
        oldPrice: 150000,
        newPrice: 99000,
        rating: 4,
        variants: ['Màu đơn', 'Hoa trà', 'Anh đào'],
    }));

    const productsPerPage = 24;
    const [currentPage, setCurrentPage] = useState(1);

    // Tính toán sản phẩm hiển thị theo trang
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = allProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    const totalPages = Math.ceil(allProducts.length / productsPerPage);
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <CurrentPage />
            <div className="w-full  mx-auto" style={{ padding: '40px 20px' }}>
                {/* Grid 4 cột giống ảnh mẫu */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-6">
                    {currentProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                {/* Pagination UI */}
                <div className="flex justify-center items-center gap-2" style={{ marginTop: '50px' }}>
                    <button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage((prev) => prev - 1)}
                        className="w-10 h-10 border rounded flex items-center justify-center disabled:opacity-30 hover:bg-gray-50"
                    >
                        &lt;
                    </button>

                    {[...Array(totalPages)].map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentPage(i + 1)}
                            className={`w-10 h-10 border rounded font-medium transition-colors ${
                                currentPage === i + 1 ? 'bg-[#6a1f6e] text-white' : 'hover:bg-gray-50'
                            }`}
                        >
                            {i + 1}
                        </button>
                    ))}

                    <button
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage((prev) => prev + 1)}
                        className="w-10 h-10 border rounded flex items-center justify-center disabled:opacity-30 hover:bg-gray-50"
                    >
                        &gt;
                    </button>
                </div>
            </div>
            <Help />
            <Footer />
        </div>
    );
}
