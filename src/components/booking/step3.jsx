import moment from 'moment';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import useService from '../../hooks/useServices';
import { getBookingList } from '../../api';
import Booking from '../booking-calendar/booking';
import { Button } from 'react-bootstrap';
import { useBookingFormContext } from 'context/bookingFormContext';

function Step3({
    setStep,
    validation,
    valueCheckinDate,
    valueServiceId,
    onChangeDate,
    onChangeTimeStart,
    onChangeTimeEnd,
}) {
    const sectionRef = useRef(null);

    const { services } = useService({
        request: {
            skip: 0,
            take: 100,
            flat: 0,
        },
    });

    const { handleChange, timeFrames, loading } = useBookingFormContext();

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
                    allowDatesToBook={[moment('2023-12-24').toDate()]}
                    notAllowDatesToBook={[
                        {
                            startDate: moment('2024-02-09').toDate(),
                            endDate: moment('2024-02-11').toDate(),
                        },
                    ]}
                    initialTimeRange={timeFrames}
                    timeFrameLoading={loading}
                    onChangeDate={(date) => {
                        handleChange(moment(date).format('YYYY-MM-DD'), valueServiceId);
                        onChangeDate(date);
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
