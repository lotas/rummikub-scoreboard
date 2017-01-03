import React, { Component } from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn, TableFooter} from 'material-ui/Table';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import Badge from 'material-ui/Badge';


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

class ScoringTable extends Component {

    showCheckboxes = false;

    getStyle(player) {
        if (player.name === this.props.current.name) {
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
                    row.push(<TableRowColumn key={`i:j`}>{score[names[j]][i]}</TableRowColumn>);
                } else {
                    row.push(<TableRowColumn key={`i:j`}>0</TableRowColumn>);
                }
            }
            grid.push(<TableRow key={i}>{row}</TableRow>);
        }

        return grid;
    }


    render() {
        if (!this.props.players) {
            return (<div />);
        }

        const score = this.props.score;

        const toInt = (val) => {
            let r = parseInt(val, 10);
            return isNaN(r) ? 0 : r;
        }
        const getTotalForPlayer = (name) => {
            return (score[name] || []).reduce((a, b) => toInt(a) + toInt(b));
        }

        return (
          <div className="ScoringTable">
            <Table selectable={false}>
                <TableHeader displaySelectAll={this.showCheckboxes} adjustForCheckboxes={this.showCheckboxes}>
                    <TableRow>
                {this.props.players.map(player => (
                    <TableHeaderColumn
                        style={this.getStyle(player)}
                        key={player.name}
                        onTouchTap={() => this.props.setCurrent(player, true)}
                    >
                        {player.name}
                        <Badge primary={true} badgeContent={getTotalForPlayer(player.name)} />

                        {/*<FloatingActionButton mini={true} secondary={true} style={{float: 'right'}}>
                            <ContentAdd onTouchTap={() => this.props.setCurrent(player, true)} />
                        </FloatingActionButton>*/}
                    </TableHeaderColumn>
                ))}
                    </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={this.showCheckboxes}>
                    {this.renderScores()}
                </TableBody>
            </Table>
          </div>
        )
    }
}

export default ScoringTable;