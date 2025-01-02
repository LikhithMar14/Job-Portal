"use server"

import { jobFilterSchema } from "@/types";
import { redirect } from "next/navigation";

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

    redirect
}       

export default filterJobs