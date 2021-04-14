import React, {useState, useEffect, useRef} from 'react';
import { connect, styled } from "frontity";
import Iframe from "@frontity/components/iframe";
import Image from "@frontity/components/image";
import Calendar from "./Calendar";
import calendaImage from "../images/calendar.png"
import Link from './Link';

/**Hook for dropdown calendar */
import { useDetectOutsideClick } from "../hooks/useDectectOutsideClick";


const allEvents = ( {state, libraries, actions} ) => {

    useEffect( () => {
        actions.source.fetch("/allevents")
    }, [])

    const data = state.source.get('/allevents')

    let events = [];

    const [isEvent, setIsEvent] = useState(false)
    // en vez de null un array vacio
    const [id, setId] = useState([]);

    const eventDay = [];

    const eventMonth = [];

    const eventYear = [];

    const idArray = [];

    // Today events

    const today = new Date();
    let currentDay = today.getDate();
    let currentMonth = today.getMonth() + 1; 
    let currentYear = today.getFullYear();

    let dateOfToday = currentDay.toString()+"/"+"0"+currentMonth.toString()+"/"+currentYear.toString(); 
    let eventsOfToday = [];
    console.log("date of today: ", dateOfToday.trim());

    if(data.isReady) {
        data.items.map( ({id}) => {

            const singleEvent = state.source.allevents[id];

            events.push(singleEvent);

            //console.log("un evento ", singleEvent)

            //get events of today
            if(singleEvent.acf.start_date === dateOfToday) {
                eventsOfToday.push(singleEvent);
            }

            const arrayDate = singleEvent.acf.start_date.split("/");
                eventDay.push(parseInt(arrayDate[0]))
                eventMonth.push(parseInt(arrayDate[1])-1)
                eventYear.push(parseInt(arrayDate[2]))
                idArray.push(singleEvent.id)  
        })
    }

    //console.log(eventDay, " ", eventMonth, " ", eventYear);

    //console.log("EL ID DE EVENTOS: ", id);

    console.log("evento del dia: ", eventsOfToday);

    // filtrar event contra el array de id ( how to do it?)
    const filtered = events.filter(event => id.includes(event.id))

    const Html2React = libraries.html2react.Component;

    // DROPDOWN EFFECT 

    const dropdownRef = useRef(null);
    const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
    const onClickDropdown = () => setIsActive(!isActive);

    //provisional handle change

    const handleChange = e => {
        console.log("hola: ", e)
     };

 
    return(

        <PageContainer>

            <h1>Full Program</h1>

            <p>Check out our events happening soon, try the calendar, tag categories or the search bar</p>
            
                <SearchBar>
                    <InputBar>                  
                        <input 
                            type="text"
                            placeholder="What are you searching for?"
                            value=""
                            onChange={handleChange}
                        />                
                    </InputBar>
                
                    <ButtonCalendar>
                        <Link href="/searchbar"><span>SEARCH</span></Link>
                    </ButtonCalendar>

                    <ButtonCalendar
                    onClick = {onClickDropdown}
                > 
                    <span>Calendar</span>

                    <Image  src = {calendaImage} height="30px" width="30px" />
                </ButtonCalendar>
                
                {
                        isActive? 
                <CalendarContainer ref={dropdownRef}>
                 
                        <Calendar 
                            eventDay = {eventDay} 
                            eventMonth = {eventMonth} 
                            eventYear = {eventYear} 
                            setIsEvent = {setIsEvent}
                            setId = {setId}
                            idArray = {idArray}
                            setIsActive = {setIsActive}
                        />            
                </CalendarContainer>
                : null}

                </SearchBar>
                
                
        {data.isReady ?
              
            <EventContainer>
            {
                isEvent ?

                filtered.reverse().map( event => {

                    const arrDate = event.acf.start_date.split("/");
                       //array months to get date data
                    const monthsName = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

                    return(

                        <EventItem key={event.id}>
                            <ImageStyled src={event.acf.image_event.sizes.medium_large} />
                                                    
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
                    )
                })
                
                :
                eventsOfToday.length > 0 ?
                eventsOfToday.map( event => {
                    const arrDate = event.acf.start_date.split("/");
                    //array months to get date data
                 const monthsName = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

                 return(

                     <EventItem key={event.id}>
                         <ImageStyled src={event.acf.image_event.sizes.medium_large} />
                                                 
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
                 )
                })

                : 
                <h1>There is no events in this day, check the calendar and click in the a date with blue background</h1>
            }
            </EventContainer>
            : null
        } 
        </PageContainer>
    )
}
 
export default connect(allEvents);

const PageContainer = styled.div`
    margin-top: 8rem;

    h1 {
        font-size: 2rem;
        text-align: center;
        letter-spacing: 1px;
        color: #203492;
    }

    p {
        text-align: center;
        letter-spacing: 1px;
    }
`;


export const SearchBar = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding-top: 2rem;
    
    @media (max-width: 768px){
        flex-direction: column;
        align-items: center;
    }
`;

export const InputBar = styled.form`
    display: flex;
    flex-basis: 60%;
    justify-content: flex-start;
    align-items: center;
    background-color: #fff;
    padding: 1rem 2rem 1rem 2rem;
    border: 1px solid gray;
    border-radius: 1rem;
  
    @media (max-width: 768px){
        margin-bottom: 1rem;
    }

    input {
        font-size: 1.6rem;
        border: none;
        outline: none;
        padding-left: 1rem;
        width: 100%;
        @media (max-width: 768px){
            width: 100%;
            font-size: .7rem;
        }
    }    
`

const CalendarContainer = styled.div`
    display: flex;
    z-index: 3;
    position: fixed;
    max-width: 30%;
    margin-top: 10rem;

    @media (max-width: 768px){
        max-width: 100%;
    }
`
const ButtonCalendar = styled.button `
    flex-basis: 10%;
    background: #203492;
    border-radius: 90px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem 2rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
    border: none;
    vertical-align: middle;
    transition: box-shadow 0.4s ease;
    color: #fff;

    span {
        color: #fff;
        margin-right: .5rem;
        font-size: 1rem;
    }
   
    &:hover {
        box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
    }

    @media (max-width: 768px){
        max-width: 50%;
        margin-top: 1rem;
    }
`

const EventContainer = styled.div`
    display:flex;
    justify-content: space-around;
    align-content: center;
    flex-wrap: wrap;
`;

const EventItem = styled.div`
    flex-basis: 30%;
    flex-wrap: wrap;
    margin-top: 2rem;
`;

const EventInfo = styled.div`
    display: flex;
    justify-content: space-between;
`

const EventInfoFirst = styled.div`
    display: flex;
    flex-direction: column;
    flex-basis: 20%;
    margin-top: .7rem;

    span {

        text-align: center;

        &:nth-of-type(1){
            font-size: .9rem;
            color: #5d5d5d;
            text-transform: uppercase;  
        }

        &:nth-of-type(2){
            font-size: 1.5rem;
            font-weight: 700; 
            color: #141827; 
        }
    }
`
const EventInfoSecond = styled.div`
    display: flex;
    flex-direction: column;
    flex-basis: 80%;
    margin-top: .5rem;

    h3{
        margin-top: .5rem;
        font-size: 1.1rem;
    }

    span {
        &:nth-of-type(3){
            font-size: .9rem;
        }
    }
`

const ImageStyled = styled(Image)`
    max-height: 100%;
    max-width: 100%;
`