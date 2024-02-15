import { HiArrowRightOnRectangle } from 'react-icons/hi2';

import { useLogout } from '@/hooks/useLogout';
import ButtonIcon from '@/ui/ButtonIcon/ButtonIcon';
import SpinnerMini from '@/ui/SpinnerMini/SpinnerMini';

const Logout: React.FC = () => {
  const { logout, isLoggingOut } = useLogout();
  return (
    <ButtonIcon onClick={() => logout()} disabled={isLoggingOut}>
      {isLoggingOut ? (
        <>
          <SpinnerMini />
          <span>Logging out...</span>
        </>
      ) : (
        <>
          <HiArrowRightOnRectangle />
          <span>Logout</span>
        </>
      )}
    </ButtonIcon>
  );
};

export default Logout;
