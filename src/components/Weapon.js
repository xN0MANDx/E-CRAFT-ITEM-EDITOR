import React, { Component } from 'react';

class Weapon extends Component {

    state = {
        damageFrom: 1,
        damageTo: 5,
        material: 'AIR',
        commmand: '',
    }

    handleChangeMaterial = (e) => { this.setState({ material: e.target.value }) }

    handleChangeMaxDmg = (e) => {
        this.setState({ damageTo: e.target.value })
    }

    handleChangeMinDmg = (e) => {
        this.setState({ damageFrom: e.target.value })
    }

    render() { 

        const {damageFrom, damageTo, command} = this.state;

        return (  
            <>
                Broń
                <br />
                <br />
                Wybierz Materiał Przedmiotu: {' '}
                <select onChange={this.handleChangeMaterial}>
                    <option value={null}> </option>
                    <option value="DIAMOND_SWORD">Diamentowy Miecz</option>
                    <option value="DIAMOND_AXE">Diamentowa Siekiera</option>
                    <option value="DIAMOND_PICKAXE">Diamentowy Kilof</option>
                    <option value="DIAMOND_SHOVEL">Diamentowa Łopata aka Włócznia</option>
                    <option value="STONE_SWORD">Kamienny Miecz</option>
                    <option value="STONE_AXE">Kamienna Siekiera</option>
                    <option value="STONE_PICKAXE">Kamienny Kilof</option>
                    <option value="STONE_SHOVEL">Kamienna Łopata aka Włócznia</option>
                    <option value="WOOD_SWORD">Drewniany Miecz</option>
                    <option value="WOOD_AXE">Drewniana Siekiera</option>
                    <option value="WOOD_PICKAXE">Drewniany Kilof</option>
                    <option value="WOOD_SHOVEL">Drewniana Łopata aka Włócznia</option>
                    <option value="IRON_SWORD">Żelazny Miecz</option>
                    <option value="IRON_AXE">Żelazna Siekiera</option>
                    <option value="IRON_PICKAXE">Żelazny Kilof</option>
                    <option value="IRON_SHOVEL">Żelazna Łopata aka Włócznia</option>
                    <option value="GOLD_SWORD">Złoty Miecz</option>
                    <option value="GOLD_AXE">Złota Siekiera</option>
                    <option value="GOLD_PICKAXE">Złoty Kilof</option>
                    <option value="GOLD_SHOVEL">Złota Łopata aka Włócznia</option>
                    <option value="BLAZE_ROD">Różdżka Blaze'a</option>
                    <option value="STICK">Patyk aka Dzida</option>
                </select>
                <br />
                <br />
                Wartość Ataku: {' '}
                <input type="number" value={damageFrom} onChange={this.handleChangeMinDmg}/>
                {' - '}
                <input type="number" value={damageTo} onChange={this.handleChangeMaxDmg}/>

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
        const { damageFrom, damageTo, material } = this.state;

        const lineSpace = '&8&m                          ';
        const lore = [];

        let command = 'give ' + player + ' ' + material + ' 1 ';
        command += 'name:' + name.split(' ').join('_') + ' lore:';

        lore.push(lineSpace);
        if (reqLevel !== '')
            lore.push('&7Wymagany Poziom: &c'+reqLevel);

        lore.push('&7Wartosc Ataku: &3'+damageFrom+' - '+damageTo);

        if (worth)
            lore.push('&7Wartosc: &a'+worth+"$");

        lore.push('&7Typ: &6Bron');

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

            line = line.split(' ').join('_');
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
 
export default Weapon;