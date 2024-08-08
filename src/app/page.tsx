import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import { db } from "~/server/db";
import { getMyImages } from "~/server/queries";

export const dynamic = "force-dynamic"; 

async function Images()
{
 const imagess = await getMyImages();
  return (
    <div className="flex flex-wrap gap-5">
        
  {imagess.map((image, index) => (
    <div key={image.id+"_" + index} className="flex w-48 flex-col">
      <img src={image.url} alt={`Image ${image.id}`} />
      <div>{image.name}</div>
    </div>
  ))}
</div>
  );
}

export default async function HomePage() {
  return (
    <main className="">
    <SignedOut>
      <div className="w-full h-full text-2xl text-center">
        Please Sign In Above!!!
      </div>
    </SignedOut>
    <SignedIn>
      <Images/>
    </SignedIn>
    </main>
  );
 }
