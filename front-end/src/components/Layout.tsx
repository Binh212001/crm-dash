import {
  MdAttachMoney,
  MdCalendarToday,
  MdCheckBox,
  MdDashboard,
  MdGroup,
  MdInbox,
  MdInventory,
  MdList,
  MdLogout,
  MdPeople,
  MdReceipt,
  MdSettings,
} from "react-icons/md";
import { Link, Outlet, useLocation } from "react-router-dom";
import Header from "./Header";

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const mainNav: NavItem[] = [
  { name: "Dashboard", href: "/", icon: MdDashboard },
  { name: "Customers", href: "/customers", icon: MdPeople },
  { name: "Products", href: "/products", icon: MdInventory },
  { name: "Orders", href: "/orders", icon: MdList },
];

const pagesNav: NavItem[] = [
  { name: "Inbox", href: "/inbox", icon: MdInbox },
  { name: "User", href: "/user", icon: MdGroup },
  { name: "Calender", href: "/calender", icon: MdCalendarToday },
  { name: "To-Do", href: "/todo", icon: MdCheckBox },
  { name: "Invoice", href: "/invoice", icon: MdReceipt },
  { name: "Pricing", href: "/pricing", icon: MdAttachMoney },
];

const bottomNav: NavItem[] = [
  { name: "Settings", href: "/settings", icon: MdSettings },
  { name: "Logout", href: "/logout", icon: MdLogout },
];

const SidebarSection = ({
  title,
  items,
}: {
  title?: string;
  items: NavItem[];
}) => {
  const location = useLocation();

  return (
    <div className="mt-2">
      {title && (
        <div className="px-2 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
          {title}
        </div>
      )}
      <nav className="flex-1 px-2 space-y-1">
        {items.map((item) => {
          const isActive = location.pathname === item.href;
          const IconComponent = item.icon;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors
                ${
                  isActive
                    ? "bg-primary text-white"
                    : "text-gray-700 hover:bg-primary hover:text-white"
                }`}
            >
              <IconComponent
                className={`mr-3 h-5 w-5 ${
                  isActive ? "text-white" : "text-gray-400"
                }`}
              />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

const Layout = () => {
  return (
    <div className="min-h-screen flex bg-main-primary text-primary-txt">
      {/* Sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 border-r border-gray-200 bg-white">
        <div className="flex-1 flex flex-col min-h-0">
          <div className="flex items-center flex-shrink-0 px-4 py-6">
            <h1 className="text-xl font-bold">
              <span className="text-primary">Dash</span>Stack
            </h1>
          </div>
          <SidebarSection items={mainNav} />
          <SidebarSection title="Pages" items={pagesNav} />
          <div className="flex-1" />
          <SidebarSection items={bottomNav} />
        </div>
      </div>
      {/* Main content */}
      <div className="md:pl-64 flex flex-col flex-1 max-h-full overflow-scroll">
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
