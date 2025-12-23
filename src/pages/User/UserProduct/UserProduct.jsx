import { Plus, Pencil, Trash2, Search, Package, Loader2, X } from 'lucide-react';
import { useState, useRef } from 'react';

export default function UserProduct() {
    // --- STATE TÌM KIẾM ---
    const [searchTerm, setSearchTerm] = useState('');
    const [products, setProducts] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const typingTimeoutRef = useRef(null);

    // --- STATE FORM (THÊM / SỬA) ---
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // State để lưu ID sản phẩm đang sửa (null = chế độ thêm mới)
    const [editingId, setEditingId] = useState(null);

    const [isActive, setIsActive] = useState(1); // 1: Active, 0: Inactive

    // Khởi tạo dữ liệu form rỗng
    const initialFormState = {
        name: '',
        price: '',
        description: '',
        thumbImageLink: '',
        categoryId: '',
        quantityInStock: '',
    };
    const [formData, setFormData] = useState(initialFormState);

    // --- LOGIC TÌM KIẾM ---
    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        if (value.trim() === '') {
            setProducts([]);
            setIsSearching(false);
            if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
            return;
        }
        setIsSearching(true);
        if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = setTimeout(async () => {
            try {
                const response = await fetch(
                    `https://localhost:7216/api/products/search?keyword=${encodeURIComponent(value)}`,
                );
                if (response.ok) {
                    const resData = await response.json();
                    setProducts(resData.data || []);
                } else {
                    setProducts([]);
                }
            } catch (error) {
                console.error('Lỗi search:', error);
                setProducts([]);
            } finally {
                setIsSearching(false);
            }
        }, 500);
    };

    // --- LOGIC FORM ---

    // 1. Mở form Thêm mới (Reset dữ liệu)
    const handleOpenForm = () => {
        setEditingId(null); // Đặt về null để biết là đang thêm mới
        setFormData(initialFormState);
        setIsActive(1);
        setIsFormOpen(true);
    };

    // 2. Mở form Cập nhật (Đổ dữ liệu cũ vào)
    const handleOpenUpdate = (product) => {
        setEditingId(product.id); // Lưu ID đang sửa

        // Đổ dữ liệu vào state
        setFormData({
            name: product.name,
            price: product.price,
            description: product.description || '',
            thumbImageLink: product.thumbImageLink || '',
            categoryId: product.categoryId || '', // Đảm bảo backend trả về field này
            quantityInStock: product.quantityInStock,
        });

        // Xử lý trạng thái Active (Giả sử backend trả về true/false hoặc 1/0)
        // Nếu backend không trả về isActive thì mặc định là 1
        setIsActive(product.isActive === false ? 0 : 1);

        setIsFormOpen(true);
    };

    // 3. Đóng form
    const handleCloseForm = () => {
        setIsFormOpen(false);
        setFormData(initialFormState);
        setEditingId(null);
    };

    // 4. Xử lý input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // 5. Submit (Tự động chia trường hợp Thêm hoặc Sửa)
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const payload = {
            ...formData,
            price: Number(formData.price),
            quantityInStock: Number(formData.quantityInStock),
            isActive: isActive, // Convert 1/0 -> true/false
        };
        console.log(payload);

        // Nếu đang Sửa -> Thêm ID vào payload (tuỳ API yêu cầu)
        if (editingId) {
            payload.id = editingId;
        }

        console.log('Payload:', payload);

        try {
            // Xác định URL và Method
            const url = editingId
                ? `https://localhost:7216/api/product/update/${editingId}` // API Update (Bạn cần thay đúng đường dẫn của bạn)
                : 'https://localhost:7216/api/product/add'; // API Add

            const method = editingId ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            console.log(res);

            if (res.ok) {
                alert(editingId ? 'Cập nhật thành công!' : 'Thêm sản phẩm thành công!');
                handleCloseForm();
                // Có thể gọi lại hàm search tại đây để refresh list
                // handleSearch({ target: { value: searchTerm } });
            } else {
                const errorData = await res.json().catch(() => ({}));
                alert(`Lỗi: ${errorData.message || res.statusText}`);
            }
        } catch (error) {
            console.error('Lỗi kết nối:', error);
            alert('Không thể kết nối đến server.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (productId) => {
        if (!productId) return;

        const confirmDelete = window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?');
        if (!confirmDelete) return;

        try {
            const res = await fetch(`https://localhost:7216/api/product/delete/${productId}`, {
                method: 'DELETE',
            });

            if (res.ok) {
                alert('Xóa sản phẩm thành công!');

                // Refresh lại danh sách
                handleSearch({ target: { value: searchTerm } });
            } else {
                const errorData = await res.json().catch(() => ({}));
                alert(`Lỗi: ${errorData.message || res.statusText}`);
            }
        } catch (error) {
            console.error('Lỗi kết nối:', error);
            alert('Không thể kết nối đến server.');
        }
    };

    return (
        <div className="bg-white rounded-3xl shadow-sm relative" style={{ padding: '24px', minHeight: '500px' }}>
            {/* --- HEADER --- */}
            <div className="flex items-center justify-between" style={{ marginBottom: '20px' }}>
                <h2 className="text-[22px] font-bold text-pink-600">Quản lý sản phẩm</h2>
                <button
                    onClick={handleOpenForm}
                    className="flex items-center gap-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition shadow-md font-medium"
                    style={{ padding: '10px 20px' }}
                >
                    <Plus size={18} />
                    Thêm sản phẩm
                </button>
            </div>

            {/* --- SEARCH BOX --- */}
            <div style={{ marginBottom: '24px' }}>
                <div className="relative w-[320px]">
                    {isSearching ? (
                        <Loader2
                            size={18}
                            className="absolute text-pink-500 animate-spin"
                            style={{ top: '50%', left: '12px', transform: 'translateY(-50%)' }}
                        />
                    ) : (
                        <Search
                            size={18}
                            className="absolute text-gray-400"
                            style={{ top: '50%', left: '12px', transform: 'translateY(-50%)' }}
                        />
                    )}
                    <input
                        value={searchTerm}
                        onChange={handleSearch}
                        placeholder="Tìm theo tên sản phẩm..."
                        className="w-full border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-pink-200 transition-all shadow-sm"
                        style={{ padding: '10px 16px 10px 40px' }}
                    />
                </div>
            </div>

            {/* --- EMPTY STATE --- */}
            {searchTerm.trim() === '' && (
                <div className="flex flex-col items-center justify-center text-gray-400" style={{ padding: '64px 0' }}>
                    <Package size={48} className="text-gray-300" style={{ marginBottom: '12px' }} />
                    <p className="text-sm">Nhập tên sản phẩm để bắt đầu tìm kiếm</p>
                </div>
            )}

            {/* --- TABLE --- */}
            {!isSearching && searchTerm.trim() !== '' && products.length > 0 && (
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50 text-gray-600 font-semibold uppercase text-xs">
                            <tr className="border-b">
                                <th style={{ padding: '12px' }}>Ảnh</th>
                                <th style={{ padding: '12px' }}>Tên sản phẩm</th>
                                <th style={{ padding: '12px' }}>Giá bán</th>
                                <th style={{ padding: '12px' }}>Tồn kho</th>
                                <th style={{ padding: '12px' }}>Hành động</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {products.map((item) => (
                                <tr key={item.id} className="hover:bg-pink-50/30 transition">
                                    <td style={{ padding: '12px' }}>
                                        <img
                                            src={item.thumbImageLink || 'https://placehold.co/50'}
                                            alt={item.name}
                                            className="w-12 h-12 rounded-lg object-cover border"
                                        />
                                    </td>
                                    <td
                                        className="font-medium text-gray-800 line-clamp-2 max-w-[200px]"
                                        style={{ padding: '12px' }}
                                    >
                                        {item.name}
                                    </td>
                                    <td className="font-bold text-pink-600" style={{ padding: '12px' }}>
                                        {item.price?.toLocaleString('vi-VN')} ₫
                                    </td>
                                    <td style={{ padding: '12px' }}>
                                        <span
                                            className={`rounded-full text-xs font-medium ${
                                                (item.quantityInStock || 0) > 0
                                                    ? 'bg-green-100 text-green-700'
                                                    : 'bg-red-100 text-red-700'
                                            }`}
                                            style={{ padding: '4px 10px' }}
                                        >
                                            {item.quantityInStock || 0} SP
                                        </span>
                                    </td>
                                    <td style={{ padding: '12px' }}>
                                        <div className="flex gap-2">
                                            <button
                                                // GỌI HÀM OPEN UPDATE VÀ TRUYỀN ITEM VÀO
                                                onClick={() => handleOpenUpdate(item)}
                                                className="bg-blue-50 cursor-pointer text-blue-600 rounded-full hover:bg-blue-100"
                                                style={{ padding: '8px' }}
                                            >
                                                <Pencil size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(item.id)}
                                                className="bg-red-50 cursor-pointer text-red-600 rounded-full hover:bg-red-100"
                                                style={{ padding: '8px' }}
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {!isSearching && searchTerm.trim() !== '' && products.length === 0 && (
                <div className="text-center text-gray-500" style={{ padding: '64px 0' }}>
                    Không tìm thấy sản phẩm nào.
                </div>
            )}

            {/* --- MODAL FORM --- */}
            {isFormOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center backdrop-blur-sm animate-fade-in"
                    style={{ padding: '16px' }}
                >
                    <div className="bg-white rounded-2xl w-full max-w-[600px] shadow-2xl overflow-hidden animate-slide-up">
                        {/* Modal Header */}
                        <div
                            className="flex justify-between items-center border-b bg-gray-50"
                            style={{ padding: '16px 24px' }}
                        >
                            {/* Tiêu đề thay đổi dựa trên editingId */}
                            <h3 className="text-lg font-bold text-gray-800">
                                {editingId ? 'Cập nhật sản phẩm' : 'Thêm sản phẩm mới'}
                            </h3>
                            <button
                                onClick={handleCloseForm}
                                className="text-gray-400 hover:text-gray-600 bg-white rounded-full hover:bg-gray-200 transition"
                                style={{ padding: '4px' }}
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <form
                            onSubmit={handleSubmit}
                            className="overflow-y-auto"
                            style={{ padding: '24px', maxHeight: '80vh' }}
                        >
                            {/* Tên sản phẩm */}
                            <div style={{ marginBottom: '16px' }}>
                                <label
                                    className="block text-sm font-medium text-gray-700"
                                    style={{ marginBottom: '4px' }}
                                >
                                    Tên sản phẩm <span className="text-red-500">*</span>
                                </label>
                                <input
                                    required
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-pink-500 outline-none transition"
                                    style={{ padding: '8px 12px' }}
                                    placeholder="Ví dụ: Thức ăn Royal Canin..."
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4" style={{ marginBottom: '16px' }}>
                                {/* Giá */}
                                <div>
                                    <label
                                        className="block text-sm font-medium text-gray-700"
                                        style={{ marginBottom: '4px' }}
                                    >
                                        Giá bán (VNĐ) <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        required
                                        type="number"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-pink-500 outline-none"
                                        style={{ padding: '8px 12px' }}
                                        placeholder="0"
                                    />
                                </div>
                                {/* Tồn kho */}
                                <div>
                                    <label
                                        className="block text-sm font-medium text-gray-700"
                                        style={{ marginBottom: '4px' }}
                                    >
                                        Số lượng tồn kho <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        required
                                        type="number"
                                        name="quantityInStock"
                                        value={formData.quantityInStock}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-pink-500 outline-none"
                                        style={{ padding: '8px 12px' }}
                                        placeholder="0"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4" style={{ marginBottom: '16px' }}>
                                {/* Danh mục */}
                                <div>
                                    <label
                                        className="block text-sm font-medium text-gray-700"
                                        style={{ marginBottom: '4px' }}
                                    >
                                        Mã danh mục <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        required
                                        name="categoryId"
                                        value={formData.categoryId}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-pink-500 outline-none"
                                        style={{ padding: '8px 12px' }}
                                        placeholder="VD: C1"
                                    />
                                    <p className="text-xs text-gray-400" style={{ marginTop: '4px' }}>
                                        Nhập đúng ID (vd: C1, CAT02...)
                                    </p>
                                </div>
                                {/* Ảnh */}
                                <div>
                                    <label
                                        className="block text-sm font-medium text-gray-700"
                                        style={{ marginBottom: '4px' }}
                                    >
                                        Link ảnh đại diện
                                    </label>
                                    <input
                                        name="thumbImageLink"
                                        value={formData.thumbImageLink}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-pink-500 outline-none"
                                        style={{ padding: '8px 12px' }}
                                        placeholder="https://..."
                                    />
                                </div>
                            </div>

                            {/* Mô tả */}
                            <div style={{ marginBottom: '16px' }}>
                                <label
                                    className="block text-sm font-medium text-gray-700"
                                    style={{ marginBottom: '4px' }}
                                >
                                    Mô tả sản phẩm
                                </label>
                                <textarea
                                    name="description"
                                    rows="3"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-pink-500 outline-none"
                                    style={{ padding: '8px 12px' }}
                                    placeholder="Chi tiết về sản phẩm..."
                                />
                            </div>

                            {/* Trạng thái */}
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="isActive"
                                    name="isActive"
                                    checked={isActive === 1}
                                    onChange={(e) => setIsActive(e.target.checked ? 1 : 0)}
                                    className="w-5 h-5 text-pink-600 border-gray-300 rounded focus:ring-pink-500"
                                />
                                <label
                                    htmlFor="isActive"
                                    className="text-sm font-medium text-gray-700 select-none cursor-pointer"
                                >
                                    Kích hoạt sản phẩm ngay
                                </label>
                            </div>
                        </form>

                        {/* Modal Footer */}
                        <div className="border-t bg-gray-50 flex justify-end gap-3" style={{ padding: '16px 24px' }}>
                            <button
                                onClick={handleCloseForm}
                                className="text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                                style={{ padding: '8px 16px' }}
                            >
                                Hủy bỏ
                            </button>
                            <button
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                                className="text-sm font-medium text-white bg-pink-500 rounded-lg hover:bg-pink-600 transition flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                style={{ padding: '8px 24px' }}
                            >
                                {isSubmitting && <Loader2 size={16} className="animate-spin" />}
                                {/* Text nút thay đổi */}
                                {isSubmitting ? 'Đang lưu...' : editingId ? 'Cập nhật' : 'Lưu sản phẩm'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
