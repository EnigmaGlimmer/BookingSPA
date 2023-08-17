import React from 'react';

// momentjs
import moment from 'moment';

// React Bootstrap
import { Button, Table } from 'react-bootstrap';

function AdminTestimonials() {
    const [
        testimonials,
        // setTestimonials
    ] = React.useState([]);
    return (
        <section>
            <h3>Testimonials</h3>
            <Button variant="outine">+ Add new item</Button>
            <Table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Comment</th>
                        <th>Star</th>
                        <th>Posted At</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>
                            <img src="" alt=""></img>superbrowly@testimonials.com
                        </td>
                        <td>
                            Ullamco velit adipisicing veniam consectetur consectetur cillum ut amet aliqua. Nulla irure
                            labore ex nisi elit reprehenderit proident officia commodo minim. Voluptate cupidatat
                            deserunt eiusmod duis. Eu duis non sint consectetur pariatur deserunt Lorem. Anim sint magna
                            ad et elit ipsum ut deserunt dolore laboris. Duis non eiusmod pariatur eiusmod magna laborum
                            labore consequat consectetur nulla laborum tempor ex. Deserunt qui duis in labore quis
                            ullamco minim voluptate occaecat ut anim enim occaecat.
                        </td>
                        <td>5</td>
                        <td>{moment().format('MMMM DD, YYYY')}</td>
                        <td>
                            <Button variant="outlet">Edit</Button>
                        </td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>
                            <img src="" alt=""></img>superbrowly@testimonials.com
                        </td>
                        <td>
                            Ullamco velit adipisicing veniam consectetur consectetur cillum ut amet aliqua. Nulla irure
                            labore ex nisi elit reprehenderit proident officia commodo minim. Voluptate cupidatat
                            deserunt eiusmod duis. Eu duis non sint consectetur pariatur deserunt Lorem. Anim sint magna
                            ad et elit ipsum ut deserunt dolore laboris. Duis non eiusmod pariatur eiusmod magna laborum
                            labore consequat consectetur nulla laborum tempor ex. Deserunt qui duis in labore quis
                            ullamco minim voluptate occaecat ut anim enim occaecat.
                        </td>
                        <td>5</td>
                        <td>{moment().format('MMMM DD, YYYY')}</td>
                        <td>
                            <Button variant="outlet">Edit</Button>
                        </td>
                    </tr>
                </tbody>
            </Table>
            {testimonials.map((testimonial) => {
                return <></>;
            })}
        </section>
    );
}

export default AdminTestimonials;
