import styled from "styled-components";
import PropTypes from "prop-types";
import Error from "../ui/Error";

const StyledFormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }

  /* ─── MOBILE: stack label above input ─── */
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 0.6rem;
    padding: 1rem 0;
    align-items: stretch;

    &:has(button) {
      flex-direction: column-reverse; /* primary button on top */
      align-items: stretch;
      gap: 0.8rem;
    }
  }
`;

const Label = styled.label`
  font-weight: 500;

  @media (max-width: 900px) {
    font-size: 1.3rem;
  }
`;

function FormRow({ label = "", error = "", children }) {
  return (
    <StyledFormRow>
      {label && <Label htmlFor={children.props.id}>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  );
}

FormRow.propTypes = {
  label: PropTypes.string,
  error: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default FormRow;
