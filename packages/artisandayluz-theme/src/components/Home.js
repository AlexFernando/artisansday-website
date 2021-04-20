import React, {useEffect} from 'react';
import { connect, styled } from "frontity";
import Image from "@frontity/components/image";
import bgImage2 from "../images/7.png";

import Link from './Link';
import {EventItem, EventInfo, EventInfoFirst, EventInfoSecond} from './allEvents';

const HomePage = ({state, actions}) => {

    useEffect( () => {
        actions.source.fetch("/allevents")
    }, [])

    const data = state.source.get('/allevents')

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

            //get events of today
            if(singleEvent.acf.start_date === dateOfToday) {
                eventsOfToday.push(singleEvent);
            }
        })
    }

    return ( 
        <>
        <BackgroundColor>          
            <MainContainer>

                <h1>Created by Artisans for Artisans</h1>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur malesuada blandit est, a porttitor sem viverra et.
                </p>
                <div>
                    <a>Full Program</a>
                    <a>Contact me</a>
                </div>
                
            </MainContainer>
        
            <ImageStyled src={bgImage2} />

        </BackgroundColor>

        <AboutContainer>
            <h2>
                About
            </h2>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur malesuada blandit est, a porttitor sem viverra et.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur malesuada blandit est, a porttitor sem viverra et.
            </p>
            
        </AboutContainer>

        <DayProgramContainer>

            <h2>Today's Program</h2>

            <TodayEvents>

            {eventsOfToday.length > 0 ?
                eventsOfToday.map( event => {
                    const arrDate = event.acf.start_date.split("/");
                    //array months to get date data
                 const monthsName = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

                 return(

                    <Link href={event.link}>
                     <EventItem key={event.id}>
                         <Image src={event.acf.image_event.sizes.medium} height="200" width="320" />
                                                 
                         <EventInfo>
                             <EventInfoFirst>
                                 <span>{monthsName[arrDate[1]-1]}</span>
                                 <span>{arrDate[0]}</span>
                             </EventInfoFirst>

                             <EventInfoSecond>
                                 <span>{event.acf.start_time} - {event.acf.end_time}</span>
                                 <h3>{event.acf.title}</h3>
                                 <span>Free</span>
                             </EventInfoSecond>    
                         </EventInfo>
                         
                         {/* <a>Link Website : {event.acf.link_to_website}</a> */}

                     </EventItem>
                     </Link>
                 )
                })

                : null
                }
                </TodayEvents>
            </DayProgramContainer>
        </>
     );
}
 
export default connect(HomePage);

const BackgroundColor = styled.div`
    background-image: linear-gradient(to top right, rgba(147,112,219,0), rgba(147,112,219,1));
    background-repeat: no-repeat;
    background-size: cover;
    background-position:center center;
    height: 700px;
    display: flex;
    justify-content: center;
    align-content: center;
    overflow-wrap: break-word;
    padding: 1rem 2rem;
   
    @media(max-width: 768px) {
        height: 573px;
        padding: 1.5rem;
        flex-direction: column;
    }
`;

const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex-basis: 60%;
    justify-content: center;

        h1 {
            text-transform: capitalize;
            font-size: 2rem;
            letter-spacing: 4px;
            margin-top: 5rem;

            @media(min-width: 768px) {
                font-size: 4rem;
            }
        }

        p {
            font-size: 0.8rem;
            margin-top: 0;
            margin-bottom: 2rem;
            line-height: 1.8;
            font-family: 'Montserrat', sans-serif;
            width: 70%;

            @media(min-width: 768px) {
                font-size: 1.3rem;
                margin-bottom: 2rem;
            }
        }

        div {

            display: flex;
            justify-content: flex-start;
            align-content: center;
          
            a {
                color: white;
                line-height: inherit;
                text-decoration: none;
                cursor: pointer;

                background-color: #203492;
                padding: 15px 20px;
                border: 1px none #000;
                font-size: 16px;
                text-align: center;
                transition: transform 500ms cubic-bezier(.23, 1, .32, 1), color 200ms ease, opacity 200ms ease, -webkit-transform 500ms cubic-bezier(.23, 1, .32, 1);
                
                box-shadow: 4px 4px 0 0 #7ea2b2;
                letter-spacing: 1px;
                border-radius: 0px;
            
                &:nth-of-type(2) {
                    border-radius: 1rem;
                    background-color: #fff;
                    border: 2px solid #203492;
                    color: #203492;
                    margin-left: 2rem;
                }
            }
        }

`

const ImageStyled = styled(Image)`
    display: flex;
    justify-content: center;
    align-self: center;
    max-height: 60%;
    max-width: 50%;
`

const DayProgramContainer = styled.div`
    margin: 3rem;

    h2 {
        font-size: 2rem;
        color: #203492;
        text-align: center;
    }
`;

const TodayEvents = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
`

const AboutContainer = styled.div`

    margin: 3rem;
    padding: 1rem 10rem;

    h2{
        font-size: 2rem;
        color: #203492;
        text-align: center;
    }

    p {
        font-size: 1.3rem;
        color: #4a4a4a;
    }   
`