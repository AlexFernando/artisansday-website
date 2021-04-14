import React, {useState, useEffect} from 'react';
import {connect, styled, css} from "frontity";

const MyCalendar =  styled.div`
  text-align: center;
  background-color: #fff;
  //margin-top: 3rem;

  h1 {
    color: #000;
    //margin-bottom: 10rem;
    font-size: 1.6rem;
  }
`

const Frame = styled.div`
  border: 1px solid lightgrey;
  border-radius: 1rem;
  box-shadow: 2px 2px 2px #eee;

`;

const Header = styled.div`
  font-size: 18px;
  font-weight: bold;
  padding: 10px 10px 5px 10px;
  display: flex;
  justify-content: space-between;
  background-color: #203492;;
  border-radius: 1rem 1rem 0 0;
  color: #fff;
`;

const Button = styled.div`
  cursor: pointer;
`;

const Body = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;

const Day = styled.div`
  width: 14.2%;
  height: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  

  ${props =>
    props.isSelected &&
    css`  
      border-radius: .5rem;
      cursor: pointer;
      font-weight: 400;
      color: #fff;
      font-weight: 700;
      background-color: #203492;;
    `}

    ${
      props => 
      props.isMyCurrentDay && css `
        border-radius: .5rem;
        cursor: pointer;
        font-weight: 400;
        color: #fff;
        font-weight: 700;
        background-color: red;
      `
    }
`;

function getAllIndexes(arr, val) {
  var indexes = [], i;
  for(i = 0; i < arr.length; i++)
      if (arr[i] === val)
          indexes.push(i);
  return indexes;
}

const Calendar = ({eventDay, eventMonth, eventYear, setIsEvent, setId, idArray, setIsActive}) => {

    //console.log(eventDay, eventMonth, eventYear)

    const DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const DAYS_LEAP = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const DAYS_OF_THE_WEEK = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
    const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

    const today = new Date();
    //console.log(today)
    const [date, setDate] = useState(today);

    const [day, setDay] = useState(date.getDate());
    //console.log(day)
    const [month, setMonth] = useState(date.getMonth());
    //console.log(month)
    const [year, setYear] = useState(date.getFullYear());
    //console.log(year)

    const calculateStartDayOfMonth = (date) => {

      //console.log("Date con parametro 1: ", new Date(date.getFullYear(), date.getMonth(), 1), "Obten dia: ", new Date(date.getFullYear(), date.getMonth(), 1).getDay(), )
      return new Date(date.getFullYear(), date.getMonth(), 1).getDay() === 0 ? 7 :  new Date(date.getFullYear(), date.getMonth(), 1).getDay();

    } 

    const [startDay, setStartDay] = useState(calculateStartDayOfMonth(date));
    
    useEffect(() => {
      setDay(date.getDate());
      setMonth(date.getMonth());
      setYear(date.getFullYear());
      setStartDay(calculateStartDayOfMonth(date));
    }, [date]);

    const showEvent = (id) => {
      //recibe un array de id en vez de solo un id
      setIsEvent(true);
      setId([...id]);

      // close calendar when click on date with events
      setIsActive(false);
    }

    
    const isLeapYear = (year) => {
      return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    }

    const days = isLeapYear(date.getFullYear()) ? DAYS_LEAP : DAYS;

    //console.log("isLapYear or no: ", days)

    //console.log("days: ", eventDay, "months: ", eventMonth, "year ", eventYear);
    
   

    let currentDay = date.getDate()
    let currentMonth = date.getMonth() 
    let currentYear = date.getFullYear()

    return ( 
      <MyCalendar>  
        {/* <h1>{`Today: ${currentDay} ${MONTHS[currentMonth]}`}</h1> */}
      <Frame>
        
        <Header>
          <Button onClick={() => setDate(new Date(year, month - 1, day))}>Prev</Button>
          <div>
            {MONTHS[month]} {year}
          </div>
          <Button onClick={() => setDate(new Date(year, month + 1, day))}>Next</Button>
        </Header>

        <Body>
          {DAYS_OF_THE_WEEK.map(d => (
            <Day key={d}>
              <strong>{d}</strong>
            </Day>
          ))}

          {Array(days[month] + (startDay - 1))
            .fill(null)
            .map((_, index) => {
              //console.log("que es index: ", index);
              const d = index - (startDay - 2);
              //console.log("que es d: ", d);
              //console.log("startday: ",startDay)
              //console.log(eventDay.indexOf(d) === eventMonth.indexOf(month+1) === eventYear.indexOf(year))
              //console.log("day: ", d , "month: ", month, "year: ", year)
              //console.log("el mes del calendario: ",month)
              //console.log(eventDay.indexOf)

              let indexDay = eventDay.indexOf(d)

              let arrayOfIndexesDay = getAllIndexes(eventDay, d);

              //console.log("d: ", d, "allIndexes: ", arrayOfIndexesDay, "indexDay: ", indexDay);

              let arrayOfIndexesEvents = [];

              
              // for arrOfIndexesDay 
              // If Index > -1

              // showEvent(array of indexes)

              if(indexDay > -1 && month === eventMonth[indexDay] && year === eventYear[indexDay] ){

                if (arrayOfIndexesDay.length > 0) {
                  //console.log("hola")
                  for( let i = 0 ; i < arrayOfIndexesDay.length; i++) {
                        
                      arrayOfIndexesEvents.push(idArray[arrayOfIndexesDay[i]])
                      //console.log("los events: ", arrayOfIndexesEvents)
                      //console.log("el index: ", indexDay," idEvent: ", idArray[indexDay])
                  }
                }

                return (
                  <Day
                    key={index}
                    isSelected={true}
                    onClick = { () => showEvent(arrayOfIndexesEvents)}
                  >
                      {d > 0 ? d : ''}
                  </Day>
                );
              }

              else {
                return (

                  <Day
                    key={index}
                  >
                    {d > 0 ? d : ''}
                  </Day>
                );
                
              }

              
            })}
        </Body>
    </Frame>
    </MyCalendar>
     );
}

export default Calendar;