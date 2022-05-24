import { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { render } from '@testing-library/react';

class App extends Component {
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

  // Step 2: The initial rendering and mounting of our component on to the page.
  render() {
    const filteredMonsters = this.state.monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(this.state.searchField);
    });

    return (
      <div className="App">
        <input 
          className='search-box' 
          type='search' 
          placeholder='Search Monsters' 
          onChange={(event) => {
            const searchField = event.target.value.toLocaleLowerCase();
            this.setState(() => {
              return { searchField };
            })
          }} 
        />

        {filteredMonsters.map((monster) => {
          return (
            <div key={monster.id}>
              <h1>{monster.name}</h1>
            </div>
          );
        })}
      </div>
    );
  }
}

export default App;
