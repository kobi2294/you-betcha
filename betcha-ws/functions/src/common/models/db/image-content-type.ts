export const IMAGE_CONTENT_TYPES = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'] as const;

export type ImageContentType = typeof IMAGE_CONTENT_TYPES[number];  
