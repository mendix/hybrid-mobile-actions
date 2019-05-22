interface Window {
    plugins?: {
        calendar?: CordovaCalendar;
    };
    device?: CordovaDevice;
    resolveLocalFileSystemURL(uri: string, success: (fileEntry) => void, error: (error) => void): void;
}

interface CordovaCalendar {
    openCalendar(date?: Date, success?: (message: any) => void, error?: (error: string) => void): void;
    createEventInteractively(
        title?: string,
        eventLocation?: string,
        notes?: string,
        startDate?: Date,
        endDate?: Date,
        success?: (message: any) => void,
        error?: (error: string) => void
    ): void;
}

interface CordovaDevice {
    /** The name of the device's model or product */
    model: string;
    /** The device's operating system name */
    platform: string;
    /** The device's Universally Unique Identifier */
    uuid: string;
    /** The operating system version */
    version: string;
    /** The device's manufacturer */
    manufacturer: string;
    /** Whether the device is running on a simulator. */
    isVirtual: boolean;
}
