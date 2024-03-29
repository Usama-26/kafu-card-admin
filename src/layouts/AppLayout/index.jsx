import { useEffect, useState } from "react";
import {
  AdjustmentsVerticalIcon,
  ClipboardDocumentListIcon,
  ReceiptPercentIcon,
  Squares2X2Icon,
  TicketIcon,
  UsersIcon,
} from "@heroicons/react/20/solid";

import MobileSidebar from "@/components/Mobile/Sidebar";
import DesktopSidebar from "@/components/Desktop/Sidebar";
import Header from "@/components/Header";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "@/features/auth/authApi";
import { useSelector } from "react-redux";
import { getUser } from "@/features/auth/authSlice";

let sidebarNavigation = [
  {
    name: "Dashboard",
    href: "dashboard",
    icon: AdjustmentsVerticalIcon,
    current: true,
  },
  {
    name: "Users Management",
    icon: UsersIcon,
    current: false,
    children: [
      {
        name: "Customers",
        href: "/app/manage/users/customers",
        current: false,
      },
      { name: "Partners", href: "/app/manage/users/partners", current: false },
    ],
  },
  {
    name: "Offers Management",
    href: "manage/offers",
    icon: ReceiptPercentIcon,
    current: false,
  },
  {
    name: "Transaction History",
    href: "transactions",
    icon: ClipboardDocumentListIcon,
    current: false,
  },
  {
    name: "Business Categories",
    href: "business_categories",
    icon: Squares2X2Icon,
    current: false,
  },
];

const userNavigation = [{ name: "Your profile", href: "/app/settings" }];

export default function AppLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [navigation, setNavigation] = useState(sidebarNavigation);
  const user = useSelector(getUser);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser());
  }, []);

  useEffect(() => {
    const updatedNavigation = navigation.map((navItem) => {
      // If the current navigation item has children
      if (navItem.children) {
        // Check if any of its children's href match the current URL
        const hasCurrentChild = navItem.children.some((child) =>
          router.pathname.startsWith(child.href)
        );
        // Update the current property of the navigation item based on children
        return {
          ...navItem,
          current: hasCurrentChild,
          children: navItem.children.map((child) => ({
            ...child,
            current: router.pathname.startsWith(child.href),
          })),
        };
      } else {
        // If there are no children, update the current property directly
        return {
          ...navItem,
          current: router.pathname.includes(navItem.href),
        };
      }
    });
    setNavigation(updatedNavigation);
  }, [router.pathname]);

  return (
    <>
      <div>
        <MobileSidebar
          navigation={navigation}
          setSidebarOpen={setSidebarOpen}
          sidebarOpen={sidebarOpen}
        />
        {/* Static sidebar for desktop */}
        <DesktopSidebar navigation={navigation} />

        <div className="lg:pl-72">
          <Header
            userNavigation={userNavigation}
            setSidebarOpen={setSidebarOpen}
          />

          <main className="bg-gray-50 py-6 prose-sm prose-headings:m-0 prose-headings:font-semibold">
            <div className="px-4 sm:px-6 lg:px-8">{children}</div>
          </main>
        </div>
      </div>
    </>
  );
}
