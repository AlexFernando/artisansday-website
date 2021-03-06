import React, {useState, useEffect} from 'react';
import { connect, styled, Global, css } from "frontity";
import Iframe from "@frontity/components/iframe";
import Link from './Link';

/**import react add to my calendar button */
import AddToCalendar from '@culturehq/add-to-calendar';
import calendarStyles from '@culturehq/add-to-calendar/dist/styles.css';
import {hoursStringToDecimal} from '../helpers/index'
import {decimalHoursToString} from '../helpers/index';
//COLOCAR UN INPUT PARA MINUTOS Y OTRO PARA HORAS CON UN FORMATO ESPECIFICO, LUEGO ANTES DE AGREGAR AL CALENDARIO SUMAR CON EL INPUT DE DATE TIME START, PARA OBTENER TIME END
///FINALMENTE BORRAR TODOS LOS TIME_ENDS DEL CODIGO GENERAL

/**MOMENT TIME ZONE */
const moment = require('moment-timezone');

const EventDetails = ({state, libraries}) => {

    const data = state.source.get(state.router.link);
    
    const idEvent = data.id;

    const postEvent = state.source.allevents[idEvent];

    // Component exposed by html2react.
    const Html2React = libraries.html2react.Component;

    //DATE

    const durationEventStr = postEvent.acf.duration_event;

    const arrDateTimeStart = postEvent.acf.date_time_start.split(" ");

    const arrDateAlt = arrDateTimeStart[0].split("-");
    const timeStart = arrDateTimeStart[1];
    const timeStartShort = timeStart.substring(0, timeStart.length -3)

    const totalHoursDateTimeStart = hoursStringToDecimal(timeStartShort)

    const totalHoursDurationEvents = hoursStringToDecimal(durationEventStr)

    const totalHours = totalHoursDateTimeStart + totalHoursDurationEvents;

    const finalTimeEnd = decimalHoursToString(totalHours);
    
    let myFinalDateTimeEnd = arrDateTimeStart[0]+" "+ finalTimeEnd + ":00"

    const arrDateTimeEnd = myFinalDateTimeEnd.split(" ");
    const timeEnd = arrDateTimeEnd[1];
    const timeEndShort = timeEnd.substring(0, timeEnd.length -3);

    let cityArr = postEvent.acf.timezone.split("/");
    console.log("cityArr: ", cityArr)
                                        
    let cityVenue = cityArr[cityArr.length -1];
                                
    //array months to get date data
    const monthsName = ['January', 'Febraury', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    //TIMEZONE
    let startDateTime = moment.tz(postEvent.acf.date_time_start, postEvent.acf.timezone);
    let endDateTime = moment.tz(myFinalDateTimeEnd, postEvent.acf.timezone);

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
            <h3>{monthsName[arrDateAlt[1]-1]} {arrDateAlt[2]} 	&nbsp;	&nbsp; &nbsp; {timeStartShort} - {timeEndShort} 	&nbsp;	&nbsp; &nbsp; Timezone: {cityVenue}</h3>
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
                        <span><strong>Time:</strong> <br></br> {timeStartShort} - {timeEndShort}</span>
                    </div>
                    <div>
                        <span><strong>Cost:</strong> <br></br> {postEvent.acf.cost}</span>
                    </div>

                    <div>
                        <span css={css`text-transform:capitalize;`}><strong>Event Category: </strong> <br></br> {postEvent.category}</span>
                    </div>

                    <div>
                        <span css={css`text-transform:capitalize;`}><strong>Language: </strong> <br></br> {postEvent.acf.language_event}</span>
                    </div>
                </div>

                <div>
                    <h4>Organizer</h4>
                    <div>
                        <span css={css`text-transform:capitalize;`}>{postEvent.acf.organizer}</span>
                    </div>
                    <div>
                        <span><strong>Email: </strong> <br></br> {postEvent.acf.organizer_email}</span>
                    </div>
                    <div>
                        <a href={postEvent.acf.link_to_website} target="_blank" rel="noopener noreferrer">View Organizer Website</a>
                    </div>
                </div>

                <div>
                    <h4>Venue / Address</h4>
                    <div>
                        <span css={css`text-transform:capitalize;`}>{postEvent.acf.address}</span>
                    </div>
                    <div>
                        <span>{postEvent.acf.city}{", "}{postEvent.acf.country}</span>
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