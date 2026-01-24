'use client';

import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { Menu } from 'react-feather';
import { Modal, Button } from '@/app/components/ui';

export default function Navbar({ onMenuClick }) {
  const { data: session } = useSession();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleSignOut = async () => {
    setIsLoggingOut(true);
    await signOut({ callbackUrl: '/login' });
  };

  return (
    <nav className="bg-[#FEFEFE] shadow-sm border-b border-[#ABAFB1] print:hidden fixed top-0 left-0 right-0 z-40">
      <div className="px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center gap-4">
            {/* Hamburger Menu */}
            <button
              onClick={onMenuClick}
              className="p-2 rounded hover:bg-[#F5F5FA] transition"
              aria-label="Toggle sidebar"
            >
              <Menu size={24} className="text-[#142A4E]" />
            </button>

            {/* Logo */}
            <Link href="/" className="flex items-center">
              <img src="/logo/left.png" alt="Logo" className="h-10 w-auto" />
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {session && (
              <>
                <span className="text-[14px] text-[#5E6366]">
                  {session.user?.name || session.user?.email}
                </span>
                <button
                  onClick={() => setShowLogoutModal(true)}
                  className="btn-danger"
                >
                  Sign Out
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Sign Out Confirmation Modal */}
      <Modal
        isOpen={showLogoutModal}
        onClose={() => !isLoggingOut && setShowLogoutModal(false)}
        title="Confirm Sign Out"
      >
        <p className="text-[14px] text-[#5E6366]">
          Are you sure you want to sign out?
        </p>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowLogoutModal(false)}
            disabled={isLoggingOut}
          >
            No
          </Button>
          <Button
            variant="danger"
            onClick={handleSignOut}
            loading={isLoggingOut}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </nav>
  );
}
