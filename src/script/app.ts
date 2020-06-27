/// <reference path="chomp.d.ts"/>

import { getJSON } from "./net";
import { Style as DiagonalStyle } from "./style.diagonal";
import { Style as VerticalStyle } from "./style.vertical";
import { description, hslShift, hex2hsl, hslSetL } from "./util";

const styles = {
    "diagonal": DiagonalStyle,
    "vertical": VerticalStyle
}

window.addEventListener("DOMContentLoaded", () => {
    (async () => {
        const data = await getJSON<ChompData>("/chomp.json");
        if(location.search.length > 1 && location.search.substr(1) in styles) {
            data.style = location.search.substr(1);
        }
        const $ = (query) : NodeListOf<Element> => document.body.querySelectorAll(query);
        const $$ = (query) : Element => document.body.querySelector(query);
        
        $$("header span").textContent = data.name;
        description(data.description, $$("nav"));

        const linkspace = $$(".linkspace") as HTMLUListElement;
        const template = $$(".linkspace #link-template") as HTMLTemplateElement;
        const separator = $$(".linkspace #link-separator") as HTMLTemplateElement;
        const header = $$(".linkspace #link-header") as HTMLTemplateElement;
        for(var entry of data.entries) {
            if(entry.isHidden) continue;

            if(entry.isSeparator == true) {
                linkspace.appendChild(document.importNode(separator.content, true));
            } else if(entry.isHeader == true) {
                let content = header.content;
                let h1 = content.querySelector("h1");
                h1.textContent = entry.name;
                linkspace.appendChild(document.importNode(content, true));
            } else {
                let content = template.content;
                let a = content.querySelector("a");
                let aspan = content.querySelector("#link-template-text") as HTMLSpanElement;
                let span = content.querySelector("#link-template-description") as HTMLSpanElement;

                a.href = (entry.href.startsWith("https://") || entry.href.startsWith("/")) ? entry.href : `https://github.com/${entry.href}`;
                a.title = entry.sling;
                aspan.textContent = entry.name;
                a.style.setProperty("--project-link-color-start", entry.color[0]);
                a.style.setProperty("--project-link-color-end", entry.color[1]);
                const adjust = entry.colorAdjust ?? 1.3;
                a.style.setProperty("--project-link-color-hover", entry.color[2] ?? hslShift(entry.color[1], 0, 100, adjust));
                const hsl = hex2hsl(entry.color[2] ?? entry.color[1]); 
                a.style.setProperty("--project-link-color-hover2", entry.color[3] ?? hslSetL(entry.color[0], 0, 100, hsl[2] * adjust));
                span.textContent = entry.description;
                span.style.color = entry.color[0];

                linkspace.appendChild(document.importNode(content, true));
            }
        }

        const adjustSize = () => {
            linkspace.style.marginTop = `${$$("header").clientHeight - 15}px`;
        };
        window.addEventListener("resize", adjustSize);
        adjustSize();

        document.body.classList.add(`style-${data.style}`);
        styles[data.style](linkspace);
    })().then(() => console.log("Initialized."), (e) => console.error("Error during initialization", e));
});


