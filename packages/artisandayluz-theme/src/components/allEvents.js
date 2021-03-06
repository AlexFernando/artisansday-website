import React, {useState, useEffect, useRef} from 'react';
import {Global, connect, styled, css } from "frontity";
import Iframe from "@frontity/components/iframe";
import Image from "@frontity/components/image";
import Link from './Link';
import Loading from './Loading';
import useFilterTags from '../hooks/useFilterTags';
import {NoEventsParagraph} from './Home';
import {hoursStringToDecimal} from '../helpers/index'
import {decimalHoursToString} from '../helpers/index';

/**CAROUSEL EVENTS */
import Carousel from "react-multi-carousel";
import multiCarouselStyles from  "react-multi-carousel/lib/styles.css";
import generalStyles from '../styles/generalStyles.css';

const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      paritialVisibilityGutter: 60
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      paritialVisibilityGutter: 50
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      paritialVisibilityGutter: 30
    }
};


const allEvents = ( {state, libraries, actions} ) => {

    useEffect( () => {

        if(state.theme.lang === "en") {
            actions.source.fetch("/allevents")
            //source calendar week
            actions.source.fetch("/calendar-week")
            actions.source.fetch("/pageevents")
        }

        else if (state.theme.lang === "fr") {
            actions.source.fetch("/fr/allevents")
            //source calendar week
            actions.source.fetch("/fr/calendar-week")
            actions.source.fetch("/fr/pageevents")
        } 

        else {
            actions.source.fetch("/es/allevents")
            actions.source.fetch("/es/calendar-week")
            actions.source.fetch("/es/pageevents")
        }
    }, [])

    const data = state.theme.lang === "en" ? state.source.get('/allevents') : state.theme.lang === "fr" ? state.source.get('/fr/allevents') : state.source.get('/es/allevents')

    const dataCalendarWeek = state.source.get('/calendar-week');

    const dataPageEvents = state.source.get('/pageevents');

    const pageEvents = state.source.page["817"]

   
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
            const filter = eventsNoCategories.filter(elemToolkit => elemToolkit.category === allCategory.trim())
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

        <>
        {typeof pageEvents === "undefined" ? <Loading /> : 
        <>
 
        <PageContainer>
        
            <h1>{pageEvents.acf.title_full_program}</h1>

            <p>{pageEvents.acf.subtitle_full_program}</p>

                    
                    <TagsContainer>
                        {FilterSubcategoriesUI()}
                    </TagsContainer>
                    <ButtonContainerEvents>
                        <ButtonStylesEvents onClick={() => SetView(4)}>{pageEvents.acf.days_of_week.thursday}</ButtonStylesEvents>
                        <ButtonStylesEvents onClick={() => SetView(5)}>{pageEvents.acf.days_of_week.friday}</ButtonStylesEvents>
                        <ButtonStylesEvents onClick={() => SetView(6)}>{pageEvents.acf.days_of_week.saturday}</ButtonStylesEvents>

                        <ButtonStylesEvents onClick={() => SetView(3)}>{pageEvents.acf.days_of_week.sunday}</ButtonStylesEvents>

                        <ButtonStylesEvents onClick={() => SetView(0)}>{pageEvents.acf.days_of_week.monday}</ButtonStylesEvents>
                        <ButtonStylesEvents onClick={() => SetView(1)}>{pageEvents.acf.days_of_week.tuesday}</ButtonStylesEvents>
                        <ButtonStylesEvents onClick={() => SetView(2)}>{pageEvents.acf.days_of_week.wednesday}</ButtonStylesEvents>

                    </ButtonContainerEvents>

                    {data.isReady && eventsOfToday.length > 0 && filterByDate.length === 0 && filteredByTag.length === 0  ? 
                        <>
                        
                        <h1>{pageEvents.acf.today_events_title}</h1>

                     
                            <EventContainer>
                            <Global styles={multiCarouselStyles} />
                            <Global styles={generalStyles} />
                            <Carousel
                                ssr
                                partialVisbile
                                itemClass="image-item"
                                responsive={responsive}
                            >
                            
                                {
                                    eventsOfToday.map( event => {
                                        //const arrDate = event.acf.start_date.split("/");
                                        //array months to get date data
                                        const monthsName = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

                                        // new date time to delete old custom fields
                                        const arrDateTimeStart = event.acf.date_time_start.split(" ");
                                        const durationEventStr = event.acf.duration_event;

                                        const arrDateAlt = arrDateTimeStart[0].split("-");

                                        const timeStart = arrDateTimeStart[1];

                                        const timeStartShort = timeStart.substring(0, timeStart.length -3)
                                        
                                        const totalHoursDateTimeStart = hoursStringToDecimal(timeStartShort)

                                        const totalHoursDurationEvents = hoursStringToDecimal(durationEventStr)
                                        
                                        console.log("totalHoursDateTime: ", totalHoursDateTimeStart, "totalHoursDuration: ", totalHoursDurationEvents);
                                    
                                        const totalHours = totalHoursDateTimeStart + totalHoursDurationEvents;
                                    
                                        const finalTimeEnd = decimalHoursToString(totalHours);
                                    
                                        console.log("finalTimeEnd: ", finalTimeEnd);
                                        
                                        let myFinalDateTimeEnd = arrDateTimeStart[0]+" "+ finalTimeEnd + ":00"
                                    
                                        const arrDateTimeEnd = myFinalDateTimeEnd.split(" ");
                                        const timeEnd = arrDateTimeEnd[1];
                                        const timeEndShort = timeEnd.substring(0, timeEnd.length -3);
                                    
                                        let cityArr = event.acf.timezone.split("/");
                                        
                                        let cityVenue = cityArr[cityArr.length -1];

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
                                                            <span>{timeStartShort} - {timeEndShort} <i>*{cityVenue}</i></span>
                                                            <h3>{event.acf.title}</h3>
                                                            <span>{event.acf.cost}</span>
                                                        </EventInfoSecond>    
                                                    </EventInfo>
                                                    
                                                </EventItem>
                                                </Link>
                                            </EventWrapLink>
                                        
                                        )       
                                    })
                                }
                            </Carousel>
                            </EventContainer>
                 
                        </>
                        : null
                    } 


                    {data.isReady && filterByDate.length > 0 ?
                    
                        <EventContainer>
                              
                            <Global styles={multiCarouselStyles} />
                            <Global styles={generalStyles} />
                            <Carousel
                                ssr
                                partialVisbile
                                itemClass="image-item"
                                responsive={responsive}
                            >
                            {
                                
                                filterByDate.map( event => {
                                        
                                //const arrDate = event.acf.start_date.split("/");
                                //array months to get date data
                                const monthsName = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

                                // new date time to delete old custom fields
                                const arrDateTimeStart = event.acf.date_time_start.split(" ");
                                const durationEventStr = event.acf.duration_event;

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
                                let cityArr = event.acf.timezone.split("/");
                                        
                                let cityVenue = cityArr[cityArr.length -1];
                                
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
                                                    <span>{timeStartShort} - {timeEndShort} <i>*{cityVenue}</i></span>
                                                    <h3>{event.acf.title}</h3>
                                                    <span>{event.acf.cost}</span>
                                                </EventInfoSecond>    
                                            </EventInfo>
                                            
                                        </EventItem>
                                        </Link>
                                    </EventWrapLink>
                                
                                )
                                })

                            }   

                            </Carousel>
                        </EventContainer>

                    : null
                    }
                
            {data.isReady && filteredByTag.length > 0 ?
                
                <EventContainer>
                
                    <Global styles={multiCarouselStyles} />
                    <Global styles={generalStyles} />
                    <Carousel
                        ssr
                        partialVisbile
                        itemClass="image-item"
                        responsive={responsive}
                    >
                    
                    {                  
                        filteredByTag.map( event => {

                            //const arrDate = event.acf.start_date.split("/");
                            //array months to get date data
                            const monthsName = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

                            // new date time to delete old custom fields
                                                           
                            const arrDateTimeStart = event.acf.date_time_start.split(" ");
                            const durationEventStr = event.acf.duration_event;

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
                            let cityArr = event.acf.timezone.split("/");
                                    
                            let cityVenue = cityArr[cityArr.length -1];
                            
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
                                                <span>{timeStartShort} - {timeEndShort} <i>*{cityVenue}</i></span>
                                                <h3>{event.acf.title}</h3>
                                                <span>{event.acf.cost}</span>
                                            </EventInfoSecond>    
                                        </EventInfo>
                                        
                                    </EventItem>
                                    </Link>
                                </EventWrapLink>
                            
                            )
                        })
                    }

                </Carousel>

                </EventContainer>

                
                : null
            }

            {data.isReady && eventsOfToday.length === 0 && filteredByTag.length === 0 && filterByDate.length === 0 ?
                <NoEventsParagraph>{pageEvents.acf.message_event}</NoEventsParagraph>
                : null
            } 
        </PageContainer>

        </>
        }
        </>
        )
}
 
export default connect(allEvents);

const PageContainer = styled.div`
    margin-top: 10rem;
    margin-bottom: 4rem;

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
export const EventContainer = styled.section`
    /* display:flex;
    justify-content: space-around;
    align-content: center;
    flex-wrap: wrap;
    margin: 4rem 0; */

    margin: "20px 0 20px 0";
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
        box-shadow: 0 1px 20px 1px grey;
`;

export const EventInfo = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 1rem;
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
    margin-bottom: 3rem;

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