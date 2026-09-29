import styled from "styled-components";

const ButtonText = styled.button`
  background: none;
  border: none;
  color: var(--color-brand-600);
  font-weight: 500;
  font-size: 1.4rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  transition: all 0.3s;

  &:hover {
    color: var(--color-brand-700);
    text-decoration: underline;
  }

  @media (max-width: 900px) {
    align-self: flex-start;
    justify-content: flex-start;
    text-align: left;
  }
`;

export default ButtonText;
