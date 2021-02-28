/// <reference path="chomp.d.ts"/>

import { getJSON } from "./net";
import { Style as DiagonalStyle } from "./style.diagonal";
import { Style as VerticalStyle } from "./style.vertical";
import { description, hslShift, hex2hsl, hslSetL } from "./util";

const styles = {
    "diagonal": DiagonalStyle,
    "vertical": VerticalStyle
}

const processLinkTemplate = (entry: ChompDataEntry, template: HTMLTemplateElement, space: HTMLElement) => {
    let content = template.content;
    let a = content.querySelector("a");
    let aspan = content.querySelector("#link-template-text") as HTMLSpanElement;
    let span = content.querySelector("#link-template-description") as HTMLSpanElement;

    a.href = (entry.href.startsWith("https://") || entry.href.startsWith("/")) ? entry.href : `https://github.com/${entry.href}`;
    a.title = entry.sling;
    aspan.textContent = entry.name;

    if(entry.color != null && entry.color.length >= 2) {
        a.style.setProperty("--project-link-color-start", entry.color[0]);
        a.style.setProperty("--project-link-color-end", entry.color[1]);
        const adjust = entry.colorAdjust ?? 1.3;
        a.style.setProperty("--project-link-color-hover", entry.color[2] ?? hslShift(entry.color[1], 0, 100, adjust));
        const hsl = hex2hsl(entry.color[2] ?? entry.color[1]); 
        a.style.setProperty("--project-link-color-hover2", entry.color[3] ?? hslSetL(entry.color[0], 0, 100, hsl[2] * adjust));
    }

    if(entry.description != null && span != null) {
        span.textContent = entry.description;
        span.style.color = entry.color[0];
    }

    space.appendChild(document.importNode(content, true));
}

window.addEventListener("DOMContentLoaded", () => {
    (async () => {
        const data = await getJSON<ChompData>("/chomp.json");
        if(location.search.length > 1 && location.search.substr(1) in styles) {
            data.style = location.search.substr(1);
        }
        const $ = (query) : NodeListOf<Element> => document.body.querySelectorAll(query);
        const $$ = (query) : Element => document.body.querySelector(query);
        
        $$("header > span:nth-child(1)").textContent = data.name;
        $$("header > span:nth-child(2)").textContent = data.sub;
        description(data.description, $$("nav"));

        const footerLinks = $$("#footer-links") as HTMLUListElement;
        const footerTemplate = $$("#footer-links #footer-link") as HTMLTemplateElement;
        for(let entry of data.about.links) {
            if(entry.isHidden) continue;
            processLinkTemplate(entry, footerTemplate, footerLinks);
        }

        const linkspace = $$(".linkspace") as HTMLUListElement;
        const template = $$(".linkspace #link-template") as HTMLTemplateElement;
        const separator = $$(".linkspace #link-separator") as HTMLTemplateElement;
        const header = $$(".linkspace #link-header") as HTMLTemplateElement;
        for(let entry of data.entries) {
            if(entry.isHidden) continue;

            if(entry.isSeparator == true) {
                linkspace.appendChild(document.importNode(separator.content, true));
            } else if(entry.isHeader == true) {
                let content = header.content;
                let h1 = content.querySelector("h1");
                h1.textContent = entry.name;
                linkspace.appendChild(document.importNode(content, true));
            } else {
                processLinkTemplate(entry, template, linkspace);
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


