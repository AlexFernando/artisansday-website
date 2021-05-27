import React, {useState, useEffect, useRef} from 'react';
import { connect, styled } from "frontity";
import Iframe from "@frontity/components/iframe";
import Image from "@frontity/components/image";
import Calendar from "./Calendar";
import calendaImage from "../images/calendar.png"
import Link from './Link';

/**Hook for dropdown calendar */
import { useDetectOutsideClick } from "../hooks/useDectectOutsideClick";
import useFilterTags from '../hooks/useFilterTags';

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

            events.push(singleEvent);

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

    // ALL THE LOGIC FOR TAGS
    const [filteredByTag, saveFilteredByTag] = useState([]);
    const {allCategory, FilterSubcategoriesUI} = useFilterTags("");

    const categories = state.source.category;

    //filling the array of events
    let eventsNoCategories = [];

    if(data.isReady) {
        data.items.map( ({id}) => {      
            eventsNoCategories.push(state.source.allevents[id]);
        })
    } 

    if(categories && data.isReady){
 
        eventsNoCategories.map( item => {
 
            if(item.categories.length === 1) {
              
                let replaceCategory = categories[item.categories[0]].name;
                item["category"] = replaceCategory;
                item["subcategory"] = "";
            }

            else if(item.categories.length === 2) {
                let replaceCategory = categories[item.categories[1]].name;
                let replaceSubCategory = categories[item.categories[0]].name;
                item["category"] = replaceCategory;
                item["subcategory"] = replaceSubCategory;
            }
        })
    }
    
    useEffect( () => {
      
        if(allCategory !== "") {
            const filter = eventsNoCategories.filter(elemToolkit => elemToolkit.category === allCategory || elemToolkit.subcategory === allCategory)
            saveFilteredByTag(filter);
            setIsEvent(false);
        } 
    }, [allCategory])

    
    console.log("mi filter by tags: ", filteredByTag)

    //FILTERING BY TAGS ENDS

    return(

        <PageContainer>

            <h1>Full Program</h1>

            <p>Check out our events happening soon, try the calendar, tag categories or the search bar</p>
            
                    <ButtonCalendar onClick = {onClickDropdown}> 
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
                

                    <TagsContainer>
                        {FilterSubcategoriesUI()}
                    </TagsContainer>
                
            {data.isReady ?
                
                <EventContainer>
                {
                    isEvent ?

                    filtered.reverse().map( event => {

                        const arrDate = event.acf.start_date.split("/");
                        //array months to get date data
                        const monthsName = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

                        return(
                            <>
                            <Link href={event.link}>
                            <EventItem key={event.id}>
                                <ImageStyled src={event.acf.image_event.sizes.medium_large} />
                                                        
                                <EventInfo>
                                    <EventInfoFirst>
                                        <span>{monthsName[arrDate[1]-1]}</span>
                                        <span>{arrDate[0]}</span>
                                    </EventInfoFirst>

                                    <EventInfoSecond>
                                        <span>{event.acf.start_time} - {event.acf.end_time}</span>
                                        <span>{event.acf.timezone}</span>
                                        <h3>{event.acf.title}</h3>
                                        <span>Free</span>
                                    </EventInfoSecond>    
                                </EventInfo>
                                
                                {/* <a>Link Website : {event.acf.link_to_website}</a> */}

                            </EventItem>
                            </Link>
                            
                            
                            </>
                        )
                    })
                    
                    : 
                    filteredByTag.length > 0 ?
                    filteredByTag.map( event => {

                        const arrDate = event.acf.start_date.split("/");
                        //array months to get date data
                        const monthsName = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
                        
                        return(

                            <Link href={event.link}>
                            <EventItem key={event.id}>
                                <ImageStyled src={event.acf.image_event.sizes.medium_large} />
                                                        
                                <EventInfo>
                                    <EventInfoFirst>
                                        <span>{monthsName[arrDate[1]-1]}</span>
                                        <span>{arrDate[0]}</span>
                                    </EventInfoFirst>
        
                                    <EventInfoSecond>
                                        <span>{event.acf.start_time} - {event.acf.end_time} <i>*{event.acf.timezone}</i></span>
                                        <h3>{event.acf.title}</h3>
                                        <span>Free</span>
                                    </EventInfoSecond>    
                                </EventInfo>
                                
                                {/* <a>Link Website : {event.acf.link_to_website}</a> */}
        
                            </EventItem>
                            </Link>
                        )
                    })

                    :
                    eventsOfToday.length > 0 ?
                    eventsOfToday.map( event => {
                        const arrDate = event.acf.start_date.split("/");
                        //array months to get date data
                    const monthsName = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

                    return(

                        <Link href={event.link}>
                        <EventItem key={event.id}>
                            <ImageStyled src={event.acf.image_event.sizes.medium_large}/>
                                                    
                            <EventInfo>
                                <EventInfoFirst>
                                    <span>{monthsName[arrDate[1]-1]}</span>
                                    <span>{arrDate[0]}</span>
                                </EventInfoFirst>

                                <EventInfoSecond>
                                    <span>{event.acf.start_time} - {event.acf.end_time}</span>
                                    <span>{event.acf.timezone}</span>
                                    <h3>{event.acf.title}</h3>
                                    <span>Free</span>
                                </EventInfoSecond>    
                            </EventInfo>
                            
                            {/* <a>Link Website : {event.acf.link_to_website}</a> */}

                        </EventItem>
                        </Link>
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

    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: flex-start;
`;

export const TagsContainer = styled.div`
    flex-basis: 100%;
`


const CalendarContainer = styled.div`
    display: flex;
    align-self: center;
    position: fixed;
    z-index: 3;
 
    max-width: 30%;

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
    align-self: center;
    align-items: center;
    padding: 1rem 2rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
    border: none;
    vertical-align: middle;
    transition: box-shadow 0.4s ease;
    color: #fff;
    margin-top: 3rem;

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

export const EventContainer = styled.div`
    display:flex;
    justify-content: space-around;
    align-content: center;
    flex-wrap: wrap;

    margin: 4rem 0;
`;

export const EventItem = styled.div`
    flex-wrap: wrap;
    margin-top: 2rem;
`;

export const EventInfo = styled.div`
    display: flex;
    justify-content: space-between;
`

export const EventInfoFirst = styled.div`
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
export const EventInfoSecond = styled.div`
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

export const ImageStyled = styled(Image)`
    width: 100%;
        height: 20.625rem;
        object-fit: cover;
        object-position: 50% 50%;

        
`