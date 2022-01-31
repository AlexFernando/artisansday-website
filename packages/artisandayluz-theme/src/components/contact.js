import React, {useEffect} from 'react';
import {styled, connect } from "frontity";
import {faPhone, faEnvelope} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faYoutube, faFacebookSquare} from '@fortawesome/free-brands-svg-icons';

import Loading from './Loading';

const ContactContainer = styled.div`
    display: flex;
    background-color: #203492;
    color: #fff;
    justify-content: space-around;
    align-content: center;

    @media(max-width: 768px) {
        flex-direction: column;
    }
`;

const ContactElement = styled.div`

    display: flex;
    flex-direction: column;
    margin-top: 2rem;

    @media(max-width: 768px) {
        padding: 1rem;
        h2 {
            font-size: 1rem;
        }
    }

    ul {
        margin: 0;
        padding: 0;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-content: center;

        li {
            margin: .5rem 0;
            list-style: none;

            a {
                color : #fff;
                font-size: 1.8rem;
                margin-right: 1rem;
            }
        }

    }

    h2 {
        font-weight: 700;
        letter-spacing: 1px;
    }

    h3 {
        margin-top: 0;
        font-size: 1rem;
        font-weight: 400;
    }
`;

const FontAwesomeIconStyled = styled(FontAwesomeIcon)`
    margin-right: 1rem;
`;


const Contact = ({state,actions}) => {

    useEffect( () => {
        if(state.theme.lang === "en") {
            actions.source.fetch("/footer-info")
        }

        else if (state.theme.lang === "fr") {
            actions.source.fetch("/fr/footer-info")
        }

        else {
            actions.source.fetch("/es/footer-info")
        }

    }, [])

    const pageFooterInfo = state.source.page[165];

    return ( 
        <>
        {typeof pageFooterInfo === "undefined" ? <Loading /> 
            :
        <ContactContainer>
            <ContactElement>
                <h2>{pageFooterInfo.acf.contact_title}</h2>
                <h3>{pageFooterInfo.acf.subtitle_contact}</h3>
                <ul>
                    <li><FontAwesomeIconStyled icon={faPhone}/>{pageFooterInfo.acf.phone_contact_1}</li>
                    <li><FontAwesomeIconStyled icon={faPhone}/>{pageFooterInfo.acf.phone_contact_2}</li>
                    <li> <FontAwesomeIconStyled icon={faEnvelope}/>{pageFooterInfo.acf.email_contact}</li>
                </ul>
            </ContactElement>

            <ContactElement>
                <h2>{pageFooterInfo.acf.social_media_title}</h2>
                <h3>{pageFooterInfo.acf.social_media_subtitle}</h3>
            
                <ul>
                        <li><a href={pageFooterInfo.acf.link_facebook} alt="Share on Facebook" aria-label="Link to Facebook" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faFacebookSquare}/></a>Facebook</li>
                        <li><a href={pageFooterInfo.acf.link_instagram} alt="Share on Instagram" aria-label="Link to Instagram" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faInstagram}/></a>Instagram</li>
                        <li><a href={pageFooterInfo.acf.link_youtube} alt="Share on Youtube" aria-label="Link to Youtube" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faYoutube}/></a>Youtube</li>
                </ul>
            </ContactElement>
        </ContactContainer >
        }
        </>
    );
}
 
export default connect(Contact);