"use client";

import GrapesDemoEditor from "../GrapesEditor";
import { CDN_BASE } from "../utils";
import { components, plugins, pluginsOpts } from "./utils";

const info = {
  name: "GrapesJS MJML Newsletter Builder",
  repoLink: "https://github.com/GrapesJS/mjml",
  repoName: "MJML Preset",
};

const config = {
  storageManager: {
    options: {
      local: { key: "gjsProjectMjml" },
    },
  },
  styleManager: {},
};

export default function DemoEditorNewsletter() {
  return (
    <>
      <script src={`${CDN_BASE}grapesjs-mjml@1.0.5`}></script>
      <link
        rel="stylesheet"
        href="/assets/styles/grapesjs/grapesjs-preset-mjml.css"
      />
      <GrapesDemoEditor
        components={components}
        plugins={plugins}
        pluginsOpts={pluginsOpts}
        info={info}
        config={config}
      />
    </>
  );
}
