import React, { Component } from 'react';

class Armor extends Component {

    state = {
        protection: 1,
        material: 'AIR',
        command: '',
    }

    handleChangeMaterial = (e) => this.setState({ material: e.target.value })
    handleChangeProtection = (e) => this.setState({ protection: e.target.value })

    render() { 

        const {protection, command} = this.state;

        return (  
            <>
                Zbroja
                <br />
                <br />
                Wybierz Materiał Przedmiotu: {' '}
                <select onChange={this.handleChangeMaterial}>
                    <option value={null}> </option>
                    <option value="IRON_HELMET">Hełm</option>
                    <option value="IRON_CHESTPLATE">Napierśnik</option>
                    <option value="IRON_LEGGINGS">Spodnie</option>
                    <option value="IRON_BOOTS">Buty</option>
                    <option value="DIAMOND_HELMET">Specjalny Hełm</option>
                    <option value="DIAMOND_CHESTPLATE">Specjalny Napierśnik</option>
                    <option value="DIAMOND_LEGGINGS">Specjalne Spodnie</option>
                    <option value="DIAMOND_BOOTS">Specjalne Buty</option>
                </select>
                <br />
                <br />
                Pancerz: {' '}
                <input type="number" value={protection} onChange={this.handleChangeProtection}/>

                <hr />
                <span>
                    <p> Komenda do uzyskania przedmiotu: <input type="button" value="Generuj" onClick={this.handleCreateItem} /> </p>
                    <p> {command} </p>
                </span>
            </>
        );
    }


    handleCreateItem = () => {
        const { parent, player } = this.props;
        const { name, reqLevel, bonuses, stones, worth, bons } = parent;
        const { protection, material } = this.state;

        const lineSpace = '&8&m                                ';
        const lore = [];

        let command = 'give ' + player + ' ' + material + ' 1 ';
        command += 'name:' + name.replaceAll(' ', '_') + ' lore:';

        lore.push(lineSpace);
        if (reqLevel !== '')
            lore.push('&7Wymagany Poziom: &c'+reqLevel);

        lore.push('&7Pancerz: &3'+protection);

        if (worth)
            lore.push('&7Wartosc: &a'+worth+"$");

        lore.push('&7Typ: &6Zbroja');

        if (stones !== '0') {
            lore.push(lineSpace);
            lore.push('&7Kamienie Dusz:')
            for(let i=0; i<stones; i++) {
                lore.push(' &7- Wolny Slot');
            }
        }

        if (bonuses.length > 0) {
            lore.push(lineSpace);
            lore.push('&7Bonusy Wbudowane:');
            bonuses.forEach(bonus => {
                const value = parseInt(bonus.value);
                const unity = bons.unity.includes(bons.all[bonus.type]) ? '' : '%';
                if (value >= 0) {
                    lore.push(' &a- '+bons.all[bonus.type]+'+'+value+unity);
                } else {
                    lore.push(' &c- '+bons.all[bonus.type]+value+unity);
                }
            })
        }

        const finalLore = lore.map((line, id) => {

            line = line.replaceAll(' ', '_');
            if (id !== 0) line = '|'+line;

            return line;
        })

        finalLore.forEach(line => {
            command = command.concat(line);
        })
        command = command+' unbreaking:10';


        this.setState({ command: command })
    }

}
 
export default Armor;