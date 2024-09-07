import Container from "../_components/container";
import Footer from "../_components/footer";
import Hero from "../_components/hero";
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

export default async function LibreFriendsPage() {
  const baseUrl = "https://libre-friends.silexlabs.org";
  let projects: Project[] = [];

  try {
    const response = await fetch(`${baseUrl}/api/projects.json`);
    projects = await response.json();
  } catch (error) {
    console.error("Error fetching projects:", error);
  }

  return (
    <main>
      <Hero
        title="Libre Friends Directory"
        clsTitle="text-5xl"
        className="bg-gjs min-h-[300px]"
      />
      <Container className="pt-10 md:pt-20">
        <h1 className="primary-title text-center text-4xl md:text-5xl mb-10">
          Libre Friends Projects
        </h1>

        <p className="mb-32 text-lg opacity-80 text-justify">
          As part of the Libre Friends directory, GrapesJS is proud to be
          featured alongside a diverse collection of free/libre software
          projects. These projects range from developer tools to business
          solutions, all sharing a commitment to the principles of software
          freedom. Below, you'll find a curated list of these like-minded
          projects, each offering valuable resources and tools for both
          individuals and businesses. We invite you to explore these solutions,
          contribute to their development, and support the free/libre software
          community.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map(({ name, logo, description, url, source, docs }) => (
            <div key={name} className="border p-6 rounded shadow-md bg-white">
              <div className="flex flex-col items-center h-full">
                <img
                  className="max-w-full h-32 mb-4 object-contain"
                  src={`${baseUrl}${logo}`}
                  alt={`${name} logo`}
                />
                <h2 className="text-xl font-semibold text-center mb-2">
                  {name}
                </h2>
                <p className="text-center mb-4">{description}</p>
                <div className="flex justify-center space-x-4 mt-auto">
                  <a href={url} target="_blank" className="link-gjs">
                    Website
                  </a>
                  <a href={source} target="_blank" className="link-gjs">
                    Source Code
                  </a>
                  {docs && (
                    <a href={docs} target="_blank" className="link-gjs">
                      Documentation
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
      <Footer />
    </main>
  );
}
