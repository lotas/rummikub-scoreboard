import React, {Component} from 'react';

import Avatar from 'material-ui/Avatar';

import Dissatisfied from 'material-ui/svg-icons/social/sentiment-dissatisfied';
import Neutral from 'material-ui/svg-icons/social/sentiment-neutral';
import Satisfied from 'material-ui/svg-icons/social/sentiment-satisfied';


export default class UserIcon extends Component {
    renderIcon(score, allScores) {
        if (score === Math.max(...allScores)) {
            return <Satisfied  style={{color: '#FFF'}} />
        }
        if (score === Math.min(...allScores)) {
            return <Dissatisfied  style={{color: '#FFF'}} />
        }
        return <Neutral style={{color: '#FFF'}} />
    }

    render() {
        const player = this.props.player;

        return <Avatar
            size={30}
            style={{marginRight: 10}}
            backgroundColor={player.color}>
                {this.renderIcon(this.props.total, this.props.totalScores)}
            </Avatar>
        // return <Neutral style={{}} />
    }
}