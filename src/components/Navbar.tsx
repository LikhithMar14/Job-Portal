import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

const NavBar = () => {
    return ( 
        <div className="shadow-sm border-b-[1px]">
            <div className="max-w-7xl m-auto py-5 px-3 flex items-center justify-between ">
                    <Link href={"/"} className="flex items-center gap-3">
                        <Image src={"/linkedin.svg"}  alt="Logo" width={40} height={40}/>
                        <span className="text-xl font-bold tracking-tight">LinkedIn</span>
                    </Link>
                    <Button asChild variant={"default"}>
                        <Link href={"/jobs/new"}>Post a job</Link>
                    </Button>
            </div>
        </div>
     );
}
 
export default NavBar;