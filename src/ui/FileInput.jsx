// ui/FileInput.jsx
import styled from "styled-components";
import { forwardRef } from "react";
import PropTypes from "prop-types";

const StyledFileInput = styled.input`
  font-size: 1.4rem;
  border-radius: var(--border-radius-sm);

  &::file-selector-button {
    font: inherit;
    font-weight: 500;
    padding: 0.8rem 1.2rem;
    margin-right: 1.2rem;
    border-radius: var(--border-radius-sm);
    border: none;
    color: var(--color-brand-50);
    background-color: var(--color-brand-600);
    cursor: pointer;
    transition:
      color 0.2s,
      background-color 0.2s;

    &:hover {
      background-color: var(--color-brand-700);
    }
  }
`;

const FileInput = forwardRef(({ id, accept, ...props }, ref) => {
  return (
    <StyledFileInput
      type="file"
      id={id}
      accept={accept}
      ref={ref} // ← CHILD (FileInput) receives the remote control and gives it to the input
      {...props}
    />
  );
});

FileInput.displayName = "FileInput";

//  PropTypes validation
FileInput.propTypes = {
  id: PropTypes.string,
  accept: PropTypes.string,
  multiple: PropTypes.bool,
  onChange: PropTypes.func,
};

// Default props
FileInput.defaultProps = {
  id: "file-input",
  accept: "image/*",
  multiple: false,
  onChange: undefined,
};

export default FileInput;
