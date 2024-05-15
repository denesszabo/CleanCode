import { DiscountCalculator } from "../src/CalculateDiscountPercentage";

describe('DiscountCalculator tests', () => {

    const cases = [
        {
            level: 'standard',
            expected: 5,
        },
        {
            level: 'silver',
            expected: 10,
        },
        {
            level: 'gold',
            expected: 20,
        },
        {
            level: 'unknown',
            expected: 0,
        }
    ]

    it.each(cases)('should return $expected percent for $level level', ({level, expected}) => {
        const sut = new DiscountCalculator();
        const result = sut.getDiscountPercentageForLevel(level);
        expect(result).toBe(expected);
    })
})
