import { Pipe } from "@angular/core";

@Pipe({
    name: 'pad',
    standalone: true
})
export class PadPipe {
    transform(value: any, length: number, padChar: string = '0'): string {
        return String(value).padStart(length, padChar);
    }
}