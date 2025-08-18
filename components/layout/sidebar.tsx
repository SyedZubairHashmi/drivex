"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faAngleDown,
  faAngleRight,
  faCar,
  faDollarSign,
  faUsers,
  faChartLine,
  faCog,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

const navigation = [
  { name: "Dashboard", href: "#", icon: faHouse },
  {
    name: "Cars Management",
    href: "/cars",
    icon: faCar,
    submenu: [
      { name: "Inventory", href: "/cars/inventory" },
      { name: "Car Transit", href: "/cars/transit" },
      { name: "Sold Cars", href: "/cars/sold" },
    ],
  },
  { name: "Sales & Payments", href: "#", icon: faDollarSign },
  { name: "Investors", href: "#", icon: faUsers },
  { name: "Analytics", href: "#", icon: faChartLine },
  { name: "Settings", href: "#", icon: faCog },
];

export function Sidebar() {
  const [openSubmenus, setOpenSubmenus] = useState<string[]>([]);
  const pathname = usePathname();

  const toggleSubmenu = (itemName: string) => {
    setOpenSubmenus((prev) =>
      prev.includes(itemName)
        ? prev.filter((name) => name !== itemName)
        : [...prev, itemName]
    );
  };

  return (
    <div className="flex flex-col h-screen w-64 bg-neutral-100 border-r border-gray-200 transition-all duration-300">
      {/* Header */}
      <div className="flex items-center  p-4 border-gray-200">
        <h1 className="text-xl font-semibold text-gray-900">DriveXDeals</h1>
      </div>
      {/* Add New Car Button */}
      <div className="p-4">
        <button className="w-[100%] mx-auto flex items-center justify-center gap-2 py-2 border-2 border-dashed border-gray-400 rounded-lg text-black-600 hover:bg-gray-100 transition-colors">
          <FontAwesomeIcon icon={faPlus} />
          Add Sold Car
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + "/");
          const isSubmenuOpen = openSubmenus.includes(item.name);

          return (
            <div key={item.name}>
              {item.submenu ? (
                <div
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-semibold transition-colors cursor-pointer  ${
                    isActive
                      ? "border-l border-blue-500 rounded-l-md bg-blue-50 text-blue-700"
                      : "border-l-4 border-transparent text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() => toggleSubmenu(item.name)}
                >
                  <FontAwesomeIcon icon={item.icon} className="w-5 h-5" />
                  <span className="flex-1">{item.name}</span>
                  <span>
                    <FontAwesomeIcon icon={isSubmenuOpen ? faAngleDown : faAngleRight}/>
                  </span>
                </div>
              ) : (
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    isActive
                      ? "bg-blue-50 text-blue-700"
                      : "text-black-600 hover:bg-gray-100"
                  }`}
                >
                  <FontAwesomeIcon icon={item.icon} className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              )}

              {item.submenu && isSubmenuOpen && (
                <div className="ml-8 mt-2 space-y-1">
                  {item.submenu.map((subItem) => (
                    <Link
                      key={subItem.name}
                      href={subItem.href}
                      className={`block px-3 py-1 text-sm rounded-md transition-colors ${
                        pathname === subItem.href
                          ? "text-blue-700 bg-blue-50"
                          : "text-black-600 hover:text-gray-900 hover:bg-gray-50"
                      }`}
                    >
                      {subItem.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );
}
