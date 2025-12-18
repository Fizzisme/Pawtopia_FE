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
                        <a href="#">TRANG CHỦ</a>
                    </NavigationMenuLink>
                </NavigationMenuItem>

                {/* VỀ CHÚNG TÔI */}
                <NavigationMenuItem>
                    <NavigationMenuLink asChild className={`${navigationMenuTriggerStyle()} ${transparentItem}`}>
                        <a href="#">VỀ CHÚNG TÔI</a>
                    </NavigationMenuLink>
                </NavigationMenuItem>

                {/* CỬA HÀNG (DROPDOWN) */}
                <NavigationMenuItem>
                    <NavigationMenuTrigger className={`${navigationMenuTriggerStyle()} ${transparentItem}`}>
                        CỬA HÀNG
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid w-[220px] gap-2 p-2">
                            <DropdownItem title="Thức ăn thú cưng" />
                            <DropdownItem title="Đồ chơi" />
                            <DropdownItem title="Phụ kiện" />
                            <DropdownItem title="Chăm sóc & vệ sinh" />
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>

                {/* FLASH DEALS */}
                <NavigationMenuItem>
                    <NavigationMenuLink asChild className={`${navigationMenuTriggerStyle()} ${transparentItem}`}>
                        <a href="#">FLASH DEALS</a>
                    </NavigationMenuLink>
                </NavigationMenuItem>

                {/* CHUYỆN BOSS (DROPDOWN) */}
                <NavigationMenuItem>
                    <NavigationMenuTrigger className={`${navigationMenuTriggerStyle()} ${transparentItem}`}>
                        CHUYỆN BOSS
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid w-[220px] gap-2 p-2">
                            <DropdownItem title="Blog thú cưng" />
                            <DropdownItem title="Kinh nghiệm nuôi boss" />
                            <DropdownItem title="Câu chuyện khách hàng" />
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>

                {/* LIÊN HỆ */}
                <NavigationMenuItem>
                    <NavigationMenuLink asChild className={`${navigationMenuTriggerStyle()} ${transparentItem}`}>
                        <a href="#">LIÊN HỆ</a>
                    </NavigationMenuLink>
                </NavigationMenuItem>

                {/* TƯ VẤN */}
                <NavigationMenuItem>
                    <NavigationMenuLink asChild className={`${navigationMenuTriggerStyle()} ${transparentItem}`}>
                        <a href="#">TƯ VẤN</a>
                    </NavigationMenuLink>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    );
}

/* ---------- Helpers ---------- */

function DropdownItem({ title }) {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a href="#" className="block rounded-md px-3 py-2 text-sm hover:bg-muted">
                    {title}
                </a>
            </NavigationMenuLink>
        </li>
    );
}
