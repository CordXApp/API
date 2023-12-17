export type Magic8Ball = {
    response: string;
}

export type AdviceSlip = {
    advice: {
        slip: {
            id: number;
            advice: string;
        }
    };
}