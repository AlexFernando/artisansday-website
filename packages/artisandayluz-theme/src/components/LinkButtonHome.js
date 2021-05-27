import React from "react";
import { connect, styled } from "frontity";

const Anchor = styled.a`
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
`;

const Link = ({ href, actions, children }) => {
  return (
    <div>
      <Anchor
        href={href}
        onClick={event => {
          event.preventDefault();
          actions.router.set(href); 
          window.scrollTo(0, 0);
        }}
      >
        {children}
      </Anchor>
    </div>
  );
};

export default connect(Link);