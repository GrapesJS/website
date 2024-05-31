'use client'
import cx from "classnames";
import Spinner from "../_components/spinner";
import { useEffect, useState } from "react";

interface JobBoardProps extends React.HTMLProps<HTMLElement> {}

interface Job {
  id: number,
  absolute_url: string;
  title: string;
  location: { name: string };
}

const JobBoard: React.FC<JobBoardProps> = ({ className, ...rest }) => {
  const [jobs, setJobs] = useState<null | undefined | Job[]>();
  useEffect(() => {
    const fetchJobs = async() => {
      try {
        const jobsRsp = await fetch('https://boards-api.greenhouse.io/v1/boards/grapesstudio/jobs');
        const jobsRes = await jobsRsp.json();
        setJobs(Array.isArray(jobsRes.jobs) ? [...jobsRes.jobs, ...jobsRes.jobs, ...jobsRes.jobs] : null);
      } catch (error) {
        console.error(error);
        setJobs(null);
      }
    };
    fetchJobs()
  }, []);

  return (
    <section className={cx(className)} {...rest}>
      {
        jobs === undefined ?
          <Spinner/>
        :
        (
          jobs === null ?
          <div className="text-center">
            Ops, something wrong happened! Try to check directly the <a className="link-gjs" href="https://boards.greenhouse.io/grapesstudio" target="_blank">Job Board</a>.
          </div>
          :
          (
            !jobs?.length ?
              <div className="text-center">No open positions at the moment 😢 Please check back later.</div>
            :
              <div className="flex flex-col gap-5">
                {jobs.map(job => (
                  <a href={job.absolute_url} className="hover:border-[#c64563] transition-colors border rounded-md p-5">
                    <h3 className="link-gjs">{job.title}</h3>
                    <h4 className="opacity-60">{job.location?.name}</h4>
                  </a>
                ))}
              </div>
          )
        )
      }
    </section>
  );
};

export default JobBoard;
