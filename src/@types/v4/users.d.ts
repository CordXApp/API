export type Snowflake = string;

export interface userStates {
    id: number;
    owner: boolean;
    admin: boolean;
    moderator: boolean;
    verified: boolean;
    beta: boolean;
}

export type DiscordUser = {
    id: Snowflake;
    username?: string;
    global_name?: string;
    discriminator?: any;
    accent_color?: ColorData['accent_color'];
    banner_color?: ColorData['banner_color'];
    created_at?: any;
    avatar?: string;
    banner?: string;
    avatar_info: AvatarData;
    banner_info: BannerData;
}

export type AvatarDecorationData = {
    asset: string;
    sku_id: string;
}

export type AvatarData = {
    hash: DiscordUser['avatar'];
    url: string;
    animated: any;
}

export type BannerData = {
    hash: DiscordUser['banner'];
    url: string;
    color: number | null;
    animated: any;
}

export type ColorData = {
    accent_color: number | null;
    banner_color: number | null;
}

export type UserStats = {
    id: string;
    username: string;
    storage: {
        used: any;
        remains: string;
    },
    files: {
        images: number;
        downloads: number;
    },
    types: {
        image: {
            "image/png": number;
            "image/gif": number;
            "image/jpg": number;
            "image/jpeg": number;
        },
        video: {
            "video/mp4": number;
            "video/webm": number;
        }
    }
}