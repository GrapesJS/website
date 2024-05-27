import { Metadata } from "next";
import DemoEditor from "./DemoEditor";


export const metadata: Metadata = {
    title: 'GrapesJS Demo - Free Open Source Newsletter Editor',
    description: 'Best Free Open Source Responsive No-Code Newsletter HTML Email Builder',
};

export default function DemoNewsletter() {
    return <DemoEditor/>;
}