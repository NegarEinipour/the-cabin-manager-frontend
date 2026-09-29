import styled, { css } from "styled-components";
const Heading = styled.h1`
  ${(props) =>
    props.as === "h1" &&
    css`
      font-size: clamp(2.2rem, 4vw + 1rem, 3rem);
      font-weight: 600;
    `};

  ${(props) =>
    props.as === "h2" &&
    css`
      font-size: clamp(1.7rem, 2vw + 1rem, 2rem);
      font-weight: 600;
    `};

  ${(props) =>
    props.as === "h3" &&
    css`
      font-size: clamp(1.6rem, 2vw + 1rem, 2rem);
      font-weight: 500;
    `};

  ${(props) =>
    props.as === "h4" &&
    css`
      font-size: clamp(2rem, 3vw + 1rem, 3rem);
      font-weight: 600;
      text-align: center;
    `};

  line-height: 1.4;
`;

export default Heading;
