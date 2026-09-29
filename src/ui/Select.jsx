import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import PropTypes from "prop-types";
import { HiChevronDown } from "react-icons/hi2";

const DropdownWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 100%;
`;

const Trigger = styled.button`
  width: 100%;
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid var(--color-grey-300);
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  cursor: pointer;
  color: inherit;
  touch-action: manipulation;

  & svg {
    width: 1.8rem;
    height: 1.8rem;
    flex-shrink: 0;
  }

  @media (max-width: 900px) {
    font-size: 1.3rem;
    padding: 1rem 1.2rem;
  }
`;

const List = styled.ul`
  position: fixed;
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-200);
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-lg);
  padding: 0.4rem;
  z-index: 9999;
  max-height: 30rem;
  overflow-y: auto;
`;

const Option = styled.li`
  padding: 1rem 1.2rem;
  font-size: 1.3rem;
  border-radius: var(--border-radius-sm);
  cursor: pointer;
  color: inherit;

  &:hover {
    background-color: var(--color-grey-100);
  }

  &.selected {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

function Select({ options, value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0, width: 0 });
  const triggerRef = useRef();
  const listRef = useRef();

  useEffect(() => {
    function handleDocClick(e) {
      const clickedTrigger = triggerRef.current?.contains(e.target);
      const clickedList = listRef.current?.contains(e.target);

      if (!clickedTrigger && !clickedList) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleDocClick);
      document.addEventListener("touchstart", handleDocClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleDocClick);
      document.removeEventListener("touchstart", handleDocClick);
    };
  }, [isOpen]);

  function handleOpen() {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setCoords({
        top: rect.bottom + 4,
        left: rect.left,
        width: rect.width,
      });
    }
    setIsOpen((o) => !o);
  }

  const selected = options.find((o) => o.value === value) || options[0];

  function handleSelect(optionValue) {
    onChange({ target: { value: optionValue } });
    setIsOpen(false);
  }

  return (
    <DropdownWrapper>
      <Trigger ref={triggerRef} type="button" onClick={handleOpen}>
        {selected.label}
        <HiChevronDown />
      </Trigger>

      {isOpen &&
        createPortal(
          <List
            ref={listRef}
            style={{
              top: coords.top,
              left: coords.left,
              width: coords.width,
            }}
          >
            {options.map((option) => (
              <Option
                key={option.value}
                className={option.value === value ? "selected" : ""}
                onClick={() => handleSelect(option.value)}
              >
                {option.label}
              </Option>
            ))}
          </List>,
          document.body,
        )}
    </DropdownWrapper>
  );
}

Select.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      label: PropTypes.string.isRequired,
    }),
  ).isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
};

export default Select;
