"use server";
import NewJobForm from "@/components/NewJobForm";
import db from "@/db";
const Page = async () => {
  const jobTypes = await db.job
    .findMany({
      where: { approved: true },
      select: { type: true },
      distinct: ["type"],
    })
    .then((types) => types.map(({ type }) => type).filter(Boolean));
  return <NewJobForm jobTypes = {jobTypes}/>;
};

export default Page;
