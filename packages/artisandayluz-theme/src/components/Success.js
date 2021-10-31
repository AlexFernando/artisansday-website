import React, {useEffect} from "react";
import { connect, styled } from "frontity";
import Link from './Link'

const Success = () => {

    return(
        <SuccessContainer>
            <h1>Your event has been uploaded!!</h1>

            <h3>Check the event fullpage to see your event.</h3>

            <div>
                <a href="/">
                    I'm done, log out.
                </a>
            </div>
        </SuccessContainer>
    )
}

export default connect(Success);


const SuccessContainer = styled.div`
    margin-top: 12rem;
    margin-bottom: 5rem;
    text-align: center;
    padding: 2rem;
    border-radius: 1rem;
   
    h1 {
        font-size: 2rem;
        margin-bottom: 2rem;
        color: #3F51B5;
    }

    h3{
        font-size: 1.5rem;
        margin-bottom: 2rem;
        color: #3F51B5;
    }

    div {
        display: flex;
        justify-content: space-around;
        margin-top:2rem;

        a{
            list-style: none;
                /* remove default behavior */
                appearance:none;
                -webkit-appearance:none;

                /* usual styles */
                padding:1rem 2rem;
                font-size: 1rem;
                border:none;
                background-color:#3F51B5;
                color:#fff;
                font-weight:600;
                border-radius:5px;
                margin-top: 2rem;
                cursor: pointer;
        }
    }
`
