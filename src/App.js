import './App';
import CardList from './components/Card/CardList';
import FilterContainer from './components/Filter/FilterContainer';

const App = () => {
  return (
    <>
      <FilterContainer></FilterContainer>
      <CardList></CardList>
    </>
  );
};

export default App;
