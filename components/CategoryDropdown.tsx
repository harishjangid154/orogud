"use client";

import * as DropdownMenu from "@/components/ui/DropdownMenu";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

const categories = [
  { name: "Health & Wellness", href: "/products?category=Health%20%26%20Wellness" },
  { name: "Food & Pantry", href: "/products?category=Food%20%26%20Pantry" },
  { name: "Skin Care", href: "/products?category=Skin%20Care" },
  { name: "Tea & Beverages", href: "/products?category=Tea%20%26%20Beverages" },
  { name: "Personal Care", href: "/products?category=Personal%20Care" },
  { name: "Superfoods", href: "/products?category=Superfoods" },
];

export default function CategoryDropdown() {
  return (
    <DropdownMenu.DropdownMenu>
      <DropdownMenu.DropdownMenuTrigger className="text-base font-semibold text-text hover:text-accent transition-colors flex items-center gap-1 outline-none">
        Categories
        <ChevronDown className="h-4 w-4" />
      </DropdownMenu.DropdownMenuTrigger>
      <DropdownMenu.DropdownMenuContent align="start" className="w-56">
        <DropdownMenu.DropdownMenuLabel>Shop by Category</DropdownMenu.DropdownMenuLabel>
        <DropdownMenu.DropdownMenuSeparator />
        {categories.map((category) => (
          <DropdownMenu.DropdownMenuItem key={category.name} asChild>
            <Link href={category.href} className="cursor-pointer">
              {category.name}
            </Link>
          </DropdownMenu.DropdownMenuItem>
        ))}
        <DropdownMenu.DropdownMenuSeparator />
        <DropdownMenu.DropdownMenuItem asChild>
          <Link href="/categories" className="cursor-pointer font-semibold text-accent">
            View All Categories →
          </Link>
        </DropdownMenu.DropdownMenuItem>
      </DropdownMenu.DropdownMenuContent>
    </DropdownMenu.DropdownMenu>
  );
}

