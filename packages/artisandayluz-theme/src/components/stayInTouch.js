import React, {useEffect} from 'react';
import {connect, styled, css} from "frontity";


import Loading from './Loading';


const stayInTouch = ({state, actions, libraries}) => {

    useEffect( () => {
        actions.source.fetch("/contact")
    }, [])

    const Html2react = libraries.html2react.Component;

    const contentForm =  state.source.page["56"];

    return ( 

        <>
        {typeof contentForm === "undefined" ? <Loading /> 
            :

            <MarginTopContainer>
                <HeadContainer>
                                    
                    <Title>
                        Contact
                    </Title>

                    <Separator></Separator>

                    <SubTitle>
                        Stay in touch. In case you have any question, please email us using the form below.
                    </SubTitle>
                </HeadContainer>
                <Content>
                <Html2react html={contentForm.content.rendered} />
                </Content>

            </MarginTopContainer>
        }
        </>
    );
}
 
const Content = styled.div`

    font-size: 1.5rem;
    padding-left: 2rem;

    input, textarea {
        margin:1rem 1rem 2rem 1rem;
        border-radius: 5px;
        border: 2px solid #000;
        height: 30px;
    }

    @media(max-width: 768px) {
        input, textarea {
            width: 70vw;
        }
    }

    textarea {
        height: 150px;
    }

    input[type="submit"] { 
       
    background-color: #203492;
    height: 60px;    
    padding: 1.5rem;
 
    border: 1px solid #fff;
     font-weight: bold;
    font-size: 1rem;
    text-transform: uppercase;
    color: #FFF;
    cursor: pointer;
     font-family: 'Montserrat', sans-serif;
    
    &:hover {
        background-color: #273fb2;
        transition: all 0.4s;
    }
    }
`;

export const MarginTopContainer = styled.div`
    margin-top: 12vh;

    @media(min-width: 768px) {
        margin-top: 16vh;
    }
`;

export const Title = styled.h2`

    font-size: 2.2rem;
    font-weight: 400;
    line-height: 1;
    letter-spacing: 3px;
    margin: 2rem 0 2rem 0;
    text-transform: uppercase;
 
    @media(min-width: 768px) {
        font-size: 4rem;
    }
`
export const SubTitle = styled.span`
    font-size: 1.5rem;

    @media(min-width: 768px) {
        font-size: 2.5rem;
        -ms-flex-wrap: nowrap;
            flex-wrap: nowrap;
    }
`
export const Separator = styled.span`
    display: block;
    width: 12rem;
    height: 12px;
    margin-top: .5rem;
    margin-bottom: 2rem;
    border-radius: 20px;
    background-color: #203492;

    @media(max-width: 768px) {
        width: 6rem;
        height: 8px;
    }
`
export const HeadContainer = styled.div`
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;

    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
        flex-direction: column;
    padding: 2rem;
    overflow-wrap: break-word;
`;



export default connect(stayInTouch);