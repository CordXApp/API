export default async function formatSizeUnits({ bytes }): Promise<number> {

    if (!bytes) throw new Error('No bytes provided');

    if (bytes >= 1073741824) { bytes = (bytes / 1073741824).toFixed(2) + ' GB'; };
    if (bytes >= 1048576) { bytes = (bytes / 1048576).toFixed(2) + ' MB'; };
    if (bytes >= 1024) { bytes = (bytes / 1024).toFixed(2) + ' KB'; };
    if (bytes > 1) { bytes = bytes + ' bytes'; };
    if (bytes == 1) { bytes = bytes + ' byte'; };
    if (bytes == 0) { bytes = '0 byte'; };

    return bytes;
}