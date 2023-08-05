import React from 'react';

// React Bootstrap
import { Button } from 'react-bootstrap';

// React Icon
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';

function Pagination({
    activePage = 1,
    pageNumbers = 6,
    limited = 3,
    containerClass,
    hoverClass,
    leftIconComponent,
    rightIconComponent,
    activePageComponent,
    normalPageComponent,
}) {
    return (
        <div className={containerClass}>
            <span className="me-2">{leftIconComponent?.() || <AiOutlineLeft></AiOutlineLeft>}</span>
            {Array.from(Array(pageNumbers).keys()).map((_, index) => {
                if (activePage === index + 1) {
                    return (
                        activePageComponent?.(index + 1) || (
                            <span
                                className="p-3"
                                style={{
                                    border: '1px solid var(--clr-border)',
                                    borderRadius: '50%',
                                    cursor: 'pointer',
                                    width: '30px',
                                    height: '30px',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                {index + 1}
                            </span>
                        )
                    );
                }
                if (index + 1 <= limited) {
                    return (
                        normalPageComponent?.(index + 1) || (
                            <span
                                key={index}
                                className={'p-3' + ` ${hoverClass}`}
                                style={{
                                    cursor: 'pointer',
                                }}
                            >
                                {index + 1}
                            </span>
                        )
                    );
                }
            })}
            <span className="ms-2">{rightIconComponent?.() || <AiOutlineRight></AiOutlineRight>}</span>
        </div>
    );
}

export default Pagination;
