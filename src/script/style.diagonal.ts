export function Style(linkspace: HTMLUListElement) {
    const calculateOffset = () => {
        if(document.documentElement.clientWidth > 1200) {
            linkspace.style.marginLeft = `${0.272 * (window.scrollY)}pt`;
        } else {
            linkspace.style.marginLeft = "0pt";
        }
    }

    window.addEventListener("scroll", calculateOffset);
    window.addEventListener("resize", calculateOffset);
    calculateOffset();
}
