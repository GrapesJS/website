"use client";

import { useEffect, useRef, useState } from "react";
import HeaderStandalone from "../ai/header";
import FooterStandalone from "../ai/footer";

import "../ai/ai-globals.css";
import styles from "./pricing.module.css";

const PricingPageClient = () => {
  const [isVisible, setIsVisible] = useState({
    starter: false,
    pro: false,
    enterprise: false,
  });

  const [comparisonRowsVisible, setComparisonRowsVisible] = useState<boolean[]>(
    []
  );
  const [howItWorksVisible, setIsHowItWorksVisible] = useState({
    copy: false,
    generate: false,
    customize: false,
  });
  const [aiImageVisible, setIsAiImageVisible] = useState(false);

  const starterRef = useRef<HTMLDivElement>(null);
  const proRef = useRef<HTMLDivElement>(null);
  const enterpriseRef = useRef<HTMLDivElement>(null);
  const comparisonRef = useRef<HTMLDivElement>(null);
  const howItWorksRef = useRef<HTMLDivElement>(null);
  const aiImageRef = useRef<HTMLDivElement>(null);

  const handleGetStarted = () => {
    window.location.href = "https://app.grapesjs.com/dashboard/";
  };

  const handleContactSales = () => {
    window.location.href = "mailto:sales@grapesjs.com";
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === starterRef.current) {
              setTimeout(() => {
                setIsVisible((prev) => ({ ...prev, starter: true }));
              }, 100);
            } else if (entry.target === proRef.current) {
              setTimeout(() => {
                setIsVisible((prev) => ({ ...prev, pro: true }));
              }, 300);
            } else if (entry.target === enterpriseRef.current) {
              setTimeout(() => {
                setIsVisible((prev) => ({ ...prev, enterprise: true }));
              }, 500);
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    if (starterRef.current) observer.observe(starterRef.current);
    if (proRef.current) observer.observe(proRef.current);
    if (enterpriseRef.current) observer.observe(enterpriseRef.current);

    return () => observer.disconnect();
  }, []);

  // Comparison table rows animation
  useEffect(() => {
    if (!comparisonRef.current) return;

    const rows = comparisonRef.current.querySelectorAll(
      `.${styles.featureRow}`
    );
    const initialVisibility = new Array(rows.length).fill(false);
    setComparisonRowsVisible(initialVisibility);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const rowIndex = Array.from(rows).indexOf(entry.target as Element);
            if (rowIndex !== -1) {
              setTimeout(() => {
                setComparisonRowsVisible((prev) => {
                  const newVisibility = [...prev];
                  newVisibility[rowIndex] = true;
                  return newVisibility;
                });
              }, rowIndex * 25); // Staggered delay
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    rows.forEach((row) => observer.observe(row));

    return () => observer.disconnect();
  }, []);

  // How it Works section animation
  useEffect(() => {
    if (!howItWorksRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === howItWorksRef.current) {
              setTimeout(() => {
                setIsHowItWorksVisible((prev) => ({ ...prev, copy: true }));
              }, 100);
              setTimeout(() => {
                setIsHowItWorksVisible((prev) => ({ ...prev, generate: true }));
              }, 300);
              setTimeout(() => {
                setIsHowItWorksVisible((prev) => ({
                  ...prev,
                  customize: true,
                }));
              }, 500);
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    if (howItWorksRef.current) observer.observe(howItWorksRef.current);

    return () => observer.disconnect();
  }, []);

  // AI Image animation
  useEffect(() => {
    if (!aiImageRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setIsAiImageVisible(true);
            }, 200);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (aiImageRef.current) observer.observe(aiImageRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div className={`${styles.outerContainer} min-h-screen flex flex-col`}>
      <HeaderStandalone />

      <main className="relative">
        {/* How it Works Section */}
        {/* <section className={styles.howItWorksSection} ref={howItWorksRef}>
          <h2 className={styles.poweringHeading} style={{ color: "#ffffff" }}>
            <span>HOW IT WORKS.</span>
          </h2>
          <p>
            From any website to your{" "}
            <span style={{ color: "#BCACFD" }}>custom site</span> in minutes.
          </p>
          <div className={styles.howItWorksContainer}>
            <div className={styles.stepsGrid}>
              <div
                className={`${styles.stepCopy} ${
                  howItWorksVisible.copy ? styles.animateIn : styles.animateOut
                }`}
              >
                <div
                  className={`group-hover:bg-gray-700 ${styles.affordableIcon}`}
                >
                  <img
                    src="https://cdn.grapesjs.com/workspaces/cmddyhbh105af12ivgiyr7vui/assets/7c4d9cba-fcdd-4526-8454-fcb2d0ef61ef__copy.png"
                    alt="Copy icon"
                  />
                </div>
                <h3 className={styles.stepCopyTitle}>Copy</h3>
                <p className={styles.stepCopyDescription}>
                  Paste any website URL and our AI will analyze and recreate the
                  design.
                </p>
              </div>
              <div
                className={`${styles.stepGenerate} ${
                  howItWorksVisible.generate
                    ? styles.animateIn
                    : styles.animateOut
                }`}
              >
                <div
                  className={`group-hover:bg-gray-700 ${styles.affordableIcon}`}
                >
                  <img
                    src="https://cdn.grapesjs.com/workspaces/cmddyhbh105af12ivgiyr7vui/assets/8d6936e2-e544-4020-8ccf-2f264eb8aec9__generate.png"
                    alt="Generate icon"
                  />
                </div>
                <h3 className={styles.stepGenerateTitle}>Generate</h3>
                <p className={styles.stepGenerateDescription}>
                  AI instantly builds your website with all the components and
                  styling.
                </p>
              </div>
              <div
                className={`${styles.stepCustomize} ${
                  howItWorksVisible.customize
                    ? styles.animateIn
                    : styles.animateOut
                }`}
              >
                <div
                  className={`group-hover:bg-gray-700 ${styles.affordableIcon}`}
                >
                  <img
                    src="https://cdn.grapesjs.com/workspaces/cmddyhbh105af12ivgiyr7vui/assets/d0ac7559-d64b-4c33-918e-0bf858142070__customize.png"
                    alt="Customize icon"
                  />
                </div>
                <h3 className={styles.stepCustomizeTitle}>Customize</h3>
                <p className={styles.stepCustomizeDescription}>
                  Use our drag-and-drop editor to make it uniquely yours.
                </p>
              </div>
            </div>
            <div className={styles.ctaContainer}>
              <button
                type="button"
                className={`gjs-t-button ${styles.tryNowButton}`}
                onClick={handleGetStarted}
              >
                Try it now
              </button>
            </div>
          </div>
        </section> */}

        {/* Powering Solutions Section */}
        {/* <section className={styles.poweringSolutionsSection}>
          <div className={styles.poweringContainer}>
            <h2 className={styles.poweringHeading} style={{ color: "#ffffff" }}>
              <b>
                <span>POWERING SOLUTIONS FOR</span>
              </b>
            </h2>
            <div className={styles.logosGrid}>
              <div className={styles.companyLogo1}>
                <img
                  src="https://cdn.grapesjs.com/workspaces/cmddyhbh105af12ivgiyr7vui/assets/d08cd5e7-bf06-481a-9146-4803dae1c5bb__microsoft.png"
                  alt="Tech company logo"
                  loading="lazy"
                />
              </div>
              <div className={styles.companyLogo2}>
                <img
                  src="https://cdn.grapesjs.com/workspaces/cmddyhbh105af12ivgiyr7vui/assets/631520df-44d8-4a87-a93b-24c17cd9b8b3__microsoft-1.png"
                  alt="Startup company logo"
                  loading="lazy"
                />
              </div>
              <div className={styles.companyLogo3}>
                <img
                  src="https://cdn.grapesjs.com/workspaces/cmddyhbh105af12ivgiyr7vui/assets/dbf13bc3-d1e7-4795-845f-eb8b9508be3b__microsoft-2.png"
                  alt="Software company logo"
                  loading="lazy"
                />
              </div>
              <div className={styles.companyLogo4}>
                <img
                  src="https://cdn.grapesjs.com/workspaces/cmddyhbh105af12ivgiyr7vui/assets/7ac03084-ddc7-4108-b286-c066ee86e47c__microsoft-3.png"
                  alt="Digital agency logo"
                  loading="lazy"
                />
              </div>
              <div className={styles.companyLogo5}>
                <img
                  src="https://cdn.grapesjs.com/workspaces/cmddyhbh105af12ivgiyr7vui/assets/3e4f0e81-9986-4368-8b67-41b110b64271__microsoft-4.png"
                  alt="Innovation company logo"
                  loading="lazy"
                />
              </div>
              <div className={styles.companyLogo6}>
                <img
                  src="https://cdn.grapesjs.com/workspaces/cmddyhbh105af12ivgiyr7vui/assets/6edae4c6-9ed2-4838-9721-6d85ef2d76ae__microsoft-6.png"
                  alt="Enterprise company logo"
                  loading="lazy"
                />
              </div>
              <div className={styles.companyLogo7}>
                <img
                  src="https://cdn.grapesjs.com/workspaces/cmddyhbh105af12ivgiyr7vui/assets/35391a0f-a830-4083-8f75-a902693757b1__microsoft-5.png"
                  alt="Platform company logo"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section> */}

        {/* AI Powered Section */}
        {/* <section className={styles.aiPoweredSection}>
          <div className={styles.aiPoweredContainer}>
            <div className={styles.aiContentWrapper}>
              <h2 className={styles.aiHeading} style={{ color: "#ffffff" }}>
                AI POWERED WEBSITES,{" "}
                <span style={{ color: "#BCACFD" }}>BUILT YOUR WAY</span>
              </h2>
              <p className={styles.aiDescription}>
                Tell us what your site is about—or paste a link to one you
                love—and we&apos;ll generate a <b>fully responsive</b> site for
                you. Use our <b>drag-and-drop</b> editor to tweak and
                personalize everything, <b>no coding required</b>.
              </p>
            </div>
            <div
              className={`${styles.aiImageContainer} ${
                aiImageVisible ? styles.animateIn : styles.animateOut
              }`}
              ref={aiImageRef}
            >
              <img
                src="https://cdn.grapesjs.com/workspaces/cmddyhbh105af12ivgiyr7vui/assets/3bef7610-9c82-4d23-9db9-3583477a55a3__desktopretrofit.png"
                alt="AI powered website builder interface showing design generation"
                loading="lazy"
              />
            </div>
          </div>
        </section> */}

        {/* Pricing Section */}
        <section className={styles.pricingSection} id="pricing-section">
          <div className={styles.pricingContainer}>
            <h2 className={styles.pricingHeading} style={{ color: "#ffffff" }}>
              Pricing
            </h2>
            <p className={styles.pricingSubtitle}>
             Start free and upgrade as you grow.
            </p>

            <div className={styles.pricingGrid}>
              {/* Free Plan */}
              <div
                ref={starterRef}
                className={`flex flex-col justify-between ${styles.freePlan} ${
                  styles.animateOut
                } ${isVisible.starter ? styles.animateIn : ""}`}
              >
                <h3 className={styles.freePlanTitle}>Starter</h3>
                <p className={styles.planTagline}>Best for portfolios</p>
                <div
                  className={styles.freePlanPrice}
                  style={{ color: "#ffffff" }}
                >
                  Free
                </div>
                <p className={styles.planDescription}>Free for everyone</p>
                <ul className={styles.freePlanFeatures}>
                  <li className={styles.freeFeature1}>
                    <img
                      src="https://api.iconify.design/mdi:check-circle.svg?color=%23BCACFD&width=20&height=20"
                      alt="Checkmark"
                      className={styles.featureCheck}
                    />
                    100 AI credits per month
                  </li>
                  <li className={styles.freeFeature1}>
                    <img
                      src="https://api.iconify.design/mdi:check-circle.svg?color=%23BCACFD&width=20&height=20"
                      alt="Checkmark"
                      className={styles.featureCheck}
                    />
                    0.1 GB cloud space
                  </li>
                  <li className={styles.proFeature2}>
                    <img
                      src="https://api.iconify.design/mdi:check-circle.svg?color=%23BCACFD&width=20&height=20"
                      alt="Checkmark"
                      className={styles.featureCheck}
                    />
                    Unlimited projects
                  </li>
                  <li className={styles.freeFeature4}>
                    <img
                      src="https://api.iconify.design/mdi:check-circle.svg?color=%23BCACFD&width=20&height=20"
                      alt="Checkmark"
                      className={styles.featureCheck}
                    />
                    Export to HTML/CSS
                  </li>
                  <li className={styles.freeFeature3}>
                    <img
                      src="https://api.iconify.design/mdi:check-circle.svg?color=%23BCACFD&width=20&height=20"
                      alt="Checkmark"
                      className={styles.featureCheck}
                    />
                    Community support
                  </li>
                </ul>
                <button
                  className={`${styles.planCta} ${styles.freeCta}`}
                  onClick={handleGetStarted}
                >
                  Get Started
                </button>
              </div>

              {/* Pro Plan */}
              <div
                ref={proRef}
                className={`flex flex-col justify-between ${styles.proPlan} ${
                  styles.animateOut
                } ${isVisible.pro ? styles.animateIn : ""}`}
              >
                <div className={styles.popularBadge}>Most Popular</div>
                <h3 className={styles.proPlanTitle}>Pro</h3>
                <p className={styles.planTagline}>Designed for professionals</p>
                <div
                  className={styles.proPlanPrice}
                  style={{ color: "#ffffff" }}
                >
                  $10<span className={styles.proPlanPeriod}>/month</span>
                </div>
                <p className={styles.planDescription}>
                  Everything in Free, plus:
                </p>
                <ul className={styles.proPlanFeatures}>
                  <li className={styles.proFeature1}>
                    <img
                      src="https://api.iconify.design/mdi:check-circle.svg?color=%23BCACFD&width=20&height=20"
                      alt="Checkmark"
                      className={styles.featureCheck}
                    />
                    500 AI credits per month
                  </li>
                  <li className={styles.freeFeature1}>
                    <img
                      src="https://api.iconify.design/mdi:check-circle.svg?color=%23BCACFD&width=20&height=20"
                      alt="Checkmark"
                      className={styles.featureCheck}
                    />
                    10 GB cloud space
                  </li>
                  <li className={styles.proFeature4}>
                    <img
                      src="https://api.iconify.design/mdi:check-circle.svg?color=%23BCACFD&width=20&height=20"
                      alt="Checkmark"
                      className={styles.featureCheck}
                    />
                    Custom domains
                  </li>
                  <li className={styles.proFeature5}>
                    <img
                      src="https://api.iconify.design/mdi:check-circle.svg?color=%23BCACFD&width=20&height=20"
                      alt="Checkmark"
                      className={styles.featureCheck}
                    />
                    Remove branding
                  </li>
                  <li className={styles.proFeature3}>
                    <img
                      src="https://api.iconify.design/mdi:check-circle.svg?color=%23BCACFD&width=20&height=20"
                      alt="Checkmark"
                      className={styles.featureCheck}
                    />
                    Priority support
                  </li>
                </ul>
                <button
                  className={`${styles.planCta} ${styles.proCta}`}
                  onClick={handleGetStarted}
                >
                  Purchase Pro
                </button>
              </div>

              {/* Enterprise Plan */}
              <div
                ref={enterpriseRef}
                className={`flex flex-col justify-between ${
                  styles.enterprisePlan
                } ${styles.animateOut} ${
                  isVisible.enterprise ? styles.animateIn : ""
                }`}
              >
                <h3 className={styles.enterprisePlanTitle}>Enterprise</h3>
                <p className={styles.planTagline}>
                  For organizations that need flexibility & scalability
                </p>
                <div
                  className={styles.enterprisePlanPrice}
                  style={{ color: "#ffffff" }}
                >
                  Contact Us for Pricing
                </div>
                <p className={styles.planDescription}>
                  Everything in Pro, plus:
                </p>
                <ul className={styles.enterprisePlanFeatures}>
                  <li className={styles.enterpriseFeature1}>
                    <img
                      src="https://api.iconify.design/mdi:check-circle.svg?color=%23BCACFD&width=20&height=20"
                      alt="Checkmark"
                      className={styles.featureCheck}
                    />
                    Embedded editor SDK
                  </li>
                  <li className={styles.enterpriseFeature3}>
                    <img
                      src="https://api.iconify.design/mdi:check-circle.svg?color=%23BCACFD&width=20&height=20"
                      alt="Checkmark"
                      className={styles.featureCheck}
                    />
                    Dedicated support
                  </li>
                  <li className={styles.enterpriseFeature4}>
                    <img
                      src="https://api.iconify.design/mdi:check-circle.svg?color=%23BCACFD&width=20&height=20"
                      alt="Checkmark"
                      className={styles.featureCheck}
                    />
                    White-label solution
                  </li>
                  <li className={styles.enterpriseFeature5}>
                    <img
                      src="https://api.iconify.design/mdi:check-circle.svg?color=%23BCACFD&width=20&height=20"
                      alt="Checkmark"
                      className={styles.featureCheck}
                    />
                    SLA guarantee
                  </li>
                </ul>
                <button
                  className={`${styles.planCta} ${styles.enterpriseCta}`}
                  onClick={handleContactSales}
                >
                  Contact Sales
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Comparison Section */}
        <section className={styles.comparisonSection} id="comparison-section">
          <div className={styles.comparisonContainer} ref={comparisonRef}>
            <h2
              className={styles.comparisonHeading}
              style={{ color: "#BCACFD" }}
            >
              Competitor Comparison
            </h2>
            <p className={styles.comparisonDescription}>
              See how Grapes Studio stacks up against other site builders.
            </p>
            <div className={styles.comparisonTableContainer}>
              <table className={styles.comparisonTable}>
                <thead>
                  <tr className={styles.headerRow}>
                    <th className={styles.featureColumnHeader}>Features</th>
                    <th className={styles.grapesColumnHeader}>Grapes Studio</th>
                    <th className={styles.squarespaceColumnHeader}>
                      Squarespace
                    </th>
                    <th className={styles.vercelColumnHeader}>Vercel</th>
                    <th className={styles.wordpressColumnHeader}>Wordpress</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    className={`${styles.featureRow} ${
                      comparisonRowsVisible[0]
                        ? styles.animateIn
                        : styles.animateOut
                    }`}
                  >
                    <td className={styles.featureLabel}>
                      AI Website Generation
                    </td>
                    <td className={styles.grapesCheck}>
                      <img
                        src="https://api.iconify.design/mdi:check-circle.svg?color=%23BCACFD&width=20&height=20"
                        alt="Checkmark"
                      />
                    </td>
                    <td className={styles.squarespaceAiCheck}>✗</td>
                    <td className={styles.vercelAiCheck}>
                      <img
                        src="https://api.iconify.design/mdi:check-circle.svg?color=%23BCACFD&width=20&height=20"
                        alt="Checkmark"
                      />
                    </td>
                    <td className={styles.wordpressAiCheck}>✗</td>
                  </tr>
                  <tr
                    className={`${styles.featureRow} ${
                      comparisonRowsVisible[1]
                        ? styles.animateIn
                        : styles.animateOut
                    }`}
                  >
                    <td className={styles.featureLabel}>
                      AI Website Duplication
                    </td>
                    <td className={styles.grapesCheck}>
                      <img
                        src="https://api.iconify.design/mdi:check-circle.svg?color=%23BCACFD&width=20&height=20"
                        alt="Checkmark"
                      />
                    </td>
                    <td className={styles.squarespaceCheck}>✗</td>
                    <td className={styles.vercelCheck}>✗</td>
                    <td className={styles.wordpressCheck}>✗</td>
                  </tr>
                  <tr
                    className={`${styles.featureRow} ${
                      comparisonRowsVisible[2]
                        ? styles.animateIn
                        : styles.animateOut
                    }`}
                  >
                    <td className={styles.featureLabel}>
                      Drag-and-drop editor
                    </td>
                    <td className={styles.grapesCheck}>
                      <img
                        src="https://api.iconify.design/mdi:check-circle.svg?color=%23BCACFD&width=20&height=20"
                        alt="Checkmark"
                      />
                    </td>
                    <td className={styles.squarespaceCheck}>
                      <img
                        src="https://api.iconify.design/mdi:check-circle.svg?color=%23BCACFD&width=20&height=20"
                        alt="Checkmark"
                      />
                    </td>
                    <td className={styles.vercelCheck}>✗</td>
                    <td className={styles.wordpressCheck}>
                      <img
                        src="https://api.iconify.design/mdi:check-circle.svg?color=%23BCACFD&width=20&height=20"
                        alt="Checkmark"
                      />
                    </td>
                  </tr>
                  <tr
                    className={`${styles.featureRow} ${
                      comparisonRowsVisible[3]
                        ? styles.animateIn
                        : styles.animateOut
                    }`}
                  >
                    <td className={styles.featureLabel}>
                      Full Code Access & Editing
                    </td>
                    <td className={styles.grapesCheck}>
                      <img
                        src="https://api.iconify.design/mdi:check-circle.svg?color=%23BCACFD&width=20&height=20"
                        alt="Checkmark"
                      />
                    </td>
                    <td className={styles.squarespaceCheck}>✗</td>
                    <td className={styles.vercelCheck}>
                      <img
                        src="https://api.iconify.design/mdi:check-circle.svg?color=%23BCACFD&width=20&height=20"
                        alt="Checkmark"
                      />
                    </td>
                    <td className={styles.wordpressCheck}>
                      <img
                        src="https://api.iconify.design/mdi:check-circle.svg?color=%23BCACFD&width=20&height=20"
                        alt="Checkmark"
                      />
                    </td>
                  </tr>
                  <tr
                    className={`${styles.featureRow} ${
                      comparisonRowsVisible[4]
                        ? styles.animateIn
                        : styles.animateOut
                    }`}
                  >
                    <td className={styles.featureLabel}>Design Templates</td>
                    <td className={styles.grapesCheck}>
                      <img
                        src="https://api.iconify.design/mdi:check-circle.svg?color=%23BCACFD&width=20&height=20"
                        alt="Checkmark"
                      />
                    </td>
                    <td className={styles.squarespaceCheck}>
                      <img
                        src="https://api.iconify.design/mdi:check-circle.svg?color=%23BCACFD&width=20&height=20"
                        alt="Checkmark"
                      />
                    </td>
                    <td className={styles.vercelCheck}>
                      <img
                        src="https://api.iconify.design/mdi:check-circle.svg?color=%23BCACFD&width=20&height=20"
                        alt="Checkmark"
                      />
                    </td>
                    <td className={styles.wordpressCheck}>
                      <img
                        src="https://api.iconify.design/mdi:check-circle.svg?color=%23BCACFD&width=20&height=20"
                        alt="Checkmark"
                      />
                    </td>
                  </tr>
                  <tr
                    className={`${styles.featureRow} ${
                      comparisonRowsVisible[5]
                        ? styles.animateIn
                        : styles.animateOut
                    }`}
                  >
                    <td className={styles.featureLabel}>Custom Domains</td>
                    <td className={styles.grapesCheck}>
                      <img
                        src="https://api.iconify.design/mdi:check-circle.svg?color=%23BCACFD&width=20&height=20"
                        alt="Checkmark"
                      />
                    </td>
                    <td className={styles.squarespaceCheck}>
                      <img
                        src="https://api.iconify.design/mdi:check-circle.svg?color=%23BCACFD&width=20&height=20"
                        alt="Checkmark"
                      />
                    </td>
                    <td className={styles.vercelCheck}>
                      <img
                        src="https://api.iconify.design/mdi:check-circle.svg?color=%23BCACFD&width=20&height=20"
                        alt="Checkmark"
                      />
                    </td>
                    <td className={styles.wordpressCheck}>
                      <img
                        src="https://api.iconify.design/mdi:check-circle.svg?color=%23BCACFD&width=20&height=20"
                        alt="Checkmark"
                      />
                    </td>
                  </tr>
                  <tr
                    className={`${styles.featureRow} ${
                      comparisonRowsVisible[6]
                        ? styles.animateIn
                        : styles.animateOut
                    }`}
                  >
                    <td className={styles.featureLabel}>
                      Custom Hosting Options
                    </td>
                    <td className={styles.grapesCheck}>
                      <img
                        src="https://api.iconify.design/mdi:check-circle.svg?color=%23BCACFD&width=20&height=20"
                        alt="Checkmark"
                      />
                    </td>
                    <td className={styles.squarespaceCheck}>✗</td>
                    <td className={styles.vercelCheck}>
                      <img
                        src="https://api.iconify.design/mdi:check-circle.svg?color=%23BCACFD&width=20&height=20"
                        alt="Checkmark"
                      />
                    </td>
                    <td className={styles.wordpressCheck}>
                      <img
                        src="https://api.iconify.design/mdi:check-circle.svg?color=%23BCACFD&width=20&height=20"
                        alt="Checkmark"
                      />
                    </td>
                  </tr>
                  <tr
                    className={`${styles.featureRow} ${
                      comparisonRowsVisible[7]
                        ? styles.animateIn
                        : styles.animateOut
                    }`}
                  >
                    <td className={styles.featureLabel}>
                      Use Existing Site as Starting Point
                    </td>
                    <td className={styles.grapesCheck}>
                      <img
                        src="https://api.iconify.design/mdi:check-circle.svg?color=%23BCACFD&width=20&height=20"
                        alt="Checkmark"
                      />
                    </td>
                    <td className={styles.squarespaceCheck}>✗</td>
                    <td className={styles.vercelCheck}>✗</td>
                    <td className={styles.wordpressCheck}>✗</td>
                  </tr>
                  <tr
                    className={`${styles.featureRow} ${
                      comparisonRowsVisible[8]
                        ? styles.animateIn
                        : styles.animateOut
                    }`}
                  >
                    <td className={styles.featureLabel}>Affordable Pricing</td>
                    <td className={styles.grapesCheck}>
                      <img
                        src="https://api.iconify.design/mdi:check-circle.svg?color=%23BCACFD&width=20&height=20"
                        alt="Checkmark"
                      />
                    </td>
                    <td className={styles.squarespaceCheck}>✗</td>
                    <td className={styles.vercelCheck}>
                      <img
                        src="https://api.iconify.design/mdi:check-circle.svg?color=%23BCACFD&width=20&height=20"
                        alt="Checkmark"
                      />
                    </td>
                    <td className={styles.wordpressCheck}>
                      <img
                        src="https://api.iconify.design/mdi:check-circle.svg?color=%23BCACFD&width=20&height=20"
                        alt="Checkmark"
                      />
                    </td>
                  </tr>
                  <tr
                    className={`${styles.featureRow} ${
                      comparisonRowsVisible[9]
                        ? styles.animateIn
                        : styles.animateOut
                    }`}
                  >
                    <td className={styles.featureLabel}>
                      Embeddable Solutions
                    </td>
                    <td className={styles.grapesCheck}>
                      <img
                        src="https://api.iconify.design/mdi:check-circle.svg?color=%23BCACFD&width=20&height=20"
                        alt="Checkmark"
                      />
                    </td>
                    <td className={styles.squarespaceCheck}>✗</td>
                    <td className={styles.vercelCheck}>✗</td>
                    <td className={styles.wordpressCheck}>✗</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div>
              <button
                type="button"
                className={`${styles.gjsTButton} gjs-t-button`}
                onClick={handleGetStarted}
              >
                Start Building for Free
              </button>
            </div>
          </div>
        </section>
      </main>

      <FooterStandalone />
    </div>
  );
};

export default PricingPageClient;
