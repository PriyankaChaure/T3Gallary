import Link from "next/link";
import { db } from "~/server/db";

export const dynamic = "force-dynamic"; 


export default async function HomePage() {
  const imagess = await db.query.imagess.findMany({
    orderBy : (model,{desc})=>desc(model.id),
  });
  console.log(imagess);
  return (
    <main className="">
    
      <div className="flex flex-wrap gap-5">
        
        {[...imagess,...imagess,...imagess].map((image, index) => (
          <div key={image.id+"_" + index} className="flex w-48 flex-col">
            <img src={image.url} alt={`Image ${image.id}`} />
            <div>{image.name}</div>
          </div>
        ))}
      </div>
    </main>
  );
 }
