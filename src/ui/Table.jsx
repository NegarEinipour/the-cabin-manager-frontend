// ui/Table.jsx
import { createContext, useContext } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const StyledTable = styled.div`
  border: 1px solid var(--color-grey-200);
  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;

  @media (max-width: 900px) {
    background-color: transparent;
    border: none;
    border-radius: 0;
    overflow: visible;
  }
`;

const CommonRow = styled.div`
  display: grid;
  grid-template-columns: ${(props) => props.columns};
  column-gap: 2.4rem;
  align-items: center;
  transition: none;
`;

const StyledHeader = styled(CommonRow)`
  padding: 1.6rem 2.4rem;
  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);

  @media (max-width: 900px) {
    display: none; /* hide the header row entirely on mobile */
  }
`;

const StyledRow = styled(CommonRow)`
  padding: 1.2rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  @media (max-width: 900px) {
    display: flex;
    flex-direction: column;
    gap: 1.4rem; /* ← gap between rows inside a card */
    padding: 1.6rem;
    border: 1px solid var(--color-grey-100);
    border-radius: var(--border-radius-md);
    background-color: var(--color-grey-0);
    margin-bottom: 2rem; /* ← gap between cards */
    align-items: stretch;
  }
`;

const StyledBody = styled.section`
  margin: 0.4rem 0;
`;

const StyledFooter = styled.footer`
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  padding: 1.2rem;

  &:not(:has(*)) {
    display: none;
  }
`;

const Empty = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  margin: 2.4rem;
`;

const TableContext = createContext();

function Table({ columns, mobileColumns, children }) {
  return (
    <TableContext.Provider value={{ columns, mobileColumns }}>
      <StyledTable role="table">{children}</StyledTable>
    </TableContext.Provider>
  );
}

function Header({ children }) {
  const { columns, mobileColumns } = useContext(TableContext);
  return (
    <StyledHeader
      role="row"
      columns={columns}
      mobileColumns={mobileColumns}
      as="header"
    >
      {children}
    </StyledHeader>
  );
}

function Row({ children }) {
  const { columns, mobileColumns } = useContext(TableContext);
  return (
    <StyledRow role="row" columns={columns} mobileColumns={mobileColumns}>
      {children}
    </StyledRow>
  );
}

function Body({ data, render }) {
  if (data.length === 0) return <Empty>No data to show at the moment</Empty>;
  return <StyledBody>{data.map(render)}</StyledBody>;
}

function Footer({ children }) {
  return <StyledFooter>{children}</StyledFooter>;
}

Table.Header = Header;
Table.Row = Row;
Table.Body = Body;
Table.Footer = Footer;

Table.propTypes = {
  columns: PropTypes.string.isRequired,
  mobileColumns: PropTypes.string,
  children: PropTypes.node.isRequired,
};

Header.propTypes = { children: PropTypes.node.isRequired };
Row.propTypes = { children: PropTypes.node.isRequired };
Body.propTypes = { data: PropTypes.array, render: PropTypes.func };
Footer.propTypes = { children: PropTypes.node };

export default Table;
