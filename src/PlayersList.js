import React, { Component } from 'react';

import TextField from 'material-ui/TextField';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';

import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui/svg-icons/action/delete';

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


class PlayersList extends Component {

    static propTypes = {
        players: React.PropTypes.array,
        addPlayer: React.PropTypes.func,
        removePlayer: React.PropTypes.func,
        current: React.PropTypes.object,
        setCurrent: React.PropTypes.func
    };

    state = {
        name: ''
    }

    shouldComponentUpdate(nextProps, nextState) {
        // only when players were changed or state was changed
        return this.props.players !== nextProps.players || this.state !== nextState;
    }

    setNewName = (event) => {
        this.setState({
            name: event.target.value
        })
    }

    submit(e) {
        e.preventDefault();
        if (this.state.name.trim() === "") {
            return false;
        }

        this.props.addPlayer(this.state.name.trim(), getNextColor());
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
                              <IconButton
                                    touch={true}
                                >
                                <DeleteIcon color={grey400} onTouchTap={() => this.props.removePlayer(player)} />
                            </IconButton>
                        }
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
                            onChange={this.setNewName}
                            style={{maxWidth: 180}}
                            />
                        <FloatingActionButton mini={true} type="submit">
                           <ContentAdd />
                        </FloatingActionButton>

                    </form>
                </div>
            </div>
        )
    }
}

export default PlayersList;