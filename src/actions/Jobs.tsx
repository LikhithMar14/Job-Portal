"use server"

import { jobFilterSchema } from "@/types";

const filterJobs = async(formdData:FormData) => {
    const values = Object.fromEntries(formdData.entries()); //javascript objects from form

    const parseResult = jobFilterSchema.parse(values);
}       

export default filterJobs