//import { Component } from 'react'; //This is our Class component
import { useState, useEffect } from 'react';
import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';
import './App.css';

const App = () => {

  const [searchField, setSearchField] = useState(''); // [value, setValue]
  const [title, setTitle] = useState('');
  const [monsters, setMonsters] = useState([]);
  const [filteredMonsters, setFilteredMonsters] = useState(monsters);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((Response) => Response.json())
      .then((users) => setMonsters(users));
  }, []);

  useEffect(() => {
    const newFilteredMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField);
    });

    setFilteredMonsters(newFilteredMonsters);
  }, [monsters, searchField]);

  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString);
  };

  const onTitleChange = (event) => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setTitle(searchFieldString);
  };

  return (
    <div className="App">
      <h1 className='app-title'>{title}</h1>
      <SearchBox className='monsters-search-box' onChangeHandler={onSearchChange} placeholder='Search Monsters' />
      <br />
      <SearchBox className='title-search-box' onChangeHandler={onTitleChange} placeholder='Set Title' />
      <CardList monsters={filteredMonsters} />
    </div>
  );
};

export default App;

/*class App extends Component {
  // Step 1: Our constructor runs first, our State gets initialized.
  constructor() {
    super();

    this.state = {
      monsters: [],
      searchField: '',
    };
  }

  // Step 3: Here we fetch JSON asynchronous, and update the State 
  // After we update the State we Re-render the page (Step 2) to update the values.
  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then((Response) => Response.json())
    .then((users) => this.setState(
      () => {
        return {monsters: users}
      },
      () => {
        console.log(this.state);
      }
    ));
  }

  // Step 2.1: Method to not unnecessarily rendering of extra anonymous functions whenever the render call is being called.
  onSearchChange = (event) => {
    const searchField = event.target.value.toLocaleLowerCase();
    this.setState(() => { 
      return { searchField }; 
    });
  };

  // Step 2: The initial rendering and mounting of our component on to the page.
  render() {
    // console.log('render from AppJS');
    // We declare the states as variables, so we dont write "this.state" every time.
    const { monsters, searchField } = this.state;
    const { onSearchChange } = this;
    const filteredMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField);
    });

    return (
      <div className="App">
        <h1 className='app-title'>Monsters Rolodex</h1>
        <SearchBox className='monsters-search-box' onChangeHandler={onSearchChange} placeholder='Search Monsters' />
        <CardList monsters={filteredMonsters} />
      </div>
    );
  }
}
export default App; */