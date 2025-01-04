"use server"

import db from "@/db"
import { toSlug } from "@/lib/utils";
import { createJobSchema, jobFilterSchema } from "@/types";
import { redirect } from "next/navigation";
import {nanoid} from "nanoid";
import { put } from "@vercel/blob"
import path from "path";
const filterJobs = async(formdData:FormData) => {
    const values = Object.fromEntries(formdData.entries()); //javascript objects from form

    const {q,type,location,remote} = jobFilterSchema.parse(values);

    const searchParams = new URLSearchParams({
        ...(q && {q:q.trim()}),
        ...(type && {type}),
        ...(location && {location}),
        ...(remote && {remote:"true"}),
        

    });
    redirect(`/?${searchParams.toString()}`)


}
    
const createJobPosting = async(formData:FormData)=>{
    const values = Object.fromEntries(formData.entries());
    
    const {title,type,companyName,companyLogo,description,salary,applicationEmail,applicationUrl,locationType,location} = createJobSchema.parse(values)
    
  const slug = `${toSlug(title)}-${nanoid(10)}`;

  let companyLogourl : string | undefined = undefined;
  
  if(companyLogo) {
    const blob = await put(
        `company_logs/${slug}${path.extname(companyLogo.name)}`,
        companyLogo,
        {
            access: "public",
            addRandomSuffix: false,

        }
    );
    companyLogourl = blob.url;
  }

  await db.job.create({
    data:{
        slug,
        title:title.trim(),
        type,
        companyName:companyName.trim(),
        companyLogoUrl:companyLogourl,
        locationType,
        location,
        applicationEmail:applicationEmail?.trim(),
        applicationUrl:applicationUrl?.trim(),
        description:description?.trim(),
        salary:parseInt(salary),
        approved:true
        
    }
  })

  redirect("/job-submitted")



}

export  {filterJobs,createJobPosting}