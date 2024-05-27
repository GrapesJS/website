import { Metadata } from "next";
import DemoEditor from "./DemoEditor";


export const metadata: Metadata = {
    title: 'GrapesJS Demo - Free Open Source MJML Newsletter Builder',
    description: 'GrapesJS MJML Newsletter Builder - Best Free Open Source Responsive MJML Newsletter Editor',
};

export default function DemoNewsletter() {
    return <DemoEditor/>;
}