import * as React from 'react';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { Link } from 'react-router-dom';

const transparentItem =
    'bg-transparent hover:bg-transparent focus:bg-transparent ' +
    'data-[active]:bg-transparent data-[state=open]:bg-transparent ' +
    'text-[#6a1f6e] hover:text-[#f5abc0] ' +
    'data-[active]:text-[#f5abc0] data-[state=open]:text-[#f5abc0]';

export function Navigate() {
    return (
        <NavigationMenu>
            <NavigationMenuList className="gap-5">
                {/* TRANG CHỦ */}
                <NavigationMenuItem>
                    <NavigationMenuLink asChild className={`${navigationMenuTriggerStyle()} ${transparentItem}`}>
                        <Link to="/">TRANG CHỦ</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>

                {/* VỀ CHÚNG TÔI */}
                <NavigationMenuItem>
                    <NavigationMenuLink asChild className={`${navigationMenuTriggerStyle()} ${transparentItem}`}>
                        <Link to="/about-us">VỀ CHÚNG TÔI</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>

                {/* CỬA HÀNG (DROPDOWN) */}
                <NavigationMenuItem>
                    <NavigationMenuTrigger className={transparentItem}>
                        <NavigationMenuLink asChild className={`${navigationMenuTriggerStyle()} ${transparentItem}`}>
                            <Link to="/cua-hang">CỬA HÀNG</Link>
                        </NavigationMenuLink>
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid gap-2 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                            <ListItem href="/cua-hang/C1" title="Thức ăn hạt cho chó">
                                Hạt, pate và bánh thưởng dinh dưỡng.
                            </ListItem>
                            <ListItem href="/cua-hang/C2" title="Dinh dưỡng cho mèo">
                                Hạt, pate và bánh thưởng dinh dưỡng.
                            </ListItem>
                            <ListItem href="/cua-hang/C3" title="Phụ Kiện và đồ chơi">
                                Đồ chơi vòng, bóng, lắc.
                            </ListItem>
                            <ListItem href="/cua-hang/C4" title="Chăm sóc Boss yêu">
                                Sản phẩm chăm sóc sức khỏe Boss.
                            </ListItem>
                            <ListItem href="/cua-hang/C5" title="Vật dụng nhà ở">
                                Khay vệ sinh, nhà cây và đồ chơi.
                            </ListItem>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>

                {/* CHUYỆN BOSS */}
                <NavigationMenuItem>
                    <NavigationMenuLink asChild className={`${navigationMenuTriggerStyle()} ${transparentItem}`}>
                        <Link to="/blog">CHUYỆN BOSS</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>

                {/* LIÊN HỆ */}
                <NavigationMenuItem>
                    <NavigationMenuLink asChild className={`${navigationMenuTriggerStyle()} ${transparentItem}`}>
                        <Link to="/lien-he">LIÊN HỆ</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>

                {/* TƯ VẤN */}
                <NavigationMenuItem>
                    <NavigationMenuLink asChild className={`${navigationMenuTriggerStyle()} ${transparentItem}`}>
                        <Link to="/tu-van">TƯ VẤN</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    );
}

/* ---------- Helpers (Đã sửa lỗi dòng 104) ---------- */

// Sửa lại: Xóa bỏ toàn bộ phần ": React.ComponentProps..."
// Sử dụng forwardRef để hỗ trợ shadcn/ui tốt nhất
const ListItem = React.forwardRef(({ className, title, children, href, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <Link
                    ref={ref}
                    to={href} // Link của React Router dùng 'to'
                    className={`block select-none  rounded-md leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground ${className}`}
                    style={{ padding: '12px' }}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
                </Link>
            </NavigationMenuLink>
        </li>
    );
});

ListItem.displayName = 'ListItem';
