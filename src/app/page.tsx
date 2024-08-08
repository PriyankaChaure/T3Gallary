import Link from "next/link";
import { db } from "~/server/db";
const mockUrls = [
  "https://utfs.io/f/b614e88c-a08c-4a93-afab-b97d81e09b17-7h6zwl.jfif",
  "https://utfs.io/f/933b6787-e5c6-4f10-bad8-07b505d51632-kaqg93.jfif",
];

const mockImages = mockUrls.map((url, index) => ({
  id: index + 1,
  url,
}));

export default async function HomePage() {
  const posts = await db.query.posts.findMany();
  console.log(posts);
  return (
    <main className="">
    
      <div className="flex flex-wrap gap-5">
        {posts.map((posts)=>(
            <div key={posts.id}>
              {posts.name}
            </div>
          ))}
        {[...mockImages,...mockImages,...mockImages].map((image, index) => (
          <div key={image.id+"_" + index} className="w-48">
            <img src={image.url} alt={`Image ${image.id}`} />
          </div>
        ))}
      </div>
    </main>
  );
 }
