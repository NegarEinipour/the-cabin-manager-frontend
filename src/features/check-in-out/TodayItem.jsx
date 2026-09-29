import PropTypes from "prop-types";
import styled from "styled-components";
import Tag from "../../ui/Tag";
import Flag from "../../ui/Flag";
import Button from "../../ui/Button";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../check-in-out/useCheckout";

const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 9rem 2rem 1fr 7rem 9rem;
  gap: 1.2rem;
  align-items: center;
  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }

  @media (max-width: 900px) {
    display: grid;
    grid-template-columns: auto 1fr auto;
    grid-template-rows: auto auto;
    column-gap: 0.8rem;
    row-gap: 0.6rem;
    padding: 1.2rem 0;
    font-size: 1.3rem;

    /* Row 1: Tag (left) + Nights (right) */
    & > *:nth-child(1) {
      grid-column: 1 / 3;
      grid-row: 1;
      justify-self: start;
      font-size: 1rem;
      padding: 0.2rem 0.7rem;
    }
    & > *:nth-child(4) {
      grid-column: 3;
      grid-row: 1;
      justify-self: end;
      color: var(--color-grey-500);
      font-size: 1.2rem;
      white-space: nowrap;
    }

    /* Row 2: Flag + Name + Button in one flowing row */
    & > *:nth-child(2) {
      grid-column: 1;
      grid-row: 2;
    }
    & > *:nth-child(3) {
      grid-column: 2;
      grid-row: 2;
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    & > *:nth-child(5) {
      grid-column: 3;
      grid-row: 2;
      justify-self: end;
      padding: 0.5rem 0.9rem;
      font-size: 1.15rem;
      white-space: nowrap;
    }
  }
`;

const Guest = styled.div`
  font-weight: 500;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

function TodayItem({ activity }) {
  const { _id, status, guest, numNights } = activity;
  const navigate = useNavigate();
  const { checkout, isCheckingOut } = useCheckout();

  return (
    <StyledTodayItem>
      {status === "unconfirmed" && <Tag type="green">Arriving</Tag>}
      {status === "checked-in" && <Tag type="blue">Departing</Tag>}

      <div className="flag-placeholder">
        {guest?.countryFlag ? (
          <Flag src={guest.countryFlag} alt={`Flag of ${guest.countryFlag}`} />
        ) : (
          <span>🌍</span>
        )}
      </div>

      <Guest>{guest?.fullName}</Guest>

      <div>{numNights} nights</div>

      {status === "unconfirmed" && (
        <Button
          size="small"
          variation="primary"
          onClick={() => navigate(`/checkin/${_id}`)}
        >
          Check in
        </Button>
      )}

      {status === "checked-in" && (
        <Button
          size="small"
          variation="primary"
          onClick={() => checkout(_id)}
          disabled={isCheckingOut}
        >
          Check out
        </Button>
      )}
    </StyledTodayItem>
  );
}

TodayItem.propTypes = {
  activity: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    status: PropTypes.oneOf(["unconfirmed", "checked-in"]).isRequired,
    numNights: PropTypes.number.isRequired,
    guest: PropTypes.shape({
      fullName: PropTypes.string.isRequired,
      nationality: PropTypes.string,
      countryFlag: PropTypes.string,
    }),
  }).isRequired,
};

export default TodayItem;
