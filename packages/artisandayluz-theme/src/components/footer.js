import React from 'react';
import {styled} from "frontity";

const FooterContainer = styled.div`
    background-color: #203492;
    display: flex;
    flex-direction: column;
    border-top: 1px solid #FFF;
    justify-content: center;
    align-items: center;
    padding: 2rem 0;
    color: #fff;
    font-family: 'PT Sans', sans-serif;

    @media(min-width: 768px) {
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
    }
`
const ElementFooter = styled.div`


    margin-top: 2rem;
  

    ul {
        display: flex;
        margin: 0;
        padding: 0;
        
        li {
            margin: 0 1rem;
            list-style: none;

            a {
                color: #FFF;
            }
        }
    }

    @media(min-width: 768px) {

  
            margin-top: 0rem;

        
        ul {
            justify-content: center;
        }
    }
`

const Footer = ({title}) => {

    const year = new Date().getFullYear();

    return (
       
        <footer>   
            <FooterContainer>
                <ElementFooter>
                &copy; {title} - {year} - All Rights Reserved. 
                </ElementFooter>                
            </FooterContainer>
        </footer>

     );
}
 
export default Footer;