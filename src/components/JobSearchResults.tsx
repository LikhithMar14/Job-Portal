import db from "@/db";
import JobListCard from "./JobListCard";
import { JobFilterValues } from "@/types";
import { Prisma } from "@prisma/client";

interface JobResultsProps {
  filterValues: JobFilterValues;
}

const JobSearchResults = async ({filterValues:{
    q,type,location,remote
}}:JobResultsProps) => {

  const searchString = q?.split(" ").filter(word => word.length > 0).join(" & ");
  const searchFilter:Prisma.JobWhereInput= searchString ? {
    OR:[
         {title:{search: searchString}},
         {companyName:{search: searchString}},
         {type:{search: searchString}},
         {locationType:{search: searchString}},
         {location:{search: searchString}},
    ]
  }:{};

  const where:Prisma.JobWhereInput = {
    AND:[
        searchFilter,
        type?{type}:{},
        location?{location}:{},
        remote?{locationType:"Remote"}:{},
        {approved:true}
    ]
  }
  const jobs = await db.job.findMany({
    where,   
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-4 flex-grow">
      {jobs.map((job) => (
        <JobListCard job={job} key={job.id} />
      ))}
      {jobs.length === 0 && (
        <p className="m-auto text-center">
            No Jobs found.Try adjusting your search filters
        </p>
      )}
    </div>
  );
};

export default JobSearchResults;
