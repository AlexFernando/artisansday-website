import React, {useState, useEffect, useRef} from 'react';
import {Global, connect, styled, css } from "frontity";
import Iframe from "@frontity/components/iframe";
import Image from "@frontity/components/image";
import Link from './Link';
import Loading from './Loading';
import useFilterTags from '../hooks/useFilterTags';

const allEvents = ( {state, libraries, actions} ) => {

    useEffect( () => {
        actions.source.fetch("/allevents")
        //source calendar week
        actions.source.fetch("/calendar-week")
    }, [])

    const data = state.source.get('/allevents')

    const dataCalendarWeek = state.source.get('/calendar-week')

   
    // ALL THE LOGIC STATE FOR CATEGORIES AND 
    const [filteredByTag, saveFilteredByTag] = useState([]);
    const {allCategory, FilterSubcategoriesUI} = useFilterTags("");
    const [filterByDate, setFilterByDate] = useState([]);

    const categories = state.source.category;

    //FILTER BY CATEGORIES STARTS
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
            const filter = eventsNoCategories.filter(elemToolkit => elemToolkit.category === allCategory.trim() || elemToolkit.subcategory === allCategory.trim())
            saveFilteredByTag(filter);
            setFilterByDate([]);
        } 
    }, [allCategory])

    //FILTERING BY CATEGORIES ENDS

    //DATES CALENDAR STARTS 
    let datesWeekArr = []
    
    // build array of week Dates
    if(dataCalendarWeek.isReady) {
        const calendarPage = state.source.page[dataCalendarWeek.id]
        datesWeekArr = Object.values(calendarPage.acf);
    }

    //filter events by date of week calendar

    const SetView = (arrIndex = 3) => {

        let filterEvents = [];

        if(arrIndex === 3) {
            filterEvents = eventsNoCategories.filter( elem => elem.acf.date_time_start.split(" ")[0] === datesWeekArr[3]);
        }
        
        else {
            filterEvents = eventsNoCategories.filter( elem => elem.acf.date_time_start.split(" ")[0] === datesWeekArr[arrIndex]);
        }

        setFilterByDate(filterEvents);

        saveFilteredByTag([]);
    };

    // filter events of today 
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
    //DATES CALENDAR ENDS//

    return(
 
        <PageContainer>
        
            <h1>Full Program</h1>

            <p>Check out our events happening soon, try to filter by categories or click on a day</p>

                    
                    <TagsContainer>
                        {FilterSubcategoriesUI()}
                    </TagsContainer>
                    <ButtonContainerEvents>
                        <ButtonStylesEvents onClick={() => SetView(0)}>Monday</ButtonStylesEvents>
                        <ButtonStylesEvents onClick={() => SetView(1)}>Tuesday</ButtonStylesEvents>
                        <ButtonStylesEvents onClick={() => SetView(2)}>Wednesday</ButtonStylesEvents>
                        <ButtonStylesEvents onClick={() => SetView(3)}>Sunday</ButtonStylesEvents>
                        <ButtonStylesEvents onClick={() => SetView(4)}>Thursday</ButtonStylesEvents>
                        <ButtonStylesEvents onClick={() => SetView(5)}>Friday</ButtonStylesEvents>
                        <ButtonStylesEvents onClick={() => SetView(6)}>Saturday</ButtonStylesEvents>
                    </ButtonContainerEvents>

                    {data.isReady && eventsOfToday.length > 0 && filterByDate.length === 0 && filteredByTag.length === 0  ? 
                        <><h1>Today Events</h1>
                        <EventContainer>
                            
                            {

                                eventsOfToday.map( event => {
                                    //const arrDate = event.acf.start_date.split("/");
                            //array months to get date data
                            const monthsName = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

                            // new date time to delete old custom fields
                            const arrDateTimeStart = event.acf.date_time_start.split(" ");

                            const arrDateAlt = arrDateTimeStart[0].split("-");
                        
                            const timeStart = arrDateTimeStart[1];
                        
                            const arrDateTimeEnd = event.acf.date_time_end.split(" ");
                        
                            const timeEnd = arrDateTimeEnd[1];
                            
                            return(
                                
                                <EventWrapLink>
                                    <Link href={event.link}>
                                    <EventItem key={event.id}>
                                        <ImageStyled src={event.acf.image_event.sizes.medium} />
                                                                
                                        <EventInfo>
                                            <EventInfoFirst>
                                                <span>{monthsName[arrDateAlt[1]-1]}</span>
                                                <span>{arrDateAlt[2]}</span>
                                            </EventInfoFirst>
                
                                            <EventInfoSecond>
                                                <span>{timeStart} - {timeEnd} <i>*{event.acf.timezone}</i></span>
                                                <h3>{event.acf.title}</h3>
                                                <span>Free</span>
                                            </EventInfoSecond>    
                                        </EventInfo>
                                        
                                    </EventItem>
                                    </Link>
                                </EventWrapLink>
                            
                            )       
                                })
                            }
                        </EventContainer>

                        </>
                        :null

                    } 


                    {data.isReady && filterByDate.length > 0 ?
                    
                        <EventContainer>
                            {
                                
                                filterByDate.map( event => {
                                        
                                //const arrDate = event.acf.start_date.split("/");
                                //array months to get date data
                                const monthsName = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

                                // new date time to delete old custom fields
                                const arrDateTimeStart = event.acf.date_time_start.split(" ");

                                const arrDateAlt = arrDateTimeStart[0].split("-");
                            
                                const timeStart = arrDateTimeStart[1];
                            
                                const arrDateTimeEnd = event.acf.date_time_end.split(" ");
                            
                                const timeEnd = arrDateTimeEnd[1];
                                
                                return(
                                    
                                    <EventWrapLink>
                                        <Link href={event.link}>
                                        <EventItem key={event.id}>
                                            <ImageStyled src={event.acf.image_event.sizes.medium} />
                                                                    
                                            <EventInfo>
                                                <EventInfoFirst>
                                                    <span>{monthsName[arrDateAlt[1]-1]}</span>
                                                    <span>{arrDateAlt[2]}</span>
                                                </EventInfoFirst>
                    
                                                <EventInfoSecond>
                                                    <span>{timeStart} - {timeEnd} <i>*{event.acf.timezone}</i></span>
                                                    <h3>{event.acf.title}</h3>
                                                    <span>Free</span>
                                                </EventInfoSecond>    
                                            </EventInfo>
                                            
                                        </EventItem>
                                        </Link>
                                    </EventWrapLink>
                                
                                )
                                })

                            }   
                        </EventContainer>

                    : null
                    
                    }
                
            {data.isReady && filteredByTag.length > 0 ?
                
                <EventContainer>
                    
                    {                  
                        filteredByTag.map( event => {

                            //const arrDate = event.acf.start_date.split("/");
                            //array months to get date data
                            const monthsName = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

                            // new date time to delete old custom fields
                            const arrDateTimeStart = event.acf.date_time_start.split(" ");

                            const arrDateAlt = arrDateTimeStart[0].split("-");
                        
                            const timeStart = arrDateTimeStart[1];
                        
                            const arrDateTimeEnd = event.acf.date_time_end.split(" ");
                        
                            const timeEnd = arrDateTimeEnd[1];
                            
                            return(
                                
                                <EventWrapLink>
                                    <Link href={event.link}>
                                    <EventItem key={event.id}>
                                        <ImageStyled src={event.acf.image_event.sizes.medium} />
                                                                
                                        <EventInfo>
                                            <EventInfoFirst>
                                                <span>{monthsName[arrDateAlt[1]-1]}</span>
                                                <span>{arrDateAlt[2]}</span>
                                            </EventInfoFirst>
                
                                            <EventInfoSecond>
                                                <span>{timeStart} - {timeEnd} <i>*{event.acf.timezone}</i></span>
                                                <h3>{event.acf.title}</h3>
                                                <span>Free</span>
                                            </EventInfoSecond>    
                                        </EventInfo>
                                        
                                    </EventItem>
                                    </Link>
                                </EventWrapLink>
                            
                            )
                        })
                    }
                </EventContainer>
                : null
            }
        </PageContainer>
        )
}
 
export default connect(allEvents);

const PageContainer = styled.div`
    margin-top: 10rem;

    h1 {
        font-size: 2rem;
        text-align: center;
        letter-spacing: 1px;
        color: #203492;
        margin-top: 4rem;
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
export const EventContainer = styled.div`
    display:flex;
    justify-content: space-around;
    align-content: center;
    flex-wrap: wrap;
    margin: 4rem 0;
`;

export const EventWrapLink = styled.div`
    flex-basis: 100%;
    flex-wrap: wrap;
    margin: 2rem 0;

    @media (min-width: 768px){
        flex-basis: 30%;
        margin: 1rem;
    }
`

export const EventItem = styled.div`
    
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


export const ButtonContainerEvents = styled.div`
    display: flex;
    margin-left: 1rem;

    @media (max-width: 768px){
        flex-direction: column;
    }

`
export const ButtonStylesEvents = styled.button`
    font-size: 1.3rem;
    display: inline-block;
    list-style: none;
    cursor: pointer;
    color: #fff;
    border-top-right-radius: 8px;
    border-top-left-radius: 8px;
    background-color: #00A36C;
    border-color: rgb(255, 255, 255);
    border:none;
    width: 100%;
    padding: .8rem 1.2rem;
    margin: 0 1rem 0 0;

    @media (max-width: 768px){
        margin-bottom: .5rem;
    }

`

export const ImageStyled = styled(Image)`
    width: 100%;
    height: 20.625rem;
    object-fit: cover;
    object-position: 50% 50%;        
`