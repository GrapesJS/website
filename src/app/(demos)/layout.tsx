import { Metadata } from "next";
import { GRAPESJS_SCRIPT, GRAPESJS_STYLE } from "./utils";

import './styles.css';

export const metadata: Metadata = {
    icons: [
        {
            rel: 'stylesheet',
            url: GRAPESJS_STYLE,
            // @ts-ignore
            precedence: 'default'
        }
    ]
};

export default function LayoutDemos({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script src={GRAPESJS_SCRIPT}/>
            {children}
        </>
    )
}