import UpdateUserDataForm from '@/features/authentication/UpdateUserDataForm';
import Heading from '@/ui/Heading/Heading';
import Row from '@/ui/Row/Row';

const Account = () => {
  return (
    <>
      <Heading as="h1">Update your account</Heading>

      <Row $type="vertical">
        <Heading as="h3">Update user data</Heading>
        <UpdateUserDataForm />
      </Row>

      <Row $type="vertical">
        <Heading as="h3">Update password</Heading>
      </Row>
    </>
  );
};

export default Account;
