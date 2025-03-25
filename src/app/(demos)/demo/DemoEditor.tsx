"use client";

import GrapesDemoEditor from "../GrapesEditor";
import { CDN_BASE } from "../utils";
import { componentsWebsite, pluginsOptsWebiste, pluginsWebsite } from "./utils";

const info = {
  name: "GrapesJS Webpage Builder",
  repoLink: "https://github.com/GrapesJS/preset-webpage",
  repoName: "Webpage Preset",
};

export default function DemoWebsite() {
  return (
    <>
      <script src={`${CDN_BASE}grapesjs-preset-webpage@1.0.2`}></script>
      <script src={`${CDN_BASE}grapesjs-blocks-basic@1.0.1`}></script>
      <script src={`${CDN_BASE}grapesjs-plugin-forms@2.0.5`}></script>
      <script src={`${CDN_BASE}grapesjs-component-countdown@1.0.1`}></script>
      <script src={`${CDN_BASE}grapesjs-plugin-export@1.0.11`}></script>
      <script src={`${CDN_BASE}grapesjs-tabs@1.0.6`}></script>
      <script src={`${CDN_BASE}grapesjs-custom-code@1.0.1`}></script>
      <script src={`${CDN_BASE}grapesjs-touch@0.1.1`}></script>
      <script src={`${CDN_BASE}grapesjs-parser-postcss@1.0.1`}></script>
      <script src={`${CDN_BASE}grapesjs-tooltip@0.1.7`}></script>
      <script src={`${CDN_BASE}grapesjs-tui-image-editor@0.1.3`}></script>
      <script src={`${CDN_BASE}grapesjs-typed@1.0.5`}></script>
      <script src={`${CDN_BASE}grapesjs-style-bg@2.0.1`}></script>
      <link
        rel="stylesheet"
        href="/assets/styles/grapesjs/grapesjs-preset-webpage.css"
      />
      <GrapesDemoEditor
        components={componentsWebsite}
        plugins={pluginsWebsite}
        pluginsOpts={pluginsOptsWebiste}
        info={info}
      />
    </>
  );
}
