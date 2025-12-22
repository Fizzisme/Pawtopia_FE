import { Heart, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
    const id = product.id;
    return (
        <Link
            to={`/san-pham/${id}`}
            className="relative border border-gray-100 flex flex-col h-full bg-white group"
            style={{ padding: '10px' }}
        >
            {/* Ảnh sản phẩm - Giữ nguyên hiệu ứng hover */}
            <div className="overflow-hidden" style={{ marginBottom: '8px' }}>
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-300"
                />
            </div>

            {/* Rating - Hiển thị sao dựa trên điểm rating của product */}
            <div className="flex gap-1" style={{ marginBottom: '4px' }}>
                {[...Array(5)].map((_, i) => (
                    <Star
                        key={i}
                        size={12}
                        fill={i < (product.rating || 5) ? '#000' : 'none'}
                        stroke="#000"
                        strokeWidth={1}
                    />
                ))}
            </div>

            {/* Tên sản phẩm - Cố định độ cao 2 dòng để layout đều nhau */}
            <h3
                className="text-[14px] font-medium leading-tight text-gray-800 line-clamp-2 min-h-[40px]"
                style={{ marginBottom: '8px' }}
            >
                {product.name}
            </h3>

            {/* Giá tiền - Chỉ hiện 1 giá duy nhất cho sản phẩm bình thường */}
            <div className="flex items-center gap-1 text-[14px]" style={{ marginBottom: '12px' }}>
                <span className="text-black font-bold">{product.oldPrice?.toLocaleString()} VNĐ</span>
                <span className="text-[10px] text-gray-500 uppercase">VAT</span>
            </div>

            {/* Phân loại (Tags) - Dùng flex-grow để đẩy nút bấm xuống dưới cùng */}
            <div className="flex flex-wrap gap-1 flex-grow" style={{ marginBottom: '15px' }}>
                {product.variants?.map((v, idx) => (
                    <span
                        key={idx}
                        className="border border-gray-200 text-[10px] text-gray-500 px-1.5 py-[2px] rounded"
                        style={{ padding: '2px' }}
                    >
                        {v}
                    </span>
                ))}
            </div>

            {/* Nút bấm mua hàng */}
            <button
                className="w-full bg-[#f4a7bb] cursor-pointer text-white rounded-full text-[12px] font-bold uppercase hover:bg-pink-400 transition-colors"
                style={{ marginBottom: '10px', padding: '8px 0' }}
            >
                MUA NGAY
            </button>

            {/* Yêu thích */}
            <div className="flex items-center gap-1 text-gray-500 text-[12px] cursor-pointer hover:text-pink-500 transition-colors">
                <Heart size={14} />
                <span>Yêu Thích</span>
            </div>
        </Link>
    );
}
