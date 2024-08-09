import "server-only";
import { db } from "./db";
import { auth } from "@clerk/nextjs/server";
import { error } from "console";
import { imagess } from "./db/schema";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";



export async function getMyImages()
{
    const user = auth();
    if(!user.userId) throw new Error("Unauthorized");

    const imagess = await db.query.imagess.findMany({
        where:(model,{eq})=>eq(model.userId, user.userId),
        orderBy : (model,{desc})=>desc(model.id),
      });
  return imagess;    
}

export async function getImage(id:number)
{
  const user = auth();
  if(!user.userId) throw new Error("Unauthorized");

    const imagess = await db.query.imagess.findFirst({
        where:(model,{eq})=>eq(model.id, id),
        orderBy : (model,{desc})=>desc(model.id),
      });
      if(!imagess) throw new Error("Image Not Found!!!");

     if(imagess.userId !== user.userId)throw new Error("Unauthorized");

  return imagess;    
}

export async function deleteImage(id:number){
  const  user = auth();
  if(!user.userId) throw new Error("Unauthorized");

  // const image = await db.query.imagess.findFirst({
  //   where:(model,{eq})=> eq(model.id,id),
  // });

  // if(!image) throw new Error("Image Not Found!!");
  // if(image.userId !== user.userId)throw new Error("User Not Authorized!!");
  
  await db.delete(imagess).where(and(eq(imagess.id, id), eq(imagess.userId, user.userId)));
  revalidatePath("/");
  redirect("/");
  //return image;
  
}

