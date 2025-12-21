import Header from '@/components/Header/Header.jsx';
import CurrentPage from '@/components/CurrentPage/CurrentPage.jsx';
import Footer from '@/components/Footer/Footer.jsx';
import ComingSoon from '@/components/ComingSoon/ComingSoon.jsx';
import Help from '@/components/Help/Help.jsx';
export default function Blog() {
    return (
        <div className="flex flex-col min-h-screen bg-[#FFF5F7]">
            <Header />
            <CurrentPage />
            <ComingSoon />
            <Help />
            <Footer />
        </div>
    );
}
