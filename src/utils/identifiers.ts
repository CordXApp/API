import { ProcessEnvOptions } from 'child_process';
import crypto from 'crypto';

export class Identifiers {

    public opts: { length: number };

    constructor(options: { length: number }) {
        this.opts = options;
    }

    public generateSecret(): string {
        let identifier = '';
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let charactersLength = characters.length;

        for (let i = 0; i < this.opts.length; i++) identifier += characters.charAt(Math.floor(Math.random() * charactersLength));

        return identifier;
    }

    public async generateAsyncSecret(): Promise<string> {
        return new Promise((resolve, reject) => {
            try {
                let identifier = '';
                let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                let charactersLength = characters.length;

                for (let i = 0; i < this.opts.length; i++) identifier += characters.charAt(Math.floor(Math.random() * charactersLength));

                resolve(identifier);
            } catch (e: any) {
                reject(e);
            }
        });
    }

    public generateHash(): string {
        let identifier = '';
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let charactersLength = characters.length;

        for (let i = 0; i < this.opts.length; i++) identifier += characters.charAt(Math.floor(Math.random() * charactersLength));

        return crypto.createHash('sha256').update(identifier).digest('hex');
    }

    public async generateHashAsync(): Promise<string> {
        return new Promise((resolve, reject) => {
            try {
                let identifier = '';
                let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                let charactersLength = characters.length;

                for (let i = 0; i < this.opts.length; i++) identifier += characters.charAt(Math.floor(Math.random() * charactersLength));

                resolve(crypto.createHash('sha256').update(identifier).digest('hex'));
            } catch (e: any) {
                reject(e);
            }
        });
    }

    public encrypt(data: string, credentials: { key: ProcessEnvOptions, iv: ProcessEnvOptions }): string {

        let cipher = crypto.createCipheriv('aes-256-cbc', credentials.key as string, credentials.iv as string);

        let encrypted = cipher.update(data, 'utf8', 'hex');

        encrypted += cipher.final('hex');

        return encrypted;
    }

    public decrypt(data: string, credentials: { key: ProcessEnvOptions, iv: ProcessEnvOptions }): string {

        let decipher = crypto.createDecipheriv('aes-256-cbc', credentials.key as string, credentials.iv as string);

        let decrypted = decipher.update(data, 'hex', 'utf8');

        decrypted += decipher.final('utf8');

        return decrypted;
    }
}