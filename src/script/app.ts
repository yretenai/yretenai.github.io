import { getJSON } from "./net";
import { Style } from "./style.diagonal";

window.addEventListener("DOMContentLoaded", () => {
    (async () => {
        const data = await getJSON<ChompData>("/chomp.json");
        const $ = (query) => document.body.querySelectorAll(query);
        const $$ = (query) => document.body.querySelector(query);
        
        $$("header span").textContent = data.svc;
        $$("nav").innerHTML = data.dsc;

        const linkspace = $$(".linkspace");
        const template = $$(".linkspace #link-template");
        const separator = $$(".linkspace #link-separator");
        const header = $$(".linkspace #link-header");
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
                let span = content.querySelector("span");

                a.href = entry.href.startsWith("https://") ? entry.href : `https://github.com/${entry.href}`;
                a.textContent = a.title = entry.name;
                a.style.setProperty("--project-link-color-start", entry.color[0]);
                a.style.setProperty("--project-link-color-end", entry.color[1]);
                span.textContent = entry.description;
                span.style.color = entry.color[0];

                linkspace.appendChild(document.importNode(content, true));
            }
        }

        const adjustSize = () => {
            linkspace.style.marginTop = `${$$("header").clientHeight - 20}px`;
        };
        window.addEventListener("resize", adjustSize);
        adjustSize();

        Style(linkspace);
    })().then(() => console.log("Initialized."), (e) => console.error("Error during initialization", e));
});
