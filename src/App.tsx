import GlobalStyles from './styles/GlobalStyles';
import Button from './ui/Button';

const App = () => {
  return (
    <>
      <GlobalStyles />
      <Button
        $variation="primary"
        $size="medium"
        onClick={() => alert('medium')}
      >
        Check in
      </Button>

      <Button $variation="danger" $size="small" onClick={() => alert('small')}>
        Check in v
      </Button>
    </>
  );
};

export default App;
