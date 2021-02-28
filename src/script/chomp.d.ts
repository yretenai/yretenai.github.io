declare interface ChompData {
    name: string;
    sub: string;
    description: string | Array<ChompDescriptionElement>;
    about: ChompDataAbout;
    style: string;
    entries: Array<ChompDataEntry>;
}

declare interface ChompDescriptionElement {
    tag: string;
    attributes: { [key: string]: string } | null;
    text: string | Array<ChompDescriptionElement>;
}

declare interface ChompDataEntry {
    name: string | null;
    description: string | null;
    href: string | null;
    sling: string | null;
    color: Array<string> | null;
    isSeparator: boolean | null;
    isHeader: boolean | null;
    isHidden: boolean | null;
    colorAdjust: number | null;
}

declare interface ChompDataAbout {
    name: string;
    image: string;
    links: Array<ChompDataEntry>;
    about: string | Array<ChompDescriptionElement>;
}
