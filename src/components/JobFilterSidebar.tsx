import filterJobs from "@/actions/Jobs";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import Select from "./ui/select";
import db from "@/db";
import { Button } from "./ui/button";

const Sidebar = async () => {
  const distinctLocations = (await db.job
    .findMany({
      where: { approved: true },
      select: { location: true },
      distinct: ["location"],
    })
    .then((locations) =>
      locations.map(({ location }) => location).filter(Boolean)
    )) as string[];

  const jobTypes = (await db.job
    .findMany({
      select: { type: true },
      distinct: ["type"],
    })
    .then((type) => type.map(({ type }) => type).filter(Boolean))) as string[];
  return (
    <>
      <div className="md:w-[260px] p-4 sticky top-0 h-fit bg-background border rounded-lg">
        <form action={filterJobs}>
          {/* Important to have a div inside a form to mainttain spacing */}
          <div className="space-y-4 p-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="q">Search</Label>
              <Input id="q" name="q" placeholder="Title, Company,etc" />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="type">Type</Label>
              <Select id="type" name="type" className="" defaultValue="">
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
                defaultValue=""
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
                <input id="remote" name="remote" type="checkbox" className="scale-125 accent-black"/>
                <Label htmlFor="remote">Remote Jobs</Label>

            </div>
            <Button type="submit" className="w-full">Filter Jobs</Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Sidebar;
