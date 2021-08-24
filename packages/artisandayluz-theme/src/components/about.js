import React, {useEffect, useState} from 'react';
import { connect, styled, css } from "frontity";

//icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSeedling, faRainbow, faCampground, faHeart} from '@fortawesome/free-solid-svg-icons'

const About = () => {

    const[view, setView] = useState(0);
    const [colorsActive, setColorsActive] = useState([
        false,
        false,
        false,
        false,
    ]);

    const setActions = (id, e) => {
        setView(id);
    }

    // ver aproach con e.target
    return(
        <AboutContainer>

            <h1>About</h1>

            <ButtonContainer>
                <ButtonStyles onClick={(e) => setActions(0, e)}> Purpose</ButtonStyles>                
                <ButtonStyles onClick={(e) => setActions(1, e)}>Why?</ButtonStyles>
                <ButtonStyles onClick={(e) => setActions(2, e)}>What?</ButtonStyles>             
                <ButtonStyles onClick={(e) => setActions(3, e)}>Which groups are sending you this proposal?</ButtonStyles>   
            </ButtonContainer>

            <div>
                {view === 0 ? 
                    <div>
                <InfoContainer>
                    <InfoElem>
                        <FontAwesomeIconStyled icon={faSeedling} />
                        <p>A day to celebrate our Unity and our work for the Light of the Consciousness.</p>
                    </InfoElem>

                    <InfoElem>
                        <FontAwesomeIconStyled icon={faRainbow} />
                        <p>Realise, through a concrete action, our Unity in the time/mind, for, in truth, we are all already united on the same Earth.</p>
                    </InfoElem>

                    <InfoElem>
                        <FontAwesomeIconStyled icon={faCampground} />
                        <p>For this, we propose to co-create a meeting at the same moment around the world with a maximum of groups who propose Unity, Love, Peace and Consciousness.</p>
                    </InfoElem>

                    <InfoElem>
                        <FontAwesomeIconStyled icon={faHeart} />
                        <p>Each group can create their own event with their audience, on a common date that we will define together, and / or join other groups on a live video.</p>
                    </InfoElem>
                </InfoContainer>
                    </div>
                
                : ''}
                {view === 1 ? 
                    <InfoContainer>
                        <InfoElem>
                            <FontAwesomeIconStyled icon={faSeedling} />
                    
                            <p>
                                Different groups propose to open the human consciousness of Unity, Love and Peace for the emergence of a Humanity more respectful to all living beings. 
                                We are on a wonderful occasion to co-create this in our World. Gratitude for this diversity.
                            </p>
                        </InfoElem>
    
                        <InfoElem>
                            <FontAwesomeIconStyled icon={faRainbow} />
                            
                            <p>
                                Really, we are already united in space by the same Earth, the same gravity and the same atmosphere. 
                                The illusion of separation is only in our mind and it is in our mind that we can correct it. 
                                With the modern cyber tools and the current situation, we have the means to unite together in time which is also part of our mind.
                            </p>
                        </InfoElem>
    
                        <InfoElem>
                            <FontAwesomeIconStyled icon={faCampground} />
                            <p>
                                This illusion of separation is neither bad nor good. It’s also a tool to know myself better with discernment. 
                                To give an idea : as for my body, I can identify my hand, my foot and my head. I can use my hand to take things, 
                                my foot to walk and my head to think. Specific organs for specific actions. Each one has his specificity. At the same time, 
                                they are ONE together to co-create my body.
                            </p>
                        </InfoElem>
    
                        <InfoElem>
                            <FontAwesomeIconStyled icon={faHeart} />
                            <p>
                                When each organ remembers (re-member) that they are together in the same body, they can coordinate together to act perfectly! 
                                If they forget, the body will walk with difficulty ! Some parts of our world are in this situation; other parts like you are aware of this consciousness. 
                                Each one of you that we contact to co-organize this event is conscious of this necessity of Unity within our diversity. Let’s give ourselves the opportunity to make it happen
                            </p>
                        </InfoElem>
                    </InfoContainer>
                : ''}
                {view === 2 ? 
                    <>
                    <InfoContainer>
                        <InfoElem>
                            <FontAwesomeIconStyled icon={faSeedling} />
                            <p>
                                Here, together, we open a moment of a meeting to join us and concretize the unity between us. United with our diversity, we have to find a time together.
                            </p>
                        </InfoElem>
    
                        <InfoElem>
                            <FontAwesomeIconStyled icon={faRainbow} />
                            <p>
                                We at ALL1 UNION propose to unite our groups for 11 minutes of silence, on the day of the 1st01 of May at 1pm UTC (Universal Time Coordinated=GMT).
                            </p>
                        </InfoElem>
    
                        <InfoElem>
                            <FontAwesomeIconStyled icon={faCampground} />
                            <p>
                                Around this time of silence, each group/participant is invited to guide their meditation/prayer, have a talk about their activities during the week before and after the day 01.
                            </p>
                        </InfoElem>
    
                        <InfoElem>
                            <FontAwesomeIconStyled icon={faHeart} />
                            <p>
                                Each group is invited to make a short video about them to share promotion in a page who will show all participating groups 
                            </p>
                        </InfoElem>
                    </InfoContainer>
                    <InfoContainer>
                        <InfoElem>
                            <h3>Why did ALL1 choose day 01 of May? </h3>
                            <p>
                                The number ONE is at the center of all traditions or spiritual currents that speak of Unity, Love and Peace.
                                The day 01 of May will be a Sunday and a public holiday in several countries around the world, so an opportunity to be more numerous to co-create this special time.
                            </p>
                        </InfoElem>

                        <InfoElem>
                            <h3>Why a common time at 1 p.m. UTC? </h3>
                            <p>
                            If time does not exist in absolute terms, it is a tool made available to us in the relative game in which we are. Let's use it!
When we have a date with your sweetheart, it is better to give each other a common time otherwise, we will be there and she/he will be elsewhere ...
Here it is a Date of Love with our Earth and our Humanity and the countries have different time zones.
To adjust to this RDV with Greater Than Us (the Self, God, Allah, Yavhé, Buddha, Great Spirit, Pachamama, me of the World…), we propose this common moment at one o'clock in the afternoon in the official Universal Time Coordinated (UTC).. 
Again the symbol of 1. 
It is also a time that enables the majority of people in countries around the world to be awake ...

                            </p>
                        </InfoElem>

                        <InfoElem>
                            <h3>Why 11 minutes? </h3>
                            <p>
                            11 is a number which announces a new cycle. Once the decade has passed and is integrated, we enter a new phase of evolution.
It is also a time short enough to be accessible to all and long enough to be meaningful.
In symbolism, it represents spiritual awakening. It evokes the relationship between the Other and Me.

                            </p>
                        </InfoElem>

                        <InfoElem>
                            <h3>Why the silence ?</h3>
                            <p>
                            This is what unites each living being, each language in the world!
                            </p>
                        </InfoElem>
                    </InfoContainer>
                </>
                : ''}
                {view === 3 ? 
                  <InfoContainer>
                    <InfoElem>
                        <FontAwesomeIconStyled icon={faSeedling} />
                        <p>
                            We are a group of people from all over the world, we are from different traditions or without tradition.
                        </p>
                    </InfoElem>

                    <InfoElem>
                        <FontAwesomeIconStyled icon={faRainbow} />
                        <p>
                            We all have at heart this Unity in Love for the Good for Our Earth and our Humanity and Peace.
                        </p>
                    </InfoElem>

                    <InfoElem>
                        <FontAwesomeIconStyled icon={faCampground} />
                        <p>
                            We regularly offer meetings, practices, meditations, prayers.
                        </p>
                    </InfoElem>

                    <InfoElem>
                        <FontAwesomeIconStyled icon={faHeart} />
                        <p>
                            Above all else it is an act of consciousness through the heart.
                        </p>
                    </InfoElem>
                  </InfoContainer>
                : ''}

            </div>
        </AboutContainer>
    )
}

export default connect(About)


const AboutContainer = styled.div`

    margin-top: 12rem;


    h1{
        text-align: center;
        font-size: 2rem;
        margin-top: 4rem;
        margin-bottom: 4rem;
        margin-left: 1rem;
        color: #444;
    }
`

export const ButtonContainer = styled.div`
    display: flex;
    margin-left: 1rem;

    @media (max-width: 768px){
        flex-direction: column;
    }

`
export const ButtonStyles = styled.button`
    font-size: 1.3rem;
    display: inline-block;
    padding: .8rem 1.2rem;
    margin: 0 1rem 0 0;
    list-style: none;
    cursor: pointer;
    color: #fff;
    border-top-right-radius: 8px;
    border-top-left-radius: 8px;
    background-color: rgb(236, 139, 34);
    border-color: rgb(255, 255, 255);
    border:none;

    @media (max-width: 768px){
        margin-bottom: .5rem;
    }

`

const InfoContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 2rem;
    background-color: #fff;
    color: #444;
    margin: 4rem 0;

    @media (max-width: 768px){
        grid-template-columns: repeat(1, 1fr);
        grid-gap: 1rem;
        margin: 2rem 0;
    }
`

const InfoElem = styled.div`
    color: #000;
    border-radius: 5px;
    padding: 20px;
    font-size: 1rem;
    text-align: center;

    h3 {
        font-size: 1.6rem;
        font-weight: 400;
        margin-bottom: 0;

    }

    p {
        font-size: 1.2rem;
        color: #6c757d;
        margin-left: 0rem;
        margin-right: 0rem;
    }  
`

const FontAwesomeIconStyled = styled(FontAwesomeIcon)`
    color: #00A36C;
    font-size: 5rem;
`;



/* export const IconsContainer = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: 4rem 0;

    @media(max-width: 768px) {
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin: 0;
    }
`;

const IconsInfo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-basis: 20%;
 

    h3 {
        font-size: 1.6rem;
        font-weight: 400;
        margin-bottom: 0;
    }

    p {
        font-size: 1.2rem;
        color: #6c757d;
        text-align: center;
        margin-left: 2rem;
        margin-right: 2rem;

        @media(max-width: 768px) {
            p {
                margin-left: 0;
                margin-right: 0;
            }
        }
    }   
` */