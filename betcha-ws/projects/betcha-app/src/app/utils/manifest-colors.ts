import { DOCUMENT } from "@angular/common";
import { DbModel } from "@tscommon";

export const MANIFEST_COLORS: Record<DbModel.ColorTheme, string> = {
    'brown': '#d7ccc8', 
    'teal': '#b2dfdb',
    'blue': '#c5cae9',
    'green': '#c8e6c9',
    'red': '#ffcdd2',
    'orange': '#ffccbc',
    'purple': '#d1c4e9'
}


export function changeTheme(theme: DbModel.ColorTheme, document: Document) {
    try {
        const elemManifest = document.querySelector('link[rel="manifest"]') as HTMLLinkElement;
        const elemTheme = document.querySelector('meta[name="theme-color"]') as HTMLMetaElement;

        const manifestFile = `manifest-${theme}.webmanifest`;
    
        if (elemManifest && elemTheme) {
            elemManifest.setAttribute('href', manifestFile);
            elemTheme.setAttribute('content', MANIFEST_COLORS[theme]);
        }    
    } catch (error) {
        console.error('Error changing theme', error);
    }
    
}