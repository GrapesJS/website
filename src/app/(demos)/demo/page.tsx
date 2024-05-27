import { Metadata } from "next";
import DemoEditor from "./DemoEditor";


export const metadata: Metadata = {
    title: 'GrapesJS Demo - Free Open Source Website Page Builder',
    description: 'Best Free Open Source Responsive No-Code Websites HTML Builder"',
};

export default function DemoWebsite() {
    return <DemoEditor/>;
}