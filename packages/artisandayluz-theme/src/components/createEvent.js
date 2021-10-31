import React from "react";
import { Global, css, connect, styled, Head } from "frontity";
import Login from "./login";
import ChooseImage from './chooseImage';
import FormEvent from './formEvent';
import Success from './Success';

const CreateEvent = ({ state, actions }) => {

  return (
    <>
      <Head>
        <meta name="description" content="" />
        <html lang="en" />
      </Head>

      {/* <Global styles={globalStyles} /> */}

      <Main>
        {!state.theme.token && <Login />}
        { state.theme.token && 
        <>

          {state.theme.idImage === "noImage" ?
            
              <ChooseImage />
              :
              <>
                {Object.entries(state.theme.bodyPostEvent).length === 0? 
                  <FormEvent />

                  : <Success />
                }
              </>
          }
        </>
        }
      </Main>
    </>
  );
};

export default connect(CreateEvent);

/* const globalStyles = css`
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      "Droid Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
  }
  a,
  a:visited {
    color: inherit;
    text-decoration: none;
  }
`; */

const Main = styled.div`
  display: flex;
  justify-content: center;
  background-image: linear-gradient(
    180deg,
    rgba(66, 174, 228, 0.1),
    rgba(66, 174, 228, 0)
  );
`;
