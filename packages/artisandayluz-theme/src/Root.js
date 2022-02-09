import React, {useEffect} from 'react';
import { Head, connect, Global, css, styled } from "frontity";
import AllEvents from './components/allEvents';
import HomePage from './components/Home';
import NavBar from './components/NavBar';
import EventsDetails from './components/EventDetails';
import MainEvent from './components/MainEvent';
import Footer from './components/footer';
import Contact from './components/contact';
import StayInTouch from './components/stayInTouch';
import About from './components/about';
import CreateEvent from './components/createEvent';


const Root = ({state, actions}) => {

    const data = state.source.get(state.router.link);

    useEffect( () => {
        actions.source.fetch("/homepage")
        actions.source.fetch("/allevents")
        actions.source.fetch("/es/homepage");
        actions.source.fetch("/fr/homepage");
    }, [])

    
    return (
      <>
      <Global
                styles={css`

                    body {
                        margin: 0;
                        font-family: 'Montserrat', sans-serif;
                        overflow-x: hidden;
                        width: 100%;
                        /*height: 100%;*/
                    }

                
                    /* * {
                        border: 1px solid #f00 !important;
                    }   */
                     
                    p {
                        font-family: 'Montserrat', sans-serif;
                        font-weight: 400;
                    }
                `}
            />

            <Head>
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&family=Montserrat:wght@300;400;700&display=swap" rel="stylesheet" media="print" onload="this.media='all'" /> 
                <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />
            </Head>

        {/** Navbar */}       
        <NavBar />
        {/**Other components */}
        {data.isHomePage && <HomePage /> }
        {data.isFullProgram && <AllEvents />}  
        {data.isAllevents && <EventsDetails/>}
        {state.router.link === "/mainevent/" && <MainEvent />}
        {state.router.link === "/es/mainevent/" && <MainEvent />}
        {state.router.link === "/fr/mainevent/" && <MainEvent />}

        {state.router.link === "/about/" && <About/>}
        {state.router.link === "/es/about/" && <About/>}
        {state.router.link === "/fr/about/" && <About/>}

        {state.router.link === "/contact/" && <StayInTouch />}
        {state.router.link === "/es/contact/" && <StayInTouch />}
        {state.router.link === "/fr/contact/" && <StayInTouch />}

        {data.isCreateEvent && <CreateEvent />}

        <Contact />
        
        <Footer title={"Artisan's Day Luz"}/>   
      </>
    );
  };

  export default connect(Root);