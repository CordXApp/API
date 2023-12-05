export default async function snowflakeToTimestamp(snowflake: string): Promise<number> {
    try {
        if (!snowflake) throw new Error('No snowflake provided');

        //@ts-expect-error
        let timestamp = (BigInt(snowflake) >> BigInt(22)) + 1420070400000n;

        return Number(timestamp);
    } catch (e: any) {
        throw new Error(e);
    }
}