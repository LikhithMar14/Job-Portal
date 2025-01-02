"use client"

import H1 from "@/components/ui/h1";


const ErrorPage = () => {
    return ( 
        <div className="m-auto my-10 max-w-5xl space-y-5 px-3 text-center">
            <H1>Erro</H1>
            <p>An unexpected error occured</p>
        </div>
     );
}
 
export default ErrorPage;