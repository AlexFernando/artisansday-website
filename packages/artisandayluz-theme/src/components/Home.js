import React, {useEffect} from 'react';
import { connect, styled, css } from "frontity";
import Image from "@frontity/components/image";
import Link from './Link';
import {EventItem, EventInfo, EventInfoFirst, EventInfoSecond, EventWrapLink, ImageStyled} from './allEvents';
import LinkButtonHome from './LinkButtonHome';
import LinkButtonHomeSecond from './LinkButtonHomeSecond';
import Loading from './Loading';

const HomePage = ({state, actions, libraries}) => {

    const pageHome = state.source.page[121];

    useEffect( () => {
    
        if(state.theme.lang === "en") {
            actions.source.fetch("/allevents")
        }

        else if (state.theme.lang === "fr") {
            console.log("claro")
            actions.source.fetch("/fr/allevents")
        }

        else {
            actions.source.fetch("/es/allevents")
        }

    }, [])

    const data = state.theme.lang === "en" ? state.source.get('/allevents') : state.theme.lang === "fr" ? state.source.get('/fr/allevents') : state.source.get('/es/allevents')

    // Today events

    const today = new Date();
    let currentDay = today.getDate();
    let currentMonth = today.getMonth() + 1; 
    let currentYear = today.getFullYear();

    let currentMonthString = "";

    if(currentMonth.toString().length === 1) {
        currentMonthString = "0"+currentMonth.toString()
    }
    else {
        currentMonthString = currentMonth.toString();
    }

    let dateOfToday = currentDay.toString()+"/"+currentMonthString+"/"+currentYear.toString(); 

    let eventsOfToday = [];

    if(data.isReady) {
        data.items.map( ({id}) => {
            const singleEvent = state.source.allevents[id];

            const arrDateTimeStart = singleEvent.acf.date_time_start.split(" ");

            const stringDate= arrDateTimeStart[0].split("-").reverse().join("/");

            //get events of today
            if(stringDate === dateOfToday) {
                eventsOfToday.push(singleEvent);
            }
        })
    }

    const Html2react = libraries.html2react.Component;

    return ( 
        <>
        {typeof pageHome === "undefined" ? <Loading /> : 
        <>
        <BackgroundColor>          
            <MainContainer>

                <h1>{pageHome.acf.main_title}</h1>
            
                    {pageHome.acf.slogan.split("*").map( paragraph => paragraph.trim() === "$"? <br></br> : <p>{paragraph}</p>)}
                
                <div>
                    <LinkButtonHome href="/fullprogram" >FullProgram</LinkButtonHome>
                    <LinkButtonHomeSecond href="/create-event">Create an Event</LinkButtonHomeSecond>
                </div>
            </MainContainer>
        
            <ImageStyledHome src={pageHome.acf.main_image.sizes.medium} />

        </BackgroundColor>

        <AboutContainer>
            <h2>
                {pageHome.acf.about_title}
            </h2>
            
            {pageHome.acf.description_about.split("*").map( paragraph => paragraph.trim() === "$"? <br></br> : <p>{paragraph}</p>)}

        </AboutContainer>

        <DayProgramContainer>

            <h2>{pageHome.acf.program_title}</h2>

            <TodayEvents>

            {eventsOfToday.length > 0 ?
                eventsOfToday.map( event => {

                    //array months to get date data
                    const monthsName = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

                    // new date time to delete old custom fields
                    const arrDateTimeStart = event.acf.date_time_start.split(" ");
                    const durationEventStr = postEvent.acf.duration_event;
                    const arrDateAlt = arrDateTimeStart[0].split("-");
                    const timeStart = arrDateTimeStart[1];
                    const timeStartShort = timeStart.substring(0, timeStart.length -3)
                
                    const totalHoursDateTimeStart = hoursStringToDecimal(timeStartShort)
                
                    const totalHoursDurationEvents = hoursStringToDecimal(durationEventStr)
                
                    const totalHours = totalHoursDateTimeStart + totalHoursDurationEvents;
                
                    const finalTimeEnd = decimalHoursToString(totalHours);
                         
                    let myFinalDateTimeEnd = arrDateTimeStart[0]+" "+ finalTimeEnd + ":00"

                    console.log(myFinalDateTimeEnd);
                
                    const arrDateTimeEnd = myFinalDateTimeEnd.split(" ");
                    const timeEnd = arrDateTimeEnd[1];
                    const timeEndShort = timeEnd.substring(0, timeEnd.length -3);
                
                    let cityArr = postEvent.acf.timezone.split("/");
                                                        
                    let cityVenue = cityArr[cityArr.length -1];
                 return(

                    <EventWrapLink>
                        <Link href={event.link}>
                            <EventItem key={event.id}>
                                <ImageStyled src={event.acf.image_event.sizes.medium_large}/>
                                                        
                                <EventInfo>
                                    <EventInfoFirst>
                                        <span>{monthsName[arrDateAlt[1]-1]}</span>
                                        <span>{arrDateAlt[2]}</span>
                                    </EventInfoFirst>

                                    <EventInfoSecond>
                                        <span>{timeStart} - {timeEnd}</span>
                                        <h3>{event.acf.title}</h3>
                                        <span>Free</span>
                                    </EventInfoSecond>    
                                </EventInfo>
                            </EventItem>
                        </Link>
                     </EventWrapLink>
                 )
                })

                : <NoEventsParagraph>There's no events for today</NoEventsParagraph>
                }
                </TodayEvents>
            </DayProgramContainer>
        </>
        }
        </>
     );
}
 
export default connect(HomePage);

const BackgroundColor = styled.div`
    background-image: linear-gradient(to top right, rgba(147,112,219,0), rgba(147,112,219,1));
    background-repeat: no-repeat;
    background-size: cover;
    background-position:center center;
    height: 750px;
    display: flex;
    justify-content: center;
    align-content: center;
    overflow-wrap: break-word;
    padding: 4% 2%;
   
    @media(max-width: 768px) {
        height: 673px;
        padding: 1.5rem;
        flex-direction: column;
    }
`;

const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex-basis: 60%;
    justify-content: center;
    margin-top: 5%;

    @media(max-width: 768px) {
        flex-basis: 100%;
        margin-top: 20%;
    }

        h1 {
            text-transform: capitalize;
            font-size: 2rem;
            letter-spacing: 4px;

            @media(min-width: 768px) {
                font-size: 2.5rem;
            }

            @media(min-width: 968px) {
                font-size: 4rem;
            }
        }

        p {
            margin-top: 0;
            margin-bottom: 0;
            font-family: 'Montserrat', sans-serif;
            width: 70%;
            font-size: 1rem;
            text-align: justify;

            @media(max-width: 768px) {
                width: 100%;
            }

            @media(min-width: 768px) {
                font-size: 1.3rem;

                //margin-bottom: 2rem;
            }
        }

        div {

            display: flex;
            justify-content: flex-start;
            align-content: center;
            margin-top: 1rem;

            @media(max-width: 768px) {
                justify-content: space-between;
            }
        }

`

const ImageStyledHome = styled(Image)`
    display: flex;
    justify-content: center;
    align-self: center;
    max-height: 60%;
    max-width: 50%;
    margin-top: 4rem;

    @media(max-width: 768px) {
        margin-top: 5%;
    }
`

const DayProgramContainer = styled.div`
    margin: 3rem;

    h2 {
        font-size: 2rem;
        color: #203492;
        text-align: center;
    }


    @media(max-width: 768px) {
        margin: 2rem 0;
    }
`;

const TodayEvents = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;

    @media(max-width: 768px) {
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

`

const AboutContainer = styled.div`

    margin: 3rem;
    padding: 1rem 10rem;
    display: flex;
    flex-direction: column;
    justify-content: center;

    h2{
        font-size: 2rem;
        color: #203492;
        text-align: center;
        margin-bottom: 3rem;
    }

    p {
        font-size: 1.3rem;
        color: #4a4a4a;
        margin-top: 0;
        margin-bottom: 0;
        text-align: justify;
    }   

    @media(max-width: 768px) {
        padding: 1rem 0;
    }
`
export const NoEventsParagraph = styled.p`
    font-size: 2rem;
    line-height: 2;
    color: #4a4a4a;
    margin: 3rem 0;
`