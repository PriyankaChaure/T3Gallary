
import FullPageImageView from "~/app/components/full-image-page";


export default async function PhotoPage({
  params: { id: photoId },
}: {
  params: { id: string };
}) {
  const idAsNumber = Number(photoId);
  if(Number.isNaN(idAsNumber)) throw new Error("Invalid Photo Id");
 
  return<FullPageImageView id={idAsNumber}/>
}