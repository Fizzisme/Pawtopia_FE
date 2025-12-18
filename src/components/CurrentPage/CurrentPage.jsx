import { ChevronsRight } from 'lucide-react';

export default function CurrentPage() {
    return (
        <div className="h-[40px] bg-[#fde5e5] flex items-center gap-2 text-[#6a1f6e]" style={{ padding: '0 100px' }}>
            <p> Trang chủ</p>
            <ChevronsRight className="size-4" />
            <p>Về Chúng Tôi</p>
        </div>
    );
}
