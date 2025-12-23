import React, { useCallback, useEffect, useState } from 'react';
import { X, Heart, Star } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '@/components/Header/Header.jsx';
import { checkoutInputSchema } from '@/backend/checkout-input-schema';
// import { buildUrl } from '@/lib/utils'; // Có thể bỏ nếu dùng window.location.origin

// --- COMPONENT CON: ITEM TRONG GIỎ HÀNG ---
const CartItem = ({ item, updateQuantity, removeItem }) => {
    return (
        <div
            className="flex flex-col md:flex-row items-center border-b border-gray-100 last:border-0"
            style={{ padding: '20px 0' }}
        >
            {/* Nút Xóa */}
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

// --- COMPONENT CON: GỢI Ý SẢN PHẨM ---
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

// --- COMPONENT CHÍNH: CART ---
export default function Cart() {
    const navigate = useNavigate();

    // 1. Tạo mã giao dịch tạm thời (Để gửi sang SePay)
    // Mã này sẽ không đổi trừ khi F5 lại trang
    const [transactionId] = useState(() => 'TRX-' + Date.now());

    // 2. Khởi tạo State giỏ hàng
    const [cartItems, setCartItems] = useState(() => {
        const saved = localStorage.getItem('productCarts');
        return saved ? JSON.parse(saved) : [];
    });

    const [shippingMethod, setShippingMethod] = useState('tietkiem');
    const [paymentMethod, setPaymentMethod] = useState('cod');
    const user = JSON.parse(localStorage.getItem('User'));

    // 3. Logic cập nhật số lượng & Xóa
    const handleUpdateQuantity = (id, newQuantity) => {
        if (newQuantity < 1) return;
        const updatedCart = cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item));
        setCartItems(updatedCart);
        localStorage.setItem('productCarts', JSON.stringify(updatedCart));
    };

    const handleRemoveItem = (id) => {
        const updatedCart = cartItems.filter((item) => item.id !== id);
        setCartItems(updatedCart);
        localStorage.setItem('productCarts', JSON.stringify(updatedCart));
    };

    // 4. Tính toán tiền
    const subTotal = cartItems.reduce((total, item) => total + item.oldPrice * item.quantity, 0);
    const shippingFee = shippingMethod === 'tietkiem' ? 25000 : shippingMethod === 'hoatoc' ? 30000 : 0;
    const finalTotal = subTotal + shippingFee;

    // 5. Xử lý Thanh toán COD (Tiền mặt)
    const handleCheckoutCOD = () => {
        if (!user) {
            navigate('/dang-nhap');
            return;
        }
        if (!user?.PhoneNumber || !user?.DetailAddress) {
            navigate('/user/dia-chi');
            return;
        }
        if (cartItems.length === 0) {
            alert('Giỏ hàng trống');
            return;
        }

        const payload = {
            UserId: user.id,
            FullName: user.displayname,
            PhoneNumber: user.PhoneNumber,
            AddressLine: user.DetailAddress,
            Ward: user.Ward,
            Province: user.Province,
            District: user.District,
            PaymentMethod: 'COD', // Báo BE là COD
            Items: cartItems.map((item) => ({
                ProductId: item.id.toString(),
                Quantity: item.quantity,
                Price: item.newPrice,
            })),
        };

        fetch('https://localhost:7216/api/payment/place-order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        })
            .then((res) => {
                if (!res.ok) throw new Error('Order failed');
                return res.json();
            })
            .then((data) => {
                alert('Đặt hàng thành công!');
                localStorage.removeItem('productCarts');
                navigate('/');
            })
            .catch((err) => console.error(err));
    };

    // 6. Xử lý Thanh toán Banking (SePay)
    const [checkoutUrl, setCheckoutUrl] = useState('');
    const [fields, setFields] = useState({});

    const fetchSepayPaymentData = useCallback(() => {
        if (paymentMethod !== 'banking') return;

        // Tạo URL trả về: http://localhost:3000/payment/success
        const successUrl = `${window.location.origin}/payment/success`;

        const payload = checkoutInputSchema.parse({
            order_invoice_number: transactionId, // Dùng mã TRX đã tạo
            order_amount: finalTotal,
            currency: 'VND',
            order_description: `Thanh toan don hang ${transactionId}`,

            // Redirect về trang Success để gọi API lưu đơn
            success_url: successUrl,
            error_url: `${window.location.origin}/payment/error`,
            cancel_url: `${window.location.origin}/payment/cancel`,
        });

        // Gọi API Proxy (NextJS/Backend phụ) để lấy link SePay
        fetch('/api/create-checkout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        })
            .then((res) => res.json())
            .then((data) => {
                setCheckoutUrl(data.checkoutUrl);
                setFields(data.fields);
            })
            .catch((err) => console.error('Lỗi lấy link thanh toán:', err));
    }, [finalTotal, paymentMethod, transactionId]);

    useEffect(() => {
        fetchSepayPaymentData();
    }, [fetchSepayPaymentData]);

    // Mock data sản phẩm gợi ý
    const randomProducts = JSON.parse(localStorage.getItem('products')) || [];

    return (
        <div>
            <Header />
            <div className="bg-white min-h-screen font-sans text-gray-600">
                <div className="container mx-auto" style={{ padding: '40px 15px' }}>
                    {/* --- BẢNG GIỎ HÀNG --- */}
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

                    {/* --- LAYOUT 2 CỘT --- */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* CỘT TRÁI (Recommend) */}
                        <div className="md:col-span-2">
                            <h2 className="text-xl font-bold text-[#2D1B4D] border-b pb-2 mb-5">Bạn có thể thích...</h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {randomProducts.map((p) => (
                                    <RecommendCard key={p.id} product={p} />
                                ))}
                            </div>
                        </div>

                        {/* CỘT PHẢI: THANH TOÁN */}
                        <div className="md:col-span-1">
                            <div className="border border-gray-200 rounded-sm">
                                <h2
                                    className="text-lg font-bold text-[#2D1B4D] border-b border-gray-200 bg-gray-50"
                                    style={{ padding: '8px' }}
                                >
                                    Tổng cộng giỏ hàng
                                </h2>

                                <div style={{ padding: '20px' }}>
                                    {/* Tạm tính */}
                                    <div className="flex justify-between items-center border-b border-gray-100 pb-4 mb-4">
                                        <span className="font-bold text-gray-600">Tạm tính</span>
                                        <span className="font-bold text-gray-500">{subTotal.toLocaleString()} VND</span>
                                    </div>

                                    {/* Vận chuyển */}

                                    {/* Phương thức thanh toán */}
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
                                                    className="accent-pink-500 mt-1"
                                                />
                                                <div className="text-sm">
                                                    <b>Thanh toán tiền mặt</b>
                                                    <p className="text-xs text-gray-500">
                                                        Thanh toán khi nhận hàng (COD)
                                                    </p>
                                                </div>
                                            </label>

                                            {/* Banking */}
                                            <label className="flex items-start gap-2 cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="payment"
                                                    checked={paymentMethod === 'banking'}
                                                    onChange={() => setPaymentMethod('banking')}
                                                    className="accent-pink-500 mt-1"
                                                />
                                                <div className="text-sm">
                                                    <b>Smart Banking (SePay)</b>
                                                    <p className="text-xs text-gray-500">
                                                        Quét mã QR - Tự động xác nhận
                                                    </p>
                                                </div>
                                            </label>
                                        </div>
                                    </div>

                                    {/* Tổng tiền */}
                                    <div className="flex justify-between items-start mb-5">
                                        <span className="font-bold text-gray-600">Tổng</span>
                                        <div className="text-right">
                                            <div className="font-bold text-gray-800 text-lg">
                                                {subTotal.toLocaleString()} VND
                                            </div>
                                            <span className="text-xs font-normal text-gray-500">(Đã bao gồm VAT)</span>
                                        </div>
                                    </div>

                                    {/* Nút thanh toán */}
                                    {paymentMethod === 'banking' ? (
                                        // Form ẩn để submit sang SePay
                                        <form action={checkoutUrl} method="POST">
                                            {Object.keys(fields ?? {}).map((field) => (
                                                <input key={field} type="hidden" name={field} value={fields[field]} />
                                            ))}
                                            <PayButton type="submit" />
                                        </form>
                                    ) : (
                                        // Nút bấm cho COD
                                        <PayButton onClick={handleCheckoutCOD} />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Button Component
function PayButton({ type, onClick }) {
    return (
        <button
            className="w-full cursor-pointer bg-[#f4a7bb] text-white font-bold text-lg rounded-xl hover:bg-pink-400 transition-colors shadow-sm uppercase py-3"
            type={type}
            onClick={onClick}
        >
            Thanh toán
        </button>
    );
}
