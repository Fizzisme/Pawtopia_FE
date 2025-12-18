import { Navigate } from '@/components/Header/Navigate/Navigate.jsx';
import pawtopiaLogo from '@/assets/pawtopiaLogo.png';
import { Search, Heart, ShoppingBasket } from 'lucide-react';

export default function Header() {
    return (
        <div className="flex justify-between items-center h-[64px] bg-[#fff9e8] w-full" style={{ padding: '0 64px' }}>
            <img src={pawtopiaLogo} alt="pawtopia logo" />
            <Navigate />
            <div className="flex gap-2">
                <Search />
                <Heart />
                <ShoppingBasket />
            </div>
        </div>
    );
}
