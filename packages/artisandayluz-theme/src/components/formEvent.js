import React, {useEffect} from "react";
import { connect, styled } from "frontity";

const FormEvent = ({ state, actions }) => {

  const myFields = {
    "title": "",
    "acf_fields": {
      "title": "",
      "organizer": "",
      "link_to_website": "",
      "description": "",
      "video": "",
      "language_event": "",
      "timezone": "",
      "date_time_start": "",
      "date_time_end": ""
    },
  }  

const updateMyTitle = (field, value) => {
    myFields[field] = value; 
    myFields.acf_fields[field] = value; 
}

const updateMyField = (field, value) => {
    myFields.acf_fields[field] = value; 
}

state.theme.objectForm = myFields;

  return (

    <FormContainer>

    <h1>Create an Event</h1>
    <p><strong>Step 4:</strong> Please complete the following form correctly and press Post Event Button to finsih the whole process.</p>
    <p><strong>Warning: </strong> You have to be sure that you're completing all the data correctly, For now, you won't be able to change it later.</p>
  
    <FormStyles method="POST">
            <div>
                <label htmlFor="title">Title of the Event:</label><br></br>
                <input         
                    type="text"
                    defaultValue= ""
                    onChange={(e) => updateMyTitle("title", e.target.value)}
                />
            </div> 

            <div>
                <label htmlFor="organizer">Organizer/Organization Name:</label><br></br>
                <input                     
                    type="text"
                    defaultValue=""
                    onChange={(e) => updateMyField("organizer", e.target.value)}
                />
            </div> <br></br>

            <div>
                <label htmlFor="linkwebsite">Link of Website's Organization:</label><br></br>
                <input                     
                    type="text"
                    defaultValue=""
                    onChange={(e) => updateMyField("link_to_website", e.target.value)}
                />
            </div> <br></br>

            <div>
                <label htmlFor="video">Link Video:</label>
                <span>(The link video has to be an embed link video from youtube, vimeo or other platform of your preference. See a useful <a href="https://help.glassdoor.com/s/article/Finding-the-embed-code-on-YouTube-or-Vimeo?language=en_US" target="_blank" rel="noopener noreferrer">link</a>, on how to get an embed video)</span>
                <br></br>
                <input                     
                    type="text"
                    defaultValue=""
                    onChange={(e) => updateMyField("video", e.target.value)}
                />
            </div> <br></br>
            <div>
                <label htmlFor="language_event">Language Event:</label><br></br>
                <input                     
                    type="text"
                    defaultValue=""
                    onChange={(e) => updateMyField("language_event", e.target.value)}
                />
            </div> <br></br>

            <div>
                <label htmlFor="date_time_start">Datetime Start:</label><br></br>
                <input                     
                    type="datetime-local" id="date_time_start"
                    name="date_time_start" defaultValue=""
                    min="2021-06-07T00:00" max="2022-12-22T00:00"
                    onChange={(e) => updateMyField("date_time_start", e.target.value)}
                />
            </div> <br></br>
            <div>
                <label htmlFor="date_time_end">DateTime End:</label><br></br>
                <input                     
                    type="datetime-local" id="date_time_end"
                    name="date_time_end" defaultValue=""
                    min="2021-06-07T00:00" max="2022-12-22T00:00"
                    onChange={(e) => updateMyField("date_time_end", e.target.value)}
                />
            </div> <br></br>

            <div>
                <label htmlFor="description">Description of the Event:</label><br></br>
                <textarea                     
                    type="text"
                    defaultValue=""
                    onChange={(e) => updateMyField("description", e.target.value)}
                />
            </div> <br></br>

            <div>
                <label htmlFor="timezone">Timezone:</label>
                <span>(Choose a timezone where the event going to take place)</span>
                <br></br>
                <select
                    type="text"
                    defaultValue=""
                    onChange={(e) => updateMyField("timezone", e.target.value)}
                >
                            <option value="Africa/Abidjan">Africa/Abidjan (GMT)</option>
                            <option value="Africa/Accra">Africa/Accra (GMT)</option>
                            <option value="Africa/Addis_Ababa">Africa/Addis_Ababa (EAT)</option>
                            <option value="Africa/Algiers">Africa/Algiers (CET)</option>
                            <option value="Africa/Asmara">Africa/Asmara (EAT)</option>
                            <option value="Africa/Bamako">Africa/Bamako (GMT)</option>
                            <option value="Africa/Bangui">Africa/Bangui (WAT)</option>
                            <option value="Africa/Banjul">Africa/Banjul (GMT)</option>
                            <option value="Africa/Bissau">Africa/Bissau (GMT)</option>
                            <option value="Africa/Blantyre">Africa/Blantyre (CAT)</option>
                            <option value="Africa/Brazzaville">Africa/Brazzaville (WAT)</option>
                            <option value="Africa/Bujumbura">Africa/Bujumbura (CAT)</option>
                            <option value="Africa/Cairo">Africa/Cairo (EET)</option>
                            <option value="Africa/Casablanca">Africa/Casablanca (+01)</option>
                            <option value="Africa/Ceuta">Africa/Ceuta (CEST)</option>
                            <option value="Africa/Conakry">Africa/Conakry (GMT)</option>
                            <option value="Africa/Dakar">Africa/Dakar (GMT)</option>
                            <option value="Africa/Dar_es_Salaam">Africa/Dar_es_Salaam (EAT)</option>
                            <option value="Africa/Djibouti">Africa/Djibouti (EAT)</option>
                            <option value="Africa/Douala">Africa/Douala (WAT)</option>
                            <option value="Africa/El_Aaiun">Africa/El_Aaiun (+01)</option>
                            <option value="Africa/Freetown">Africa/Freetown (GMT)</option>
                            <option value="Africa/Gaborone">Africa/Gaborone (CAT)</option>
                            <option value="Africa/Harare">Africa/Harare (CAT)</option>
                            <option value="Africa/Johannesburg">Africa/Johannesburg (SAST)</option>
                            <option value="Africa/Juba">Africa/Juba (CAT)</option>
                            <option value="Africa/Kampala">Africa/Kampala (EAT)</option>
                            <option value="Africa/Khartoum">Africa/Khartoum (CAT)</option>
                            <option value="Africa/Kigali">Africa/Kigali (CAT)</option>
                            <option value="Africa/Kinshasa">Africa/Kinshasa (WAT)</option>
                            <option value="Africa/Lagos">Africa/Lagos (WAT)</option>
                            <option value="Africa/Libreville">Africa/Libreville (WAT)</option>
                            <option value="Africa/Lome">Africa/Lome (GMT)</option>
                            <option value="Africa/Luanda">Africa/Luanda (WAT)</option>
                            <option value="Africa/Lubumbashi">Africa/Lubumbashi (CAT)</option>
                            <option value="Africa/Lusaka">Africa/Lusaka (CAT)</option>
                            <option value="Africa/Malabo">Africa/Malabo (WAT)</option>
                            <option value="Africa/Maputo">Africa/Maputo (CAT)</option>
                            <option value="Africa/Maseru">Africa/Maseru (SAST)</option>
                            <option value="Africa/Mbabane">Africa/Mbabane (SAST)</option>
                            <option value="Africa/Mogadishu">Africa/Mogadishu (EAT)</option>
                            <option value="Africa/Monrovia">Africa/Monrovia (GMT)</option>
                            <option value="Africa/Nairobi">Africa/Nairobi (EAT)</option>
                            <option value="Africa/Ndjamena">Africa/Ndjamena (WAT)</option>
                            <option value="Africa/Niamey">Africa/Niamey (WAT)</option>
                            <option value="Africa/Nouakchott">Africa/Nouakchott (GMT)</option>
                            <option value="Africa/Ouagadougou">Africa/Ouagadougou (GMT)</option>
                            <option value="Africa/Porto-Novo">Africa/Porto-Novo (WAT)</option>
                            <option value="Africa/Sao_Tome">Africa/Sao_Tome (GMT)</option>
                            <option value="Africa/Tripoli">Africa/Tripoli (EET)</option>
                            <option value="Africa/Tunis">Africa/Tunis (CET)</option>
                            <option value="Africa/Windhoek">Africa/Windhoek (CAT)</option>
                            <option value="America/Adak">America/Adak (HDT)</option>
                            <option value="America/Anchorage">America/Anchorage (AKDT)</option>
                            <option value="America/Anguilla">America/Anguilla (AST)</option>
                            <option value="America/Antigua">America/Antigua (AST)</option>
                            <option value="America/Araguaina">America/Araguaina (-03)</option>
                            <option value="America/Argentina/Buenos_Aires">America/Argentina/Buenos_Aires (-03)</option>
                            <option value="America/Argentina/Catamarca">America/Argentina/Catamarca (-03)</option>
                            <option value="America/Argentina/Cordoba">America/Argentina/Cordoba (-03)</option>
                            <option value="America/Argentina/Jujuy">America/Argentina/Jujuy (-03)</option>
                            <option value="America/Argentina/La_Rioja">America/Argentina/La_Rioja (-03)</option>
                            <option value="America/Argentina/Mendoza">America/Argentina/Mendoza (-03)</option>
                            <option value="America/Argentina/Rio_Gallegos">America/Argentina/Rio_Gallegos (-03)</option>
                            <option value="America/Argentina/Salta">America/Argentina/Salta (-03)</option>
                            <option value="America/Argentina/San_Juan">America/Argentina/San_Juan (-03)</option>
                            <option value="America/Argentina/San_Luis">America/Argentina/San_Luis (-03)</option>
                            <option value="America/Argentina/Tucuman">America/Argentina/Tucuman (-03)</option>
                            <option value="America/Argentina/Ushuaia">America/Argentina/Ushuaia (-03)</option>
                            <option value="America/Aruba">America/Aruba (AST)</option>
                            <option value="America/Asuncion">America/Asuncion (-04)</option>
                            <option value="America/Atikokan">America/Atikokan (EST)</option>
                            <option value="America/Bahia">America/Bahia (-03)</option>
                            <option value="America/Bahia_Banderas">America/Bahia_Banderas (CDT)</option>
                            <option value="America/Barbados">America/Barbados (AST)</option>
                            <option value="America/Belem">America/Belem (-03)</option>
                            <option value="America/Belize">America/Belize (CST)</option>
                            <option value="America/Blanc-Sablon">America/Blanc-Sablon (AST)</option>
                            <option value="America/Boa_Vista">America/Boa_Vista (-04)</option>
                            <option value="America/Bogota">America/Bogota (-05)</option>
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
                            <option value="Europe/Amsterdam">Europe/Amsterdam (CEST)</option>
                            <option value="Europe/Andorra">Europe/Andorra (CEST)</option>
                            <option value="Europe/Astrakhan">Europe/Astrakhan (+04)</option>
                            <option value="Europe/Athens">Europe/Athens (EEST)</option>
                            <option value="Europe/Belgrade">Europe/Belgrade (CEST)</option>
                            <option value="Europe/Berlin">Europe/Berlin (CEST)</option>
                            <option value="Europe/Bratislava">Europe/Bratislava (CEST)</option>
                            <option value="Europe/Brussels">Europe/Brussels (CEST)</option>
                            <option value="Europe/Bucharest">Europe/Bucharest (EEST)</option>
                            <option value="Europe/Budapest">Europe/Budapest (CEST)</option>
                            <option value="Europe/Busingen">Europe/Busingen (CEST)</option>
                            <option value="Europe/Chisinau">Europe/Chisinau (EEST)</option>
                            <option value="Europe/Copenhagen">Europe/Copenhagen (CEST)</option>
                            <option value="Europe/Dublin">Europe/Dublin (IST)</option>
                            <option value="Europe/Gibraltar">Europe/Gibraltar (CEST)</option>
                            <option value="Europe/Guernsey">Europe/Guernsey (BST)</option>
                            <option value="Europe/Helsinki">Europe/Helsinki (EEST)</option>
                            <option value="Europe/Isle_of_Man">Europe/Isle_of_Man (BST)</option>
                            <option value="Europe/Istanbul">Europe/Istanbul (+03)</option>
                            <option value="Europe/Jersey">Europe/Jersey (BST)</option>
                            <option value="Europe/Kaliningrad">Europe/Kaliningrad (EET)</option>
                            <option value="Europe/Kiev">Europe/Kiev (EEST)</option>
                            <option value="Europe/Kirov">Europe/Kirov (+03)</option>
                            <option value="Europe/Lisbon">Europe/Lisbon (WEST)</option>
                            <option value="Europe/Ljubljana">Europe/Ljubljana (CEST)</option>
                            <option value="Europe/London">Europe/London (BST)</option>
                            <option value="Europe/Luxembourg">Europe/Luxembourg (CEST)</option>
                            <option value="Europe/Madrid">Europe/Madrid (CEST)</option>
                            <option value="Europe/Malta">Europe/Malta (CEST)</option>
                            <option value="Europe/Mariehamn">Europe/Mariehamn (EEST)</option>
                            <option value="Europe/Minsk">Europe/Minsk (+03)</option>
                            <option value="Europe/Monaco">Europe/Monaco (CEST)</option>
                            <option value="Europe/Moscow">Europe/Moscow (MSK)</option>
                            <option value="Europe/Oslo">Europe/Oslo (CEST)</option>
                            <option value="Europe/Paris">Europe/Paris (CEST)</option>
                            <option value="Europe/Podgorica">Europe/Podgorica (CEST)</option>
                            <option value="Europe/Prague">Europe/Prague (CEST)</option>
                            <option value="Europe/Riga">Europe/Riga (EEST)</option>
                            <option value="Europe/Rome">Europe/Rome (CEST)</option>
                            <option value="Europe/Samara">Europe/Samara (+04)</option>
                            <option value="Europe/San_Marino">Europe/San_Marino (CEST)</option>
                            <option value="Europe/Sarajevo">Europe/Sarajevo (CEST)</option>
                            <option value="Europe/Saratov">Europe/Saratov (+04)</option>
                            <option value="Europe/Simferopol">Europe/Simferopol (MSK)</option>
                            <option value="Europe/Skopje">Europe/Skopje (CEST)</option>
                            <option value="Europe/Sofia">Europe/Sofia (EEST)</option>
                            <option value="Europe/Stockholm">Europe/Stockholm (CEST)</option>
                            <option value="Europe/Tallinn">Europe/Tallinn (EEST)</option>
                            <option value="Europe/Tirane">Europe/Tirane (CEST)</option>
                            <option value="Europe/Ulyanovsk">Europe/Ulyanovsk (+04)</option>
                            <option value="Europe/Uzhgorod">Europe/Uzhgorod (EEST)</option>
                            <option value="Europe/Vaduz">Europe/Vaduz (CEST)</option>
                            <option value="Europe/Vatican">Europe/Vatican (CEST)</option>
                            <option value="Europe/Vienna">Europe/Vienna (CEST)</option>
                            <option value="Europe/Vilnius">Europe/Vilnius (EEST)</option>
                            <option value="Europe/Volgograd">Europe/Volgograd (+03)</option>
                            <option value="Europe/Warsaw">Europe/Warsaw (CEST)</option>
                            <option value="Europe/Zagreb">Europe/Zagreb (CEST)</option>
                            <option value="Europe/Zaporozhye">Europe/Zaporozhye (EEST)</option>
                            <option value="Europe/Zurich">Europe/Zurich (CEST)</option>
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
            </div> <br></br>        
    </FormStyles>

    <button onClick={actions.theme.postEvent}>Post Event</button>

    </FormContainer>

  );
};


const FormStyles = styled.form`

  display: flex;
  flex-wrap: wrap;

  div {
    flex-basis: 40%;
    margin-right: 5rem;
     
    label {
        padding: 2rem 1rem 0 0;
        display: flex;
        width: 100%;
    }

    input[type=text], input[type=datetime-local], select {
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
        width: 100%;
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
  }
`

const FormContainer = styled.div`
    padding: 0rem 2rem;
    margin-top: 12rem;
    margin-bottom: 5rem;
 
    h1 {
        font-size: 1.5rem;
    }

    p {
        font-size: 1.2rem;
    }

    button {
        /* remove default behavior */
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
        font-size: 1.2rem
    }
`;

export default connect(FormEvent);
