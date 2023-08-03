import React from 'react';
// PropTypes
import PropTypes from 'prop-types';

const SpaceTimeFrame = ({
    reserved = [
        ['1:00pm', '2:00pm'],
        ['4:00pm', '5:00pm'],
    ],
    onChangeTimeStart,
    onChangeTimeEnd,
}) => {
    const spaces = [
        ['1:00pm', '2:00pm'],
        ['3:00pm', '4:00pm'],
        ['5:00pm', '6:00pm'],
    ];

    return (
        <div>
            <h2>Space Time Frame</h2>
            {spaces.map((space, key) => {
                return (
                    <button
                        key={key}
                        onClick={() => {
                            let startTime = space[0];

                            onChangeTimeStart(startTime);

                            let endTime = space[1];

                            onChangeTimeEnd(endTime);
                        }}
                    >
                        {space.join(' - ')}
                    </button>
                );
            })}
        </div>
    );
};

SpaceTimeFrame.propTypes = {
    // reserved: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string.isRequired, PropTypes.string.isRequired)),
};

export default SpaceTimeFrame;
