import {filterJobs} from "@/actions/Jobs";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import Select from "./ui/select";
import db from "@/db";
import { JobFilterValues } from "@/types";
import FormSubmitButton from "./FormSubmitButton";

interface JobFilterSidebarProps {
  defaultValues: JobFilterValues;
}

const LocationType = ["Remote", "On-site", "Hybrid"];
const jobTypes = [
  "Full-time",
  "Part-time",
  "Contract",
  "Temporary",
  "Internship",
  "Volunteer",
];

export default async function Sidebar({
  defaultValues,
}: JobFilterSidebarProps) {
  const distinctLocations = (await db.job
    .findMany({
      where: { approved: true },
      select: { location: true },
      distinct: ["location"],
    })
    .then((locations) =>
      locations.map(({ location }) => location).filter(Boolean)
    )) as string[];
  return (
    <>
      <div className="md:w-[260px] p-4 sticky top-0 h-fit bg-background border rounded-lg">
        <form action={filterJobs} key={JSON.stringify(defaultValues)}>
          {/* Important to have a div inside a form to mainttain spacing */}
          <div className="space-y-4 p-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="q">Search</Label>
              <Input
                id="q"
                name="q"
                placeholder="Title, Company,etc"
                defaultValue={defaultValues.q}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="type">Type</Label>
              <Select
                id="type"
                name="type"
                className=""
                defaultValue={defaultValues.type}
              >
                <option value="">All types</option>
                {jobTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </Select>

              <Label htmlFor="location">Location</Label>
              <Select
                id="location"
                name="location"
                className=""
                defaultValue={defaultValues.location}
              >
                <option value="">All Locations</option>
                {distinctLocations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <input
                id="remote"
                name="remote"
                type="checkbox"
                className="scale-125 accent-black"
                defaultChecked={defaultValues.remote}
              />
              <Label htmlFor="remote">Remote Jobs</Label>
            </div>
            <FormSubmitButton className="w-full">Filter Jobs</FormSubmitButton>
          </div>
        </form>
      </div>
    </>
  );
}

export { Sidebar, jobTypes, LocationType };
