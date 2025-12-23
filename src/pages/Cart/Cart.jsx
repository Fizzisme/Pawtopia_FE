import React, { useCallback, useEffect, useState } from 'react';
import { X, Heart, Star, MapPin, ChevronRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '@/components/Header/Header.jsx';
import { checkoutInputSchema } from '@/backend/checkout-input-schema';

// --- COMPONENT CON: ITEM TRONG GIỎ HÀNG (GIỮ NGUYÊN) ---
const CartItem = ({ item, updateQuantity, removeItem }) => {
    return (
        <div className="flex flex-col md:flex-row items-center border-b border-gray-100 last:border-0 py-5">
            <button onClick={() => removeItem(item.id)} className="text-gray-400 hover:text-red-500 transition-colors mr-5">
                <X size={18} />
            </button>
            <div className="flex items-center flex-1 w-full md:w-auto">
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded border border-gray-200 mr-4" />
                <span className="text-[#2D1B4D] font-medium text-sm md:text-base">{item.name}</span>
            </div>
            <div className="flex items-center justify-between w-full md:w-auto md:gap-12 mt-4 md:mt-0 font-bold text-black">
                <span>{item.oldPrice.toLocaleString()} VND</span>
                <div className="flex border border-gray-300 rounded bg-white">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="hover:bg-gray-100 text-gray-600 px-2">-</button>
                    <input type="text" value={item.quantity} readOnly className="w-8 text-center text-sm focus:outline-none" />
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="hover:bg-gray-100 text-gray-600 px-2">+</button>
                </div>
                <span>{(item.oldPrice * item.quantity).toLocaleString()} VND</span>
            </div>
        </div>
    );
};

// --- COMPONENT CON: GỢI Ý SẢN PHẨM (GIỮ NGUYÊN) ---
const RecommendCard = ({ product }) => {
    return (
        <div className="bg-white group">
            <div className="relative border border-gray-100 overflow-hidden mb-2">
                {product.sale && <span className="absolute top-2 right-2 bg-yellow-400 text-white text-[10px] font-bold px-2 py-1 rounded-full z-10">Giảm giá!</span>}
                <img src={product.image} alt={product.name} className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-300" />
            </div>
            <h3 className="text-sm font-semibold text-[#2D1B4D] line-clamp-2 min-h-[40px] mb-2">{product.name}</h3>
            <div className="flex items-center gap-1 mb-3">
                <span className="font-bold text-gray-800">{Number(product.newPrice).toLocaleString()} VND</span>
            </div>
            <button className="w-full bg-[#f4a7bb] text-white font-bold text-xs rounded-full hover:bg-pink-500 transition-colors uppercase py-2">Mua Ngay</button>
        </div>
    );
};

// --- COMPONENT CHÍNH: CART ---
export default function Cart() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('User'));
    const [transactionId] = useState(() => 'TRX-' + Date.now());

    const [cartItems, setCartItems] = useState(() => {
        const saved = localStorage.getItem('productCarts');
        return saved ? JSON.parse(saved) : [];
    });

    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (user?.id) {
            fetch(`https://localhost:7216/api/Address/my-addresses/${user.id}`)
                .then(res => res.json())
                .then(data => {
                    setAddresses(data);
                    const defaultAddr = data.find(a => a.isDefault);
                    if (defaultAddr) setSelectedAddress(defaultAddr);
                    else if (data.length > 0) setSelectedAddress(data[0]);
                });
        }
    }, [user?.id]);

    const [paymentMethod, setPaymentMethod] = useState('cod');

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

    const subTotal = cartItems.reduce((total, item) => total + item.oldPrice * item.quantity, 0);
    const shippingFee = 25000;
    const finalTotal = subTotal + shippingFee;

    const handleCheckoutCOD = () => {
        if (!user) { navigate('/dang-nhap'); return; }
        if (!selectedAddress) { alert("Vui lòng thêm địa chỉ nhận hàng"); return; }
        if (cartItems.length === 0) { alert('Giỏ hàng trống'); return; }

        const payload = {
            UserId: user.id,
            FullName: selectedAddress.fullName,
            PhoneNumber: selectedAddress.phoneNumber,
            AddressLine: selectedAddress.detailAddress,
            Ward: selectedAddress.ward,
            Province: selectedAddress.province,
            District: selectedAddress.district,
            PaymentMethod: 'COD',
            Items: cartItems.map((item) => ({
                ProductId: item.id.toString(),
                Quantity: item.quantity,
                Price: item.oldPrice,
            })),
        };

        fetch('https://localhost:7216/api/payment/place-order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        })
            .then(res => res.json())
            .then(() => {
                alert('Đặt hàng thành công!');
                localStorage.removeItem('productCarts');
                navigate('/');
            });
    };

    const [checkoutUrl, setCheckoutUrl] = useState('');
    const [fields, setFields] = useState({});

    const fetchSepayPaymentData = useCallback(() => {
        if (paymentMethod !== 'banking') return;
        const successUrl = `${window.location.origin}/payment/success`;
        const payload = checkoutInputSchema.parse({
            order_invoice_number: transactionId,
            order_amount: finalTotal,
            currency: 'VND',
            order_description: `Thanh toan don hang ${transactionId}`,
            success_url: successUrl,
            error_url: `${window.location.origin}/payment/error`,
            cancel_url: `${window.location.origin}/payment/cancel`,
        });
        fetch('/api/create-checkout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        }).then(res => res.json()).then(data => { setCheckoutUrl(data.checkoutUrl); setFields(data.fields); });
    }, [finalTotal, paymentMethod, transactionId]);

    useEffect(() => { fetchSepayPaymentData(); }, [fetchSepayPaymentData]);

    const randomProducts = JSON.parse(localStorage.getItem('products')) || [];

    return (
        <div>
            <Header />
            <div className="bg-white min-h-screen font-sans text-gray-600">
                <div className="container mx-auto px-4 py-10">

                    {/* ĐỊA CHỈ NHẬN HÀNG */}
                    <div className="bg-white p-6 rounded-sm border border-gray-200 mb-8 relative shadow-sm">
                        <div className="flex items-center gap-2 text-[#f4a7bb] mb-3">
                            <MapPin size={20} />
                            <span className="font-bold uppercase tracking-wider">Địa chỉ nhận hàng</span>
                        </div>
                        {selectedAddress ? (
                            <div className="flex justify-between items-center">
                                <div className="text-black">
                                    <span className="font-bold text-lg">{selectedAddress.fullName} | {selectedAddress.phoneNumber}</span>
                                    <p className="text-sm text-gray-600 mt-1 uppercase">
                                        {selectedAddress.detailAddress}, {selectedAddress.ward}, {selectedAddress.district}, {selectedAddress.province}
                                    </p>
                                </div>
                                <button onClick={() => setIsModalOpen(true)} className="text-blue-500 font-bold text-sm hover:underline flex items-center">
                                    THAY ĐỔI <ChevronRight size={16} />
                                </button>
                            </div>
                        ) : (
                            <Link to="/user/dia-chi" className="text-blue-500 font-bold underline">+ Thêm địa chỉ nhận hàng</Link>
                        )}
                    </div>

                    {/* GIỎ HÀNG */}
                    <div className="border border-gray-200 rounded-sm mb-10 overflow-hidden">
                        <div className="hidden md:flex bg-gray-50 border-b border-gray-200 font-bold text-[#2D1B4D] p-4 text-xs uppercase tracking-widest">
                            <div className="flex-1">Sản phẩm</div>
                            <div className="w-32 text-center">Giá</div>
                            <div className="w-32 text-center">Số lượng</div>
                            <div className="w-32 text-right">Tạm tính</div>
                        </div>
                        <div className="px-5">
                            {cartItems.map((product) => (
                                <CartItem key={product.id} item={product} updateQuantity={handleUpdateQuantity} removeItem={handleRemoveItem} />
                            ))}
                        </div>
                    </div>

                    {/* THANH TOÁN */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="md:col-span-2">
                            <h2 className="text-xl font-bold text-[#2D1B4D] border-b pb-2 mb-5">Bạn có thể thích...</h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {randomProducts.slice(0, 3).map((p) => <RecommendCard key={p.id} product={p} />)}
                            </div>
                        </div>

                        <div className="md:col-span-1">
                            <div className="border border-gray-200 rounded-sm p-6 bg-white shadow-sm font-bold text-black">
                                <h2 className="text-lg uppercase text-center border-b border-gray-100 pb-3 mb-5">Hóa đơn</h2>
                                <div className="flex justify-between mb-4 uppercase text-xs">
                                    <span>Tạm tính</span>
                                    <span>{subTotal.toLocaleString()} VND</span>
                                </div>
                                <div className="mb-6">
                                    <span className="block mb-3 text-xs uppercase tracking-tighter">Thanh toán bằng:</span>
                                    <div className="space-y-2 font-bold text-black">
                                        <label className="flex items-center gap-2 cursor-pointer p-2 rounded-md hover:bg-gray-50 transition-all border border-transparent hover:border-black">
                                            <input type="radio" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} className="accent-black w-4 h-4" />
                                            <span className="text-sm">TIỀN MẶT (COD)</span>
                                        </label>
                                        <label className="flex items-center gap-2 cursor-pointer p-2 rounded-md hover:bg-gray-50 transition-all border border-transparent hover:border-black">
                                            <input type="radio" checked={paymentMethod === 'banking'} onChange={() => setPaymentMethod('banking')} className="accent-black w-4 h-4" />
                                            <span className="text-sm">SMART BANKING</span>
                                        </label>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center mb-8 border-t-2 border-black pt-4">
                                    <span className="uppercase">Tổng cộng</span>
                                    <div className="text-2xl tracking-tighter text-pink-500">{finalTotal.toLocaleString()} VND</div>
                                </div>
                                {paymentMethod === 'banking' ? (
                                    <form action={checkoutUrl} method="POST">
                                        {Object.keys(fields ?? {}).map((f) => <input key={f} type="hidden" name={f} value={fields[f]} />)}
                                        <PayButton type="submit" />
                                    </form>
                                ) : (
                                    <PayButton onClick={handleCheckoutCOD} />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- POP-UP CHỌN ĐỊA CHỈ (TO RỘNG - DÀI THEO CHIỀU DỌC) --- */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-[999] p-4">
                    {/* Max width to rộng (4xl) và chiều cao tự động co giãn tối đa 85% màn hình */}
                    <div className="bg-white w-full max-w-4xl border-2 border-black shadow-[15px_15px_0px_0px_rgba(0,0,0,1)] rounded-none overflow-hidden flex flex-col max-h-[85vh]">

                        {/* Header viền đen chữ đậm */}
                        <div className="p-6 border-b-2 border-black flex justify-between items-center bg-[#fafafa]">
                            <h3 className="font-bold text-black uppercase tracking-widest text-2xl">Danh sách địa chỉ nhận hàng</h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-black border-2 border-black p-1 hover:bg-gray-200 transition-colors"><X size={28} /></button>
                        </div>

                        {/* List nội dung - Không dùng Flex dàn trải, cho phép cuộn dọc */}
                        <div className="p-8 overflow-y-auto bg-white flex-1 scrollbar-thin scrollbar-thumb-black">
                            {addresses.length > 0 ? (
                                addresses.map(addr => (
                                    <div
                                        key={addr.id}
                                        onClick={() => { setSelectedAddress(addr); setIsModalOpen(false); }}
                                        className={`block w-full p-6 border-2 mb-6 cursor-pointer transition-all hover:bg-gray-50 ${selectedAddress?.id === addr.id ? 'border-black bg-pink-50' : 'border-gray-200'}`}
                                    >
                                        {/* Nội dung dàn khối từ trên xuống */}
                                        <div className="text-black">
                                            <div className="flex items-center gap-4 mb-2">
                                                <span className="font-bold text-2xl uppercase tracking-tighter">{addr.fullName}</span>
                                                <span className="h-6 w-0.5 bg-gray-300"></span>
                                                <span className="font-bold text-xl text-gray-700">{addr.phoneNumber}</span>
                                            </div>
                                            <p className="text-lg font-medium text-gray-800 uppercase leading-relaxed">
                                                {addr.detailAddress}, {addr.ward}, {addr.district}, {addr.province}
                                            </p>
                                            {addr.isDefault && (
                                                <span className="bg-black text-white text-[10px] px-3 py-1 font-bold mt-3 inline-block uppercase tracking-widest">
                                                    Mặc định
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-center py-20 font-bold uppercase text-gray-400 text-xl tracking-widest italic">Bố chưa có địa chỉ nào hết!</p>
                            )}
                        </div>

                        {/* Footer nút to rõ */}
                        <div className="p-6 bg-[#fafafa] border-t-2 border-black flex justify-between items-center">
                            <button onClick={() => navigate('/user/dia-chi')} className="bg-white border-2 border-black font-bold px-10 py-4 text-sm uppercase hover:bg-black hover:text-white transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none active:translate-x-1 active:translate-y-1">
                                Chỉnh sửa địa chỉ
                            </button>
                            <button onClick={() => setIsModalOpen(false)} className="text-black font-black uppercase text-lg underline hover:text-pink-500 transition-colors">Đóng cửa sổ</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function PayButton({ type, onClick }) {
    return (
        <button className="w-full bg-[#f4a7bb] border-2 border-black text-black font-bold text-xl py-5 uppercase shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none active:translate-x-1 active:translate-y-1 transition-all cursor-pointer italic" type={type} onClick={onClick}>
            Xác nhận thanh toán!
        </button>
    );
}