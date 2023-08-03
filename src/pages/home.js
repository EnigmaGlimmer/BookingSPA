import React from 'react';

function Home() {
    return <section className="container">
        <div className='banner'>
            <h1>Lorem ipsum dolor sit, consectetur adipiscing elit</h1>
            <div className='banner-img'>
                <div className='banner-img-big'>
                    <img alt='banner' src='https://www.rd.com/wp-content/uploads/2020/04/GettyImages-1093840488-5-scaled.jpg' width={"100%"}/>
                </div>
                <div className='banner-img-big'>
                    <img alt='banner' src='https://www.rd.com/wp-content/uploads/2020/04/GettyImages-1093840488-5-scaled.jpg'  width={"100%"}/>
                </div>
                <div className='banner-img-small'>
                    <img alt='banner' src='https://www.rd.com/wp-content/uploads/2020/04/GettyImages-1093840488-5-scaled.jpg'  width={"100%"}/>
                </div>
            </div>
        </div>
    </section>;
}

export default Home;
