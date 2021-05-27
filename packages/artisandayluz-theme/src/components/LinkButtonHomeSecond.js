import React from "react";
import { connect, styled } from "frontity";

const Anchor = styled.a`

    border-radius: 1rem;
    background-color: #fff;
    border: 2px solid #203492;
    color: #203492;
    margin-left: 2rem;
    line-height: inherit;
    text-decoration: none;
    cursor: pointer;
    padding: 15px 20px;
    font-size: 16px;
    text-align: center;
    transition: transform 500ms cubic-bezier(.23, 1, .32, 1), color 200ms ease, opacity 200ms ease, -webkit-transform 500ms cubic-bezier(.23, 1, .32, 1);
    box-shadow: 4px 4px 0 0 #7ea2b2;
    letter-spacing: 1px;
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