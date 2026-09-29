import { toast } from "react-hot-toast";
import styled from "styled-components";
import PropTypes from "prop-types";
import { HiSquare2Stack, HiTrash, HiPencil } from "react-icons/hi2";

import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

import { useDeleteCabin } from "./useDeleteCabin";
import { useCreateCabin } from "./useCreateCabin";

/* ─── SHARED MOBILE LABEL STYLES ─── */
const mobileLabel = `
  @media (max-width: 900px) {
    display: grid;
    grid-template-columns: 7rem 1fr;
    gap: 1.2rem;
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

/* Image: small thumbnail on desktop, full-width banner on mobile */
const ImgWrapper = styled.div`
  @media (max-width: 900px) {
    width: 100%;
    margin-bottom: 0.4rem;
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5);
  border-radius: var(--border-radius-sm);

  @media (max-width: 900px) {
    width: 100%;
    aspect-ratio: 16 / 9;
    transform: none;
    border-radius: var(--border-radius-sm);
  }
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";

  ${mobileLabel}
`;

const Capacity = styled.div`
  font-size: 1.4rem;
  color: var(--color-grey-600);

  ${mobileLabel}
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;

  ${mobileLabel}
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);

  ${mobileLabel}
`;

const MenuCell = styled.div`
  @media (max-width: 900px) {
    align-self: flex-end;
    margin-top: 0.4rem;
  }
`;

function CabinRow({ cabin }) {
  const { isDeleting, deleteCabin } = useDeleteCabin();
  const { isCreating, createCabin } = useCreateCabin();

  const {
    _id: cabinId,
    image,
    name,
    maxCapacity,
    regularPrice,
    discount,
    description,
  } = cabin;

  async function handleDuplicate() {
    try {
      const formData = new FormData();
      formData.append("name", `Copy of ${name}`);
      formData.append("maxCapacity", String(maxCapacity));
      formData.append("regularPrice", String(regularPrice));
      formData.append("discount", String(discount || 0));
      formData.append("description", description);

      if (image) {
        try {
          const response = await fetch(image);
          if (response.ok) {
            const blob = await response.blob();
            const file = new File([blob], `${name}.jpg`, { type: blob.type });
            formData.append("image", file);
          } else {
            formData.append("image", "default-cabin.jpg");
          }
        } catch {
          formData.append("image", "default-cabin.jpg");
        }
      } else {
        formData.append("image", "default-cabin.jpg");
      }

      createCabin(formData);
    } catch (error) {
      toast.error("Failed to duplicate");
    }
  }

  return (
    <Modal>
      <Table.Row>
        <ImgWrapper>
          <Img src={image} alt={name} />
        </ImgWrapper>

        <Cabin data-label="Cabin">{name}</Cabin>

        <Capacity data-label="Capacity">
          Fits up to {maxCapacity} guests
        </Capacity>

        <Price data-label="Price">${regularPrice}</Price>

        <Discount data-label="Discount">
          {discount > 0 ? `${discount}% off` : "—"}
        </Discount>

        <MenuCell>
          <Menus.Menu>
            <Menus.Toggle id={cabinId} />
            <Menus.List id={cabinId}>
              <Menus.Button
                icon={<HiSquare2Stack />}
                onClick={handleDuplicate}
                disabled={isCreating}
              >
                Duplicate
              </Menus.Button>

              <Modal.Open opens="edit">
                <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
              </Modal.Open>

              <Modal.Open opens="delete">
                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
              </Modal.Open>
            </Menus.List>
          </Menus.Menu>
        </MenuCell>
      </Table.Row>

      <Modal.Window name="edit">
        <CreateCabinForm cabinToEdit={cabin} />
      </Modal.Window>

      <Modal.Window name="delete">
        <ConfirmDelete
          resourceName="cabins"
          disabled={isDeleting}
          onConfirm={() => deleteCabin(cabinId)}
        />
      </Modal.Window>
    </Modal>
  );
}

CabinRow.propTypes = {
  cabin: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    maxCapacity: PropTypes.number.isRequired,
    regularPrice: PropTypes.number.isRequired,
    discount: PropTypes.number,
    image: PropTypes.string,
    description: PropTypes.string,
    amenities: PropTypes.array,
    isAvailable: PropTypes.bool,
    discountedPrice: PropTypes.number,
  }).isRequired,
};

export default CabinRow;
