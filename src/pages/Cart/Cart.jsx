import React, { useCallback, useEffect, useState } from 'react';
import { X, Heart, Star, MapPin, ChevronRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '@/components/Header/Header.jsx';
import { checkoutInputSchema } from '@/backend/checkout-input-schema';
import { toast } from 'sonner';
import { buildUrl } from '@/lib/utils.js';

// --- COMPONENT CON: ITEM TRONG GIỎ HÀNG ---
const CartItem = ({ item, updateQuantity, removeItem }) => {
    return (
        <div
            className="flex flex-col md:flex-row items-center border-b border-gray-100 last:border-0"
            style={{ paddingTop: '20px', paddingBottom: '20px' }}
        >
            <button
                onClick={() => removeItem(item.id)}
                className="text-gray-400 hover:text-red-500 transition-colors"
                style={{ marginRight: '20px' }}
            >
                <X size={18} />
            </button>
            <div className="flex items-center flex-1 w-full md:w-auto">
                <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded border border-gray-200"
                    style={{ marginRight: '16px' }}
                />
                <span className="text-[#2D1B4D] font-medium text-sm md:text-base">{item.name}</span>
            </div>
            <div
                className="flex items-center justify-between w-full md:w-auto md:gap-12 font-bold text-black"
                style={{ marginTop: '16px' }}
            >
                <span>{item.oldPrice.toLocaleString()} VND</span>
                <div className="flex border border-gray-300 rounded bg-white">
                    <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="hover:bg-gray-100 text-gray-600"
                        style={{ paddingLeft: '8px', paddingRight: '8px' }}
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
                        style={{ paddingLeft: '8px', paddingRight: '8px' }}
                    >
                        +
                    </button>
                </div>
                <span>{(item.oldPrice * item.quantity).toLocaleString()} VND</span>
            </div>
        </div>
    );
};

// --- COMPONENT CON: GỢI Ý SẢN PHẨM ---
const RecommendCard = ({ product }) => {
    return (
        <div className="bg-white group">
            <div className="relative border border-gray-100 overflow-hidden" style={{ marginBottom: '8px' }}>
                {product.sale && (
                    <span
                        className="absolute top-2 right-2 bg-yellow-400 text-white text-[10px] font-bold rounded-full z-10"
                        style={{ padding: '4px 8px' }}
                    >
                        Giảm giá!
                    </span>
                )}
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-300"
                />
            </div>
            <h3
                className="text-sm font-semibold text-[#2D1B4D] line-clamp-2 min-h-[40px]"
                style={{ marginBottom: '8px' }}
            >
                {product.name}
            </h3>
            <div className="flex items-center" style={{ gap: '4px', marginBottom: '12px' }}>
                <span className="font-bold text-gray-800">{Number(product.newPrice).toLocaleString()} VND</span>
            </div>
            <button
                className="w-full bg-[#f4a7bb] text-white font-bold text-xs rounded-full hover:bg-pink-500 transition-colors uppercase"
                style={{ paddingTop: '8px', paddingBottom: '8px' }}
            >
                Mua Ngay
            </button>
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
                .then((res) => res.json())
                .then((data) => {
                    setAddresses(data);
                    const defaultAddr = data.find((a) => a.isDefault);
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

    // --- HÀM THANH TOÁN COD (ĐÃ SỬA MẠNH TAY) ---
    const handleCheckoutCOD = () => {
        if (!user) {
            navigate('/dang-nhap');
            return;
        }

        // 1. Kiểm tra địa chỉ
        if (!selectedAddress) {
            toast('Vui lòng thêm và chọn địa chỉ nhận hàng!');
            return;
        }

        if (cartItems.length === 0) {
            toast('Giỏ hàng trống');
            return;
        }

        // 2. LOG RA ĐỂ BỐ KIỂM TRA (F12 -> Console)
        console.log('Dữ liệu địa chỉ gốc:', selectedAddress);

        // 3. TẠO PAYLOAD "BỌC LÓT" (Bắt mọi trường hợp tên biến)
        // Dấu || nghĩa là: Nếu cái trước không có thì lấy cái sau
        const payload = {
            UserId: user.id,
            AddressId: selectedAddress.id || selectedAddress.Id,

            // --- ĐOẠN NÀY QUAN TRỌNG ĐỂ FIX LỖI 400 ---
            // Backend đòi FullName -> ta lấy fullName hoặc FullName
            FullName: selectedAddress.fullName || selectedAddress.FullName || 'Chưa có tên',

            // Backend đòi PhoneNumber -> ta lấy phoneNumber hoặc PhoneNumber
            PhoneNumber: selectedAddress.phoneNumber || selectedAddress.PhoneNumber || '0000000000',

            // Backend đòi AddressLine -> ta lấy detailAddress (thường dùng ở FE) hoặc DetailAddress
            AddressLine:
                selectedAddress.detailAddress ||
                selectedAddress.DetailAddress ||
                selectedAddress.AddressLine ||
                'Chưa có địa chỉ',

            // Các trường Phường/Xã
            Ward: selectedAddress.ward || selectedAddress.Ward || 'Không rõ',
            District: selectedAddress.district || selectedAddress.District || 'Không rõ',
            Province: selectedAddress.province || selectedAddress.Province || 'Không rõ',
            // ------------------------------------------

            PaymentMethod: 'COD',
            Items: cartItems.map((item) => ({
                ProductId: item.id.toString(),
                Quantity: item.quantity,
                Price: item.oldPrice,
            })),
        };

        console.log('Payload gửi đi:', payload); // Bố xem cái này để biết mình gửi cái gì

        fetch('https://localhost:7216/api/payment/place-order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        })
            .then((res) => {
                if (!res.ok)
                    return res.json().then((err) => {
                        throw new Error(JSON.stringify(err));
                    });
                return res.json();
            })
            .then(() => {
                toast('Đặt hàng thành công!');
                localStorage.removeItem('productCarts');
                navigate('/');
            })
            .catch((err) => {
                console.error('Lỗi:', err);
                // Hiển thị thông báo lỗi dễ hiểu hơn
                toast('Lỗi đặt hàng: ' + err.message);
            });
    };

    // Sepay

    const [checkoutUrl, setCheckoutUrl] = useState('');
    const [fields, setFields] = useState({});

    // --- SỬA CẢ CHỖ NÀY CHO BANKING ---
    const fetchSepayPaymentData = useCallback(() => {
        if (paymentMethod !== 'banking') return;

        const payload = checkoutInputSchema.parse({
            order_invoice_number: transactionId,
            order_amount: finalTotal,
            currency: 'VND',
            order_description: `Thanh toan don hang ${transactionId}`,
            success_url: buildUrl('/payment/success'),
            error_url: buildUrl('/payment/error'),
            cancel_url: buildUrl('/payment/cancel'),
        });
        fetch('/api/create-checkout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        })
            .then((res) => res.json())
            .then((data) => {
                setCheckoutUrl(data.checkoutUrl);
                setFields(data.fields);
            });
    }, [finalTotal, paymentMethod, transactionId]);

    useEffect(() => {
        fetchSepayPaymentData();
    }, [fetchSepayPaymentData]);

    //

    useEffect(() => {
        if (!selectedAddress) return;

        const tempOrderData = {
            UserId: user.id,
            AddressId: selectedAddress.id || selectedAddress.Id,

            // Copy y chang đoạn "bọc lót" ở trên xuống đây
            FullName: selectedAddress.fullName || selectedAddress.FullName || '',
            PhoneNumber: selectedAddress.phoneNumber || selectedAddress.PhoneNumber || '',
            AddressLine: selectedAddress.detailAddress || selectedAddress.DetailAddress || '',
            Ward: selectedAddress.ward || selectedAddress.Ward || '',
            District: selectedAddress.district || selectedAddress.District || '',
            Province: selectedAddress.province || selectedAddress.Province || '',

            PaymentMethod: 'Banking',
            Items: cartItems.map((item) => ({
                ProductId: item.id.toString(),
                Quantity: item.quantity,
                Price: item.oldPrice,
            })),
        };
        localStorage.setItem('temp_order_data', JSON.stringify(tempOrderData));
    }, [selectedAddress, cartItems, user]);

    const randomProducts = JSON.parse(localStorage.getItem('products')) || [];
    return (
        <div>
            <Header />
            <div className="bg-white min-h-screen font-sans text-gray-600">
                <div className="container mx-auto" style={{ padding: '40px 16px' }}>
                    {/* ĐỊA CHỈ NHẬN HÀNG */}
                    <div
                        className="bg-white rounded-sm border border-gray-200 relative shadow-sm"
                        style={{ padding: '24px', marginBottom: '32px' }}
                    >
                        <div className="flex items-center text-[#f4a7bb]" style={{ gap: '8px', marginBottom: '12px' }}>
                            <MapPin size={20} />
                            <span className="font-bold uppercase tracking-wider">Địa chỉ nhận hàng</span>
                        </div>
                        {selectedAddress ? (
                            <div className="flex justify-between items-center">
                                <div className="text-black">
                                    <span className="font-bold text-lg">
                                        {selectedAddress.fullName} | {selectedAddress.phoneNumber}
                                    </span>
                                    <p className="text-sm text-gray-600 uppercase" style={{ marginTop: '4px' }}>
                                        {selectedAddress.detailAddress}, {selectedAddress.ward},{' '}
                                        {selectedAddress.district}, {selectedAddress.province}
                                    </p>
                                </div>
                                <button
                                    onClick={() => setIsModalOpen(true)}
                                    className="text-blue-500 font-bold text-sm hover:underline flex items-center"
                                >
                                    THAY ĐỔI <ChevronRight size={16} />
                                </button>
                            </div>
                        ) : (
                            <Link to="/user/dia-chi" className="text-blue-500 font-bold underline">
                                + Thêm địa chỉ nhận hàng
                            </Link>
                        )}
                    </div>

                    {/* GIỎ HÀNG */}
                    <div className="border border-gray-200 rounded-sm overflow-hidden" style={{ marginBottom: '40px' }}>
                        <div
                            className="hidden md:flex bg-gray-50 border-b border-gray-200 font-bold text-[#2D1B4D] text-xs uppercase tracking-widest"
                            style={{ padding: '16px' }}
                        >
                            <div className="flex-1">Sản phẩm</div>
                            <div className="w-32 text-center">Giá</div>
                            <div className="w-32 text-center">Số lượng</div>
                            <div className="w-32 text-right">Tạm tính</div>
                        </div>
                        <div style={{ paddingLeft: '20px', paddingRight: '20px' }}>
                            {cartItems.map((product) => (
                                <CartItem
                                    key={product.id}
                                    item={product}
                                    updateQuantity={handleUpdateQuantity}
                                    removeItem={handleRemoveItem}
                                />
                            ))}
                        </div>
                    </div>

                    {/* THANH TOÁN */}
                    <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: '32px' }}>
                        <div className="md:col-span-2">
                            <h2
                                className="text-xl font-bold text-[#2D1B4D] border-b"
                                style={{ paddingBottom: '8px', marginBottom: '20px' }}
                            >
                                Bạn có thể thích...
                            </h2>
                            <div className="grid grid-cols-2 md:grid-cols-3" style={{ gap: '16px' }}>
                                {randomProducts.slice(0, 3).map((p) => (
                                    <RecommendCard key={p.id} product={p} />
                                ))}
                            </div>
                        </div>

                        <div className="md:col-span-1">
                            <div
                                className="border border-gray-200 rounded-sm bg-white shadow-sm font-bold text-black"
                                style={{ padding: '24px' }}
                            >
                                <h2
                                    className="text-lg uppercase text-center border-b border-gray-100"
                                    style={{ paddingBottom: '12px', marginBottom: '20px' }}
                                >
                                    Hóa đơn
                                </h2>
                                <div
                                    className="flex justify-between uppercase text-xs"
                                    style={{ marginBottom: '16px' }}
                                >
                                    <span>Tạm tính</span>
                                    <span>{subTotal.toLocaleString()} VND</span>
                                </div>
                                <div style={{ marginBottom: '24px' }}>
                                    <span
                                        className="block text-xs uppercase tracking-tighter"
                                        style={{ marginBottom: '12px' }}
                                    >
                                        Thanh toán bằng:
                                    </span>
                                    <div
                                        className="font-bold text-black"
                                        style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
                                    >
                                        <label
                                            className="flex items-center cursor-pointer rounded-md hover:bg-gray-50 transition-all border border-transparent hover:border-black"
                                            style={{ gap: '8px', padding: '8px' }}
                                        >
                                            <input
                                                type="radio"
                                                checked={paymentMethod === 'cod'}
                                                onChange={() => setPaymentMethod('cod')}
                                                className="accent-black w-4 h-4"
                                            />
                                            <span className="text-sm">TIỀN MẶT (COD)</span>
                                        </label>
                                        <label
                                            className="flex items-center cursor-pointer rounded-md hover:bg-gray-50 transition-all border border-transparent hover:border-black"
                                            style={{ gap: '8px', padding: '8px' }}
                                        >
                                            <input
                                                type="radio"
                                                checked={paymentMethod === 'banking'}
                                                onChange={() => setPaymentMethod('banking')}
                                                className="accent-black w-4 h-4"
                                            />
                                            <span className="text-sm">SMART BANKING</span>
                                        </label>
                                    </div>
                                </div>
                                <div
                                    className="flex justify-between items-center border-t-2 border-black"
                                    style={{ marginBottom: '32px', paddingTop: '16px' }}
                                >
                                    <span className="uppercase">Tổng cộng</span>
                                    <div className="text-2xl tracking-tighter text-pink-500">
                                        {subTotal.toLocaleString()} VND
                                    </div>
                                </div>
                                {paymentMethod === 'banking' && cartItems?.length ? (
                                    <form action={checkoutUrl} method="POST">
                                        {Object.keys(fields ?? {}).map((f) => (
                                            <input key={f} type="hidden" name={f} value={fields[f]} />
                                        ))}
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

            {/* --- POP-UP CHỌN ĐỊA CHỈ --- */}
            {isModalOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-[999]"
                    style={{ padding: '16px' }}
                >
                    <div className="bg-white w-full max-w-4xl border-2 border-black shadow-[15px_15px_0px_0px_rgba(0,0,0,1)] rounded-none overflow-hidden flex flex-col max-h-[85vh]">
                        <div
                            className="border-b-2 border-black flex justify-between items-center bg-[#fafafa]"
                            style={{ padding: '24px' }}
                        >
                            <h3 className="font-bold text-black uppercase tracking-widest text-2xl">
                                Danh sách địa chỉ nhận hàng
                            </h3>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-black border-2 border-black hover:bg-gray-200 transition-colors"
                                style={{ padding: '4px' }}
                            >
                                <X size={28} />
                            </button>
                        </div>

                        <div
                            className="overflow-y-auto bg-white flex-1 scrollbar-thin scrollbar-thumb-black"
                            style={{ padding: '32px' }}
                        >
                            {addresses.length > 0 ? (
                                addresses.map((addr) => (
                                    <div
                                        key={addr.id}
                                        onClick={() => {
                                            setSelectedAddress(addr);
                                            setIsModalOpen(false);
                                        }}
                                        className={`block w-full border-2 cursor-pointer transition-all hover:bg-gray-50 ${
                                            selectedAddress?.id === addr.id
                                                ? 'border-black bg-pink-50'
                                                : 'border-gray-200'
                                        }`}
                                        style={{ padding: '24px', marginBottom: '24px' }}
                                    >
                                        <div className="text-black">
                                            <div
                                                className="flex items-center"
                                                style={{ gap: '16px', marginBottom: '8px' }}
                                            >
                                                <span className="font-bold text-2xl uppercase tracking-tighter">
                                                    {addr.fullName}
                                                </span>
                                                <span className="h-6 w-0.5 bg-gray-300"></span>
                                                <span className="font-bold text-xl text-gray-700">
                                                    {addr.phoneNumber}
                                                </span>
                                            </div>
                                            <p className="text-lg font-medium text-gray-800 uppercase leading-relaxed">
                                                {addr.detailAddress}, {addr.ward}, {addr.district}, {addr.province}
                                            </p>
                                            {addr.isDefault && (
                                                <span
                                                    className="bg-black text-white text-[10px] font-bold inline-block uppercase tracking-widest"
                                                    style={{ padding: '4px 12px', marginTop: '12px' }}
                                                >
                                                    Mặc định
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p
                                    className="text-center font-bold uppercase text-gray-400 text-xl tracking-widest italic"
                                    style={{ paddingTop: '80px', paddingBottom: '80px' }}
                                >
                                    Bố chưa có địa chỉ nào hết!
                                </p>
                            )}
                        </div>

                        <div
                            className="bg-[#fafafa] border-t-2 border-black flex justify-between items-center"
                            style={{ padding: '24px' }}
                        >
                            <button
                                onClick={() => navigate('/user/dia-chi')}
                                className="bg-white border-2 border-black font-bold text-sm uppercase hover:bg-black hover:text-white transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none active:translate-x-1 active:translate-y-1"
                                style={{ padding: '16px 40px' }}
                            >
                                Chỉnh sửa địa chỉ
                            </button>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-black font-black uppercase text-lg underline hover:text-pink-500 transition-colors"
                            >
                                Đóng cửa sổ
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function PayButton({ onClick }) {
    return (
        <button
            className="w-full bg-[#f4a7bb] border-2 border-black text-black font-bold text-xl uppercase shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none active:translate-x-1 active:translate-y-1 transition-all cursor-pointer italic"
            onClick={onClick}
            style={{ paddingTop: '20px', paddingBottom: '20px' }}
        >
            Xác nhận thanh toán!
        </button>
    );
}
