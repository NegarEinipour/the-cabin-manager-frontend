// ui/Error.jsx
import styled from "styled-components";
import PropTypes from "prop-types";

const StyledError = styled.span`
  color: var(--color-red-700);
  font-size: 1.4rem;
  font-weight: 500;
  display: inline-block;
  margin-top: 0.4rem;
  padding: 0.2rem 0;
`;

function Error({ children }) {
  return <StyledError>{children}</StyledError>;
}

Error.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Error;
