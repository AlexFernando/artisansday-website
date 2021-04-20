import React, {useEffect} from 'react';
import { connect, styled } from "frontity";
import img2 from "../images/11.jpg";
import img3 from "../images/13.jpg";
import Image from "@frontity/components/image";

import {EventDetailsContainer, MoreDetails} from './EventDetails';


const MainEvent = ({state}) => {
    return ( 
        <MainEventContainer>
            <h1>Title of the main event here</h1>
            <p>Some optional slogan or text related to the event here</p>
        
            <ImageStack>
                <TopImage>
                    <ImageStyled src={img3} />
                </TopImage>

                <BottomImage>
                    <ImageStyled src={img2} />
                </BottomImage>
                
                <TextDescription>
                    <h3>Description</h3>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur malesuada blandit est, a porttitor sem viverra et.
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur malesuada blandit est, a porttitor sem viverra et.
                    </p>

                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur malesuada blandit est, a porttitor sem viverra et.
                    </p>
                </TextDescription>
                
            </ImageStack>

            <EventDetailsContainer>
      
            <MoreDetails>
                <div>
                    <h4>Details</h4>
                    <div>
                        
                        <span><strong>Date:</strong> <br></br> May 11</span>
                    </div>
                    <div>
           
                        <span><strong>Time:</strong> <br></br> 8h00-19h:00</span>
                    </div>
                    <div>
                        <span><strong>Cost:</strong> <br></br> Free</span>
                    </div>

                    <div>
                        <span><strong>Event Category: </strong> <br></br> Online Events</span>
                    </div>

                    <div>
                        <span><strong>Language: </strong> <br></br> English</span>
                    </div>
                </div>

                <div>
                    <h4>Organizer</h4>
                    <div>
                        <span>Main Host</span>
                    </div>
                    <div>
                        <span><strong>Email: </strong> <br></br> organizer@example.com</span>
                    </div>
                    <div>
                        <a href="https://all1union.be/" target="_blank" rel="noopener noreferrer">View Organizer Website</a>
                    </div>
                </div>
                
            </MoreDetails>
 
        </EventDetailsContainer>
        </MainEventContainer>        
     );
}
 
const MainEventContainer =  styled.div`
    margin-top: 5rem;
    padding: 2rem 4rem;

    h1 {
        font-size: 4rem;
        text-align: center;
    }

    p {
        font-size: 1.3rem;
        text-align: center;
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
    }
`


const ImageStyled = styled(Image)`
    max-height: 350px;
    max-width: 480px;
`;

export default connect(MainEvent);