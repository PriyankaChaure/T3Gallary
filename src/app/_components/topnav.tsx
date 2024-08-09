"use client";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import {SimpleUploadButton} from './simple-upload-button';
import { useRouter } from "next/navigation";


export default function TopNav()
{
  const router = useRouter();
  return(
    <nav className="flex items-center justify-between w-full p-4 text-xl font-semibold ">
      <div>Gallary</div>
      <div className="flex flex-row items-center gap-4">
        <SignedOut>
            <SignInButton/>
        </SignedOut>
        <SignedIn>
            <SimpleUploadButton/>
            <UserButton/>
        </SignedIn>
      </div>
    </nav>
  );
}