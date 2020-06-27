/// <reference path="chomp.d.ts"/>

export function pxToPt(px : number) : number {
    return px * 3 / 4;
}

export function ptToPx(pt : number) : number {
    return pt * 4 / 3;
}

export function probability(chance: number, runs: number) : number {
    return 1 - Math.pow((1 - chance), runs);
}

export function description(data: string | Array<ChompDescriptionElement>, host: Element) {
    if(!Array.isArray(data)) {
        host.textContent = data;
        return;
    }
    for (const elementData of data) {
        const element = document.createElement(elementData.tag);
        if(elementData.attributes != null) { 
            for(const attributeKey in elementData.attributes) {
                const attr = document.createAttribute(attributeKey);
                attr.value = elementData.attributes[attributeKey];
                element.attributes.setNamedItem(attr);
            }
        }
        description(elementData.text, element);
        host.appendChild(element);
    }
}

export function hex2hsl(hex: string) : Array<number> {
    const color = parseInt(hex.startsWith("#") ? hex.substr(1) : hex, 16);
    const r = (color >> 16) / 0xFF;
    const g = ((color >> 8) & 0xFF) / 0xFF;
    const b = (color & 0xFF) / 0xFF;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = (max + min) / 2;
    let s = h;
    let l = h;

    if (max == min) {
        h = s = 0; // achromatic
    } else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
        case r:
            h = (g - b) / d + (g < b ? 6 : 0);
            break;
        case g:
            h = (b - r) / d + 2;
            break;
        case b:
            h = (r - g) / d + 4;
            break;
        }
        h /= 6;
    }
    return [Math.floor(h * 360), Math.floor(s * 100), Math.floor(l * 100)];
}

export function hslShift(color: string, adjH: number, adjS: number, adjL: number) : string {
    const hsl = hex2hsl(color);
    hsl[0] = (hsl[0] + adjH) % 360;
    hsl[1] = Math.min(100, hsl[1] + adjS);
    hsl[2] = Math.min(100, hsl[2] * adjL);
    return `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`;
}

export function hslSetL(color: string, adjH: number, adjS: number, adjL: number) : string {
    const hsl = hex2hsl(color);
    hsl[0] = (hsl[0] + adjH) % 360;
    hsl[1] = Math.min(100, hsl[1] + adjS);
    hsl[2] = adjL
    return `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`;
}
