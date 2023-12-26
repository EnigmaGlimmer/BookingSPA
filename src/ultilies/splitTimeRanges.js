import moment from 'moment';
// Function to split range of times between two moments
export function splitTimeRange(startTime, endTime, interval) {
    const timeSlots = [];

    let currentTime = moment(startTime);

    while (currentTime.isBefore(endTime)) {
        timeSlots.push(currentTime.format('HH:mm')); // Format as per your requirement
        currentTime.add(interval, 'hours'); // Add interval to the current time
    }

    return timeSlots;
}
