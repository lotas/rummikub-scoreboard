import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';

import './TileSelector.css';

class TilesRow extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        const keyCheck = `${nextProps.color}:`;
        // if some tiles were selected, we should update, okay
        return Object.keys(nextProps.selected).filter(a => a.substr(0, 2) === keyCheck).length > 0
    }

    render() {
        const tiles = [1,2,3,4,5,6,7,8,9,10,11,12,13,'J'];
        const {color, getSelectedState, onSelectClick} = this.props;

        return <div className="TilesRow">
                {tiles.map(tile => (
                    <div
                        key={`${color}:${tile}`}
                        className={`TileBlock tile-color${color} ${getSelectedState(color, tile) ? 'selected' : ''}`}
                        onMouseDownCapture={() => onSelectClick(color, tile)}>
                        {tile}
                    </div>
                ))}</div>;
    }
}

class TilesSelector extends Component {

    state = {
        selected: {}
    }

    getSelectedState(color, tile) {
        const key = `${color}:${tile}`;
        if (typeof this.state.selected[key] !== 'undefined') {
            return this.state.selected[key]
        }
        return false;
    }

    setSelectedState(color, tile) {
        const key = `${color}:${tile}`;
        let newState = true;
        if (this.getSelectedState(color, tile)) {
            newState = false;
        }

        const tilesSet = Object.assign({}, this.state.selected, {[key]: newState});

        this.setState({
            selected: tilesSet
        })

        this.props.setTiles(tilesSet);
    }

    render() {
        const setState = this.setSelectedState.bind(this);
        const getState = this.getSelectedState.bind(this);

        return (
            <Dialog
                style={{userSelect: 'none'}}
                open={true}
                modal={true}
                title={this.props.current ? ("Select tiles for " + this.props.current.name) : ''}
                onRequestClose={this.props.handleClose}
                autoScrollBodyContent={true}
                actions={[
                <FlatButton label="Cancel" primary={false} onTouchTap={() => this.props.handleClose()}/>,
                <FlatButton label="Save" primary={true} onTouchTap={() => this.props.saveClose()} />
                ]}
            >
            <div className="TilesSelector">
                <TilesRow color={1} getSelectedState={getState} onSelectClick={setState} selected={this.state.selected} />
                <TilesRow color={2} getSelectedState={getState} onSelectClick={setState} selected={this.state.selected} />
                <TilesRow color={3} getSelectedState={getState} onSelectClick={setState} selected={this.state.selected} />
                <TilesRow color={4} getSelectedState={getState} onSelectClick={setState} selected={this.state.selected} />
            </div>

          </Dialog>
        )
    }
}

export default TilesSelector;