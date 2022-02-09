import React, {useState, useEffect} from "react";
import { connect, styled, Global } from "frontity";
import {useForm}  from '../hooks/useForm';

//react date time Picker
import DateTimePicker from 'react-datetime-picker';
//styles dateTimePicker 
import DateTimePickerStyles from 'react-datetime-picker/dist/DateTimePicker.css';
import CalendarCss from 'react-calendar/dist/Calendar.css';
import ClockCss from 'react-clock/dist/Clock.css';
import generalStyles from '../styles/generalStyles.css';

//city country
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';

import { months } from "moment";


const FormEvent = ({ state, actions }) => {

    let myFields = {
        "title": "",
        "acf_fields": {
          "title": "",
          "organizer": "",
          "organizer_email": "",
          "link_to_website": "",
          "description": "",
          "video": "",
          "language_event": "",
          "cost": "",
          "date_time_start": "",
          "duration_event": "",
          "timezone": "",
          "address": "",
          "city": "",
          "country": ""
        },
      }

    //datetime Picker State Starts
    const [value, onChange] = useState(new Date());
    //const [valueEnd, onChangeEnd] = useState(new Date());
    //datetime Picker State ends
    //CITY COUNTRY STATES
    const [city, selectCity] = useState("");
    const [country, selectCountry] = useState("");

    console.log("country: ", country, "city: ", city);

    let arrayDateTimeStart = value.toString().split(' ');
    //let arrayDateTimeEnd = valueEnd.toString().split(' ');

    const monthsName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    let month =  monthsName.indexOf(arrayDateTimeStart[1]) + 1; 
    let monthFinal = ''

    // let monthEnd = monthsName.indexOf(arrayDateTimeEnd[1]) + 1;
    // let monthFinalEnd = ''
    
    if(month >= 10) {
        monthFinal = month.toString();
        //monthFinalEnd = monthEnd.toString();
    }

    else {
        monthFinal = '0'+month.toString();
        //monthFinalEnd = '0'+monthEnd.toString();
    }

    let dateTimeStartFormat = arrayDateTimeStart[3]+"-"+monthFinal+"-"+arrayDateTimeStart[2]+" T"+arrayDateTimeStart[4];
    //let dateTimeEndFormat = arrayDateTimeEnd[3]+"-"+monthFinalEnd+"-"+arrayDateTimeEnd[2]+" T"+arrayDateTimeEnd[4];

    const postEventHandler = () => {

        myFields.acf_fields['date_time_start'] = dateTimeStartFormat;
        //myFields.acf_fields['date_time_end'] = dateTimeEndFormat;
        myFields.acf_fields['city'] = city;
        myFields.acf_fields['country'] = country;
        
        Object.keys(fieldsPost).map( item => {

            if(item === 'title') {
                myFields[item] = fieldsPost[item]; 
                myFields.acf_fields[item] = fieldsPost[item];  
            }

            else if(item === 'video') {
                // HACER LO DEL LINK http://jsfiddle.net/88Ms2/377/
                // let expresion = /((https|http):\/\/(?:www\.)?(youtube.com\/embed\/[^\s]+|player.vimeo.com\/video\/[^\s]+))/g;
                // let URLVideo = fieldsPost[item].match(expresion);
                // let finalUrlVideo = URLVideo[0].slice(0,-1);
                // myFields.acf_fields[item] = finalUrlVideo;
                let URLVideo = '';
                let expressionOne= /(?:http?s?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(.+)/g;
                let groupMatchOne = expressionOne.exec(fieldsPost[item])
                let expresionTwo = /(?:http?s?:\/\/)?(?:www\.)?(?:vimeo\.com)\/?(.+)/g;
                let groupMatchTwo = expresionTwo.exec(fieldsPost[item])
           
                if(groupMatchOne) {
                    URLVideo = 'https://www.youtube.com/embed/'+ groupMatchOne[1]
                }    
                
                else if(groupMatchTwo) {
                    URLVideo = 'https://vimeo.com/'+groupMatchTwo[1]
                }

                myFields.acf_fields[item] = URLVideo;

                console.log("URLVideo: ", URLVideo)
            }
        
            else {
                myFields.acf_fields[item] = fieldsPost[item];  
            }
        })

        state.theme.objectForm = myFields;
        state.theme.postEvent;
    }

    /**VALIDATIONS STARTS */
    const { handleSubmit, handleChange, data: user, errors, fieldsPost} = useForm({
        validations: {

            // title: {
            //     pattern: {
            //         value: '^[A-Za-z]*$',
            //         message:
            //         "You're not allowed to use special characters or numbers in your name.",
            //     },
            // },
        
            link_to_website: {
                pattern: {
                    // value: '(https?://.+',   
                    value: '(^(https|http):\/\/([^\s]+)|(www\.[^\s]+))',       
                    message:"the link is invalid.",
                },
            },

            // organizer_email: {
            //     pattern: {
            //         value: '^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$',
            //         message: 'The email is not valid'
            //     }
            // },
            //CAMBIAR PATTERN POR UNO LINK DE YOUTUBE NORMAL
            video: {
                pattern: {
                  //value: '((https|http):\/\/(?:www\.)?(youtube.com\/embed\/[^\s]+|player.vimeo.com\/video\/[^\s]+))',
                  value: '(?:http?s?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(.+)|(?:http?s?:\/\/)?(?:www\.)?(?:vimeo\.com)\/?(.+)',
                  message: 'The url video is not valid'
                }
            },
        
            // date_time_start: {
            //     pattern: {
            //         value: '[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}',
            //         message: 'The datetime is invalid, try to suit the example show above'
            //     }
            // },

            // date_time_end: {
            //     pattern: {
            //         value: '[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}',
            //         message: 'The datetime is invalid, try to suit the example show above'
            //     }
            // }

        },
        onSubmit: () => postEventHandler(),
      });

  return (

    <FormContainer>

    <h1>Create an Event</h1>
    <p><strong>Step 4:</strong> Please complete the following form correctly and press Create Event Button to finsih the whole process.</p>
    <p><strong>Warning: </strong> You have to be sure that you're completing all the data correctly, For now, you won't be able to change it later.</p>
  
    <FormStyles onSubmit={handleSubmit}>
            <WrapperField>
                <label htmlFor="title">Title of the Event:</label><br></br>
                <input 
                    type="text"        
                    placeholder="Title of the Event"
                    defaultValue={user.title || ''}
                    onChange={handleChange('title')}
                    required
                />

                {/* {errors.title && <p>{errors.title}</p>} */}
            </WrapperField> <br></br>

            <WrapperField>
                <label htmlFor="organizer">Organizer/Organization Name:</label><br></br>
                <input
                    type="text"   
                    placeholder="Organizer's Name"                  
                    defaultValue={user.organizer || ''}
                    onChange={handleChange("organizer")}
                    required
                />
            </WrapperField> <br></br>

            <WrapperField>
                <label htmlFor="organizer_email">Organizer/Organization Email:</label><br></br>
                <input
                    type="email"   
                    placeholder="Organizer's Email"                  
                    defaultValue={user.organizer_email || ''}
                    onChange={handleChange("organizer_email")}
                    required
                />
                {/* {errors.organizer_email && <p>{errors.organizer_email}</p>} */}
            </WrapperField> <br></br>

            <WrapperField>
                <label htmlFor="link_to_website">Link Website</label><br></br>
                <input
                    type="text"                     
                    placeholder="Link of Website's Organization"                     
                    defaultValue={user.link_to_website || ''}
                    onChange={handleChange('link_to_website')}
                    required
                />
                {errors.link_to_website && <p>{errors.link_to_website}</p>}
            </WrapperField> <br></br> 

            <WrapperField>
                <label htmlFor="video_url">Video Url</label>
                <span>(Paste a embed Iframe code from youtube or vimeo. See a useful <a href="https://help.glassdoor.com/s/article/Finding-the-embed-code-on-YouTube-or-Vimeo?language=en_US" target="_blank" rel="noopener noreferrer">link</a>, on how to get an embed video)</span>
                <br></br>
                <textarea
                    placeholder="Video Link Embed"                     
                    defaultValue={user.video || ''}
                    onChange={handleChange('video')}
                    required
                />

                {errors.video && <p>{errors.video}</p>}
            </WrapperField> <br></br>

            <WrapperField>
                <label htmlFor="language_event">Language Event:</label><br></br>
                <input
                    type="text"
                    placeholder="Language Event"                     
                    defaultValue={user.language_event || ''}
                    onChange={handleChange("language_event")}
                    required
                />
            </WrapperField> <br></br>

            <WrapperField>
                <label htmlFor="cost">Cost:</label><br></br>
                <input
                    type="text"
                    placeholder="Cost of the Event"                     
                    defaultValue={user.cost || ''}
                    onChange={handleChange("cost")}
                    required
                />
            </WrapperField> <br></br>


            <DateTimeWrapper>
                <Global styles={DateTimePickerStyles} />
                <Global styles={CalendarCss} />
                <Global styles={ClockCss}/>
                <Global styles={generalStyles} />

                <div>
                    <label htmlFor="date_time_start">Date Time Start:</label><br></br>
                    <DateTimePicker
                        value={value}
                        onChange={onChange}
                        required
                    />
                </div>
            
                <div>   
                    <label>Duration: </label><span>(Write a duration in the format hh:mm. Ex: 01:30)</span><br></br>
                    <input 
                        type="text" 
                        required 
                        pattern="[0-9]{2}:[0-9]{2}" defaultValue={user.duration_event || ''} placeholder="hh:mm"
                        onChange={handleChange("duration_event")}
                    />
                </div>
      
            </DateTimeWrapper><br></br>

            <WrapperField>
                <label htmlFor="description">Description of the Event:</label><br></br>
                <textarea
                    placeholder= "Description"                     
                    defaultValue={user.description || ''}
                    onChange={handleChange("description")}
                    required
                />
            </WrapperField> <br></br>

            <WrapperField>
                <label htmlFor="timezone">Timezone:</label>
                <span>(Choose a timezone where the event going to take place)</span>
                <br></br>
                <select
                    type="text"
                    defaultValue="Africa/Abidjan"
                    onChange={handleChange("timezone")}
                    required
                >
                            <option value="Africa/Abidjan">Abidjan (Ivory Coast) (GMT)</option>
                            <option value="Africa/Accra">Accra (Ghana) (GMT)</option>
                            <option value="Africa/Addis_Ababa">Addis_Ababa (Ethiopia) (EAT)</option>
                            <option value="Africa/Algiers">Algiers (Algeria) (CET)</option>
                            <option value="Africa/Asmara">Asmara (Eritrea) (EAT)</option>
                            <option value="Africa/Bamako">Bamako (GMT)</option>
                            <option value="Africa/Bangui">Bangui (WAT)</option>
                            <option value="Africa/Banjul">Banjul (GMT)</option>
                            <option value="Africa/Bissau">Bissau (GMT)</option>
                            <option value="Africa/Blantyre">Blantyre (CAT)</option>
                            <option value="Africa/Brazzaville">Brazzaville (WAT)</option>
                            <option value="Africa/Bujumbura">Bujumbura (CAT)</option>
                            <option value="Africa/Cairo">Cairo (EET)</option>
                            <option value="Africa/Casablanca">Casablanca (+01)</option>
                            <option value="Africa/Ceuta">Ceuta (CEST)</option>
                            <option value="Africa/Conakry">Conakry (GMT)</option>
                            <option value="Africa/Dakar">Dakar (GMT)</option>
                            <option value="Africa/Dar_es_Salaam">Dar_es_Salaam (EAT)</option>
                            <option value="Africa/Djibouti">Djibouti (EAT)</option>
                            <option value="Africa/Douala">Douala (WAT)</option>
                            <option value="Africa/El_Aaiun">El_Aaiun (+01)</option>
                            <option value="Africa/Freetown">Freetown (GMT)</option>
                            <option value="Africa/Gaborone">Gaborone (CAT)</option>
                            <option value="Africa/Harare">Harare (CAT)</option>
                            <option value="Africa/Johannesburg">Johannesburg (SAST)</option>
                            <option value="Africa/Juba">Juba (CAT)</option>
                            <option value="Africa/Kampala">Kampala (EAT)</option>
                            <option value="Africa/Khartoum">Khartoum (CAT)</option>
                            <option value="Africa/Kigali">Kigali (CAT)</option>
                            <option value="Africa/Kinshasa">Kinshasa (WAT)</option>
                            <option value="Africa/Lagos">Lagos (WAT)</option>
                            <option value="Africa/Libreville">Libreville (WAT)</option>
                            <option value="Africa/Lome">Lome (GMT)</option>
                            <option value="Africa/Luanda">Luanda (WAT)</option>
                            <option value="Africa/Lubumbashi">Lubumbashi (CAT)</option>
                            <option value="Africa/Lusaka">Lusaka (CAT)</option>
                            <option value="Africa/Malabo">Malabo (WAT)</option>
                            <option value="Africa/Maputo">Maputo (CAT)</option>
                            <option value="Africa/Maseru">Maseru (SAST)</option>
                            <option value="Africa/Mbabane">Mbabane (SAST)</option>
                            <option value="Africa/Mogadishu">Mogadishu (EAT)</option>
                            <option value="Africa/Monrovia">Monrovia (GMT)</option>
                            <option value="Africa/Nairobi">Nairobi (EAT)</option>
                            <option value="Africa/Ndjamena">Ndjamena (WAT)</option>
                            <option value="Africa/Niamey">Niamey (WAT)</option>
                            <option value="Africa/Nouakchott">Nouakchott (GMT)</option>
                            <option value="Africa/Ouagadougou">Ouagadougou (GMT)</option>
                            <option value="Africa/Porto-Novo">Porto-Novo (WAT)</option>
                            <option value="Africa/Sao_Tome">Sao_Tome (GMT)</option>
                            <option value="Africa/Tripoli">Tripoli (EET)</option>
                            <option value="Africa/Tunis">Tunis (CET)</option>
                            <option value="Africa/Windhoek">Windhoek (CAT)</option>
                            <option value="America/Adak">America/Adak (HDT)</option>
                            <option value="America/Anchorage">America/Anchorage (AKDT)</option>
                            <option value="America/Anguilla">America/Anguilla (AST)</option>
                            <option value="America/Antigua">America/Antigua (AST)</option>
                            <option value="America/Araguaina">America/Araguaina (-03)</option>
                            <option value="America/Argentina/Buenos_Aires"> Buenos_Aires (Argentina) (-03)</option>
                            <option value="America/Argentina/Catamarca">Catamarca (Argentina) (-03)</option>
                            <option value="America/Argentina/Cordoba">Cordoba (Argentina) (-03)</option>
                            <option value="America/Argentina/Jujuy"> Jujuy (Argentina) (-03)</option>
                            <option value="America/Argentina/La_Rioja"> La_Rioja (Argentina) (-03)</option>
                            <option value="America/Argentina/Mendoza"> Mendoza (Argentina) (-03)</option>
                            <option value="America/Argentina/Rio_Gallegos"> Rio_Gallegos (Argentina) (-03)</option>
                            <option value="America/Argentina/Salta"> Salta (Argentina) (-03)</option>
                            <option value="America/Argentina/San_Juan"> San_Juan (Argentina) (-03)</option>
                            <option value="America/Argentina/San_Luis"> San_Luis (Argentina) (-03)</option>
                            <option value="America/Argentina/Tucuman"> Tucuman (Argentina) (-03)</option>
                            <option value="America/Argentina/Ushuaia"> Ushuaia (Argentina) (-03)</option>
                            <option value="America/Aruba"> Oranjestad (Aruba) (AST)</option>
                            <option value="America/Asuncion"> Asuncion (Paraguay) (-04)</option>
                            <option value="America/Atikokan"> Atikokan (Ontario) (EST)</option>
                            <option value="America/Bahia"> Bahia (Brasil) (-03)</option>
                            <option value="America/Bahia_Banderas"> Bahia_Banderas (México) (CDT)</option>
                            <option value="America/Barbados"> Barbados (Caribe) (AST)</option>
                            <option value="America/Belem"> Belem (Brasil) (-03)</option>
                            <option value="America/Belize"> Belize (Belize) (CST)</option>
                            <option value="America/Blanc-Sablon"> Blanc-Sablon (Canada) (AST)</option>
                            <option value="America/Boa_Vista"> Boa_Vista (Brasil) (-04)</option>
                            <option value="America/Bogota">Bogota (Colombia) (-05)</option>
                            <option value="America/Boise">America/Boise (MDT)</option>
                            <option value="America/Cambridge_Bay">America/Cambridge_Bay (MDT)</option>
                            <option value="America/Campo_Grande">America/Campo_Grande (-04)</option>
                            <option value="America/Cancun">America/Cancun (EST)</option>
                            <option value="America/Caracas">America/Caracas (-04)</option>
                            <option value="America/Cayenne">America/Cayenne (-03)</option>
                            <option value="America/Cayman">America/Cayman (EST)</option>
                            <option value="America/Chicago">America/Chicago (CDT)</option>
                            <option value="America/Chihuahua">America/Chihuahua (MDT)</option>
                            <option value="America/Costa_Rica">America/Costa_Rica (CST)</option>
                            <option value="America/Creston">America/Creston (MST)</option>
                            <option value="America/Cuiaba">America/Cuiaba (-04)</option>
                            <option value="America/Curacao">America/Curacao (AST)</option>
                            <option value="America/Danmarkshavn">America/Danmarkshavn (GMT)</option>
                            <option value="America/Dawson">America/Dawson (MST)</option>
                            <option value="America/Dawson_Creek">America/Dawson_Creek (MST)</option>
                            <option value="America/Denver">America/Denver (MDT)</option>
                            <option value="America/Detroit">America/Detroit (EDT)</option>
                            <option value="America/Dominica">America/Dominica (AST)</option>
                            <option value="America/Edmonton">America/Edmonton (MDT)</option>
                            <option value="America/Eirunepe">America/Eirunepe (-05)</option>
                            <option value="America/El_Salvador">America/El_Salvador (CST)</option>
                            <option value="America/Fort_Nelson">America/Fort_Nelson (MST)</option>
                            <option value="America/Fortaleza">America/Fortaleza (-03)</option>
                            <option value="America/Glace_Bay">America/Glace_Bay (ADT)</option>
                            <option value="America/Goose_Bay">America/Goose_Bay (ADT)</option>
                            <option value="America/Grand_Turk">America/Grand_Turk (EDT)</option>
                            <option value="America/Grenada">America/Grenada (AST)</option>
                            <option value="America/Guadeloupe">America/Guadeloupe (AST)</option>
                            <option value="America/Guatemala">America/Guatemala (CST)</option>
                            <option value="America/Guayaquil">America/Guayaquil (-05)</option>
                            <option value="America/Guyana">America/Guyana (-04)</option>
                            <option value="America/Halifax">America/Halifax (ADT)</option>
                            <option value="America/Havana">America/Havana (CDT)</option>
                            <option value="America/Hermosillo">America/Hermosillo (MST)</option>
                            <option value="America/Indiana/Indianapolis">America/Indiana/Indianapolis (EDT)</option>
                            <option value="America/Indiana/Knox">America/Indiana/Knox (CDT)</option>
                            <option value="America/Indiana/Marengo">America/Indiana/Marengo (EDT)</option>
                            <option value="America/Indiana/Petersburg">America/Indiana/Petersburg (EDT)</option>
                            <option value="America/Indiana/Tell_City">America/Indiana/Tell_City (CDT)</option>
                            <option value="America/Indiana/Vevay">America/Indiana/Vevay (EDT)</option>
                            <option value="America/Indiana/Vincennes">America/Indiana/Vincennes (EDT)</option>
                            <option value="America/Indiana/Winamac">America/Indiana/Winamac (EDT)</option>
                            <option value="America/Inuvik">America/Inuvik (MDT)</option>
                            <option value="America/Iqaluit">America/Iqaluit (EDT)</option>
                            <option value="America/Jamaica">America/Jamaica (EST)</option>
                            <option value="America/Juneau">America/Juneau (AKDT)</option>
                            <option value="America/Kentucky/Louisville">America/Kentucky/Louisville (EDT)</option>
                            <option value="America/Kentucky/Monticello">America/Kentucky/Monticello (EDT)</option>
                            <option value="America/Kralendijk">America/Kralendijk (AST)</option>
                            <option value="America/La_Paz">America/La_Paz (-04)</option>
                            <option value="America/Lima">America/Lima (-05)</option>
                            <option value="America/Los_Angeles" selected="selected">America/Los_Angeles (PDT)</option>
                            <option value="America/Lower_Princes">America/Lower_Princes (AST)</option>
                            <option value="America/Maceio">America/Maceio (-03)</option>
                            <option value="America/Managua">America/Managua (CST)</option>
                            <option value="America/Manaus">America/Manaus (-04)</option>
                            <option value="America/Marigot">America/Marigot (AST)</option>
                            <option value="America/Martinique">America/Martinique (AST)</option>
                            <option value="America/Matamoros">America/Matamoros (CDT)</option>
                            <option value="America/Mazatlan">America/Mazatlan (MDT)</option>
                            <option value="America/Menominee">America/Menominee (CDT)</option>
                            <option value="America/Merida">America/Merida (CDT)</option>
                            <option value="America/Metlakatla">America/Metlakatla (AKDT)</option>
                            <option value="America/Mexico_City">America/Mexico_City (CDT)</option>
                            <option value="America/Miquelon">America/Miquelon (-02)</option>
                            <option value="America/Moncton">America/Moncton (ADT)</option>
                            <option value="America/Monterrey">America/Monterrey (CDT)</option>
                            <option value="America/Montevideo">America/Montevideo (-03)</option>
                            <option value="America/Montserrat">America/Montserrat (AST)</option>
                            <option value="America/Nassau">America/Nassau (EDT)</option>
                            <option value="America/New_York">America/New_York (EDT)</option>
                            <option value="America/Nipigon">America/Nipigon (EDT)</option>
                            <option value="America/Nome">America/Nome (AKDT)</option>
                            <option value="America/Noronha">America/Noronha (-02)</option>
                            <option value="America/North_Dakota/Beulah">America/North_Dakota/Beulah (CDT)</option>
                            <option value="America/North_Dakota/Center">America/North_Dakota/Center (CDT)</option>
                            <option value="America/North_Dakota/New_Salem">America/North_Dakota/New_Salem (CDT)</option>
                            <option value="America/Nuuk">America/Nuuk (-02)</option>
                            <option value="America/Ojinaga">America/Ojinaga (MDT)</option>
                            <option value="America/Panama">America/Panama (EST)</option>
                            <option value="America/Pangnirtung">America/Pangnirtung (EDT)</option>
                            <option value="America/Paramaribo">America/Paramaribo (-03)</option>
                            <option value="America/Phoenix">America/Phoenix (MST)</option>
                            <option value="America/Port-au-Prince">America/Port-au-Prince (EDT)</option>
                            <option value="America/Port_of_Spain">America/Port_of_Spain (AST)</option>
                            <option value="America/Porto_Velho">America/Porto_Velho (-04)</option>
                            <option value="America/Puerto_Rico">America/Puerto_Rico (AST)</option>
                            <option value="America/Punta_Arenas">America/Punta_Arenas (-03)</option>
                            <option value="America/Rainy_River">America/Rainy_River (CDT)</option>
                            <option value="America/Rankin_Inlet">America/Rankin_Inlet (CDT)</option>
                            <option value="America/Recife">America/Recife (-03)</option>
                            <option value="America/Regina">America/Regina (CST)</option>
                            <option value="America/Resolute">America/Resolute (CDT)</option>
                            <option value="America/Rio_Branco">America/Rio_Branco (-05)</option>
                            <option value="America/Santarem">America/Santarem (-03)</option>
                            <option value="America/Santiago">America/Santiago (-04)</option>
                            <option value="America/Santo_Domingo">America/Santo_Domingo (AST)</option>
                            <option value="America/Sao_Paulo">America/Sao_Paulo (-03)</option>
                            <option value="America/Scoresbysund">America/Scoresbysund (+00)</option>
                            <option value="America/Sitka">America/Sitka (AKDT)</option>
                            <option value="America/St_Barthelemy">America/St_Barthelemy (AST)</option>
                            <option value="America/St_Johns">America/St_Johns (NDT)</option>
                            <option value="America/St_Kitts">America/St_Kitts (AST)</option>
                            <option value="America/St_Lucia">America/St_Lucia (AST)</option>
                            <option value="America/St_Thomas">America/St_Thomas (AST)</option>
                            <option value="America/St_Vincent">America/St_Vincent (AST)</option>
                            <option value="America/Swift_Current">America/Swift_Current (CST)</option>
                            <option value="America/Tegucigalpa">America/Tegucigalpa (CST)</option>
                            <option value="America/Thule">America/Thule (ADT)</option>
                            <option value="America/Thunder_Bay">America/Thunder_Bay (EDT)</option>
                            <option value="America/Tijuana">America/Tijuana (PDT)</option>
                            <option value="America/Toronto">America/Toronto (EDT)</option>
                            <option value="America/Tortola">America/Tortola (AST)</option>
                            <option value="America/Vancouver">America/Vancouver (PDT)</option>
                            <option value="America/Whitehorse">America/Whitehorse (MST)</option>
                            <option value="America/Winnipeg">America/Winnipeg (CDT)</option>
                            <option value="America/Yakutat">America/Yakutat (AKDT)</option>
                            <option value="America/Yellowknife">America/Yellowknife (MDT)</option>
                            <option value="Antarctica/Casey">Antarctica/Casey (+11)</option>
                            <option value="Antarctica/Davis">Antarctica/Davis (+07)</option>
                            <option value="Antarctica/DumontDUrville">Antarctica/DumontDUrville (+10)</option>
                            <option value="Antarctica/Macquarie">Antarctica/Macquarie (AEST)</option>
                            <option value="Antarctica/Mawson">Antarctica/Mawson (+05)</option>
                            <option value="Antarctica/McMurdo">Antarctica/McMurdo (NZST)</option>
                            <option value="Antarctica/Palmer">Antarctica/Palmer (-03)</option>
                            <option value="Antarctica/Rothera">Antarctica/Rothera (-03)</option>
                            <option value="Antarctica/Syowa">Antarctica/Syowa (+03)</option>
                            <option value="Antarctica/Troll">Antarctica/Troll (+02)</option>
                            <option value="Antarctica/Vostok">Antarctica/Vostok (+06)</option>
                            <option value="Arctic/Longyearbyen">Arctic/Longyearbyen (CEST)</option>
                            <option value="Asia/Aden">Asia/Aden (+03)</option>
                            <option value="Asia/Almaty">Asia/Almaty (+06)</option>
                            <option value="Asia/Amman">Asia/Amman (EEST)</option>
                            <option value="Asia/Anadyr">Asia/Anadyr (+12)</option>
                            <option value="Asia/Aqtau">Asia/Aqtau (+05)</option>
                            <option value="Asia/Aqtobe">Asia/Aqtobe (+05)</option>
                            <option value="Asia/Ashgabat">Asia/Ashgabat (+05)</option>
                            <option value="Asia/Atyrau">Asia/Atyrau (+05)</option>
                            <option value="Asia/Baghdad">Asia/Baghdad (+03)</option>
                            <option value="Asia/Bahrain">Asia/Bahrain (+03)</option>
                            <option value="Asia/Baku">Asia/Baku (+04)</option>
                            <option value="Asia/Bangkok">Asia/Bangkok (+07)</option>
                            <option value="Asia/Barnaul">Asia/Barnaul (+07)</option>
                            <option value="Asia/Beirut">Asia/Beirut (EEST)</option>
                            <option value="Asia/Bishkek">Asia/Bishkek (+06)</option>
                            <option value="Asia/Brunei">Asia/Brunei (+08)</option>
                            <option value="Asia/Chita">Asia/Chita (+09)</option>
                            <option value="Asia/Choibalsan">Asia/Choibalsan (+08)</option>
                            <option value="Asia/Colombo">Asia/Colombo (+0530)</option>
                            <option value="Asia/Damascus">Asia/Damascus (EEST)</option>
                            <option value="Asia/Dhaka">Asia/Dhaka (+06)</option>
                            <option value="Asia/Dili">Asia/Dili (+09)</option>
                            <option value="Asia/Dubai">Asia/Dubai (+04)</option>
                            <option value="Asia/Dushanbe">Asia/Dushanbe (+05)</option>
                            <option value="Asia/Famagusta">Asia/Famagusta (EEST)</option>
                            <option value="Asia/Gaza">Asia/Gaza (EEST)</option>
                            <option value="Asia/Hebron">Asia/Hebron (EEST)</option>
                            <option value="Asia/Ho_Chi_Minh">Asia/Ho_Chi_Minh (+07)</option>
                            <option value="Asia/Hong_Kong">Asia/Hong_Kong (HKT)</option>
                            <option value="Asia/Hovd">Asia/Hovd (+07)</option>
                            <option value="Asia/Irkutsk">Asia/Irkutsk (+08)</option>
                            <option value="Asia/Jakarta">Asia/Jakarta (WIB)</option>
                            <option value="Asia/Jayapura">Asia/Jayapura (WIT)</option>
                            <option value="Asia/Jerusalem">Asia/Jerusalem (IDT)</option>
                            <option value="Asia/Kabul">Asia/Kabul (+0430)</option>
                            <option value="Asia/Kamchatka">Asia/Kamchatka (+12)</option>
                            <option value="Asia/Karachi">Asia/Karachi (PKT)</option>
                            <option value="Asia/Kathmandu">Asia/Kathmandu (+0545)</option>
                            <option value="Asia/Khandyga">Asia/Khandyga (+09)</option>
                            <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                            <option value="Asia/Krasnoyarsk">Asia/Krasnoyarsk (+07)</option>
                            <option value="Asia/Kuala_Lumpur">Asia/Kuala_Lumpur (+08)</option>
                            <option value="Asia/Kuching">Asia/Kuching (+08)</option>
                            <option value="Asia/Kuwait">Asia/Kuwait (+03)</option>
                            <option value="Asia/Macau">Asia/Macau (CST)</option>
                            <option value="Asia/Magadan">Asia/Magadan (+11)</option>
                            <option value="Asia/Makassar">Asia/Makassar (WITA)</option>
                            <option value="Asia/Manila">Asia/Manila (PST)</option>
                            <option value="Asia/Muscat">Asia/Muscat (+04)</option>
                            <option value="Asia/Nicosia">Asia/Nicosia (EEST)</option>
                            <option value="Asia/Novokuznetsk">Asia/Novokuznetsk (+07)</option>
                            <option value="Asia/Novosibirsk">Asia/Novosibirsk (+07)</option>
                            <option value="Asia/Omsk">Asia/Omsk (+06)</option>
                            <option value="Asia/Oral">Asia/Oral (+05)</option>
                            <option value="Asia/Phnom_Penh">Asia/Phnom_Penh (+07)</option>
                            <option value="Asia/Pontianak">Asia/Pontianak (WIB)</option>
                            <option value="Asia/Pyongyang">Asia/Pyongyang (KST)</option>
                            <option value="Asia/Qatar">Asia/Qatar (+03)</option>
                            <option value="Asia/Qostanay">Asia/Qostanay (+06)</option>
                            <option value="Asia/Qyzylorda">Asia/Qyzylorda (+05)</option>
                            <option value="Asia/Riyadh">Asia/Riyadh (+03)</option>
                            <option value="Asia/Sakhalin">Asia/Sakhalin (+11)</option>
                            <option value="Asia/Samarkand">Asia/Samarkand (+05)</option>
                            <option value="Asia/Seoul">Asia/Seoul (KST)</option>
                            <option value="Asia/Shanghai">Asia/Shanghai (CST)</option>
                            <option value="Asia/Singapore">Asia/Singapore (+08)</option>
                            <option value="Asia/Srednekolymsk">Asia/Srednekolymsk (+11)</option>
                            <option value="Asia/Taipei">Asia/Taipei (CST)</option>
                            <option value="Asia/Tashkent">Asia/Tashkent (+05)</option>
                            <option value="Asia/Tbilisi">Asia/Tbilisi (+04)</option>
                            <option value="Asia/Tehran">Asia/Tehran (+0430)</option>
                            <option value="Asia/Thimphu">Asia/Thimphu (+06)</option>
                            <option value="Asia/Tokyo">Asia/Tokyo (JST)</option>
                            <option value="Asia/Tomsk">Asia/Tomsk (+07)</option>
                            <option value="Asia/Ulaanbaatar">Asia/Ulaanbaatar (+08)</option>
                            <option value="Asia/Urumqi">Asia/Urumqi (+06)</option>
                            <option value="Asia/Ust-Nera">Asia/Ust-Nera (+10)</option>
                            <option value="Asia/Vientiane">Asia/Vientiane (+07)</option>
                            <option value="Asia/Vladivostok">Asia/Vladivostok (+10)</option>
                            <option value="Asia/Yakutsk">Asia/Yakutsk (+09)</option>
                            <option value="Asia/Yangon">Asia/Yangon (+0630)</option>
                            <option value="Asia/Yekaterinburg">Asia/Yekaterinburg (+05)</option>
                            <option value="Asia/Yerevan">Asia/Yerevan (+04)</option>
                            <option value="Atlantic/Azores">Atlantic/Azores (+00)</option>
                            <option value="Atlantic/Bermuda">Atlantic/Bermuda (ADT)</option>
                            <option value="Atlantic/Canary">Atlantic/Canary (WEST)</option>
                            <option value="Atlantic/Cape_Verde">Atlantic/Cape_Verde (-01)</option>
                            <option value="Atlantic/Faroe">Atlantic/Faroe (WEST)</option>
                            <option value="Atlantic/Madeira">Atlantic/Madeira (WEST)</option>
                            <option value="Atlantic/Reykjavik">Atlantic/Reykjavik (GMT)</option>
                            <option value="Atlantic/South_Georgia">Atlantic/South_Georgia (-02)</option>
                            <option value="Atlantic/St_Helena">Atlantic/St_Helena (GMT)</option>
                            <option value="Atlantic/Stanley">Atlantic/Stanley (-03)</option>
                            <option value="Australia/Adelaide">Australia/Adelaide (ACST)</option>
                            <option value="Australia/Brisbane">Australia/Brisbane (AEST)</option>
                            <option value="Australia/Broken_Hill">Australia/Broken_Hill (ACST)</option>
                            <option value="Australia/Darwin">Australia/Darwin (ACST)</option>
                            <option value="Australia/Eucla">Australia/Eucla (+0845)</option>
                            <option value="Australia/Hobart">Australia/Hobart (AEST)</option>
                            <option value="Australia/Lindeman">Australia/Lindeman (AEST)</option>
                            <option value="Australia/Lord_Howe">Australia/Lord_Howe (+1030)</option>
                            <option value="Australia/Melbourne">Australia/Melbourne (AEST)</option>
                            <option value="Australia/Perth">Australia/Perth (AWST)</option>
                            <option value="Australia/Sydney">Australia/Sydney (AEST)</option>
                            <option value="Europe/Amsterdam"> Amsterdam (Netherlands) (CEST)</option>
                            <option value="Europe/Andorra"> Andorra (Andorra) (CEST)</option>
                            <option value="Europe/Astrakhan"> Astrakhan (Russia) (+04)</option>
                            <option value="Europe/Athens"> Athens (Greek) (EEST)</option>
                            <option value="Europe/Belgrade"> Belgrade (Serbia) (CEST)</option>
                            <option value="Europe/Berlin"> Berlin (Germany) (CEST)</option>
                            <option value="Europe/Bratislava"> Bratislava (Slovakia) (CEST)</option>
                            <option value="Europe/Brussels"> Brussels (Belgium) (CEST)</option>
                            <option value="Europe/Bucharest"> Bucharest (Romania) (EEST)</option>
                            <option value="Europe/Budapest"> Budapest (Hungary) (CEST)</option>
                            <option value="Europe/Busingen"> Busingen (Germany) (CEST)</option>
                            <option value="Europe/Chisinau"> Chisinau (Republic of Moldova) (EEST)</option>
                            <option value="Europe/Copenhagen"> Copenhagen (Denmark) (CEST)</option>
                            <option value="Europe/Dublin"> Dublin (Ireland) (IST)</option>
                            <option value="Europe/Gibraltar"> Gibraltar (CEST)</option>
                            <option value="Europe/Guernsey"> Guernsey (BST)</option>
                            <option value="Europe/Helsinki"> Helsinki (Finland) (EEST)</option>
                            <option value="Europe/Isle_of_Man"> Isle_of_Man (BST)</option>
                            <option value="Europe/Istanbul"> Istanbul (Turkey) (+03)</option>
                            <option value="Europe/Jersey"> Jersey (BST)</option>
                            <option value="Europe/Kaliningrad"> Kaliningrad (Russia) (EET)</option>
                            <option value="Europe/Kiev"> Kiev  (Ukrain)(EEST)</option>
                            <option value="Europe/Kirov"> Kirov (Russia) (+03)</option>
                            <option value="Europe/Lisbon"> Lisbon (Portugal) (WEST)</option>
                            <option value="Europe/Ljubljana"> Ljubljana (Slovenia) (CEST)</option>
                            <option value="Europe/London"> London (England) (BST)</option>
                            <option value="Europe/Luxembourg"> Luxembourg (Luxembourg)(CEST)</option>
                            <option value="Europe/Madrid"> Madrid (Spain) (CEST)</option>
                            <option value="Europe/Malta"> Malta (CEST)</option>
                            <option value="Europe/Mariehamn"> Mariehamn (Finland) (EEST)</option>
                            <option value="Europe/Minsk"> Minsk (Belarus) (+03)</option>
                            <option value="Europe/Monaco"> Monaco (CEST)</option>
                            <option value="Europe/Moscow"> Moscow (Russia) (MSK)</option>
                            <option value="Europe/Oslo"> Oslo (Norway) (CEST)</option>
                            <option value="Europe/Paris"> Paris (France) (CEST)</option>
                            <option value="Europe/Podgorica"> Podgorica () (CEST)</option>
                            <option value="Europe/Prague"> Prague (Cezch Republik)(CEST)</option>
                            <option value="Europe/Riga"> Riga (Latvia) (EEST)</option>
                            <option value="Europe/Rome"> Rome (Italy )(CEST)</option>
                            <option value="Europe/Samara"> Samara (Russia) (+04)</option>
                            <option value="Europe/San_Marino"> San_Marino (CEST)</option>
                            <option value="Europe/Sarajevo"> Sarajevo (Bosnia and Herzegovina) (CEST)</option>
                            <option value="Europe/Saratov"> Saratov (Russia) (+04)</option>
                            <option value="Europe/Simferopol"> Simferopol (Ukrain) (MSK)</option>
                            <option value="Europe/Skopje"> Skopje ((North Macedonia) (CEST)</option>
                            <option value="Europe/Sofia"> Sofia (Bulgaria) (EEST)</option>
                            <option value="Europe/Stockholm"> Stockholm (Sweden) (CEST)</option>
                            <option value="Europe/Tallinn"> Tallinn (Estonia) (EEST)</option>
                            <option value="Europe/Tirane"> Tirane  ()(CEST)</option>
                            <option value="Europe/Ulyanovsk"> Ulyanovsk (Russia) (+04)</option>
                            <option value="Europe/Uzhgorod"> Uzhgorod (Slovakia) (EEST)</option>
                            <option value="Europe/Vaduz"> Vaduz (Liechtenstein) (CEST)</option>
                            <option value="Europe/Vatican"> Vatican (CEST)</option>
                            <option value="Europe/Vienna"> Vienna (Austria) (CEST)</option>
                            <option value="Europe/Vilnius"> Vilnius (Lithuania) (EEST)</option>
                            <option value="Europe/Volgograd"> Volgograd (Russia) (+03)</option>
                            <option value="Europe/Warsaw"> Warsaw (Poland) (CEST)</option>
                            <option value="Europe/Zagreb"> Zagreb (Crotia) (CEST)</option>
                            <option value="Europe/Zaporozhye"> Zaporozhye (Ukraine) (EEST)</option>
                            <option value="Europe/Zurich"> Zurich (Switzerland) (CEST)</option>
                            <option value="Indian/Antananarivo">Indian/Antananarivo (EAT)</option>
                            <option value="Indian/Chagos">Indian/Chagos (+06)</option>
                            <option value="Indian/Christmas">Indian/Christmas (+07)</option>
                            <option value="Indian/Cocos">Indian/Cocos (+0630)</option>
                            <option value="Indian/Comoro">Indian/Comoro (EAT)</option>
                            <option value="Indian/Kerguelen">Indian/Kerguelen (+05)</option>
                            <option value="Indian/Mahe">Indian/Mahe (+04)</option>
                            <option value="Indian/Maldives">Indian/Maldives (+05)</option>
                            <option value="Indian/Mauritius">Indian/Mauritius (+04)</option>
                            <option value="Indian/Mayotte">Indian/Mayotte (EAT)</option>
                            <option value="Indian/Reunion">Indian/Reunion (+04)</option>
                            <option value="Pacific/Apia">Pacific/Apia (+13)</option>
                            <option value="Pacific/Auckland">Pacific/Auckland (NZST)</option>
                            <option value="Pacific/Bougainville">Pacific/Bougainville (+11)</option>
                            <option value="Pacific/Chatham">Pacific/Chatham (+1245)</option>
                            <option value="Pacific/Chuuk">Pacific/Chuuk (+10)</option>
                            <option value="Pacific/Easter">Pacific/Easter (-06)</option>
                            <option value="Pacific/Efate">Pacific/Efate (+11)</option>
                            <option value="Pacific/Enderbury">Pacific/Enderbury (+13)</option>
                            <option value="Pacific/Fakaofo">Pacific/Fakaofo (+13)</option>
                            <option value="Pacific/Fiji">Pacific/Fiji (+12)</option>
                            <option value="Pacific/Funafuti">Pacific/Funafuti (+12)</option>
                            <option value="Pacific/Galapagos">Pacific/Galapagos (-06)</option>
                            <option value="Pacific/Gambier">Pacific/Gambier (-09)</option>
                            <option value="Pacific/Guadalcanal">Pacific/Guadalcanal (+11)</option>
                            <option value="Pacific/Guam">Pacific/Guam (ChST)</option>
                            <option value="Pacific/Honolulu">Pacific/Honolulu (HST)</option>
                            <option value="Pacific/Kiritimati">Pacific/Kiritimati (+14)</option>
                            <option value="Pacific/Kosrae">Pacific/Kosrae (+11)</option>
                            <option value="Pacific/Kwajalein">Pacific/Kwajalein (+12)</option>
                            <option value="Pacific/Majuro">Pacific/Majuro (+12)</option>
                            <option value="Pacific/Marquesas">Pacific/Marquesas (-0930)</option>
                            <option value="Pacific/Midway">Pacific/Midway (SST)</option>
                            <option value="Pacific/Nauru">Pacific/Nauru (+12)</option>
                            <option value="Pacific/Niue">Pacific/Niue (-11)</option>
                            <option value="Pacific/Norfolk">Pacific/Norfolk (+11)</option>
                            <option value="Pacific/Noumea">Pacific/Noumea (+11)</option>
                            <option value="Pacific/Pago_Pago">Pacific/Pago_Pago (SST)</option>
                            <option value="Pacific/Palau">Pacific/Palau (+09)</option>
                            <option value="Pacific/Pitcairn">Pacific/Pitcairn (-08)</option>
                            <option value="Pacific/Pohnpei">Pacific/Pohnpei (+11)</option>
                            <option value="Pacific/Port_Moresby">Pacific/Port_Moresby (+10)</option>
                            <option value="Pacific/Rarotonga">Pacific/Rarotonga (-10)</option>
                            <option value="Pacific/Saipan">Pacific/Saipan (ChST)</option>
                            <option value="Pacific/Tahiti">Pacific/Tahiti (-10)</option>
                            <option value="Pacific/Tarawa">Pacific/Tarawa (+12)</option>
                            <option value="Pacific/Tongatapu">Pacific/Tongatapu (+13)</option>
                            <option value="Pacific/Wake">Pacific/Wake (+12)</option>
                            <option value="Pacific/Wallis">Pacific/Wallis (+12)</option>
                            <option value="UTC">UTC (UTC)</option>
                    </select>
            </WrapperField> <br></br>    

            <CityCountryWrapper>
                <input
                    type="text"
                    placeholder="Address's Event"                     
                    defaultValue={user.address || ''}
                    onChange={handleChange("address")}
                    required
                />
                
                <CountryDropdown
                    value={country}
                    onChange={val => selectCountry(val)} 
                />

                <RegionDropdown
                    country={country}
                    value={city}
                    onChange={(val) => selectCity(val)} 
                />
            </CityCountryWrapper><br></br>    

            <ButtonSubmit type="submit" className="submit">
                Create Event
            </ButtonSubmit>
        
        </FormStyles>

    </FormContainer>

  );
};

const FormContainer = styled.div`
    padding: 0rem 1rem;
    margin-top: 12rem;
    margin-bottom: 5rem;

    @media(max-width: 768px) {
        padding: 0rem 1rem;
        margin: 8rem 0;
    }

    h1 {
        font-size: 1.5rem;
    }

    p {
        font-size: 1.2rem;
    }
`;

const FormStyles = styled.form`
  display: flex;
  flex-wrap: wrap;

  @media (max-width: 768px){
    padding: 0;
  }
`

const WrapperField = styled.div`
    display: flex;
    flex-direction: column;
    flex-basis: 90%;
    
    /**new start */
    @media (max-width: 768px){
        &:nth-of-type(9) {
            margin-top: 4rem;
        }
    }
   /**new ends */
    
    @media (min-width: 768px){
        flex-basis: 45%;
        margin-right: 5rem;
    }
     
    label {
        padding: 2rem 1rem 0 0;
        display: flex;
        width: 100%;
    }

    input[type=text], input[type=datetime-local], input[type=email], select {
        // input elements with type="text" attribute
        padding:10px;
        margin:10px 0; 
        border: 2px solid #777;
        box-shadow:0 0 15px 4px rgba(0,0,0,0.06);
        border-radius:10px;
        width:100%;
        font-family:inherit;
        font-size: inherit;
    }

    textarea {
        // input elements with type="text" attribute
        border: 2px solid #777;
        box-shadow:0 0 15px 4px rgba(0,0,0,0.06);
        border-radius:10px;
        width:100%;
        font-family:inherit;
        font-size: inherit;
        height: 100%;
        
    }

    span {
        color: #696969;
        font-size: .9rem;

        a {
            list-style: none;
            color:red;
        }
    }

    p{
        margin-top: 0;
        color: #e4605e;
        font-size: 1rem;
    }
`

const ButtonSubmit = styled.button`

    /* remove default behavior */
    display: flex;
    appearance:none;
    -webkit-appearance:none;

    /* usual styles */
    padding:1rem 2rem;
    border:none;
    background-color:#3F51B5;
    color:#fff;
    font-weight:600;
    border-radius:5px;
    margin-top: 3rem;
    cursor: pointer;
    font-size: 1.2rem;

    @media(min-width: 768px) {
        margin-top: 3rem;
    }
`
//datetimewraper styles
const DateTimeWrapper = styled.div`
    display: flex;
    @media(max-width: 768px) {
        flex-direction: column;
    }

    label {
        padding: 2rem 1rem 0 0;
        display: flex;
        width: 100%;
    }

    span {
        color: #696969;
        font-size: .9rem;

        a {
            list-style: none;
            color:red;
        }
    }

    input[type=text] {
        // input elements with type="text" attribute
        padding:10px;
        margin:10px 0; 
        border: 2px solid #777;
        box-shadow:0 0 15px 4px rgba(0,0,0,0.06);
        border-radius:10px;
        max-width: 80%;
        font-family:inherit;
        font-size: inherit;
    }
`;

const CityCountryWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 4rem;
    flex-basis: 90%;

    input[type=text], select {
        // input elements with type="text" attribute
        padding:10px;
        margin:10px 0; 
        border: 2px solid #777;
        box-shadow:0 0 15px 4px rgba(0,0,0,0.06);
        border-radius:10px;
        max-width:100%;
        font-family:inherit;
        font-size: inherit;
    }

        /**new start */
    @media (max-width: 768px){

        flex-direction: column;
        max-width: 90%;
        margin-top: 1rem;

        input[type=text], select {
            // input elements with type="text" attribute
            padding:10px;
            margin: 10px 0; 
            border: 2px solid #777;
            box-shadow: 0 0 15px 4px rgba(0,0,0,0.06);
            max-width: 100%;
            border-radius: 10px;
            font-family: inherit;
            font-size: inherit;
        }
    }

`;

export default connect(FormEvent);
