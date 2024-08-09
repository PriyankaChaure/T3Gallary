import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "~/server/db";
import { imagess } from "~/server/db/schema";
import { ratelimit } from "~/server/ratelimit";

 
const f = createUploadthing();

export const ourFileRouter = {
 
  imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount:40} })

    .middleware(async ({ req }) => {
    
      const user = auth();
 
     
      if (!user.userId) throw new UploadThingError("Unauthorized");
      const {success} = await ratelimit.limit(user.userId);
      if (!success) throw new UploadThingError("RateLimited");
   
      return { userId: user.userId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
 
      console.log("Upload complete for userId:", metadata.userId);
       
      await db.insert(imagess).values({
            name: file.name,
            url: file.url,
            userId:metadata.userId,
        })
     // console.log("file url", file.url);
 
   
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;