import styled from "styled-components";

const ButtonGroup = styled.div`
  display: flex;
  gap: 1.2rem;
  justify-content: flex-end;

  @media (max-width: 900px) {
    flex-wrap: wrap;
    gap: 0.8rem;

    /* Primary (first) button: full width on top */
    & > *:first-child {
      flex-basis: 100%;
      order: 1;
    }

    /* Secondary buttons: side by side below */
    & > *:not(:first-child) {
      flex: 1 1 0;
      min-width: 0;
      order: 2;
    }

    & button {
      width: 100%;
      justify-content: center;
      padding: 1rem 1.2rem;
      font-size: 1.3rem;
    }
  }
`;

export default ButtonGroup;
