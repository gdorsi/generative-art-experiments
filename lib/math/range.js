export function range(start, end, step = () => 1) {
    const arr = [];

    while (start < end) {
        arr.push(start);
        start += step(start);
    }

    arr.push(end);

    return arr;
}
