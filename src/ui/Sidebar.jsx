import styled from "styled-components";
import Logo from "./Logo";
import MainNav from "./MainNav";
import PropTypes from "prop-types";

const StyledSidebar = styled.aside`
  background-color: var(--color-grey-0);
  padding: 3.2rem 2.4rem;
  border-right: 1px solid var(--color-grey-100);
  grid-row: 1 / -1;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  overflow-y: auto;

  /* Mobile: slide-in drawer */
  @media (max-width: 900px) {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 26rem;
    max-width: 80vw;
    z-index: 1000;
    transform: translateX(${(p) => (p.$isOpen ? "0" : "-100%")});
    transition: transform 0.3s ease;
    grid-row: auto;
    padding: 2.4rem 1.6rem;
    border-right: none;
  }
`;

function Sidebar({ isOpen, onClose }) {
  return (
    <StyledSidebar $isOpen={isOpen}>
      <Logo />
      <MainNav onNavigate={onClose} />
    </StyledSidebar>
  );
}

Sidebar.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};

export default Sidebar;
