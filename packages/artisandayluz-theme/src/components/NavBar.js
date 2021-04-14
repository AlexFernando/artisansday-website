import React, {useState} from 'react';
import {css, connect, styled } from "frontity";
import Link from './Link'

const NavBar = () => {

    const [navbarOpen, setNavbarOpen] = useState(false)

    return ( 
        
        <Navigation>
            <Link href="/"><h1>Logo.com</h1></Link>
        <Toggle
            navbarOpen={navbarOpen}
            onClick={() => setNavbarOpen(!navbarOpen)}
        >
            {navbarOpen ? <Hamburger open /> : <Hamburger />}
        </Toggle>  

      {navbarOpen ? (
        <>             
            <Navbox>
                <Button onClick = {() => setNavbarOpen(!navbarOpen)}>
                    <Link href= "/">About</Link>
                </Button> 
                <Button onClick = {() => setNavbarOpen(!navbarOpen)}> 
                    <Link href= "/">Main Event</Link>
                </Button>   
                <Button onClick = {() => setNavbarOpen(!navbarOpen)}>
                    <Link href="/fullprogram">Full Program</Link>
                </Button>

                <div> <a href="#" css = {css`
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
                `}>
                Day's Program</a></div>
            </Navbox>
        </>

      ) : (
        <>
        <Navbox open>
          <Button><Link href= "/">About</Link></Button> 
          <Button><Link href="/fullprogram">Full Program</Link></Button> 
          <Button> <Link href= "/">Main Event</Link></Button> 
          <div> <a href="#" css = {css`
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
          `} >Day's Program</a></div>
        </Navbox>
  </>
      )}
      
    </Navigation>
     );

}
export default connect(NavBar);

const Navigation = styled.nav`
   display: flex;
   flex: 1 0 100%; /**new line */
   height: 10vh;
   justify-content: space-between;
   align-items: center;
   border-bottom: 2px solid #33333320;
   margin: 0 auto;
   padding: 0 auto;
   position: fixed;
   width: 100%;
   z-index: 5;
   background-color: #fff;
   top: 0;

   h1 {
     margin-left: 2rem;
     color: #203492;
     font-size: 2rem;
   }


  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    margin-bottom: 0;
  }
`
const Toggle = styled.div`
  display: none;
  height: 100%;
  cursor: pointer;
  padding: 0 10vw;

  @media (max-width: 768px) {
    display: flex;
  }
`

const Navbox = styled.div`

  display: flex;
  /*height: 100%;*/

  flex: 1 0 100%; /**new line */
  justify-content: center;
  align-items: center;
  margin: auto;
  height: 10vh;
  background-color: #fff;
  
  @media (max-width: 768px) {
    
    flex-direction: column;
    position: fixed;
    height: 100%;
    width: 100%;
    /**max-height: 100%;*/
    justify-content: flex-start;
    align-items: flex-start;
    overflow-y: auto;
    background-color: #fff;
    -webkit-transition: all 0.3s ease-in;
    -o-transition: all 0.3s ease-in;
    transition: all 0.3s ease-in;
    top: 10vh;
    left: ${props => (props.open ? "-100%" : "0")};
  }
`

const Hamburger = styled.div`
  background-color: #111;
  width: 30px;
  height: 3px;
  -webkit-transition: all .3s linear;
  -o-transition: all .3s linear;
  transition: all .3s linear;
  -webkit-align-self: center;
      -ms-flex-item-align: center;
              -ms-grid-row-align: center;
          align-self: center;
  position: relative;
  -webkit-transform: ${props => (props.open ? "rotate(-45deg)" : "inherit")};
  -ms-transform: ${props => (props.open ? "rotate(-45deg)" : "inherit")};
  transform: ${props => (props.open ? "rotate(-45deg)" : "inherit")};
  
  ::before,
  ::after {
    width: 30px;
    height: 3px;
    background-color: #111;
    content: "";
    position: absolute;
    -webkit-transition: all 0.3s linear;
    -o-transition: all 0.3s linear;
    transition: all 0.3s linear;
  }

  ::before {
    -webkit-transform: ${props =>
      props.open ? "rotate(-90deg) translate(-10px, 0px)" : "rotate(0deg)"};
        -ms-transform: ${props =>
      props.open ? "rotate(-90deg) translate(-10px, 0px)" : "rotate(0deg)"};
    transform: ${props =>
      props.open ? "rotate(-90deg) translate(-10px, 0px)" : "rotate(0deg)"};
    top: -10px;
  }

  ::after {
    opacity: ${props => (props.open ? "0" : "1")};
    -webkit-transform: ${props => (props.open ? "rotate(90deg) " : "rotate(0deg)")};
        -ms-transform: ${props => (props.open ? "rotate(90deg) " : "rotate(0deg)")};
    transform: ${props => (props.open ? "rotate(90deg) " : "rotate(0deg)")};
    top: 10px;
  }
  `

  const Button = styled.a`
    display: flex;
    margin: 1rem 0rem 1rem 1rem;
    font-size: 1.2rem;
    color: #000;
    text-decoration: none;
    cursor: pointer;

        @media(min-width: 768px) {
            margin: 0rem 1rem 0 1rem;
            font-size: 1.3rem;
            color: #000;
        }
  `;

 