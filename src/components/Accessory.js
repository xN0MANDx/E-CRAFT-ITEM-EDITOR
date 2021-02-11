import React, { Component } from 'react';

class Accessory extends Component {

    state = {
        type: '',
        time: 0,
        material: 'AIR',
        command: '',
    }

    handleChangeMaterial = (e) => { this.setState({ material: e.target.value }) }

    handleChangeAccessoryType = (e) => {
        const type = e.target.value;
        let accessory = null; 

        if (type === '351:0') {
            accessory = 'Pas';
        } else if (type === 'NETHER_WART') {
            accessory = 'Kolczyki';
        } else if (type === 'STRING') {
            accessory = 'Naszyjnik';
        } else if (type === 'SPIDER_EYE_FERMENTED') {
            accessory = 'Pierscien';
        }

        this.setState({
            material: type,
            type: accessory
        })
    }

    handleChangeTime = (e) => {
        this.setState({ time: e.target.value })
    }

    render() {
        
        const {time, type, command} = this.state;

        return (  
            <>
                Akcesorium
                <br />
                <br />
                Wybierz Materiał Przedmiotu: {' '}
                <select onChange={this.handleChangeAccessoryType}>
                    <option value={null}> </option>
                    <option value="351:0">Pas</option>
                    <option value="NETHER_WART">Kolczyki</option>
                    <option value="STRING">Naszyjnik</option>
                    <option value="SPIDER_EYE_FERMENTED">Pierścień</option>
                </select>
                {type === 'Pierscien' ?
                    <>
                        <br />
                        <br />
                        Wybierz czas trwania: (0 = brak limitu) {' '}
                        <input type="number" onChange={this.handleChangeTime} value={time}/>
                    </>
                :null}

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
        const { type, time, material } = this.state;

        const lineSpace = '&8&m                          ';
        const lore = [];

        let command = 'give ' + player + ' ' + material + ' 1 ';
        command += 'name:' + name.replaceAll(' ', '_') + ' lore:';

        lore.push(lineSpace);
        if (reqLevel !== '')
            lore.push('&7Wymagany Poziom: &c'+reqLevel);

        if (time) {
            lore.push('&7Pozostaly czas: &7'+time+' minut');
        }

        if (worth)
            lore.push('&7Wartosc: &a'+worth+"$");

        lore.push('&7Typ: &6'+type)

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

export default Accessory;