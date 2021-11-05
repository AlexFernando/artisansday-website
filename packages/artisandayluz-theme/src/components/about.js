import React, {useEffect, useState} from 'react';
import { connect, styled, css } from "frontity";
import Loading from './Loading';

//icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSeedling, faRainbow, faCampground, faHeart, faHands} from '@fortawesome/free-solid-svg-icons';

// react tab tab
import {Tabs, TabList, Tab, PanelList, Panel} from 'react-tabtab';
import * as customStyle from 'react-tabtab/lib/themes/bulma/index';

const About = ({state}) => {

    const pageAbout = state.source.page[422];

    return(

        <>
        {typeof pageAbout === "undefined" ? <Loading /> : 
        <>
        <AboutContainer>

            <h1>{pageAbout.acf.about_main_title}</h1>

            <Tabs customStyle={customStyle}>
                <TabList>
                    <Tab>{pageAbout.acf.purpose_title}</Tab>
                    <Tab>{pageAbout.acf.what_title}</Tab>
                    <Tab>{pageAbout.acf.why_title}</Tab>
                    <Tab>{pageAbout.acf.proposal_title}</Tab>
                </TabList>
                
                <PanelList>
                    <Panel>
                        <InfoContainer>
                            <InfoElem>
                                <FontAwesomeIconStyled icon={faSeedling} />
                                <p>{pageAbout.acf.purpose_paragraph_first}</p>
                            </InfoElem>

                            <InfoElem>
                                <FontAwesomeIconStyled icon={faRainbow} />
                                <p>{pageAbout.acf.purpose_paragraph_second}</p>
                            </InfoElem>

                            <InfoElem>
                                <FontAwesomeIconStyled icon={faHands} />
                                <p>{pageAbout.acf.purpose_paragraph_third}</p>
                            </InfoElem>

                            <InfoElem>
                                <FontAwesomeIconStyled icon={faHeart} />
                                <p>{pageAbout.acf.purpose_paragraph_fourth}</p>
                            </InfoElem>
                        </InfoContainer>
                    </Panel>

                    <Panel>
                        <InfoContainer>
                            <InfoElem>
                                <FontAwesomeIconStyled icon={faSeedling} />
                        
                                <p>
                                    {pageAbout.acf.why_paragraph_first}
                                </p>
                            </InfoElem>
        
                            <InfoElem>
                                <FontAwesomeIconStyled icon={faRainbow} />
                                
                                <p>
                                    {pageAbout.acf.why_paragraph_second}
                                </p>
                            </InfoElem>
        
                            <InfoElem>
                                <FontAwesomeIconStyled icon={faHands} />
                                <p>
                                    {pageAbout.acf.why_paragraph_third}
                                </p>
                            </InfoElem>
        
                            <InfoElem>
                                <FontAwesomeIconStyled icon={faHeart} />
                                <p>
                                    {pageAbout.acf.why_paragraph_fourth}
                                </p>
                            </InfoElem>
                        </InfoContainer>
                    </Panel>

                    <Panel>
                        <InfoContainer>
                            <InfoElem>
                                <h3>{pageAbout.acf.why_title_fifth}</h3>
                                <p>
                                    {pageAbout.acf.why_paragraph_fifth}
                                </p>
                            </InfoElem>

                            <InfoElem>
                                <h3>{pageAbout.acf.why_title_six}</h3>
                                <p>
                                    {pageAbout.acf.why_paragraph_six}
                                </p>
                            </InfoElem>

                            <InfoElem>
                                <h3>{pageAbout.acf.why_title_seven} </h3>
                                <p>
                                    {pageAbout.acf.why_paragraph_seven}
                                </p>
                            </InfoElem>

                            <InfoElem>
                                <h3>{pageAbout.acf.why_title_eight}</h3>
                                <p>
                                    {pageAbout.acf.why_paragraph_eight}
                                </p>
                            </InfoElem>
                        </InfoContainer>
                    </Panel>

                    <Panel>
                        <InfoContainer>
                            <InfoElem>
                                <FontAwesomeIconStyled icon={faSeedling} />
                                <p>
                                    {pageAbout.acf.proposal_paragraph_first}
                                </p>
                            </InfoElem>

                            <InfoElem>
                                <FontAwesomeIconStyled icon={faRainbow} />
                                <p>
                                    {pageAbout.acf.proposal_paragraph_second}
                                </p>
                            </InfoElem>

                            <InfoElem>
                                <FontAwesomeIconStyled icon={faHands} />
                                <p>
                                    {pageAbout.acf.proposal_paragraph_third}
                                </p>
                            </InfoElem>

                            <InfoElem>
                                <FontAwesomeIconStyled icon={faHeart} />
                                <p>
                                    {pageAbout.acf.proposal_paragraph_fourth}
                                </p>
                            </InfoElem>
                        </InfoContainer>
                    </Panel>
                </PanelList>
            </Tabs>

        </AboutContainer>

        </>
        }
        </>
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
    line-height: 1.5;

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
        text-align: justify;

    }  
`

const FontAwesomeIconStyled = styled(FontAwesomeIcon)`
    color: #00A36C;
    font-size: 5rem;
`;

