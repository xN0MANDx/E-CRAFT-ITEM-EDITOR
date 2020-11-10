import React, { Component } from 'react';

import Accessory from './Accessory';
import Weapon from './Weapon';
import Armor from './Armor';

class Item extends Component {

    state = {
        name: 'My Item',
        reqLevel: "",
        bonuses: [],
        stones: "0",
        bons: null,
        worth: "",
    }

    componentDidMount() {
        fetch('data/bonuses.json', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache',
            }
        })
        .then(response => response.json())
        .then(result => this.setState({ bons: result }))
    }

    handleChangeName = (e) => { this.setState({ name: e.target.value }) }
    handleChangeLevel = (e) => { this.setState({ reqLevel: e.target.value }) }
    handleChangeWorth = (e) => { this.setState({ worth: e.target.value }) }

    handleChangeStones = (e) => { this.setState({ stones: e.target.value }) }

    // Bonusy

    handleBonusAdd = () => {
        let bonuses = this.state.bonuses;
        if (bonuses.length === 4) return;
        bonuses.push({
            type: '',
            value: 0
        })
        this.setState({ bonuses: bonuses })
    }
    
    handleBonusRemove = () => {
        let bonuses = this.state.bonuses;
        if (bonuses.length === 0) return;
        bonuses.pop();
        this.setState({ bonuses: bonuses })
    }

    handleEditBonus = (value, id, data) => {
        let newBonuses = this.state.bonuses;
        if (data === 1) {
            newBonuses[id].type = value;
        } else {
            newBonuses[id].value = value;
        }
        this.setState({ bonuses: newBonuses })
    }



    render() { 

        const {bonuses, stones, reqLevel, name, bons, worth} = this.state;
        const {type} = this.props;

        const bonsMap = bons !== null ? bonuses.map((bonus, id) => {
            return (
                <div key={id}>
                    <hr/>
                    » Bonus {id}
                    <br />
                    Typ: {' '}
                    <select onChange={(e) => this.handleEditBonus(e.target.value, id, 1)}>
                        <option value={null}> </option>
                        {bons.all.map((bon, id) => <option key={id} value={id}>{bon}</option> )}
                    </select>
                    <br />
                    Wartość: <input type="number" value={bonuses[id].value} onChange={(e) => this.handleEditBonus(e.target.value, id, 2)}/>
                </div> 
            )
        }) : null

        return (
            <>

                Podaj Nazwe Przedmiotu: {' '}
                <input type="text" value={name} onChange={this.handleChangeName}/>
                <br />
                <br />
                Podaj Wymagany Poziom: {' '}
                <input type="number" value={reqLevel} onChange={this.handleChangeLevel}/>
                <br />
                <br />
                Wartość Przedmiotu: {' '}
                <input type="number" value={worth} onChange={this.handleChangeWorth}/> $
                <br />
                <br />

                Bonusy Wbudowane
                <div className="bonuses">
                    <input type="button" value="Dodaj Bonus" onClick={this.handleBonusAdd}/>
                    <input type="button" value="Usuń Bonus" onClick={this.handleBonusRemove}/>
                    <br />
                    {bonsMap}
                </div>

                <br />

                Kamienie Dusz
                <div className="stones">
                    Ilość wolnych slotów: <input type="number" value={stones} onChange={this.handleChangeStones}/>
                </div>

                <br/>
                <br/>

                {type === '1' ? <Weapon parent={this.state} player={this.props.player} /> 
                : type === '2' ? <Armor parent={this.state} player={this.props.player} /> 
                : type === '3' ? <Accessory parent={this.state} player={this.props.player} />
                : null}
            </>
        );
    }
}
 
export default Item;