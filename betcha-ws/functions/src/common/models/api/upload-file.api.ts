import { ImageContentType } from "../db/image-content-type";

export interface UploadFileRequest {
    readonly id: string;
    readonly fileType: ImageContentType;
    readonly content: number[];
}