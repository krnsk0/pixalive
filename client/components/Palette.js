import React from 'react';

class Palette extends React.Component {

    render () {
        return (

            <div>
                <h3>Palette</h3>
                <div className="tool-editors">
                    <button id="create-palette-color" type="button"></button>
                    <button id="edit-palette-color" type="button"></button>
                </div>
                <div className="colors-list">
                    <div className="colors"></div>
                </div>
            </div>
        )
    }
}

export default Palette;
