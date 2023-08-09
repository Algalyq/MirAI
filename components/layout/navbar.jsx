"use client";

import Image from "next/image";
import Link from "next/link";
import useScroll from "@/lib/hooks/use-scroll";
import { useSignInModal } from "./sign-in-modal";
import UserDropdown from "./user-dropdown";

export default function NavBar({ session }) {
  const { SignInModal, setShowSignInModal } = useSignInModal();
  const scrolled = useScroll(50);

  return (
    <>
      <SignInModal />
      <div
        className={`fixed top-0 w-full ${scrolled
          ? "border-b border-gray-200 bg-white/50 backdrop-blur-xl"
          : "bg-white/0"
          } z-30 transition-all`}
      >
        <div className="mx-5 flex h-16 max-w-screen-xl items-center justify-between xl:mx-auto">
          <Link href="/" className="flex items-center font-display text-3xl" style={{fontFamily: 'Krona One'}}>
          <Image
              src="/LogoV1.svg" // Replace with your image path
              alt="Image Description"
              width={90} // Set the desired width
              height={100} // Set the desired height
            />
          </Link>
          <div>

            {session ? (
              <UserDropdown session={session} />
            ) : (
              <button
                className="rounded-full border border-black bg-black p-1.5 px-4 text-sm text-white transition-all hover:bg-white hover:text-black font-bold"
                onClick={() => setShowSignInModal(true)}
              >
                 Tirkelý
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
