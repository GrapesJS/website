"use client";

import GrapesDemoEditor from "../GrapesEditor";
import { CDN_BASE } from "../utils";
import { components, plugins, pluginsOpts } from "./utils";

const info = {
  name: "GrapesJS Newsletter Builder",
  repoLink: "https://github.com/GrapesJS/preset-newsletter",
  repoName: "Newsletter Preset",
};

const config = {
  storageManager: {
    options: {
      local: { key: "gjsProjectNl" },
    },
  },
  styleManager: {},
};

export default function DemoEditorNewsletter() {
  return (
    <>
      <script src={`${CDN_BASE}grapesjs-preset-newsletter@1.0.1`}></script>
      <link
        rel="stylesheet"
        href="/assets/styles/grapesjs/grapesjs-preset-newsletter.css"
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
