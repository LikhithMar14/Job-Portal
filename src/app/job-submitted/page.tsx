import H1 from "@/components/ui/h1";

const Page = () => {
    return ( 
        <div className="bg-sky-400 flex justify-center items-center min-h-screen  ">
            <div className="flex justify-center items-center flex-col gap-y-5">
                <H1 className="text-black">Job Submitted and pending is Approval</H1>
                <p className="text-slate-600 text-wrap">Your Job posting has been submitted successfully and is pending for approval</p>

            </div>
        </div>
    );
}
 
export default Page;