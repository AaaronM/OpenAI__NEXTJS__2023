import { useUser } from "@auth0/nextjs-auth0/client";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Logo from "../logo/Logo";

export const AppLayout = ({ children, availableTokens, posts, postId }) => {
  const { user } = useUser();

  return (
    <div className="grid  grid-cols-[300px_1fr] h-screen max-h-screen ">
      <div className=" flex flex-col overflow-hidden text-white">
        <div className=" bg-slate-800 px-2 ">
          <Logo />
          <Link href="/post/new" className="btn">
            New Post
          </Link>
          <Link href="/token-topup" className=" block mt-2 text-center">
            <FontAwesomeIcon icon={faCoins} className=" text-yellow-500" />
            <span className="pl-1">{availableTokens} Tokens</span>
          </Link>
        </div>
        <div
          className={` px-4 flex-1 overflow-auto bg-gradient-to-b from-slate-800   to-cyan-800   `}
        >
          {posts.map((post) => (
            <Link
              key={post._id}
              href={`/post/${post._id}`}
              className={`py-1 border border-white/0 block text-ellipsis overflow-hidden whitespace-nowrap my-1 px-2 bg-white/10 cursor-pointer rounded-sm ${
                postId === post._id ? "bg-white/20 border-white" : ""
              }`}
            >
              {post.topic}
            </Link>
          ))}
        </div>
        <div className=" bg-cyan-800 flex items-center gap-2 border-t border-t-black/40 h-20 px-2 ">
          {!!user ? (
            <>
              <div className=" min-w-[50px]">
                <Image
                  src={user.picture}
                  alt={user.name}
                  height={50}
                  width={50}
                  className=" rounded-full"
                />
              </div>
              <div className=" flex-1">
                <div className=" font-bold">{user.email}</div>
                <Link href="/api/auth/logout" className=" text-small">
                  Logout
                </Link>
              </div>
            </>
          ) : (
            <Link href="/api/auth/login">Login</Link>
          )}
        </div>
      </div>
      {children}
    </div>
  );
};