import { Navigate } from '@/components/Header/Navigate/Navigate.jsx';
import pawtopiaLogo from '@/assets/pawtopiaLogo.png';
import { Search, Heart, ShoppingBasket, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
export default function Header() {
    const navigate = useNavigate();
    const userStored = localStorage.getItem('User');
    const handleClick = () => {
        if (!userStored) navigate('/dang-nhap');
        else navigate('/user/dia-chi');
    };
    return (
        <div className="flex justify-between items-center h-[64px] bg-[#fff9e8] w-full" style={{ padding: '0 64px' }}>
            <Link to="/">
                <img src={pawtopiaLogo} alt="pawtopia logo" />
            </Link>
            <Navigate />
            <div className="flex gap-2">
                <Search />
                <User className="cursor-pointer" onClick={handleClick} />
                <Link to="/gio-hang">
                    <ShoppingBasket />
                </Link>
            </div>
        </div>
    );
}
