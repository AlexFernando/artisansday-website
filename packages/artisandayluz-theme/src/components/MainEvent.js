import React, {useEffect} from 'react';
import { connect, styled } from "frontity";
import Image from "@frontity/components/image";

import {MoreDetails} from './EventDetails';

import Loading from './Loading';

const MainEvent = ({state, actions}) => {

    useEffect( () => {
        actions.source.fetch("/mainevent")
    }, [])

    const pageMainEvent = state.source.page[133];
    
    return ( 
        <>
        {typeof pageMainEvent === "undefined" ? <Loading /> 
            :
        <MainEventContainer>
            <h1>{pageMainEvent.acf.main_title}</h1>
            <p>{pageMainEvent.acf.slogan}</p>
        
            <ImageStack>
                <TopImage>
                    <ImageStyled src={pageMainEvent.acf.image_1.sizes.medium} />
                </TopImage>

                <BottomImage>
                    <ImageStyled src={pageMainEvent.acf.image_2.sizes.medium} />
                </BottomImage>
                
                <TextDescription>
                    <h3>Description</h3>
                    <p>
                        {pageMainEvent.acf.description_one}
                    </p>

                    <p>
                        {pageMainEvent.acf.description_second}
                    </p>
                </TextDescription>
            </ImageStack>

            <MoreDetails>
                <div>
                    <h4>Details</h4>
                    <div>
                        
                        <span><strong>Date:</strong> <br></br> {pageMainEvent.acf.date}</span>
                    </div>
                    <div>
           
                        <span><strong>Time:</strong> <br></br> {pageMainEvent.acf.time}</span>
                    </div>
                    <div>
                        <span><strong>Cost:</strong> <br></br> {pageMainEvent.acf.cost}</span>
                    </div>

                    <div>
                        <span><strong>Event Category: </strong> <br></br> Online Events</span>
                    </div>

                    <div>
                        <span><strong>Language: </strong> <br></br> {pageMainEvent.acf.language} </span>
                    </div>
                </div>

                <div>
                    <h4>Organizer</h4>
                    <div>
                        <span>{pageMainEvent.acf.organizer_name}</span>
                    </div>
                    <div>
                        <span><strong>Email: </strong> <br></br> {pageMainEvent.acf.email_organizer} </span>
                    </div>
                    <div>
                        <a href={pageMainEvent.acf.organizer_website_url} target="_blank" rel="noopener noreferrer">View Organizer Website</a>
                    </div>
                </div>
                
            </MoreDetails>
 
      
        </MainEventContainer>
        }
    </>
     );
}

export default connect(MainEvent);
 
const MainEventContainer =  styled.div`
    margin-top: 10rem;
    padding: 2rem 4rem;

    h1 {
        font-size: 4rem;
        text-align: center;
    }

    p {
        font-size: 1.3rem;
        text-align: center;
    }

    @media(max-width: 768px) {
        padding: 2rem 1rem;
    }
`;

const ImageStack = styled.div`
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    position: relative;
`

const TopImage = styled.div`
    grid-column: 1 / span 8;
    grid-row: 1; 
    padding-top: 20%; // this pushes the image down, and keeps it proportional as it resizes
    padding-left: 10%;
    z-index: 1; 
`;

const BottomImage = styled.div`
    grid-column: 2 / -1;
    grid-row: 1; // make this image be on the same row
    padding-left: 10%;

    @media(max-width: 768px) {
        grid-column: 3 / -1;
    }
`;

const TextDescription = styled.div`
    grid-column: 8 / -1;
    grid-row: 1; // make this image be on the same row
    padding-top: 20%;

    h3 {
        font-size: 2rem;
        color: #203492;
        text-align: center;
    }

    p {
        font-size: 1.3rem;
        color: #4a4a4a;
        text-align: justify;
    }

    @media(max-width: 768px) {
        grid-column: 1 / span 12;
        grid-row: 4;
        padding-top: 1rem;
    }
`


const ImageStyled = styled(Image)`
    max-height: 350px;
    max-width: 480px;

    @media(max-width: 768px) {
        max-height: 200px;
        max-width: 220px;
    }
`;
