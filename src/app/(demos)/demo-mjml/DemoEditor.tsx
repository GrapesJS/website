'use client'

import GrapesDemoEditor from "../GrapesEditor";
import { components, plugins, pluginsOpts } from "./utils";

const info = {
    name: 'GrapesJS MJML Newsletter Builder',
    repoLink: 'https://github.com/GrapesJS/mjml',
    repoName: 'MJML Preset',
};

const config = {
    storageManager: {
        options: {
            local: { key: 'gjsProjectMjml' }
        }
    },
    styleManager: {},
};

export default function DemoEditorNewsletter() {
    return (
        <>
            <script src="https://unpkg.com/grapesjs-mjml@1.0.5"></script>
            <script src="https://unpkg.com/grapesjs-plugin-ckeditor@1.0.1"></script>
            <link rel="stylesheet" href="/assets/styles/grapesjs/grapesjs-preset-mjml.css"/>
            <GrapesDemoEditor
                components={components}
                plugins={plugins}
                pluginsOpts={pluginsOpts}
                info={info}
                config={config}
            />
        </>
    )
}