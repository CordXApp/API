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
     avatar?: AvatarData;
     banner?: BannerData;
}

export type AvatarDecorationData = {
     asset: string;
     sku_id: string;
}

export type AvatarData = {
     id: DiscordUser['avatar'];
     link: string;
     is_animated: any;
}

export type BannerData = {
     id: DiscordUser['banner'];
     link: string;
     color: number | null;
     is_animated: any;
}

export type ColorData = {
     accent_color: number | any;
     banner_color: number | any;
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
