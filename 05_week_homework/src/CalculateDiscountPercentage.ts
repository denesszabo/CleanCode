enum DISCOUNT_LEVELS {
    standard = 5,
    silver = 10,
    gold = 20,
    unknown = 0,
}
export class DiscountCalculator {

    public getDiscountPercentageForLevel(level: string): number {
        const k = level as keyof typeof DISCOUNT_LEVELS;
        return Object.keys(DISCOUNT_LEVELS).includes(level) ?
            DISCOUNT_LEVELS[k] :
            0;
    }
}
