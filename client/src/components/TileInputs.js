import React from 'react';

function TileInputs(props) {

    const _method = props.contractMethod;

    return (
            <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon3">{"Input Name: " + props.input.name.toUpperCase()}</span>
                <input type="text" className="form-control" id="basic-url" placeholder={props.input.type} value={props.setValue} onChange={props.inputChange}/>
            </div>
        )

}

export default TileInputs;