import moment from 'moment';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import useService from '../../hooks/useServices';
import { getBookingList } from '../../api';
import Booking from '../booking-calendar/booking';
import { Button } from 'react-bootstrap';

function Step3({
    setStep,
    valueCheckinDate,
    valueServiceId,
    parentServiceId,
    onChangeDate,
    onChangeTimeStart,
    onChangeTimeEnd,
    hourMorningWorkStart = 9,
    minuteMorningWorkStart = 0,
    hourMorningWorkEnd = 12,
    minuteMorningWorkEnd = 30,
    hourAfternoonWorkStart = 13,
    minuteAfternoonWorkStart = 0,
    hourAfternoonWorkEnd = 17,
    minuteAfternoonWorkEnd = 30,
}) {
    const [selectedDate, setSelectedDate] = useState();
    const [reservedTimeRange, setReversed] = useState([]);
    const [timeOffset, setTimeOffset] = useState(1);
    const [timeRange, setTimeRange] = useState([]);
    const [loading, setLoading] = useState(false);
    const sectionRef = useRef(null);

    const { services } = useService({
        request: {
            skip: 0,
            take: 100,
            flat: 0,
        },
    });

    const { services: childServices } = useService({
        request: {
            skip: 0,
            take: 100,
            flat: 1,
        },
    });

    //

    // Calculate the reversed time
    useEffect(() => {
        let searchBy = 'Date';
        let keyword = moment(selectedDate).format('DD/MM/YYYY');
        setLoading(true);
        getBookingList({
            orderBy: 'CreatedDate',
            searchBy: searchBy,
            keyword: keyword || moment().format('MM/YYYY'),
            skip: 0,
            take: 31,
        })
            .then((bookings) => {
                if (!Array.isArray(bookings?.list)) {
                    bookings.errors.forEach((msg) => {
                        toast.error(msg, {
                            autoClose: 3000,
                        });
                    });

                    return;
                }

                setReversed(
                    bookings?.list?.map?.((b) => {
                        const [hourStart, minuteStart] = b.slot.start_Hour.split(':');
                        const [hourEnd, minuteEnd] = b.slot.end_Hour.split(':');

                        let comparedServiceId =
                            childServices?.find?.((s) => s.serviceId === b.serviceId)?.parentId || b.serviceId;

                        return {
                            startTime: [hourStart, minuteStart].join(':'),
                            endTime: [hourEnd, minuteEnd].join(':'),
                            // isAllowed: b.serviceId !== valueServiceId,
                            isAllowed: comparedServiceId !== parentServiceId,
                        };
                    }),
                );

                setLoading(false);
            })
            .catch((error) => {
                toast.error(error);
                setLoading(false);
            });
    }, [selectedDate, valueServiceId, parentServiceId, services]);

    // Calculate the time offset
    useEffect(() => {
        if (services.length > 0) {
            let selectedDuration = services
                ?.reduce((pre, cur) => [...pre, cur, ...cur.childs], [])
                ?.find?.((item) => item.serviceId === valueServiceId)?.duration;
            if (selectedDuration) {
                let array = selectedDuration?.includes?.('-')
                    ? selectedDuration?.split('-')?.map?.((time) => {
                          const number = Number(time.match(/\d+/g)[0]);

                          return time.includes('hours') || time.includes('hour') ? number * 60 : number;
                      })
                    : (() => {
                          const number = Number(selectedDuration.match(/\d+/g)[0]);

                          return [
                              selectedDuration.includes('hours') || selectedDuration.includes('hour')
                                  ? number * 60
                                  : number,
                          ];
                      })();

                let timeOffset = Math.max(...array);

                // let timeOffset = Math.max(selectedDuration.match(/\d+/g));

                setTimeOffset(timeOffset);
            }
        }
    }, [services, valueServiceId]);

    // Create the array of time range
    useEffect(() => {
        // timeOffset has unit of minute
        function calcTimeRanges(timeOffset) {
            let totalWorkingTimeUnit = hourMorningWorkStart * 60 + minuteMorningWorkStart;

            let morningTimeArray = [];
            let afternoonTimeArray = [];

            while (totalWorkingTimeUnit <= hourAfternoonWorkEnd * 60 + minuteAfternoonWorkEnd) {
                let range;
                let h = Math.floor(totalWorkingTimeUnit / 60);
                let m = totalWorkingTimeUnit % 60;

                let nexth = Math.floor((totalWorkingTimeUnit + timeOffset - 1) / 60);
                let nextm = (totalWorkingTimeUnit + timeOffset - 1) % 60;
                let totalNextWorkingTimeUnit = nexth * 60 + nextm;

                if (
                    totalWorkingTimeUnit >= hourMorningWorkStart * 60 + minuteMorningWorkStart &&
                    totalWorkingTimeUnit < hourMorningWorkEnd * 60 + minuteMorningWorkEnd &&
                    totalNextWorkingTimeUnit >= hourMorningWorkStart * 60 + minuteMorningWorkStart &&
                    totalNextWorkingTimeUnit < hourMorningWorkEnd * 60 + minuteMorningWorkEnd
                ) {
                    range = [
                        `${h.toLocaleString('en-US', {
                            minimumIntegerDigits: 2,
                            useGrouping: false,
                        })}:${m.toLocaleString('en-US', {
                            minimumIntegerDigits: 2,
                            useGrouping: false,
                        })}`,
                        `${nexth.toLocaleString('en-US', {
                            minimumIntegerDigits: 2,
                            useGrouping: false,
                        })}:${nextm.toLocaleString('en-US', {
                            minimumIntegerDigits: 2,
                            useGrouping: false,
                        })}`,
                    ];
                    morningTimeArray = [...morningTimeArray, range];
                } else if (
                    totalWorkingTimeUnit >= hourAfternoonWorkStart * 60 + minuteAfternoonWorkStart &&
                    totalWorkingTimeUnit < hourAfternoonWorkEnd * 60 + minuteAfternoonWorkEnd &&
                    totalNextWorkingTimeUnit >= hourAfternoonWorkStart * 60 + minuteAfternoonWorkStart &&
                    totalNextWorkingTimeUnit < hourAfternoonWorkEnd * 60 + minuteAfternoonWorkEnd
                ) {
                    range = [
                        `${h.toLocaleString('en-US', {
                            minimumIntegerDigits: 2,
                            useGrouping: false,
                        })}:${m.toLocaleString('en-US', {
                            minimumIntegerDigits: 2,
                            useGrouping: false,
                        })}`,
                        `${nexth.toLocaleString('en-US', {
                            minimumIntegerDigits: 2,
                            useGrouping: false,
                        })}:${nextm.toLocaleString('en-US', {
                            minimumIntegerDigits: 2,
                            useGrouping: false,
                        })}`,
                    ];
                    afternoonTimeArray = [...afternoonTimeArray, range];
                }

                totalWorkingTimeUnit = totalWorkingTimeUnit + timeOffset;
            }

            return [...morningTimeArray, ...afternoonTimeArray];
        }

        let range = calcTimeRanges(timeOffset);

        setTimeRange(range);
    }, [
        timeOffset,
        hourMorningWorkStart,
        minuteMorningWorkStart,
        hourMorningWorkEnd,
        minuteMorningWorkEnd,
        hourAfternoonWorkStart,
        minuteAfternoonWorkStart,
        hourAfternoonWorkEnd,
        minuteAfternoonWorkEnd,
    ]);

    // Scroll to top
    useEffect(() => {
        if (sectionRef.current) {
            window.scrollTo({
                top: sectionRef.current.offsetTop - 10,
            });
        }
    }, []);

    const timeFrameContent = ``;

    return (
        <>
            <div className="booking-component my-5" id="booking_step3" ref={sectionRef}>
                <Booking
                    activeDate={valueCheckinDate}
                    initialTimeRange={
                        timeRange || [
                            ['08:30', '09:30'],
                            ['09:30', '10:30'],
                            ['10:30', '11:30'],
                            ['11:30', '12:30'],
                            ['13:30', '14:30'],
                            ['14:30', '15:30'],
                            ['15:30', '16:30'],
                            ['16:30', '17:30'],
                            ['17:30', '18:30'],
                        ]
                    }
                    reserved={reservedTimeRange}
                    timeFrameLoading={loading}
                    onChangeDate={(date) => {
                        onChangeDate(date);
                        setSelectedDate(date);
                    }}
                    onChangeTimeStart={(time) => {
                        onChangeTimeStart(time);
                    }}
                    onChangeTimeEnd={(time) => {
                        onChangeTimeEnd(time);
                    }}
                    onOverBook={() => {
                        toast.error("We're not working on the weekend", {
                            autoClose: 3000,
                        });
                    }}
                    title="Choose your time frame to send your request of booking to us"
                    content={timeFrameContent}
                ></Booking>
            </div>
            <div className="booking-service-description">
                <div className="mb-2">
                    <b>
                        {
                            services
                                ?.map((item) => item?.childs?.find((e) => e.serviceId === valueServiceId))
                                ?.find((item) => item !== undefined)?.serviceName
                        }
                    </b>
                </div>
                <div>
                    {
                        services
                            ?.map((item) => item?.childs?.find((e) => e.serviceId === valueServiceId))
                            ?.find((item) => item !== undefined)?.description
                    }
                </div>
            </div>

            <div className="booking-component-button-done">
                <Button
                    type="button"
                    variant="outline"
                    className="my-btn text-uppercase btn-primary-outline btn btn-outline px-5 mx-4"
                    onClick={() => setStep(2)}
                >
                    Back
                </Button>
                <Button
                    type="submit"
                    variant="outline"
                    className="my-btn text-uppercase px-5 btn-primary-outline btn btn-outline"
                    // onClick={() => validation.handleSubmit()}
                >
                    Submit Your Booking
                </Button>
            </div>
        </>
    );
}

export default Step3;
