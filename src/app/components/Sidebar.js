'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Users, FileText, UserCheck, Settings } from 'react-feather';

const menuItems = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Patients', href: '/patients', icon: Users },
  { name: 'Prescriptions', href: '/prescriptions', icon: FileText },
  { name: 'Doctors', href: '/doctors', icon: UserCheck },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export default function Sidebar({ isOpen, onToggle }) {
  const pathname = usePathname();

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-20 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`w-[256px] bg-[#FEFEFE] fixed left-0 top-16 bottom-0 print:hidden border-r border-[#ABAFB1] z-30 transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4">
          <nav className="space-y-2">
            {menuItems.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== '/' && pathname.startsWith(item.href));
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-r transition text-[14px] font-semibold border-l-4 ${
                    isActive
                      ? 'bg-[#F5F5FA] text-[#142A4E] border-l-[#142A4E]'
                      : 'text-[#5E6366] border-l-transparent hover:bg-[#F5F5FA] hover:text-[#142A4E]'
                  }`}
                >
                  <Icon size={18} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
}
