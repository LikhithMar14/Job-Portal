import Sidebar from "@/components/JobFilterSidebar";
import JobListCard from "@/components/JobListCard";
import db from "@/db";

export default async function Home() {
  const jobs = await db.job.findMany({
    where: { approved: true },
    orderBy: { createdAt: "desc" },
  });
  return (
    <div className="max-w-7xl m-auto px-3 my-10 space-y-10">
      <div className="space-y-5 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">Developer Jobs</h1>
        <p className="text-muted-foreground">Find your dream job</p>
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <Sidebar/>
        <div className="space-y-4 flex-grow">
          {jobs.map((job) => (
            <JobListCard job={job} key={job.id} />
          ))}
        </div>
      </div>
    </div>
  );
}
