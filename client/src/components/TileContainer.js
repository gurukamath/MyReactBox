import React, {useState} from 'react';
import Tile from './Tile.js';
import {getFunction, setFunction} from './Client.js';

function TileContainer(props){

    const [gotVal, setgotVal] = useState("");

    async function getValue() {
        const t = await getFunction();
        setgotVal(t);
    }

    const [setX, setSetX] = useState("");

    function handleChange(event){
        setSetX(event.target.value);
    }

    async function setValue() {
        const t = await setFunction(setX);
        setSetX(t);
    }


    return (
        <div className="tileContainer">
            <Tile title="Get the value of X" button_text="Get X" isReadOnly={true} placeHolder={gotVal} fun={getValue}/>
            <Tile title="Set the value of X" button_text="Set X" isReadOnly={false} setValue={setX} fun={setValue} inputChange={handleChange}/>
        </div>
    )
}

export default TileContainer;