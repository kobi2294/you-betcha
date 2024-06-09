import { DOCUMENT } from "@angular/common";
import { inject } from "@angular/core";

export function readFile(file: File): Promise<ArrayBuffer> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as ArrayBuffer);
        reader.onerror = reject;
        reader.readAsArrayBuffer(file);
    });
}

export async function fileToNumberArray(file: File): Promise<number[]> {
    const arrayBuffer = await readFile(file);
    const uint8Array = new Uint8Array(arrayBuffer);
    return Array.from(uint8Array);
}

export function loadImageFromArrayBuffer(arrayBuffer: ArrayBuffer, fileType: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const image = new Image();
        const blob = new Blob([arrayBuffer], { type: fileType });
        image.onload = () => {
            URL.revokeObjectURL(image.src);
            resolve(image);
        }
        image.onerror = reject;
        image.src = URL.createObjectURL(blob);
    });
}

export function imageResizer() {
    const document = inject(DOCUMENT);

    function _resizeImageToCanvas(image: HTMLImageElement, maxWidth: number, maxHeight: number): HTMLCanvasElement {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d')!;
    
        let width = image.width;
        let height = image.height;
    
        if (width > height) {
            if (width > maxWidth) {
                height *= maxWidth / width;
                width = maxWidth;
            }
        } else {
            if (height > maxHeight) {
                width *= maxHeight / height;
                height = maxHeight;
            }
        }
    
        canvas.width = width;
        canvas.height = height;
    
        ctx.drawImage(image, 0, 0, width, height);
    
        return canvas;
    }

    function _canvasToFile(canvas: HTMLCanvasElement, fileType: string, quality: number): Promise<File> {
        return new Promise((resolve, reject) => {
            canvas.toBlob(blob => {
                if (blob) {
                    resolve(new File([blob], 'image.'+fileType, { type: fileType, lastModified: Date.now()}));
                } else {
                    reject(new Error('Failed to create blob'));
                }
            }, fileType, quality);
        });
    }


    async function _resizeImage(file: File, maxWidth: number, maxHeight: number, quality: number = 0.8): Promise<File> {
        const arrayBuffer = await readFile(file);
        const image = await loadImageFromArrayBuffer(arrayBuffer, file.type);
        const canvas = _resizeImageToCanvas(image, maxWidth, maxHeight);
        const res = await _canvasToFile(canvas, file.type, quality);
        return res;    
    }
    
    

    return {
        resize: _resizeImage
    }
}




