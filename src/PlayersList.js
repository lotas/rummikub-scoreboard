import React, { Component } from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';

import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

import './PlayersList.css';

import { shuffle } from './utils';


import {
  grey400,
  blue300,
  indigo900,
  orange200,
  deepOrange300,
  pink400,
  purple500,
} from 'material-ui/styles/colors';

var colors = shuffle([blue300,  indigo900,  orange200,  deepOrange300,  pink400,  purple500]);
const getNextColor = () => {
    let next = colors.shift();
    colors.push(next);
    return next;
}

const iconButtonElement = (
  <IconButton
    touch={true}
  >
    <MoreVertIcon color={grey400} />
  </IconButton>
);


class PlayersList extends Component {

    state = {
        name: ''
    }

    setNewName = (event) => {
        this.setState({
            name: event.target.value
        })
    }

    submit(e) {
        e.preventDefault();
        this.props.addPlayer(this.state.name, getNextColor());
        e.target.value = '';
        this.setState({name: ''});
        return false;
    }


    render() {
        return (
            <div className="PlayersList">
                <List>
                <Subheader>Players</Subheader>
                {this.props.players.map(player => (
                    <ListItem
                        key={player.name}
                        primaryText={player.name}
                        leftAvatar={
                            <Avatar backgroundColor={player.color}>{player.name.charAt(0).toUpperCase()}</Avatar>
                        }
                        rightIconButton={
                            <IconMenu iconButtonElement={iconButtonElement}>
                                <MenuItem onClick={() => this.props.remove(player)}>Delete</MenuItem>
                            </IconMenu>
                        }
                        onClick={() => this.props.setCurrent(player)}
                    />
                ))}
                </List>
                <Divider />
                <div className="PlayersList-add">
                    <form onSubmit={this.submit.bind(this)}>
                        <TextField
                            hintText="Player name"
                            id="name"
                            value={this.state.name}
                            onChange={this.setNewName} />
                        <RaisedButton type="submit"  label="Add" />
                    </form>
                </div>
            </div>
        )
    }
}

export default PlayersList;