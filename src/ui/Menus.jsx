import { useState, createContext, useContext, useEffect, useRef } from "react";
import { HiEllipsisVertical } from "react-icons/hi2";
import { createPortal } from "react-dom";
import styled from "styled-components";
import PropTypes from "prop-types";

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

const MenusContext = createContext();

function Menus({ children }) {
  const [openId, setOpenId] = useState("");
  const [position, setPosition] = useState(null);
  const menuRef = useRef(null);

  const close = () => setOpenId("");
  const open = setOpenId;

  // click outside close
  useEffect(() => {
    if (!openId) return;

    function handleClickOutside(e) {
      const isInsideMenu = menuRef.current?.contains(e.target);
      const isToggle = e.target.closest("button[data-menu-toggle]");
      if (!isInsideMenu && !isToggle) {
        close();
      }
    }

    // Use capture phase to fire before other clicks
    document.addEventListener("click", handleClickOutside, true);

    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [openId]);

  // Close menu on scroll
  useEffect(() => {
    function handleScroll() {
      if (openId) close();
    }

    window.addEventListener("scroll", handleScroll, true);
    return () => window.removeEventListener("scroll", handleScroll, true);
  }, [openId]);

  return (
    <MenusContext.Provider
      value={{ openId, close, open, position, setPosition, menuRef }}
    >
      {children}
    </MenusContext.Provider>
  );
}

function Toggle({ id }) {
  const { openId, close, open, setPosition } = useContext(MenusContext);

  function handleClick(e) {
    e.stopPropagation();
    const rect = e.target.closest("button").getBoundingClientRect();
    setPosition({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 8,
    });

    // Toggle: close if open, open if closed
    openId === "" || openId !== id ? open(id) : close();
  }

  return (
    <StyledToggle onClick={handleClick} data-menu-toggle>
      <HiEllipsisVertical />
    </StyledToggle>
  );
}

function List({ id, children }) {
  const { openId, position, menuRef } = useContext(MenusContext);

  if (openId !== id) return null;

  return createPortal(
    <StyledList ref={menuRef} position={position}>
      {children}
    </StyledList>,
    document.body,
  );
}

function Button({ children, icon, onClick }) {
  const { close } = useContext(MenusContext);
  function handleClick() {
    onClick?.();
    close();
  }
  return (
    <li>
      <StyledButton onClick={handleClick}>
        {icon}
        <span>{children}</span>
      </StyledButton>
    </li>
  );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

// ─── PROP TYPES ───
Menus.propTypes = {
  children: PropTypes.node.isRequired,
};

// Menu.propTypes = {
//   children: PropTypes.node.isRequired,
// };

Toggle.propTypes = {
  id: PropTypes.string.isRequired,
};

List.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  icon: PropTypes.node,
  onClick: PropTypes.func,
};
export default Menus;
