import React, {useState, useEffect} from 'react';
import { connect, styled, Global, css } from "frontity";
import Iframe from "@frontity/components/iframe";
import Link from './Link';

/**import react add to my calendar button */
import AddToCalendar from '@culturehq/add-to-calendar';
import calendarStyles from '@culturehq/add-to-calendar/dist/styles.css';

/**MOMENT TIME ZONE */
const moment = require('moment-timezone');

const EventDetails = ({state, libraries}) => {

    const data = state.source.get(state.router.link);
    
    const idEvent = data.id;

    const postEvent = state.source.allevents[idEvent];

    // Component exposed by html2react.
    const Html2React = libraries.html2react.Component;

    //DATE

    //const arrDate = postEvent.acf.start_date.split("/");

    const arrDateTimeStart = postEvent.acf.date_time_start.split(" ");

    const arrDateAlt = arrDateTimeStart[0].split("-");

    const timeStart = arrDateTimeStart[1];

    const arrDateTimeEnd = postEvent.acf.date_time_end.split(" ");

    const timeEnd = arrDateTimeEnd[1];

    //array months to get date data
    const monthsName = ['January', 'Febraury', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    //TIMEZONE
    let startDateTime = moment.tz(postEvent.acf.date_time_start, postEvent.acf.timezone);
    let endDateTime = moment.tz(postEvent.acf.date_time_end, postEvent.acf.timezone);

//TIMEZONE

//ADD TO MY CALENDAR
let event = {
    name: postEvent.acf.title,
    details: "Let's go after work",
    location: postEvent.acf.timezone,
    startsAt: startDateTime.format(),
    endsAt: endDateTime.format(),
}
// ADD TO MY CALENDAR ENDS 

    return ( 
        <EventDetailsContainer>
            <h1>{postEvent.acf.title}</h1> 
            <h3>{monthsName[arrDateAlt[1]-1]} {arrDateAlt[2]} 	&nbsp;	&nbsp; &nbsp; {timeStart} - {timeEnd} 	&nbsp;	&nbsp; &nbsp; Timezone: {postEvent.acf.timezone}</h3>

            {/* loading the styles for AddToCalendar  */}
            <Global styles={css(calendarStyles)} />

            {/* Use Html2React to render the post HTML content */}
            <VideoContainer>
                <Html2React html={postEvent.acf.video} /> 
                
                <div>
                    <p>{postEvent.acf.description}</p>
                    <AddToCalendar event={event} />
                </div>
            </VideoContainer>
         
            <MoreDetails>
                <div>
                    <h4>Details</h4>
                    <div>
                        
                        <span><strong>Date:</strong> <br></br> {monthsName[arrDateAlt[1]-1]} {arrDateAlt[2]}</span>
                    </div>
                    <div>
           
                        <span><strong>Time:</strong> <br></br> {timeStart} - {timeEnd}</span>
                    </div>
                    <div>
                        <span><strong>Cost:</strong> <br></br> Free</span>
                    </div>

                    <div>
                        <span><strong>Event Category: </strong> <br></br> {postEvent.category}</span>
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
    margin: 12rem 5rem 0 2rem;

    h3 {
        letter-spacing: 1px;
        font-size: 1.5rem;
    }

    @media(max-width: 768px) {
        margin: 8rem 1rem 0 1rem;
    }
`; 

const VideoContainer = styled.div`
    display: flex;
    justify-content: space-around;
    align-content: center;
    margin-top: 3rem;
    margin-bottom: 3rem;

    div {
        
        flex-basis: 40%;

        p {
            font-size: 1.2rem;
            font-weight: 400;
            margin-bottom: 2rem;
            text-align: justify;
        }
    }

    @media(max-width: 768px) {
        flex-direction: column;
        justify-content: center;
        align-items: center;
        
        iframe{
            max-width: 280px;
            max-height: 220px;
        }
    }
`;

export const MoreDetails = styled.div`
    display: flex;
    justify-content: space-between;
    max-width: 50%;

    div {
        margin-bottom: 1rem;

        span {
            text-transform: capitalize;
        }
    }

    h4 {
        font-size: 1.2rem;
    }

    @media(max-width: 768px) {
        max-width: 100%;
        flex-direction: column;
    }
`

export default connect(EventDetails);