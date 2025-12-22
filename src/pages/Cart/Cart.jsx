import React, { useCallback, useEffect, useState } from 'react';
import { X, Heart, Star } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '@/components/Header/Header.jsx';
import { checkoutInputSchema } from '@/backend/checkout-input-schema';
import { buildUrl } from '@/lib/utils';

// Component con: 1 Dòng sản phẩm trong giỏ hàng
const CartItem = ({ item, updateQuantity, removeItem }) => {
    return (
        <div
            className="flex flex-col md:flex-row items-center border-b border-gray-100 last:border-0"
            style={{ padding: '20px 0' }}
        >
            {/* Nút Xóa: Gọi hàm removeItem từ cha truyền xuống */}
            <button
                onClick={() => removeItem(item.id)}
                className="text-gray-400 hover:text-red-500 transition-colors"
                style={{ marginRight: '20px' }}
                title="Xóa sản phẩm"
            >
                <X size={18} />
            </button>

            {/* Ảnh & Tên */}
            <div className="flex items-center flex-1 w-full md:w-auto">
                <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded border border-gray-200"
                    style={{ marginRight: '16px' }}
                />
                <span className="text-[#2D1B4D] font-medium text-sm md:text-base">{item.name}</span>
            </div>

            {/* Giá, Số lượng, Tạm tính */}
            <div className="flex items-center justify-between w-full md:w-auto md:gap-12 mt-4 md:mt-0">
                <span className="font-bold text-gray-700">{item.oldPrice.toLocaleString()} VND</span>

                {/* Bộ đếm số lượng */}
                <div className="flex border border-gray-300 rounded bg-white">
                    <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="hover:bg-gray-100 text-gray-600"
                        style={{ padding: '4px 8px' }}
                    >
                        -
                    </button>
                    <input
                        type="text"
                        value={item.quantity}
                        readOnly
                        className="w-8 text-center text-sm focus:outline-none"
                    />
                    <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="hover:bg-gray-100 text-gray-600"
                        style={{ padding: '4px 8px' }}
                    >
                        +
                    </button>
                </div>

                <span className="font-bold text-[#2D1B4D]">{(item.oldPrice * item.quantity).toLocaleString()} VND</span>
            </div>
        </div>
    );
};

// Component con: Thẻ sản phẩm gợi ý (Bạn có thể thích)
const RecommendCard = ({ product }) => {
    return (
        <div className="bg-white group">
            <div className="relative border border-gray-100 overflow-hidden" style={{ marginBottom: '10px' }}>
                {product.sale && (
                    <span className="absolute top-2 right-2 bg-yellow-400 text-white text-[10px] font-bold px-2 py-1 rounded-full z-10">
                        Giảm giá!
                    </span>
                )}
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-300"
                />
            </div>
            {/* Rating */}
            <div className="flex gap-1" style={{ marginBottom: '5px' }}>
                {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} fill={i < 5 ? 'none' : 'none'} stroke="#ccc" />
                ))}
            </div>
            <h3
                className="text-sm font-semibold text-[#2D1B4D] line-clamp-2 min-h-[40px]"
                style={{ marginBottom: '8px' }}
            >
                {product.name}
            </h3>
            <div className="flex flex-col" style={{ marginBottom: '12px' }}>
                <div className="flex items-center gap-1">
                    <span className="font-bold text-gray-800">{Number(product.newPrice).toLocaleString()} VND</span>
                    <span className="text-[10px] text-gray-500">VAT</span>
                </div>
            </div>
            <button
                className="w-full bg-[#f4a7bb] text-white font-bold text-xs rounded-full hover:bg-pink-500 transition-colors uppercase"
                style={{ padding: '8px 0', marginBottom: '8px' }}
            >
                Mua Ngay
            </button>
            <div className="flex items-center gap-1 text-gray-400 text-xs cursor-pointer hover:text-pink-500">
                <Heart size={12} /> <span>Yêu Thích</span>
            </div>
        </div>
    );
};

export default function Cart() {
    // 1. Khởi tạo State từ localStorage
    const [cartItems, setCartItems] = useState(() => {
        const saved = localStorage.getItem('productCarts');
        return saved ? JSON.parse(saved) : [];
    });
    const navigate = useNavigate();
    const user = localStorage.getItem('User');
    const [shippingMethod, setShippingMethod] = useState('tietkiem');

    // 2. Logic cập nhật số lượng
    const handleUpdateQuantity = (id, newQuantity) => {
        if (newQuantity < 1) return; // Không cho giảm dưới 1

        const updatedCart = cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item));
        setCartItems(updatedCart);
        // Cập nhật lại localStorage nếu cần
        localStorage.setItem('productCarts', JSON.stringify(updatedCart));
    };

    // 3. Logic xóa sản phẩm
    const handleRemoveItem = (id) => {
        const updatedCart = cartItems.filter((item) => item.id !== id);
        setCartItems(updatedCart);
        localStorage.setItem('productCarts', JSON.stringify(updatedCart));
    };

    // 4. TÍNH TOÁN TỔNG TIỀN (LOGIC BẠN CẦN)
    // Tính tổng tạm tính (Giá * Số lượng của tất cả sp)
    const subTotal = cartItems.reduce((total, item) => {
        return total + item.oldPrice * item.quantity;
    }, 0);

    // Tính phí ship
    const shippingFee = shippingMethod === 'tietkiem' ? 25000 : shippingMethod === 'hoatoc' ? 30000 : 0;

    // Tính tổng thanh toán cuối cùng
    const finalTotal = subTotal + shippingFee;

    // 5. Payment method
    const [paymentMethod, setPaymentMethod] = useState('cod');

    // Sepay
    const [checkoutUrl, setCheckoutUrl] = useState('')
    const [fields, setFields] = useState({})

    const fetchSepayPaymentData = useCallback(() => {
        if (paymentMethod !== "banking") return

        // TODO: `orderId` can only be in correct guid format!
        const orderId = `ORDER-${Date.now()}`;

        // Schema defined at `src/backend/checkout-input-chema`
        const payload = checkoutInputSchema.parse({
            order_invoice_number: orderId,
            order_amount: finalTotal,
            currency: 'VND',
            order_description: 'Pawtopia order payment', // TODO
            success_url: buildUrl(`/payment/success/${orderId}`),
            error_url: buildUrl(`/payment/error/${orderId}`),
            cancel_url: buildUrl(`/payment/cancel/${orderId}`),
        });

        fetch('/api/create-checkout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setCheckoutUrl(data.checkoutUrl)
                setFields(data.fields)
            })
    }, [finalTotal, paymentMethod])

    useEffect(() => {
        fetchSepayPaymentData()
    }, [fetchSepayPaymentData])

    // --- Mock Data Recommend ---

    let randomProducts = JSON.parse(localStorage.getItem('products')) || []

    const handleCheckout = () => {
        if (!user) {
            navigate('/dang-nhap');
            return;
        }

        // Đã đăng nhập nhưng thiếu thông tin
        if (!user?.phoneNumber || !user?.detailAddress) {
            navigate('/user/dia-chi');
            return;
        }

        // Đủ điều kiện thanh toán
        navigate('/thanh-toan');
    };
    return (
        <div>
            <Header />
            <div className="bg-white min-h-screen font-sans text-gray-600">
                <div className="container mx-auto" style={{ padding: '40px 15px' }}>
                    {/* --- PHẦN 1: BẢNG GIỎ HÀNG --- */}
                    <div className="border border-gray-200 rounded-sm" style={{ marginBottom: '40px' }}>
                        <div
                            className="hidden md:flex bg-white border-b border-gray-200 font-bold text-[#2D1B4D]"
                            style={{ padding: '15px 20px' }}
                        >
                            <div className="flex-1">Sản phẩm</div>
                            <div className="w-32 text-center">Giá</div>
                            <div className="w-32 text-center">Số lượng</div>
                            <div className="w-32 text-right">Tạm tính</div>
                        </div>

                        <div style={{ padding: '0 20px' }}>
                            {cartItems.length > 0 ? (
                                cartItems.map((product) => (
                                    <CartItem
                                        key={product.id}
                                        item={product}
                                        updateQuantity={handleUpdateQuantity}
                                        removeItem={handleRemoveItem}
                                    />
                                ))
                            ) : (
                                <p className="text-center py-10">Giỏ hàng trống</p>
                            )}
                        </div>
                    </div>

                    {/* --- PHẦN 2: LAYOUT 2 CỘT --- */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* CỘT TRÁI (Recommend) - Giữ nguyên code cũ của bạn */}
                        <div className="md:col-span-2">
                            <h2
                                className="text-xl font-bold text-[#2D1B4D] border-b pb-2 mb-5"
                                style={{ paddingBottom: '8px', marginBottom: '20px' }}
                            >
                                Bạn có thể thích...
                            </h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {randomProducts.map((p) => (
                                    <RecommendCard key={p.id} product={p} />
                                ))}
                            </div>
                        </div>

                        {/* CỘT PHẢI: TỔNG CỘNG (Đã gắn biến tính toán) */}
                        <div className="md:col-span-1">
                            <div className="border border-gray-200 rounded-sm">
                                <h2
                                    className="text-lg font-bold text-[#2D1B4D] border-b border-gray-200 bg-gray-50"
                                    style={{ padding: '8px' }}
                                >
                                    Tổng cộng giỏ hàng
                                </h2>

                                <div style={{ padding: '20px' }}>
                                    {/* Tạm tính (Dynamic Variable) */}
                                    <div className="flex justify-between items-center border-b border-gray-100 pb-4 mb-4">
                                        <span className="font-bold text-gray-600">Tạm tính</span>
                                        <span className="font-bold text-gray-500">{subTotal.toLocaleString()} VND</span>
                                    </div>

                                    {/* Vận chuyển */}
                                    <div
                                        className="border-b border-gray-100"
                                        style={{ paddingBottom: '16px', marginBottom: '16px' }}
                                    >
                                        <span className="font-bold text-gray-600 block" style={{ marginBottom: '8px' }}>
                                            Vận chuyển
                                        </span>
                                        <div className="space-y-3">
                                            <label className="flex items-start gap-2 cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="shipping"
                                                    checked={shippingMethod === 'tietkiem'}
                                                    onChange={() => setShippingMethod('tietkiem')}
                                                    className=" accent-pink-500"
                                                    style={{ marginTop: '4px' }}
                                                />
                                                <div className="text-sm">
                                                    Giao tiết kiệm: <b>25.000 VND</b>
                                                </div>
                                            </label>

                                            <label className="flex items-start gap-2 cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="shipping"
                                                    checked={shippingMethod === 'hoatoc'}
                                                    onChange={() => setShippingMethod('hoatoc')}
                                                    className="mt-1 accent-pink-500"
                                                />
                                                <div className="text-sm">
                                                    Giao hỏa tốc: <b>30.000 VND</b>
                                                </div>
                                            </label>

                                            <label className="flex items-center gap-2 cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="shipping"
                                                    checked={shippingMethod === 'cuahang'}
                                                    onChange={() => setShippingMethod('cuahang')}
                                                    className="accent-pink-500"
                                                />
                                                <span className="text-sm text-gray-700">Nhận tại cửa hàng (0đ)</span>
                                            </label>
                                        </div>
                                    </div>

                                    <div className="border-b border-gray-100 pb-4 mb-4">
                                        <span className="font-bold text-gray-600 block mb-2">
                                            Phương thức thanh toán
                                        </span>

                                        <div className="space-y-3">
                                            {/* COD */}
                                            <label className="flex items-start gap-2 cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="payment"
                                                    checked={paymentMethod === 'cod'}
                                                    onChange={() => setPaymentMethod('cod')}
                                                    className="mt-1 accent-pink-500"
                                                />
                                                <div className="text-sm">
                                                    <b>Thanh toán tiền mặt</b>
                                                    <p className="text-xs text-gray-500">
                                                        Thanh toán khi nhận hàng (COD)
                                                    </p>
                                                </div>
                                            </label>

                                            {/* SMART BANKING */}
                                            <label className="flex items-start gap-2 cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="payment"
                                                    checked={paymentMethod === 'banking'}
                                                    onChange={() => setPaymentMethod('banking')}
                                                    className="mt-1 accent-pink-500"
                                                />
                                                <div className="text-sm">
                                                    <b>Smart Banking</b>
                                                    <p className="text-xs text-gray-500">
                                                        Chuyển khoản qua ngân hàng / QR
                                                    </p>
                                                </div>
                                            </label>
                                        </div>
                                    </div>

                                    {/* TỔNG TIỀN CUỐI CÙNG (Dynamic Variable) */}
                                    <div className="flex justify-between items-start mb-5">
                                        <span className="font-bold text-gray-600">Tổng</span>
                                        <div className="text-right">
                                            <div className="font-bold text-gray-800 text-lg">
                                                {finalTotal.toLocaleString()} VND
                                            </div>
                                            <span className="text-xs font-normal text-gray-500">(Đã bao gồm VAT)</span>
                                        </div>
                                    </div>

                                    <form action={checkoutUrl} method="POST">
                                        {Object.keys(fields ?? {}).map(field => (
                                            <input key={field} type="hidden" name={field} value={fields[field]} />
                                        ))}
                                        <button
                                            className="w-full cursor-pointer bg-[#f4a7bb] text-white font-bold text-lg rounded-xl hover:bg-pink-400 transition-colors shadow-sm uppercase py-3"
                                            type="submit"
                                        >
                                            Thanh toán
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
