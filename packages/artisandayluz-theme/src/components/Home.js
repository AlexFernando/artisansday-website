import React, {useEffect} from 'react';
import { connect, styled } from "frontity";
import Image from "@frontity/components/image";
import bgImage from "../images/yoga-2150140_1920.png"
import bgImage2 from "../images/7.png"

const HomePage = () => {
    return ( 

        <BackgroundColor>          
            <MainContainer>

                <h1>Created by Developers for Developers</h1>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur malesuada blandit est, a porttitor sem viverra et.
                </p>
                <div>
                    <a>Get it Free Now</a>
                    <a>Schedule a Call</a>
                </div>
                
            </MainContainer>
        
            <ImageStyled src={bgImage2} />

        </BackgroundColor>
     );
}
 
export default HomePage;

const BackgroundColor = styled.div`
    background-image: linear-gradient(to top right, rgba(147,112,219,0), rgba(147,112,219,1));
    background-repeat: no-repeat;
    background-size: cover;
    background-position:center center;
    height: 700px;
    display: flex;
    justify-content: center;
    align-content: center;
    overflow-wrap: break-word;
    padding: 1rem 2rem;
   
    @media(max-width: 768px) {
        height: 573px;
        padding: 1.5rem;
        flex-direction: column;
    }
`;

const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex-basis: 60%;
    justify-content: center;

        h1 {
            text-transform: capitalize;
            font-size: 2rem;
            letter-spacing: 4px;
            margin-top: 5rem;

            @media(min-width: 768px) {
                font-size: 4rem;
            }
        }

        p {
            font-size: 0.8rem;
            margin-top: 0;
            margin-bottom: 2rem;
            line-height: 1.8;
            font-family: 'Montserrat', sans-serif;
            width: 70%;

            @media(min-width: 768px) {
                font-size: 1.3rem;
                margin-bottom: 2rem;
            }
        }

        div {

            display: flex;
            justify-content: flex-start;
            align-content: center;
          
            a {
                color: white;
                line-height: inherit;
                text-decoration: none;
                cursor: pointer;

                background-color: #203492;
                padding: 15px 20px;
                border: 1px none #000;
                font-size: 16px;
                text-align: center;
                transition: transform 500ms cubic-bezier(.23, 1, .32, 1), color 200ms ease, opacity 200ms ease, -webkit-transform 500ms cubic-bezier(.23, 1, .32, 1);
                
                box-shadow: 4px 4px 0 0 #7ea2b2;
                letter-spacing: 1px;
                border-radius: 0px;
            
                &:nth-of-type(2) {
                    border-radius: 1rem;
                    background-color: #fff;
                    border: 2px solid #203492;
                    color: #203492;
                    margin-left: 2rem;
                }
            }
        }

`

const ImageStyled = styled(Image)`
    display: flex;
    justify-content: center;
    align-self: center;
    max-height: 60%;
    max-width: 50%;
`