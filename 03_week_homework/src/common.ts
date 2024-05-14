export function delay(millisecond: number) : Promise<void> {
    return new Promise<void>((resolve) => {
        setTimeout(resolve, millisecond);
    })
}
