export function formatData<T>(data: T): T {
    if (Array.isArray(data)) {
        return data.map((item) => formatData(item)) as unknown as T;
    } else if (typeof data == "object" && data != null) {
        const transformed: Record<string, any> = {};
        for (const [key, val] of Object.entries(data)) {
            // cannot stringify a bigint
            transformed[key] = typeof val == "bigint" ? val.toString() : val;
        }
        return transformed as T;
    }
    return data;
}
