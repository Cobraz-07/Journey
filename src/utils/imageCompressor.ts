export interface CompressionOptions {
    maxWidth?: number;
    maxHeight?: number;
    quality?: number; // 0.1 to 1.0 (default: 0.85)
    maxOriginalSizeMB?: number; // default: 15MB
}

export interface CompressedImageResult {
    file: File;
    originalSize: number;
    compressedSize: number;
    savingsPercentage: number;
    previewUrl: string;
}

/**
 * Validates that the file is an image and does not exceed the raw size limit.
 */
export function validateImageFile(file: File, maxMB = 15): { valid: boolean; error?: string } {
    if (!file.type.startsWith("image/")) {
        return { valid: false, error: "El archivo seleccionado no es una imagen válida." };
    }

    const maxBytes = maxMB * 1024 * 1024;
    if (file.size > maxBytes) {
        return {
            valid: false,
            error: `La imagen original supera el límite permitido de ${maxMB}MB (${formatFileSize(file.size)}).`,
        };
    }

    return { valid: true };
}

/**
 * Formats a byte number to a human-readable string (KB/MB).
 */
export function formatFileSize(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

/**
 * Compresses an image file to WebP format using HTML5 Canvas and resizes if needed.
 */
export async function compressImageToWebP(
    file: File,
    options: CompressionOptions = {}
): Promise<CompressedImageResult> {
    const {
        maxWidth = 1920,
        maxHeight = 1920,
        quality = 0.85,
        maxOriginalSizeMB = 15,
    } = options;

    const validation = validateImageFile(file, maxOriginalSizeMB);
    if (!validation.valid) {
        throw new Error(validation.error);
    }

    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onerror = () => reject(new Error("No se pudo leer el archivo de imagen."));

        reader.onload = (e) => {
            const img = new Image();
            img.onerror = () => reject(new Error("No se pudo cargar la imagen para procesar."));

            img.onload = () => {
                let { width, height } = img;

                // Calculate aspect-ratio preserving dimensions
                if (width > maxWidth || height > maxHeight) {
                    if (width / height > maxWidth / maxHeight) {
                        height = Math.round((height * maxWidth) / width);
                        width = maxWidth;
                    } else {
                        width = Math.round((width * maxHeight) / height);
                        height = maxHeight;
                    }
                }

                const canvas = document.createElement("canvas");
                canvas.width = width;
                canvas.height = height;

                const ctx = canvas.getContext("2d");
                if (!ctx) {
                    reject(new Error("No se pudo inicializar el contexto 2D del canvas."));
                    return;
                }

                // Smooth resizing
                ctx.imageSmoothingEnabled = true;
                ctx.imageSmoothingQuality = "high";
                ctx.drawImage(img, 0, 0, width, height);

                // Convert to webp
                canvas.toBlob(
                    (blob) => {
                        if (!blob) {
                            reject(new Error("Error al convertir la imagen a formato WebP."));
                            return;
                        }

                        // Generate clean filename with .webp extension
                        const baseName = file.name.replace(/\.[^/.]+$/, "").replace(/[^a-zA-Z0-9_-]/g, "_");
                        const compressedFileName = `${baseName}_${Date.now()}.webp`;
                        const compressedFile = new File([blob], compressedFileName, {
                            type: "image/webp",
                            lastModified: Date.now(),
                        });

                        const previewUrl = URL.createObjectURL(blob);
                        const originalSize = file.size;
                        const compressedSize = blob.size;
                        const savingsPercentage = Math.max(
                            0,
                            Math.round(((originalSize - compressedSize) / originalSize) * 100)
                        );

                        resolve({
                            file: compressedFile,
                            originalSize,
                            compressedSize,
                            savingsPercentage,
                            previewUrl,
                        });
                    },
                    "image/webp",
                    quality
                );
            };

            img.src = e.target?.result as string;
        };

        reader.readAsDataURL(file);
    });
}
