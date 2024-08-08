import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export default function TopNav()
{
  return(
    <nav className="flex items-center justify-between w-full p-4 text-xl font-semibold ">
      <div>Gallary</div>
      <div>
        <SignedOut>
            <SignInButton/>
        </SignedOut>
        <SignedIn>
            <UserButton/>
        </SignedIn>
      </div>
    </nav>
  );
}