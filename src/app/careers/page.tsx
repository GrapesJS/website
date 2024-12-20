import Container from "@/app/_components/Container";
import cx from "classnames";
import Footer from "../_components/Footer";
import Hero from "../_components/Hero";
import JobBoard from "./jobBoard";
import styles from "./styles.module.css";

export default function PageCareers() {
  return (
    <>
      {/* <Background /> */}
      <main className={styles.careers}>
        <Hero title="CAREERS" subTitle="Current Job Openings" />
        <Container className="pt-10 md:pt-20">
          <div>Check below our current open positions</div>
          <hr className={cx(styles.hr, "my-5")} />
          <JobBoard />
        </Container>
        <Footer />
      </main>
    </>
  );
}
