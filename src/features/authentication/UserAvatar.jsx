import styled from "styled-components";
import { useUser } from "./useUser";

const StyledUserAvatar = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  font-weight: 500;
  font-size: 1.4rem;
  color: var(--color-grey-600);

  @media (max-width: 900px) {
    & span {
      display: none;
    }
  }
`;

const Avatar = styled.img`
  display: block;
  width: 3.6rem;
  height: 3.6rem;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 2px solid var(--color-grey-100);

  @media (max-width: 900px) {
    width: 3.2rem;
    height: 3.2rem;
  }
`;

function UserAvatar() {
  const { user } = useUser();
  const { name: fullName, photo } = user;

  const avatarSrc =
    !photo || photo === "default.png" ? "/default-user.png" : photo;

  return (
    <StyledUserAvatar>
      <Avatar src={avatarSrc} alt={`Avatar of ${fullName}`} />
      <span>{fullName}</span>
    </StyledUserAvatar>
  );
}

export default UserAvatar;
