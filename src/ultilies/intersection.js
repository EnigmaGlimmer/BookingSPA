/**
 * Function that greets a user
 * @author   Tình
 * @param    {{min: Number, max: Number}[]} ranges    the collection of number ranges
 * @return   {Boolean}       Result of intersection between number ranges
 */
export function allIntersect(ranges) {
    // Create separate arrays for the min and max values.
    const minimums = ranges.map((r) => r.min);
    const maximums = ranges.map((r) => r.max);
    // Extract the comparands.
    const maximalMinimum = Math.max(...minimums);
    const minimalMaximum = Math.min(...maximums);

    return maximalMinimum <= minimalMaximum;
}
