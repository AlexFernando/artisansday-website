import React from 'react';
import {css, styled} from "frontity";

const Nav = styled.nav`
    @media (min-width: 768px) {
        padding-bottom: 0;
    }
`;

const LinkStyled = styled.a`
    color: #FFF;
    font-size: 1rem;
    line-height: 1rem;
    font-family: 'PT Sans', sans-serif;
    text-decoration: none;
    margin-right: 1rem;

    @media (min-width: 768px) {
        margin-right: 2rem;
    }

    &:last-of-type {
        margin-right: 0;
    }
    &:hover {
        border-bottom: 2px solid #FFF;
    }
`;

const NavFooter = () => {
  
    return ( 
      
        <Nav>
            <LinkStyled 
                href={'/'}
                activeClassName="pagina-actual"
            >Accesibility</LinkStyled>

            <LinkStyled 
                href={'/'}
                activeClassName="pagina-actual"
            >Privacy Policy</LinkStyled>
        </Nav> 
    
        
    );
}
 
export default NavFooter;