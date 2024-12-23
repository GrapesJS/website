"use client";
import cn from "classnames";
import { useEffect, useState } from "react";
import Spinner from "../_components/spinner";
import styles from "./styles.module.css";
interface JobBoardProps extends React.HTMLProps<HTMLElement> {}

// https://developers.greenhouse.io/job-board.html#list-jobs
interface Job {
  id: number;
  absolute_url: string;
  title: string;
  location: { name: string };
}

const JobBoard: React.FC<JobBoardProps> = ({ className, ...rest }) => {
  const [jobs, setJobs] = useState<null | undefined | Job[]>();
  useEffect(() => {
    const fetchJobs = async () => {
      setJobs([
        {
          id: 1,
          absolute_url: "https://www.google.com",
          title: "New Job",
          location: { name: "Honolulu" },
        },
        {
          id: 2,
          absolute_url: "https://www.google.com",
          title: "New Job",
          location: { name: "New Zealand" },
        },
      ]);
      return;
      // try {
      //   const jobsRsp = await fetch(
      //     "https://boards-api.greenhouse.io/v1/boards/grapesstudio/jobs"
      //   );
      //   const jobsRes = await jobsRsp.json();
      //   setJobs(Array.isArray(jobsRes.jobs) ? jobsRes.jobs : null);
      // } catch (error) {
      //   console.error(error);
      //   setJobs(null);
      // }
    };
    fetchJobs();
  }, []);

  return (
    <section className={cn(className)} {...rest}>
      {jobs === undefined ? (
        <Spinner />
      ) : jobs === null ? (
        <div className="text-center">
          Ops, something wrong happened! Try to check directly the{" "}
          <a
            className={styles.link}
            href="https://boards.greenhouse.io/grapesstudio"
            target="_blank"
          >
            Job Board
          </a>
          .
        </div>
      ) : !jobs?.length ? (
        <div className="text-center">
          No open positions at the moment 😢 Please check back later.
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          {jobs.map((job) => (
            <a
              key={job.id}
              target="_blank"
              href={job.absolute_url}
              className={cn(
                styles.jobCard,
                "transition-colors border rounded-md p-5"
              )}
            >
              <h3 className={styles.h3}>{job.title}</h3>
              <h4 className={cn(styles.h4, "opacity-60")}>
                {job.location?.name}
              </h4>
            </a>
          ))}
        </div>
      )}
    </section>
  );
};

export default JobBoard;
