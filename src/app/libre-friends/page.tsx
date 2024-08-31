import Footer from "../_components/footer";
import Header from "../_components/header";
import "../home.css";

// Define the type for the project data
interface Project {
  name: string;
  description: string;
  url: string;
  source: string;
  docs?: string;
  tags: string[];
  logo: string;
  screenshots?: string[];
}

const clsSectionTitle = "primary-title text-center mb-20 text-4xl md:text-5xl";

export default async function LibreFriendsPage() {
  // Base URL for assets
  const baseUrl = 'https://libre-friends.silexlabs.org';

  // Fetch the projects at build time
  let projects: Project[] = [];

  try {
    const response = await fetch(`${baseUrl}/api/projects.json`);
    projects = await response.json();
  } catch (error) {
    console.error('Error fetching projects:', error);
  }

  return (
    <main>
      <section className="page-header z-0">
        <Header />

        <div className="mx-auto max-w-screen-lg px-4 text-center">
          <h1 className="mt-6 md:mt-24 text-3xl">
            Projects Like GrapesJS - Libre Friends Directory
          </h1>

          <p className="mt-5 text-lg opacity-80">
            As part of the Libre Friends directory, GrapesJS is proud to be featured alongside a diverse collection of free/libre software projects. These projects range from developer tools to business solutions, all sharing a commitment to the principles of software freedom. Below, you'll find a curated list of these like-minded projects, each offering valuable resources and tools for both individuals and businesses. We invite you to explore these solutions, contribute to their development, and support the free/libre software community.
          </p>
        </div>
      </section>

      <section className="section-container even-content overflow-hidden">
        <div className="body1 width-all">
          <h1 className={clsSectionTitle}>Libre Friends Projects</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div key={project.name} className="border p-6 rounded shadow-md bg-white">
                <div className="flex flex-col items-center">
                  <img
                    className="max-w-full h-32 mb-4 object-contain"
                    src={`${baseUrl}${project.logo}`}
                    alt={`${project.name} logo`}
                  />
                  <h2 className="text-xl font-semibold text-center mb-2">{project.name}</h2>
                  <p className="text-center mb-4">{project.description}</p>
                  <div className="flex justify-center space-x-4">
                    <a
                      href={project.url}
                      target="_blank"
                      className="text-primary hover:text-primary-dark hover:underline transition-colors"
                    >
                      Website
                    </a>
                    <a
                      href={project.source}
                      target="_blank"
                      className="text-primary hover:text-primary-dark hover:underline transition-colors"
                    >
                      Source Code
                    </a>
                    {project.docs && (
                      <a
                        href={project.docs}
                        target="_blank"
                        className="text-primary hover:text-primary-dark hover:underline transition-colors"
                      >
                        Documentation
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
