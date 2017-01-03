import React, { Component } from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import Paper from 'material-ui/Paper';


// import './ScoringTable.css';

import {
  deepPurple800,
  pink700,
  green800,
  blue800,

  grey300
} from 'material-ui/styles/colors';

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
        const colors = [deepPurple800, pink700, green800, blue800];
        const tiles = [1,2,3,4,5,6,7,8,9,10,11,12,13,'J'];
        const style = {
            height: 60,
            width: 34,
            margin: 8,
            padding: '20px 4px',
            textAlign: 'center',
            display: 'inline-block',
            fontSize: 20
        };

        return (
          <div className="TilesSelector">
            {
                colors.map(color => {
                    return tiles.map(tile => {
                        let styleC = {...style, color: color}

                        if (this.getSelectedState(color, tile)) {
                            styleC.backgroundColor = grey300;
                        }
                        return (
                            <Paper zDepth={1} style={styleC} onTouchTap={() => this.setSelectedState(color, tile)}>
                                {tile}
                            </Paper>
                        );
                    })
                })
            }

          </div>
        )
    }
}

export default TilesSelector;