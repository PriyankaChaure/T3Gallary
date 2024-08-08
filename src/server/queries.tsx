import "server-only";
import { db } from "./db";
import { auth } from "@clerk/nextjs/server";
import { error } from "console";


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

