declare interface ChompData {
    svc: string;
    dsc: string;
    entries: Array<ChompDataEntry>;
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
}
