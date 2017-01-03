import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';


import PlayersList from './PlayersList';
import ScoringTable from './ScoringTable';
import TilesSelector from './TilesSelector';

import AppBar from 'material-ui/AppBar';

import {get, set} from './storage.js';
const STATE_KEY = 'rmzhlr';

import { next, updateScore } from './utils';


class App extends Component {

  constructor(props) {
    super(props);

    const initialState = get(STATE_KEY);

    this.state = Object.assign({
      players: [],
      current: null,
      score: {},
      open: false,
      tiles: []
    }, initialState);
  }

  setState(state) {
    super.setState(state);
    set(STATE_KEY, state);

    console.log(this.state);
  }

  addPlayer(name, color) {
    this.setState({
      ...this.state,
      players: [].concat(...this.state.players, {name: name, color: color})
    });
  }

  removePlayer(player) {
    // TODO: remove from scores
    this.setState({
      ...this.state,
      players: this.state.players.filter(p => p !== player)
    });
  }

  setCurrent(player, isOpen) {
    this.setState({
      ...this.state,
      current: player,
      open: isOpen || false,
      tiles: []
    });
  }

  switchToNext() {
    this.setCurrent(
      next(this.state.current, this.state.players)
    );
  }

  handleClose() {
    this.setState({
      ...this.state,
      open: false,
      tiles: []
    })
  }

  saveClose() {
    this.setState({
      ...this.state,
      open: false,
      tiles: [],
      score: updateScore(this.state.current, this.state.tiles, this.state.score)
    })
  }

  setOpen(fl) {
    this.setState({
      ...this.state,
      open: fl
    })
  }


  setTiles(tiles) {
    this.setState({
      ...this.state,
      tiles: tiles
    })
  }

  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <AppBar
            title="Rummikub scores"
            iconElementRight={<FlatButton label="Next" onClick={this.switchToNext.bind(this)} />}
           />
          <div className="App-main">
            <PlayersList
              players={this.state.players}
              addPlayer={this.addPlayer.bind(this)}
              removePlayer={this.removePlayer.bind(this)}
              current={this.state.current}
              setCurrent={this.setCurrent.bind(this)}
              />
            <ScoringTable
              players={this.state.players}
              score={this.state.score}
              current={this.state.current}
              setCurrent={this.setCurrent.bind(this)}
              />
          </div>
          <Dialog
            open={this.state.open}
            modal={true}
            title={"Select tiles for " + this.state.current.name}
            onRequestClose={this.handleClose}
            actions={[
              <FlatButton label="Cancel" primary={false} onTouchTap={this.handleClose.bind(this)}/>,
              <FlatButton label="Save" primary={true} onTouchTap={this.saveClose.bind(this)} />
            ]}
          >
            <TilesSelector setTiles={this.setTiles.bind(this)} />
          </Dialog>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
