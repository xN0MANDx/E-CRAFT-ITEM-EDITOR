import React, { Component } from 'react';

import Item from './components/Item';

import './styles/App.css';

class App extends Component {

    state = {  
        selected: '',
        player: 'xN0MANDx'
    };

    handleItemChange = (e) => { this.setState({ selected: e.target.value }) }
    handlePlayerChange = (e) => { this.setState({ player: e.target.value }) }

    render() { 

        const { selected, player } = this.state;

        return (
            <>
                <h1>EDYTOR PRZEDMIOTÓW E-CRAFT RPG</h1>
                <div className="Editor">
                    <form>
                        Komu nadać przedmiot: {' '}
                        <input type="text" value={player} onChange={this.handlePlayerChange}/>
                        <br />
                        <br />
                        Wybierz Typ Przedmiotu: {' '}
                        <select onChange={this.handleItemChange}>
                            <option value={''}> </option>
                            <option value={1}>Broń</option>
                            <option value={2}>Zbroja</option>
                            <option value={3}>Akcesoria</option>
                        </select>
                        <hr/>

                        {selected === '1' || selected === '2' || selected === '3' ? <Item type={selected} player={player}/> : <br />}

                    </form>
                </div>
            </>
        );
    }
}
 
export default App;