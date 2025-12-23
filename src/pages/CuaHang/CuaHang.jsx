import Header from '@/components/Header/Header.jsx';
import CurrentPage from '@/components/CurrentPage/CurrentPage.jsx';
import Footer from '@/components/Footer/Footer.jsx';
import Help from '@/components/Help/Help.jsx';
import { useState, useEffect } from 'react';
import ProductCard from './ProductCard/ProductCard.jsx';
import { useParams } from 'react-router-dom';
export default function CuaHang() {
    const productsPerPage = 24;

    // 1. Khai báo state để chứa danh sách sản phẩm từ API
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    // 2. Filter by `categoryId`
    const { id: paramCategoryId } = useParams();
    const categoryId = paramCategoryId ?? ""
    const productsApiUrl = categoryId == ""
        ? "https://localhost:7216/api/Product/all"
        : `https://localhost:7216/api/Product/by-category/${categoryId}`

    useEffect(() => {
        // Kiểm tra điều kiện bên trong useEffect
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const response = await fetch(productsApiUrl);

                if (!response.ok) {
                    throw new Error('Không thể lấy dữ liệu từ server');
                }

                const data = await response.json();

                const mappedProducts = data.map((item) => ({
                    id: item.id,
                    description: item.description,
                    name: item.name,
                    image: item.thumbImageLink || 'https://via.placeholder.com/400',
                    oldPrice: item.price,
                    newPrice: item.price || 0,
                    rating: 5,
                    variants: ['Mặc định'],
                }));

                localStorage.setItem('products', JSON.stringify(mappedProducts));

                setProducts(mappedProducts);
            } catch (err) {
                console.error('Lỗi gọi API:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [productsApiUrl]);

    // 4. Tính toán phân trang dựa trên danh sách sản phẩm thực tế từ API
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(products.length / productsPerPage);

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <CurrentPage />

            <div className="w-full mx-auto" style={{ padding: '40px 100px' }}>
                {/* Trạng thái Loading */}
                {loading && (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#6a1f6e]"></div>
                        <p className="ml-3 text-gray-500">Đang tải sản phẩm...</p>
                    </div>
                )}

                {/* Trạng thái Lỗi */}
                {error && (
                    <div className="text-center py-20 text-red-500">
                        <p>Lỗi: {error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="mt-4 px-4 py-2 bg-[#6a1f6e] text-white rounded"
                        >
                            Thử lại
                        </button>
                    </div>
                )}

                {/* Hiển thị sản phẩm */}
                {!loading && !error && (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-6">
                            {currentProducts.length > 0 ? (
                                currentProducts.map((product) => <ProductCard key={product.id} product={product} />)
                            ) : (
                                <p className="col-span-4 text-center text-gray-400">Không có sản phẩm nào.</p>
                            )}
                        </div>

                        {/* Pagination UI - Chỉ hiện nếu có nhiều hơn 1 trang */}
                        {totalPages > 1 && (
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
                                        className={`w-10 h-10 border rounded font-medium transition-colors ${currentPage === i + 1 ? 'bg-[#6a1f6e] text-white' : 'hover:bg-gray-50'
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
                        )}
                    </>
                )}
            </div>

            <Help />
            <Footer />
        </div>
    );
}
