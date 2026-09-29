import PropTypes from "prop-types";
import styled from "styled-components";
import { HiBars3 } from "react-icons/hi2";
import HeaderMenu from "./HeaderMenu";
import UserAvatar from "../features/authentication/UserAvatar";

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);

  display: flex;
  gap: 2.4rem;
  align-items: center;
  justify-content: flex-end;

  /* Desktop: header sits in the right column (next to the 26rem sidebar) */
  @media (min-width: 901px) {
    grid-column: 2 / -1;
  }

  @media (max-width: 900px) {
    padding: 1.2rem 1.6rem;
  }
`;

const HamburgerButton = styled.button`
  background: none;
  border: none;
  padding: 0.6rem;
  border-radius: var(--border-radius-sm);
  cursor: pointer;
  display: none;
  margin-right: auto;

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }

  @media (max-width: 900px) {
    display: block;
  }
`;

const ActionsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 2.4rem;

  @media (max-width: 900px) {
    gap: 1rem;
    transform: scale(0.85);
    transform-origin: right center; /* keep it hugged to the right edge */
  }
`;

function Header({ onOpenSidebar }) {
  return (
    <StyledHeader>
      <HamburgerButton onClick={onOpenSidebar} aria-label="Open menu">
        <HiBars3 />
      </HamburgerButton>
      <ActionsWrapper>
        <UserAvatar />
        <HeaderMenu />
      </ActionsWrapper>
    </StyledHeader>
  );
}

Header.propTypes = {
  onOpenSidebar: PropTypes.func.isRequired,
};

export default Header;
