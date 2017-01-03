import React, { Component } from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

import { toInt } from './utils';

import UserIcon from './UserIcon';

import './ScoringTable.css';

import {
  lightBlue50,
  indigo500
} from 'material-ui/styles/colors';

class ScoreTiles extends Component {

    render() {
        let i = 0;
        return (
            <span className="scoreTiles">
                {this.props.tiles.map(tile =>
                    <span key={i++} className={`tile-color${tile.color}`}>{tile.tile}</span>
                )}
            </span>
        )
    }
}

class ScoringTable extends Component {

    showCheckboxes = false;

    shouldComponentUpdate(nextProps, nextState) {
        return this.props.current !== nextProps.current ||
                this.props.players !== nextProps.players ||
                this.props.score !== nextProps.score;
    }

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
                            <ScoreTiles tiles={score[names[j]][i].tiles} />
                            <span className="turnScore">{score[names[j]][i].score}</span>
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

        const getTotalForPlayer = (name) => {
            const empty = {score: 0};
            return (score[name] || [empty])
                    .map(a => a.score)
                    .reduce((a, b) => toInt(a) + toInt(b));
        }

        const totalScores = this.props.players.map(player => getTotalForPlayer(player.name));

        return this.props.players.map(player => {
            const totalForUser = getTotalForPlayer(player.name);
            return (
                <TableHeaderColumn
                    style={this.getStyle(player)}
                    key={player.name}
                    onTouchTap={() => this.props.setCurrent(player, true)}
                >
                    <UserIcon player={player} total={totalForUser} totalScores={totalScores} />
                    {player.name}
                    <div className="totalScore">{totalForUser}</div>
                </TableHeaderColumn>
            )
        });

    }

    render() {
        return (
          <div className="ScoringTable">
            <Table selectable={false} border={true} fixedHeader={true}>
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