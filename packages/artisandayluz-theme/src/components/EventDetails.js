import React, {useState, useEffect} from 'react';
import { connect, styled } from "frontity";
import Iframe from "@frontity/components/iframe";
import Link from './Link';

const EventDetails = ({state, libraries}) => {

    const data = state.source.get(state.router.link);
    
    const idEvent = data.id;

    const postEvent = state.source.allevents[idEvent];

    console.log("postevent: ", postEvent);

    // Component exposed by html2react.
    const Html2React = libraries.html2react.Component;

    //DATE

    const arrDate = postEvent.acf.start_date.split("/");
    //array months to get date data
    const monthsName = ['January', 'Febraury', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    return ( 
        <EventDetailsContainer>
            <h1>{postEvent.acf.title} - You can change this title</h1> 
            <h3>{monthsName[arrDate[1]-1]} {arrDate[0]} {postEvent.acf.start_time} - {postEvent.acf.end_time}</h3>
            {/* Use Html2React to render the post HTML content */}
            <VideoContainer>
                <Html2React html={postEvent.acf.video} /> 
            </VideoContainer>
            <p>{postEvent.acf.description}</p>
         
            <MoreDetails>
                <div>
                    <h4>Details</h4>
                    <div>
                        
                        <span><strong>Date:</strong> <br></br> {monthsName[arrDate[1]-1]} {arrDate[0]}</span>
                    </div>
                    <div>
           
                        <span><strong>Time:</strong> <br></br> {postEvent.acf.start_time} - {postEvent.acf.end_time}</span>
                    </div>
                    <div>
                        <span><strong>Cost:</strong> <br></br> Free</span>
                    </div>

                    <div>
                        <span><strong>Event Category: </strong> <br></br> Online Events</span>
                    </div>

                    <div>
                        <span><strong>Language: </strong> <br></br> {postEvent.acf.language_event}</span>
                    </div>
                </div>

                <div>
                    <h4>Organizer</h4>
                    <div>
                        <span>{postEvent.acf.organizer}</span>
                    </div>
                    <div>
                        <span><strong>Email: </strong> <br></br> organizer@example.com</span>
                    </div>
                    <div>
                        <a href={postEvent.acf.link_to_website} target="_blank" rel="noopener noreferrer">View Organizer Website</a>
                    </div>
                </div>
                
            </MoreDetails>
 
        </EventDetailsContainer>
    );
}
 
export const EventDetailsContainer = styled.div`
    margin: 8rem 2rem 0 2rem;

    h3 {
        letter-spacing: 1px;
        font-size: 1.5rem;
    }

    p {
        font-size: 1.2rem;
        font-weight: 400;
    }

    div {
        margin-bottom: 1rem;
    }
`; 

const VideoContainer = styled.div`
    text-align: center;
`;

export const MoreDetails = styled.div`
    display: flex;
    justify-content: space-between;
    max-width: 50%;

    h4 {
        font-size: 1.2rem;
    }
`

export default connect(EventDetails);