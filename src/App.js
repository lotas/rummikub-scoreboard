import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';

import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';

import ActionCached from 'material-ui/svg-icons/action/cached';
import RaisedButton from 'material-ui/RaisedButton';

import NewGameHelp from './NewGameHelp';
import PlayersList from './PlayersList';
import ScoringTable from './ScoringTable';
import TilesSelector from './TilesSelector';

import AppBar from 'material-ui/AppBar';

import {get, set} from './storage.js';
const STATE_KEY = 'rmzhlr';

import { next, updateScore } from './utils';


const initialState = {
    players: [],
    current: null,
    score: {},
    open: false,
    tiles: [],
    openMenu: false
  };

class App extends Component {

  constructor(props) {
    super(props);

    const savedState = get(STATE_KEY);

    this.state = Object.assign({}, initialState, savedState);
  }

  setState(state) {
    super.setState(state);
    set(STATE_KEY, state);

    console.debug(this.state);
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
      next(this.state.current, this.state.players),
      true
    );
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

  handleClose() {
    this.setState({
      ...this.state,
      open: false,
      tiles: []
    })
  }

  setTiles(tiles) {
    this.setState({
      ...this.state,
      tiles: tiles
    })
  }

  toggleMenu() {
    this.setState({
      ...this.state,
      openMenu: !this.state.openMenu
    })
  }

  newGame() {
    this.state = initialState;
    this.setState(initialState)
  }

  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <AppBar
            title="Rummikub scores"
            onLeftIconButtonTouchTap={this.toggleMenu.bind(this)}
            iconElementRight={<FlatButton label="Next" onClick={this.switchToNext.bind(this)} />}
           />
          <Drawer width={280} openSecondary={false} open={this.state.openMenu} >
            <AppBar title="Settings" onLeftIconButtonTouchTap={this.toggleMenu.bind(this)} />
             <PlayersList
              players={this.state.players}
              addPlayer={this.addPlayer.bind(this)}
              removePlayer={this.removePlayer.bind(this)}
              current={this.state.current}
              setCurrent={this.setCurrent.bind(this)}
              />
              <Divider />
              <RaisedButton
                label="Start playing"
                labelPosition="after"
                primary={true}

                style={{margin: 20}}
                onTouchTap={this.toggleMenu.bind(this)}
              />
              <Divider/>
              <RaisedButton
                label="Reset"
                labelPosition="after"
                primary={false}
                icon={<ActionCached />}
                style={{marginTop: 20}}
                onTouchTap={this.newGame.bind(this)}
              />
          </Drawer>
          <div className="App-main">
          {this.state.players && this.state.players.length ?
              <ScoringTable
                players={this.state.players}
                score={this.state.score}
                current={this.state.current}
                setCurrent={this.setCurrent.bind(this)}
                removePlayer={this.removePlayer.bind(this)}
                />
                :
                <NewGameHelp
                  toggleMenu={this.toggleMenu.bind(this)}
                  />
            }
          </div>
          {this.state.open ? <TilesSelector
                  current={this.state.current}
                  tiles={this.state.tempTiles}
                  setTiles={this.setTiles.bind(this)}
                  handleClose={this.handleClose.bind(this)}
                  saveClose={this.saveClose.bind(this)}
                /> : ''}
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
