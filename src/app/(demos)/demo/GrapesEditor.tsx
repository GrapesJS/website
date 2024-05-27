'use client'

import CarbonAd from "@/app/_components/carbonAd";
import { useEffect, useRef } from "react";

declare global {
    interface Window {
        grapesjs: any;
        editor: any;
    }
}

const plp = 'https://via.placeholder.com/350x250/';
const images = [
    `${plp}78c5d6/fff`,
    `${plp}459ba8/fff`,
    `${plp}79c267/fff`,
    `${plp}c5d647/fff`,
    `${plp}f28c33/fff`,
    `${plp}e868a2/fff`,
    `${plp}cc4360/fff`,
];

const GRAPESJS_VERSION = 'v0.21.10';
const GRAPESJS_SCRIPT = `/assets/scripts/grapesjs/grapes.min.js?${GRAPESJS_VERSION}`;
const GRAPESJS_STYLE = `/assets/styles/grapesjs/grapes.min.css?${GRAPESJS_VERSION}`;
const clsLink = 'info-panel-link gjs-four-color';

interface Props extends React.HTMLProps<HTMLDivElement> {
    components?: string,
    plugins?: (string | ((ed: any) => void))[],
    pluginsOpts?: Record<string, any>,
}

export default function GrapesEditor({ children, components, plugins, pluginsOpts }: Props) {
    const editorEl = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const { current } =  editorEl;

        if (!current) return;

        const editor = window.grapesjs.init({
            height: '100vh',
            container : current,
            components,
            showOffsets: true,
            assetManager: {
                embedAsBase64: true,
                assets: images,
            },
            selectorManager: { componentFirst: true },
            styleManager: {
                sectors: [{
                    name: 'General',
                    properties:[
                    {
                        extend: 'float',
                        type: 'radio',
                        default: 'none',
                        options: [
                        { value: 'none', className: 'fa fa-times'},
                        { value: 'left', className: 'fa fa-align-left'},
                        { value: 'right', className: 'fa fa-align-right'}
                        ],
                    },
                    'display',
                    { extend: 'position', type: 'select' },
                    'top',
                    'right',
                    'left',
                    'bottom',
                    ],
                }, {
                    name: 'Dimension',
                    open: false,
                    properties: [
                        'width',
                        {
                        id: 'flex-width',
                        type: 'integer',
                        name: 'Width',
                        units: ['px', '%'],
                        property: 'flex-basis',
                        toRequire: 1,
                        },
                        'height',
                        'max-width',
                        'min-height',
                        'margin',
                        'padding'
                    ],
                    },{
                    name: 'Typography',
                    open: false,
                    properties: [
                        'font-family',
                        'font-size',
                        'font-weight',
                        'letter-spacing',
                        'color',
                        'line-height',
                        {
                            extend: 'text-align',
                            options: [
                            { id : 'left',  label : 'Left',    className: 'fa fa-align-left'},
                            { id : 'center',  label : 'Center',  className: 'fa fa-align-center' },
                            { id : 'right',   label : 'Right',   className: 'fa fa-align-right'},
                            { id : 'justify', label : 'Justify',   className: 'fa fa-align-justify'}
                            ],
                        },
                        {
                            property: 'text-decoration',
                            type: 'radio',
                            default: 'none',
                            options: [
                            { id: 'none', label: 'None', className: 'fa fa-times'},
                            { id: 'underline', label: 'underline', className: 'fa fa-underline' },
                            { id: 'line-through', label: 'Line-through', className: 'fa fa-strikethrough'}
                            ],
                        },
                        'text-shadow'
                    ],
                    },{
                    name: 'Decorations',
                    open: false,
                    properties: [
                        'opacity',
                        'border-radius',
                        'border',
                        'box-shadow',
                        'background', // { id: 'background-bg', property: 'background', type: 'bg' }
                    ],
                    },{
                    name: 'Extra',
                    open: false,
                    buildProps: [
                        'transition',
                        'perspective',
                        'transform'
                    ],
                    },{
                    name: 'Flex',
                    open: false,
                    properties: [{
                        name: 'Flex Container',
                        property: 'display',
                        type: 'select',
                        defaults: 'block',
                        list: [
                        { value: 'block', name: 'Disable'},
                        { value: 'flex', name: 'Enable'}
                        ],
                    },{
                        name: 'Flex Parent',
                        property: 'label-parent-flex',
                        type: 'integer',
                    },{
                        name: 'Direction',
                        property: 'flex-direction',
                        type: 'radio',
                        defaults: 'row',
                        list: [{
                        value: 'row',
                        name: 'Row',
                        className: 'icons-flex icon-dir-row',
                        title: 'Row',
                        },{
                        value: 'row-reverse',
                        name: 'Row reverse',
                        className: 'icons-flex icon-dir-row-rev',
                        title: 'Row reverse',
                        },{
                        value: 'column',
                        name: 'Column',
                        title: 'Column',
                        className: 'icons-flex icon-dir-col',
                        },{
                        value: 'column-reverse',
                        name: 'Column reverse',
                        title: 'Column reverse',
                        className: 'icons-flex icon-dir-col-rev',
                        }],
                    },{
                        name: 'Justify',
                        property: 'justify-content',
                        type: 'radio',
                        defaults: 'flex-start',
                        list: [{
                        value: 'flex-start',
                        className: 'icons-flex icon-just-start',
                        title: 'Start',
                        },{
                        value: 'flex-end',
                        title: 'End',
                        className: 'icons-flex icon-just-end',
                        },{
                        value: 'space-between',
                        title: 'Space between',
                        className: 'icons-flex icon-just-sp-bet',
                        },{
                        value: 'space-around',
                        title: 'Space around',
                        className: 'icons-flex icon-just-sp-ar',
                        },{
                        value: 'center',
                        title: 'Center',
                        className: 'icons-flex icon-just-sp-cent',
                        }],
                    },{
                        name: 'Align',
                        property: 'align-items',
                        type: 'radio',
                        defaults: 'center',
                        list: [{
                        value: 'flex-start',
                        title: 'Start',
                        className: 'icons-flex icon-al-start',
                        },{
                        value: 'flex-end',
                        title: 'End',
                        className: 'icons-flex icon-al-end',
                        },{
                        value: 'stretch',
                        title: 'Stretch',
                        className: 'icons-flex icon-al-str',
                        },{
                        value: 'center',
                        title: 'Center',
                        className: 'icons-flex icon-al-center',
                        }],
                    },{
                        name: 'Flex Children',
                        property: 'label-parent-flex',
                        type: 'integer',
                    },{
                        name: 'Order',
                        property: 'order',
                        type: 'integer',
                        defaults: 0,
                        min: 0
                    },{
                        name: 'Flex',
                        property: 'flex',
                        type: 'composite',
                        properties  : [{
                        name: 'Grow',
                        property: 'flex-grow',
                        type: 'integer',
                        defaults: 0,
                        min: 0
                        },{
                        name: 'Shrink',
                        property: 'flex-shrink',
                        type: 'integer',
                        defaults: 0,
                        min: 0
                        },{
                        name: 'Basis',
                        property: 'flex-basis',
                        type: 'integer',
                        units: ['px','%',''],
                        unit: '',
                        defaults: 'auto',
                        }],
                    },{
                        name: 'Align',
                        property: 'align-self',
                        type: 'radio',
                        defaults: 'auto',
                        list: [{
                        value: 'auto',
                        name: 'Auto',
                        },{
                        value: 'flex-start',
                        title: 'Start',
                        className: 'icons-flex icon-al-start',
                        },{
                        value   : 'flex-end',
                        title: 'End',
                        className: 'icons-flex icon-al-end',
                        },{
                        value   : 'stretch',
                        title: 'Stretch',
                        className: 'icons-flex icon-al-str',
                        },{
                        value   : 'center',
                        title: 'Center',
                        className: 'icons-flex icon-al-center',
                        }],
                    }]
                    }
                ],
            },
            plugins,
            pluginsOpts,
        });

        window.editor = editor;

        return () => editor.destroy();
    }, [editorEl.current]);

    return (
        <>
            <link rel="stylesheet" href={GRAPESJS_STYLE}/>
            <script src={GRAPESJS_SCRIPT}/>
            <div className="hidden">
                <div className="gjs-logo-cont">
                    <a href="/">
                        <img className="gjs-logo" src="/assets/images/grapesjs-logo-cl.png"/>
                    </a>
                    <div className="gjs-logo-version"></div>
                </div>
            </div>

            <div id="info-panel" className="hidden">
                <br/>
                <img className="block mx-auto" src="/assets/images/grapesjs-logo-cl.png"/>
                <br/>
                <div className="info-panel-label">
                    <b>GrapesJS Webpage Builder</b> is a simple showcase of what is possible to achieve with
                    the <a className={clsLink} target="_blank" href="https://github.com/artf/grapesjs">GrapesJS</a> core library.
                    <br/><br/>
                    For any hint about the demo check the <a className={clsLink} target="_blank" href="https://github.com/artf/grapesjs-preset-webpage">Webpage Preset repository</a> and
                    open an issue. For problems with the builder itself, open an issue on the
                    main <a className={clsLink} target="_blank" href="https://github.com/artf/grapesjs">GrapesJS repository</a>.
                    <br/><br/>
                    Being a free and open source project contributors and supporters are extremely welcome.
                    If you like the project support it with a donation of your choice or become a backer/sponsor
                    via <a className={clsLink} target="_blank" href="https://opencollective.com/grapesjs">Open Collective</a>.
                </div>
            </div>
            <div className="ad-cont">
                <CarbonAd/>
            </div>
            <div id="gjs" ref={editorEl}/>
            {children}
        </>
    )
}