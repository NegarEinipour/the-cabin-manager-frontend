import styled, { css } from "styled-components";

const Row = styled.div`
  display: flex;

  ${(props) =>
    props.type === "horizontal" &&
    css`
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    `}

  ${(props) =>
    props.type === "vertical" &&
    css`
      flex-direction: column;
      gap: 1.6rem;
    `}

  /* On mobile, stack horizontal rows vertically */
  @media (max-width: 900px) {
    ${(props) =>
      props.type === "horizontal" &&
      css`
        flex-direction: column;
        align-items: stretch;
        gap: 1.6rem;

        /* Prevent children from overflowing the viewport */
        & > * {
          min-width: 0;
          max-width: 100%;
        }
      `}
  }
`;

Row.defaultProps = {
  type: "vertical",
};

export default Row;
