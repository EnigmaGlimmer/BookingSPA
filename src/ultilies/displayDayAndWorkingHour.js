export function displayDayAndWorkingHour(workingHours) {
    const workingDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    if (workingHours.length < 1) {
        return null;
    }

    let firstHourStart = workingHours?.[0].start;
    let firstHourEnd = workingHours?.[0].end;

    let isAllSameHour =
        workingDays.every((d) => workingHours.some((wh) => wh.day === d)) &&
        workingHours.every((wh) => wh.start === firstHourStart && wh.end === firstHourEnd);

    if (isAllSameHour) {
        return `Mon - Sat: ${firstHourStart} - ${firstHourEnd}`;
    }

    let isEvenDay = workingDays.filter((_, id) => id % 2 === 0).every((d) => workingHours.some((wh) => wh.day === d)) && ;

    if (isEvenDay) {
        return `Mon-Wed-Fri: `;
    }

    let isOvenDay = workingDays.filter((_, id) => id % 2 !== 0).every((d) => workingHours.some((wh) => wh.day === d));
    if (isOvenDay) {
        return 'Tue-Thu-Sat: ';
    }
}
