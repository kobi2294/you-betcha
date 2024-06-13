export interface ConfirmDialogInput {
    verifyText?: string;
    title?: string;
    message?: string;
    okLabel?: string;
    cancelLabel?: string;
}

export interface ConfigDialogOutput {
    ok: boolean;
}