'use client'

import GrapesDemoEditor from "../GrapesEditor";
import { components, plugins, pluginsOpts } from "./utils";

const info = {
    name: 'GrapesJS Newsletter Builder',
    repoLink: 'https://github.com/GrapesJS/preset-newsletter',
    repoName: 'Newsletter Preset',
};

const config = {
    storageManager: {
        options: {
            local: { key: 'gjsProjectNl' }
        }
    },
    styleManager: {},
};

export default function DemoEditorNewsletter() {
    return (
        <>
            <script src="https://unpkg.com/grapesjs-preset-newsletter@1.0.1"></script>
            <script src="https://unpkg.com/grapesjs-plugin-ckeditor@1.0.1"></script>
            <GrapesDemoEditor
                components={components}
                plugins={plugins}
                pluginsOpts={pluginsOpts}
                info={info}
                config={config}
            >
                <link rel="stylesheet" href="/assets/styles/grapesjs/grapesjs-preset-newsletter.css"/>
            </GrapesDemoEditor>
        </>
    )
}