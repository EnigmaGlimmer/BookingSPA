import React from 'react';

import { Booking } from '../components';

// React Quill (text editor)
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function Demo() {
    return (
        <div>
            <ReactQuill
                onChange={(output) => {
                    var m,
                        urls = [],
                        rex = /<img[^>]+src="?([^"\s]+)"?\s*\/>/g;

                    const imageLinkRx = /src\s*=\s*"(.+?)"/g;

                    // console.log(output.match(imageLinkRx));
                    while ((m = imageLinkRx.exec(output))) {
                        urls.push(m[1]);
                    }

                    console.log(urls);
                }}
                modules={{
                    toolbar: [
                        [{ header: [1, 2, false] }],
                        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                        [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
                        ['link', 'image'],
                        ['clean'],
                    ],
                }}
                formats={[
                    'header',
                    'bold',
                    'italic',
                    'underline',
                    'strike',
                    'blockquote',
                    'list',
                    'bullet',
                    'indent',
                    'link',
                    'image',
                ]}
                onChangeSelection={() => {}}
            ></ReactQuill>
            <Booking
                initialTimeRange={[['', '']]}
                activeDate={new Date()}
                onChangeDate={(date) => {}}
                onChangeTimeStart={(startTime) => {}}
                onChangeTimeEnd={(endTime) => {}}
            ></Booking>
        </div>
    );
}

export default Demo;
