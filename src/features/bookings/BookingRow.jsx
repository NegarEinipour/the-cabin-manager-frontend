import styled from "styled-components";
import { format, isToday } from "date-fns";

import Tag from "../../ui/Tag";
import Table from "../../ui/Table";
import Modal from "../../ui/Modal";
import PropTypes from "prop-types";
import Menus from "../../ui/Menus";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { formatCurrency } from "../../utils/helpers";
import { formatDistanceFromNow } from "../../utils/helpers";
import {
  HiEye,
  HiArrowDownOnSquare,
  HiArrowUpOnSquare,
  HiTrash,
} from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../check-in-out/useCheckout";
import { useDeleteBooking } from "./useDeleteBooking";

/* ─── SHARED MOBILE ROW LAYOUT ─── */
const mobileLabel = `
  @media (max-width: 900px) {
    display: grid;
    grid-template-columns: 6.5rem 1fr;
    gap: 0.8rem;
    align-items: start;
    font-size: 1.3rem;

    &::before {
      content: attr(data-label);
      font-weight: 600;
      color: var(--color-grey-500);
      text-transform: uppercase;
      letter-spacing: 0.3px;
      font-size: 1.1rem;
      padding-top: 0.3rem;
    }
  }
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";

  ${mobileLabel}
`;

/* Combined guest cell — desktop only */
const Guest = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }
  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }

  @media (max-width: 900px) {
    display: none;
  }
`;

/* Mobile: Guest name row */
const GuestName = styled.div`
  display: none;

  @media (max-width: 900px) {
    display: grid;
    grid-template-columns: 6.5rem 1fr;
    gap: 0.8rem;
    align-items: start;
    font-size: 1.3rem;

    &::before {
      content: attr(data-label);
      font-weight: 600;
      color: var(--color-grey-500);
      text-transform: uppercase;
      letter-spacing: 0.3px;
      font-size: 1.1rem;
      padding-top: 0.3rem;
    }

    & > span {
      font-weight: 500;
      font-size: 1.3rem;
    }
  }
`;

/* Mobile: Email row */
const Email = styled.div`
  display: none;

  @media (max-width: 900px) {
    display: grid;
    grid-template-columns: 6.5rem 1fr;
    gap: 0.8rem;
    align-items: start;
    font-size: 1.3rem;

    &::before {
      content: attr(data-label);
      font-weight: 600;
      color: var(--color-grey-500);
      text-transform: uppercase;
      letter-spacing: 0.3px;
      font-size: 1.1rem;
      padding-top: 0.3rem;
    }

    & > span {
      color: var(--color-grey-500);
      font-size: 1.2rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      min-width: 0;
    }
  }
`;

/* Dates — desktop: 2 lines. Mobile: only the actual dates. */
const Dates = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }
  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }

  @media (max-width: 900px) {
    display: grid;
    grid-template-columns: 6.5rem 1fr;
    gap: 0.8rem;
    align-items: start;
    font-size: 1.3rem;

    &::before {
      content: attr(data-label);
      font-weight: 600;
      color: var(--color-grey-500);
      text-transform: uppercase;
      letter-spacing: 0.3px;
      font-size: 1.1rem;
      padding-top: 0.3rem;
    }

    /* Hide the "In 12 days → 5 night stay" line on mobile */
    & > span:first-child {
      display: none;
    }

    & > span:last-child {
      font-size: 1.3rem;
      color: var(--color-grey-700);
      font-weight: 500;
    }
  }
`;

/* Stayed — mobile only: relative info + night count */
const Stayed = styled.div`
  display: none;

  @media (max-width: 900px) {
    display: grid;
    grid-template-columns: 6.5rem 1fr;
    gap: 0.8rem;
    align-items: start;
    font-size: 1.3rem;

    &::before {
      content: attr(data-label);
      font-weight: 600;
      color: var(--color-grey-500);
      text-transform: uppercase;
      letter-spacing: 0.3px;
      font-size: 1.1rem;
      padding-top: 0.3rem;
    }

    & > span {
      font-weight: 500;
    }
  }
`;

const StatusCell = styled.div`
  ${mobileLabel}
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;

  ${mobileLabel}
`;

const MenuCell = styled.div`
  @media (max-width: 900px) {
    align-self: flex-end;
    margin-top: 0.4rem;
  }
`;

function BookingRow({ booking }) {
  const {
    id: bookingId,
    startDate,
    endDate,
    numNights,
    totalPrice,
    status,
    guest,
    cabin,
  } = booking;

  const guestName = guest?.fullName ?? "—";
  const email = guest?.email ?? "—";
  const cabinName = cabin?.name ?? "—";

  const navigate = useNavigate();

  const { checkout, isCheckingOut } = useCheckout();
  const { deleteBooking, isDeleting } = useDeleteBooking();

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  const statusTag = (
    <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
  );

  const relativeStay = `${
    isToday(new Date(startDate)) ? "Today" : formatDistanceFromNow(startDate)
  } → ${numNights} ${numNights === 1 ? "night" : "nights"}`;

  return (
    <Table.Row>
      <Cabin data-label="Cabin">{cabinName}</Cabin>

      {/* Desktop: combined guest cell */}
      <Guest>
        <span>{guestName}</span>
        <span>{email}</span>
      </Guest>

      {/* Mobile: guest name row */}
      <GuestName data-label="Guest">
        <span>{guestName}</span>
      </GuestName>

      {/* Mobile: email row */}
      <Email data-label="Email">
        <span>{email}</span>
      </Email>

      {/* Desktop has 2 lines (kept hidden on mobile via CSS) */}
      <Dates data-label="Dates">
        <span>{relativeStay}</span>
        <span>
          {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
          {format(new Date(endDate), "MMM dd yyyy")}
        </span>
      </Dates>

      {/* Mobile: stayed nights */}
      <Stayed data-label="Stayed">
        <span>{relativeStay}</span>
      </Stayed>

      <StatusCell data-label="Status">{statusTag}</StatusCell>

      <Amount data-label="Amount">{formatCurrency(totalPrice)}</Amount>

      <MenuCell>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={bookingId} />
            <Menus.List id={bookingId}>
              <Menus.Button
                icon={<HiEye />}
                onClick={() => navigate(`/bookings/${bookingId}`)}
              >
                See details
              </Menus.Button>
              {status === "unconfirmed" && (
                <Menus.Button
                  icon={<HiArrowDownOnSquare />}
                  onClick={() => navigate(`/checkin/${bookingId}`)}
                >
                  Check in
                </Menus.Button>
              )}
              {status === "checked-in" && (
                <Menus.Button
                  icon={<HiArrowUpOnSquare />}
                  onClick={() => checkout(bookingId)}
                  disabled={isCheckingOut}
                >
                  Check out
                </Menus.Button>
              )}
              <Modal.Open opens="delete">
                <Menus.Button icon={<HiTrash />} disabled={isDeleting}>
                  Delete
                </Menus.Button>
              </Modal.Open>
            </Menus.List>
          </Menus.Menu>
          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName="booking"
              onConfirm={() => deleteBooking(bookingId)}
            />
          </Modal.Window>
        </Modal>
      </MenuCell>
    </Table.Row>
  );
}

BookingRow.propTypes = {
  booking: PropTypes.shape({
    id: PropTypes.string.isRequired,
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
    numNights: PropTypes.number.isRequired,
    numGuests: PropTypes.number.isRequired,
    totalPrice: PropTypes.number.isRequired,
    status: PropTypes.oneOf(["unconfirmed", "checked-in", "checked-out"])
      .isRequired,
    guest: PropTypes.shape({
      fullName: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    }).isRequired,
    cabin: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default BookingRow;
