import styled from "styled-components";
import PropTypes from "prop-types";
import { format, isToday } from "date-fns";
import {
  HiOutlineChatBubbleBottomCenterText,
  HiOutlineCheckCircle,
  HiOutlineCurrencyDollar,
  HiOutlineHomeModern,
} from "react-icons/hi2";

import DataItem from "../../ui/DataItem";
import Flag from "../../ui/Flag";

import { formatDistanceFromNow, formatCurrency } from "../../utils/helpers";

const StyledBookingDataBox = styled.section`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  overflow: hidden;
`;

const Header = styled.header`
  background-color: var(--color-brand-500);
  padding: 2rem 4rem;
  color: #e0e7ff;
  font-size: 1.8rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;

  svg {
    height: 3.2rem;
    width: 3.2rem;
    flex-shrink: 0;
  }

  & div:first-child {
    display: flex;
    align-items: center;
    gap: 1.6rem;
    font-weight: 600;
    font-size: 1.8rem;
  }

  & span {
    font-family: "Sono";
    font-size: 2rem;
    margin-left: 4px;
  }

  @media (max-width: 900px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.8rem;
    padding: 1.6rem;
    font-size: 1.4rem;

    svg {
      height: 2.4rem;
      width: 2.4rem;
    }

    & div:first-child {
      gap: 1rem;
      font-size: 1.5rem;
    }

    & span {
      font-size: 1.6rem;
    }

    /* The right-side date paragraph */
    & > p {
      font-size: 1.2rem;
      line-height: 1.5;
    }
  }
`;

const Section = styled.section`
  padding: 3.2rem 4rem 1.2rem;

  @media (max-width: 900px) {
    padding: 1.6rem 1.6rem 0.8rem;
  }
`;

const Guest = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  margin-bottom: 1.6rem;
  color: var(--color-grey-500);

  & p:first-of-type {
    font-weight: 500;
    color: var(--color-grey-700);
  }

  @media (max-width: 900px) {
    flex-wrap: wrap;
    gap: 0.6rem 1rem;
    margin-bottom: 1.2rem;
    font-size: 1.3rem;

    & span {
      display: none; /* hide the • separators */
    }

    & p {
      margin: 0;
    }

    & p:first-of-type {
      flex-basis: 100%; /* name on its own line */
    }
  }
`;

const Price = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.6rem;
  padding: 1.6rem 3.2rem;
  border-radius: var(--border-radius-sm);
  margin-top: 2.4rem;

  background-color: ${(props) =>
    props.isPaid ? "var(--color-green-100)" : "var(--color-yellow-100)"};
  color: ${(props) =>
    props.isPaid ? "var(--color-green-700)" : "var(--color-yellow-700)"};

  & p:last-child {
    text-transform: uppercase;
    font-size: 1.4rem;
    font-weight: 600;
  }

  svg {
    height: 2.4rem;
    width: 2.4rem;
    color: currentColor !important;
    flex-shrink: 0;
  }

  @media (max-width: 900px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.8rem;
    padding: 1.2rem 1.6rem;
    margin-top: 1.6rem;

    & p:last-child {
      font-size: 1.2rem;
    }
  }
`;

const Footer = styled.footer`
  padding: 1.6rem 4rem;
  font-size: 1.2rem;
  color: var(--color-grey-500);
  text-align: right;

  @media (max-width: 900px) {
    padding: 1.2rem 1.6rem;
    text-align: left;
    font-size: 1.1rem;
  }
`;

function BookingDataBox({ booking }) {
  const {
    createdAt,
    startDate,
    endDate,
    numNights,
    numGuests,
    cabinPrice,
    extrasPrice,
    totalPrice,
    hasBreakfast,
    observations,
    isPaid,
    guest,
    cabin,
  } = booking;

  const guestName = guest?.fullName ?? "—";
  const email = guest?.email ?? "—";
  const country = guest?.country ?? "—";
  const countryFlag = guest?.countryFlag ?? "—";
  const nationalID = guest?.nationalID ?? "—";
  const cabinName = cabin?.name ?? "—";

  return (
    <StyledBookingDataBox>
      <Header>
        <div>
          <HiOutlineHomeModern />
          <p>
            {numNights} nights in Cabin <span>{cabinName}</span>
          </p>
        </div>

        <p>
          {startDate && endDate ? (
            <>
              {format(new Date(startDate), "EEE, MMM dd yyyy")} (
              {isToday(new Date(startDate))
                ? "Today"
                : formatDistanceFromNow(startDate)}
              ) &mdash; {format(new Date(endDate), "EEE, MMM dd yyyy")}
            </>
          ) : (
            "No dates available"
          )}
        </p>
      </Header>

      <Section>
        <Guest>
          {countryFlag && <Flag src={countryFlag} alt={`Flag of ${country}`} />}
          <p>
            {guestName} {numGuests > 1 ? `+ ${numGuests - 1} guests` : ""}
          </p>
          <span>&bull;</span>
          <p>{email}</p>
          <span>&bull;</span>
          <p>National ID {nationalID}</p>
        </Guest>

        {observations && (
          <DataItem
            icon={<HiOutlineChatBubbleBottomCenterText />}
            label="Observations"
          >
            {observations}
          </DataItem>
        )}

        <DataItem icon={<HiOutlineCheckCircle />} label="Breakfast included?">
          {hasBreakfast ? "Yes" : "No"}
        </DataItem>

        <Price isPaid={isPaid}>
          <DataItem icon={<HiOutlineCurrencyDollar />} label={`Total price`}>
            {formatCurrency(totalPrice)}

            {hasBreakfast &&
              ` (${formatCurrency(cabinPrice)} cabin + ${formatCurrency(
                extrasPrice,
              )} breakfast)`}
          </DataItem>

          <p>{isPaid ? "Paid" : "Will pay at property"}</p>
        </Price>
      </Section>

      <Footer>
        <p>Booked {format(new Date(createdAt), "EEE, MMM dd yyyy, p")}</p>
      </Footer>
    </StyledBookingDataBox>
  );
}

BookingDataBox.propTypes = {
  booking: PropTypes.shape({
    createdAt: PropTypes.string.isRequired,
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
    numNights: PropTypes.number.isRequired,
    numGuests: PropTypes.number.isRequired,
    cabinPrice: PropTypes.number.isRequired,
    extrasPrice: PropTypes.number,
    totalPrice: PropTypes.number.isRequired,
    hasBreakfast: PropTypes.bool.isRequired,
    observations: PropTypes.string,
    isPaid: PropTypes.bool.isRequired,
    guest: PropTypes.shape({
      fullName: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      country: PropTypes.string,
      countryFlag: PropTypes.string,
      nationalID: PropTypes.string,
    }).isRequired,
    cabin: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default BookingDataBox;
