import styled from 'styled-components';

import { useUser } from '@/hooks/useUser';

const StyledUserAvatar = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  font-weight: 500;
  font-size: 1.4rem;
  color: var(--color-grey-600);

  @media screen and (max-width: 568px) {
    & span {
      display: none;
    }
  }
`;

interface AvatarProps {
  alt: string;
  src: string;
}

export const Avatar = styled.img<AvatarProps>`
  display: block;
  width: 100%;
  max-width: 4rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 2px solid var(--color-grey-100);

  &:focus {
    outline: none;
  }

  @media screen and (max-width: 568px) {
    & {
      min-width: 3rem;
      width: 100%;
    }
  }
`;

const UserAvatar: React.FC = () => {
  const { userData } = useUser();

  const { fullName, avatar } = userData?.user_metadata || {};

  return (
    <StyledUserAvatar>
      <Avatar
        alt={`Avatar of ${fullName}` || 'User Avatar'}
        src={avatar || 'default-user.jpg'}
      />
      <span>{fullName}</span>
    </StyledUserAvatar>
  );
};

export default UserAvatar;
