import {Sidebar} from "@/components/JobFilterSidebar";
import JobSearchResults from "@/components/JobSearchResults";
import H1 from "@/components/ui/h1";
import { JobFilterValues } from "@/types";


//Breaking change in NextJs 15


type PageProps = {
  searchParams: Promise<{
    q? : string,
    type? :string,
    location?:string,
    remote?: string
  }>
}

async function getTitle(searchParams: {
  q?: string;
  type?: string;
  location?: string;
  remote?: string;
}) {
  const { q, type, location, remote } = searchParams;
  const titlePrefix = q
    ? `${q} Jobs`
    : type
    ? `${type} developer jobs`
    : remote
    ? "Remote developer Jobs"
    : "All developer jobs";

  const titleSuffix = location ? ` in ${location}` : "";
  return `${titlePrefix}${titleSuffix}`;
}

export default async function Home({searchParams}:PageProps) {

  const currSearchParams = await searchParams;
  const {q,type,location,remote} = currSearchParams;


  
  const filterValues:JobFilterValues = {
    q,
    type,
    location,
    remote: remote === "true"
  }

  const title = await getTitle(currSearchParams);
  return (
    <div className="max-w-7xl m-auto px-3 my-10 space-y-10">
      <div className="space-y-5 text-center">
        <H1>{title}</H1>
        <p className="text-muted-foreground">Find your dream job</p>
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <Sidebar defaultValues={filterValues}/>
        <JobSearchResults filterValues={filterValues}/>

      </div>
    </div>
  );
}
