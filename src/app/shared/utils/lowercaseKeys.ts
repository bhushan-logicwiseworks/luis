export function lowerCaseKeysInArrayOfObjects(arr: any) {
    if (arr && !arr[0]) {
        return [];
    }
    return arr.map(obj =>
        Object.entries(obj).reduce((a, [k, v]) => {
            if (!Array.isArray(v)) {
                a[k.substring(0, 1).toLowerCase() + k.substr(1)] = isNaN(Number(v)) ? v : Number(v);
                return a;
            }
            a[k.substring(0, 1).toLowerCase() + k.substr(1)] = lowerCaseKeysInArrayOfObjects(v);
            return a;
        }, Object.create(null))
    );
}
