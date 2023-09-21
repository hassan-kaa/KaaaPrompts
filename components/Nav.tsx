"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { Provider } from "next-auth/providers";
const Nav = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    const setMyProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    setMyProviders();
  }, []);
  return (
    <nav className="flex-between w-full mb-16 pt-3 ">
      <Link href="/" className="flex-1 flex items-center gap-4">
        <Image
          width={37}
          height={37}
          className="object-contain"
          alt="logo"
          src="/assets/images/logo.svg"
        ></Image>
        <p className="logo_text">KaaPrompts</p>
      </Link>

      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex-1 flex gap-5 md:gap-5">
            <button type="button" className="outline_btn">
              Create Post
            </button>
            <button
              type="button"
              onClick={() => {
                signOut();
              }}
              className="black_btn"
            >
              Sign out
            </button>
            <Link href="/profile">
              <Image
                src={session?.user?.image}
                width={37}
                height={37}
                className="rounded-full object-cover"
                alt="profile"
              ></Image>
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider: Provider) => (
                <div className="gap-3 flex">
                  <button
                    type="button"
                    key={provider.name}
                    onClick={() => signIn(provider.id)}
                    className="blue_btn"
                  >
                    Sign In
                  </button>
                </div>
              ))}
          </>
        )}
      </div>
      {/*Mobile Navigation */}
      <div className="sm:hidden flex relative ">
        {session?.user ? (
          <div className="flex">
            <Image
              width={30}
              height={30}
              className="object-cover rounded-full"
              onClick={() => {
                setToggleDropdown((prev) => !prev);
              }}
              alt="logo"
              src={session?.user?.image}
            ></Image>
            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => {
                    setToggleDropdown(false);
                  }}
                >
                  My Profile
                </Link>
                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => {
                    setToggleDropdown(false);
                  }}
                >
                  Create prompt
                </Link>
                <button
                  className="mt-5 w-full black_btn"
                  onClick={() => {
                    signOut();
                    setToggleDropdown(false);
                  }}
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider: Provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
