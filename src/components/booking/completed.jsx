import moment from 'moment';
import { Link } from 'react-router-dom';
import useService from 'hooks/useServices';

function BookingCompleted({ values, setStep }) {
    const { services } = useService({
        request: {
            skip: 0,
            take: 100,
            flat: 0,
        },
    });

    return (
        <div className="completed">
            <h1 className="completed-title">Great and thanks for your booking!</h1>
            <p className="completed-content">
                You have successfully booked the service with Little Daisy. Here is your booking information. Hope to
                see you then!
            </p>
            <div className="completed-form">
                <div className="completed-item-form">
                    <div className="completed-item">
                        <div className="completed-item-name">Services</div>
                        <div className="completed-item-content">
                            {services?.find((e) => e.serviceId === values.booking.serviceId)?.serviceName}
                        </div>
                    </div>
                    <div className="completed-item">
                        <div className="completed-item-name">Date</div>
                        <div className="completed-item-content">
                            {moment(values?.booking?.checkinDate).format('DD-MM-yyyy')}
                        </div>
                    </div>
                    <div className="completed-item">
                        <div className="completed-item-name">Time</div>
                        <div className="completed-item-content">
                            {values?.booking?.slot?.start_Hour} - {values?.booking?.slot?.end_Hour}
                        </div>
                    </div>
                    <div className="completed-item">
                        <div className="completed-item-name">Name</div>
                        <div className="completed-item-content">{values?.customer?.customerName}</div>
                    </div>
                    <div className="completed-item">
                        <div className="completed-item-name">Phone</div>
                        <div className="completed-item-content">{values?.customer?.customerPhone}</div>
                    </div>
                </div>
                {/* <div className="completed-mess">
                    <span>
                        <MdOutlineMailOutline></MdOutlineMailOutline>
                    </span>
                    <div className="completed-mess-content">{values.customer.messenger}</div>
                </div> */}
                {/* <span className="completed-total-fee">
                    <span className="completed-total-fee-title">Your service has a price</span>
                    <span className="completed-total-price">
                        <b>{services?.find((e) => e.serviceId === values.booking.serviceId)?.price}$</b>
                    </span>
                </span> */}
            </div>
            <div className="my-3 d-flex gap-2 justify-content-center" style={{ textAlign: 'center' }}>
                <button
                    className="my-btn text-uppercase btn-primary-outline btn btn-outline"
                    onClick={() => setStep(1)}
                >
                    Book Again
                </button>

                <Link to="/">
                    <button className="my-btn text-uppercase btn-primary-outline btn btn-outline">Homepage</button>
                </Link>
            </div>
        </div>
    );
}

export default BookingCompleted;
