import React, { Component } from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn, TableFooter} from 'material-ui/Table';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import Badge from 'material-ui/Badge';

import { toInt } from './utils';

import './ScoringTable.css';

import {
  lightBlue50,
  lightBlue800,
  blue300,
  indigo900, indigo500,
  orange200,
  deepOrange300,
  pink400,
  purple500,
} from 'material-ui/styles/colors';

class ScoreTiles extends Component {

    render() {
        let i = 0;
        return (
            <span className="score-tiles">
                {this.props.tiles.map(tile =>
                    <span key={i++} style={{color: tile.color}}>{tile.tile}</span>
                )}
            </span>
        )
    }
}

class ScoringTable extends Component {

    showCheckboxes = false;

    getStyle(player) {
        if (player && this.props.current &&  player.name === this.props.current.name) {
            return {
                fontSize: 18,
                color: indigo500,
                backgroundColor: lightBlue50
            }
        }
        return {
            color: player.color,
            fontSize: 18
        };
    }

    renderScores() {
        if (!this.props.score) {
            return '';
        }

        let names = this.props.players.map(a => a.name);
        let grid = [];

        const score = this.props.score;

        let maxItems = Math.max(...Object.values(score).map(a => a.length));

        for (let i=0; i<maxItems; i++) {
            let row = [];
            for (let j=0; j<names.length; j++) {
                if (score[names[j]] && score[names[j]][i]) {
                    row.push(<TableRowColumn key={`i:j`}>
                            <b>{score[names[j]][i].score}</b>
                            <ScoreTiles tiles={score[names[j]][i].tiles} />
                        </TableRowColumn>);
                } else {
                    row.push(<TableRowColumn key={`i:j`}>0</TableRowColumn>);
                }
            }
            grid.push(<TableRow  hoverable={true} key={i}>{row}</TableRow>);
        }

        return grid;
    }

    renderHeaders() {
        const score = this.props.score;
        console.log(this.props.players);

        const getTotalForPlayer = (name) => {
            const empty = {score: 0};
            return (score[name] || [empty])
                    .map(a => a.score)
                    .reduce((a, b) => toInt(a) + toInt(b));
        }

        return this.props.players.map(player => (
            <TableHeaderColumn
                style={this.getStyle(player)}
                key={player.name}
                onTouchTap={() => this.props.setCurrent(player, true)}
            >
                {player.name}
                <Badge primary={true} badgeContent={getTotalForPlayer(player.name)} />
            </TableHeaderColumn>
        ));

    }

    render() {
        if (!this.props.players || !this.props.players.length) {
            return (<p>Please start with adding some users</p>);
        }

        return (
          <div className="ScoringTable">
            <Table selectable={false} border={true}>
                <TableHeader
                    displaySelectAll={false}
                    adjustForCheckbox={false}
                    enableSelectAll={false}
                    >
                    <TableRow>
                        {this.renderHeaders()}
                    </TableRow>
                </TableHeader>
                <TableBody
                    showRowHover={true}
                    stripedRows={false}
                    displayRowCheckbox={false}
                    >
                    {this.renderScores()}
                </TableBody>
            </Table>
          </div>
        )
    }
}

export default ScoringTable;