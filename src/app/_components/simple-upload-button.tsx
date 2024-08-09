"use client";
import React, { useEffect } from "react";
import { useUploadThing } from "../utils/uploadthing";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { usePostHog } from "posthog-js/react";


type Input = Parameters<typeof useUploadThing>;
const useUploadThingInputProps = (...args:Input)=>{
    const $ut = useUploadThing(...args);
    const onChange = async (e:React.ChangeEvent<HTMLInputElement>)=>{
      if(!e.target.files) return;
      const selectedFiles = Array.from(e.target.files);
      const result = await $ut.startUpload(selectedFiles);
      console.log("Uploaded Files",result);
    };
    return{
        inputProps:{
            onChange,
            multiple:($ut.permittedFileInfo?.config?.image?.maxFileCount ?? 1)>1,
            accept:"image/*",   
        },
        isUploading:$ut.isUploading,
    };
};

function UploadSVG()
{
    return(
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
      </svg>
    );
}

function LoadingSpinnerSVG()
{
    return(
<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" opacity=".25"/><path d="M10.72,19.9a8,8,0,0,1-6.5-9.79A7.77,7.77,0,0,1,10.4,4.16a8,8,0,0,1,9.49,6.52A1.54,1.54,0,0,0,21.38,12h.13a1.37,1.37,0,0,0,1.38-1.54,11,11,0,1,0-12.7,12.39A1.54,1.54,0,0,0,12,21.34h0A1.47,1.47,0,0,0,10.72,19.9Z" className="spinner_5nOS"/></svg>

);
}

//window.makeToast = makeUploadToast;

export function SimpleUploadButton(){
    
    const router = useRouter();
    const posthog = usePostHog();
   const {inputProps} = useUploadThingInputProps("imageUploader",{
    onUploadBegin(){
        posthog.capture("upload-begin");
        toast(
        <div><LoadingSpinnerSVG/>Uploading...</div>,
        {
            duration : 100000,
            id : "upload-begin",
        });
    },
    onUploadError(error:any){
        posthog.capture("upload_error",{error});
        toast.dismiss("upload-begin");
        toast.error("Upload Failed !");
    },
    
    onClientUploadComplete() {
        toast.dismiss("upload-begin");
        toast("upload complete!!!");
        router.refresh();
    },
   });
    return(
    <div>
        <label htmlFor="upload-button" className="cursor-pointer"><UploadSVG/></label>
        <input id="upload-button" type="file" className="sr-only" {...inputProps}/>
       
    </div>
    );
}