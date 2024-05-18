import { Suspense } from "react";
import RepoPage from "./RepoPage";

const RepoDetails = ()=>{
  return (
    <Suspense>
    <RepoPage/>
    </Suspense>
  );
}
export default RepoDetails;