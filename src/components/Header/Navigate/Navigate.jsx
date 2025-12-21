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
                    <NavigationMenuLink asChild className={`${navigationMenuTriggerStyle()} ${transparentItem}`}>
                        <Link to="/cua-hang">CỬA HÀNG</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>

                {/* FLASH DEALS */}
                <NavigationMenuItem>
                    <NavigationMenuLink asChild className={`${navigationMenuTriggerStyle()} ${transparentItem}`}>
                        <a href="#">FLASH DEALS</a>
                    </NavigationMenuLink>
                </NavigationMenuItem>

                {/* CHUYỆN BOSS (DROPDOWN) */}
                <NavigationMenuItem>
                    <NavigationMenuLink asChild className={`${navigationMenuTriggerStyle()} ${transparentItem}`}>
                        <Link to="/blog">CHUYỆN BOSS</Link>
                    </NavigationMenuLink>
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
