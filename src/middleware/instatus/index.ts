import { Component, ComponentFilter } from 'root/@types/v3/status';

export type MethodType = {
    method: 'dns' | 'sl' | 'tp' | 'us' | 'web';
    secret: string;
}

export async function StatusRequestCompFilter({ method, secret }: MethodType): Promise<ComponentFilter> {

    let url;

    if (method == 'dns') url = `v2/ckq7ppm4g124913arohzh7jn9ek/components/ckq7pvha4166661arohq6spoouc`;

    else throw new Error('invalid method provided for instatus request');

    const res: any = await fetch(`https://api.instatus.com/${url}`, {
        headers: {
            Authorization: `Bearer ${secret}`
        }
    })

    return res.json();
}

export async function GetStatusSummary() {

    const res: any = await fetch('https://status.cordx.lol/summary.json');

    if (!res.ok || res.status !== 200) throw new Error('failed to fetch status summary');

    return res.json();
}

export async function GetComponents({ secret }): Promise<Component[]> {

    const res: any = await fetch(`https://api.instatus.com/v2/ckq7ppm4g124913arohzh7jn9ek/components`, {
        headers: {
            Authorization: `Bearer ${secret}`
        }
    });

    if (!res.ok || res.status !== 200) throw new Error('failed to fetch components');

    return res.json();
}