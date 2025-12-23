import Header from '@/components/Header/Header.jsx';
import CurrentPage from '@/components/CurrentPage/CurrentPage.jsx';
import Footer from '@/components/Footer/Footer.jsx';
import Help from '@/components/Help/Help.jsx';
import './Blog.css';

// IMPORT ẢNH TỪ src/assets/img
import post1 from '@/assets/img/post1.png';
import post2 from '@/assets/img/post2.png';
import post3 from '@/assets/img/post3.png';
import post4 from '@/assets/img/post4.png';
import post5 from '@/assets/img/post5.png';
import post6 from '@/assets/img/post6.png';
import post7 from '@/assets/img/post7.png';
import post8 from '@/assets/img/post8.png';

export default function Blog() {
    const posts = [
        {
            img: post1,
            title: 'Thức ăn hạt cho mèo: Loại nào tốt cho mèo nhà bạn?',
            desc: 'Thức ăn hạt cho mèo ngày càng trở thành lựa chọn phổ biến nhờ tính tiện lợi...',
        },
        {
            img: post2,
            title: 'Pate cho mèo loại nào tốt cho mèo con và trưởng thành',
            desc: 'Pate cho mèo là một lựa chọn phổ biến trong khẩu phần ăn hằng ngày...',
        },
        {
            img: post3,
            title: 'Dây dắt vòng cổ cho chó khắc tên bán chạy 2025',
            desc: 'Ngày nay, dây dắt vòng cổ cho chó không chỉ đóng vai trò là công cụ...',
        },
        {
            img: post4,
            title: 'Hướng dẫn may quần áo chó mèo đơn giản tại nhà',
            desc: 'Quần áo chó mèo không chỉ giúp thú cưng thêm đáng yêu...',
        },
        {
            img: post5,
            title: 'Mẹo bảo quản pate cho mèo lâu hư, không biến chất',
            desc: 'Pate cho mèo không chỉ là món ăn khoái khẩu mà còn đóng vai trò...',
        },
        {
            img: post6,
            title: 'Sữa tắm cho chó loại nào tốt giữ sạch và thơm lâu nhất',
            desc: 'Trong hành trình nuôi dưỡng thú cưng, việc chọn đúng sữa tắm...',
        },
        {
            img: post7,
            title: 'Tự làm bánh thưởng ăn vặt cho chó tại nhà',
            desc: 'Trong hành trình chăm sóc thú cưng, đặc biệt là chó...',
        },
        {
            img: post8,
            title: 'Thức ăn hạt cho mèo: Gợi ý dành riêng cho mèo con',
            desc: 'Nhiều người nuôi thường lầm tưởng rằng thức ăn hạt cho mèo...',
        },
    ];

    return (
        <div className="flex flex-col min-h-screen bg-[#FFF5F7]">
            <Header />
            <CurrentPage />

            <section id="blog-container" className="bg-[#FFF5F7] py-10">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* LEFT */}
                        <div className="md:col-span-2">
                            <h2 className="text-2xl font-bold mb-4">Chuyện Boss</h2>
                            <div className="border-b mb-6" />

                            {posts.map((post, index) => (
                                <article key={index} className="flex flex-col sm:flex-row gap-4 mb-6">
                                    {/* Image */}
                                    <div className="w-full sm:w-48 h-32 flex-shrink-0 overflow-hidden rounded-lg">
                                        <img src={post.img} alt={post.title} className="w-full h-full object-cover" />
                                    </div>

                                    {/* Content */}
                                    <div>
                                        <h3 className="text-lg font-semibold mb-1">{post.title}</h3>
                                        <p className="text-gray-600 text-sm mb-2">{post.desc}</p>
                                        <p className="text-xs text-gray-500">
                                            bởi <span className="font-medium">Thanh Trúc</span>
                                            <span className="mx-1">•</span>
                                            21 Tháng 11, 2025
                                        </p>
                                    </div>
                                </article>
                            ))}
                        </div>

                        {/* RIGHT */}
                        <aside className="space-y-6">
                            {/* Category */}
                            <div className="bg-white rounded-xl p-4 shadow-sm">
                                <h5 className="font-semibold mb-3">Danh mục Chuyện Boss</h5>
                                <ul className="space-y-2 text-sm">
                                    <li className="cursor-pointer hover:text-rose-600">Mẹo Chăm Sóc Boss</li>
                                    <li className="cursor-pointer hover:text-rose-600">Tìm Hiểu Về Boss</li>
                                </ul>
                            </div>

                            {/* Latest posts */}
                            <div className="bg-white rounded-xl p-4 shadow-sm">
                                <h5 className="font-semibold mb-3">Bài viết mới nhất</h5>
                                <div className="space-y-3">
                                    {posts.map((post, i) => (
                                        <div key={i} className="flex items-center gap-3">
                                            <img
                                                src={post.img}
                                                alt="post"
                                                className="w-14 h-14 rounded-md object-cover"
                                            />
                                            <p className="text-sm leading-snug">{post.title}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Service */}
                            <div className="bg-white rounded-xl p-4 shadow-sm">
                                <h5 className="font-semibold mb-3">Dịch vụ đang hot</h5>
                                <ul className="space-y-2 text-sm">
                                    <li className="hover:text-rose-600 cursor-pointer">Tư vấn combo chăm sóc</li>
                                    <li className="hover:text-rose-600 cursor-pointer">Thiết kế vòng cổ cá nhân hóa</li>
                                </ul>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>

            <Help />
            <Footer />
        </div>
    );
}
