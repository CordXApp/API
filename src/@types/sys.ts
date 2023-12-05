export type WebsiteStats = {
    users: number;
    images: number;
    downloads: number;
}

export type ProjectVersions = {
    current: {
        api: string;
        client: string;
        website: string;
        documentation: string;
    },
    newest: {
        api: string;
        client: string;
        website: string;
        documentation: string;
    },
    stable: {
        api: string;
        client: string;
        website: string;
        documentation: string;
    }
}

export type TeamList = {
    staff: [StaffList] | null;
}

export type StaffList = {
    id: string;
    username: string;
    globalName: string;
    avatarURL: string;
    developer: boolean;
    staff: boolean;
}