import { SignedIn, SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { db } from "~/server/db";
import { getMyImages } from "~/server/queries";

export const dynamic = "force-dynamic"; 

async function Images()
{
 const imagess = await getMyImages();
  return (
    <div className="flex flex-wrap justify-center gap-5 p-4">
        
  {imagess.map((image, index) => (
    <div key={image.id+"_" + index} className="flex w-48 flex-col">
      <Link href={`/photos/${image.id}`}>
      <Image src={image.url}
           style={{objectFit: "contain"}}
           width={480}  
           height={320}
         alt={image.name}
          />
       </Link>
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
