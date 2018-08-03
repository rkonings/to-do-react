import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CoreTable from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import Moment from 'react-moment';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import FlipMove from 'react-flip-move';

const styles = theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing.unit * 3,
    },
    table: {
      minWidth: 1020,
    },
    tableWrapper: {
      overflowX: 'auto',
    },
  });
  
  class Table extends React.Component {
    constructor(props) {
      super(props);      
      this.state = {
        order: 'desc',
        orderBy: 'createdAt',
        selected: [],
        page: 0,
        rowsPerPage: 100,
        ...props
      };
    }
    getSorting(order, orderBy) {
        return order === 'desc'
            ? (a, b) => (b[orderBy] < a[orderBy] ? -1 : 1)
            : (a, b) => (a[orderBy] < b[orderBy] ? -1 : 1);
    }

    componentWillReceiveProps(props){
      this.setState({
          ...this.state,
          ...props
      });
    }
  
    handleRequestSort = (event, property) => {
      const orderBy = property;
      let order = 'desc';
  
      if (this.state.orderBy === property && this.state.order === 'desc') {
        order = 'asc';
      }
      this.setState({ order, orderBy });
    };
  
    handleSelectAllClick = (event, checked) => {
      if (checked) {
        this.setState(state => ({ selected: this.state.data.map(n => n.id) }));
        return;
      }
      this.setState({ selected: [] });
    };

  
    handleClick = (event, id) => {
      const { selected } = this.state;
      const selectedIndex = selected.indexOf(id);
      let newSelected = [];
  
      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, id);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1),
        );
      }
  
      this.setState({ selected: newSelected });
    };
  
    handleChangePage = (event, page) => {
      this.setState({ page });
    };
  
    handleChangeRowsPerPage = event => {
      this.setState({ rowsPerPage: event.target.value });
    };
  
    isSelected = id => this.state.selected.indexOf(id) !== -1;
  
    render() {
      const {  classes } = this.props;

      const { data, order, orderBy, rowsPerPage, page } = this.state;
      const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
      return (
        <Paper className={classes.root}>
          <div className={classes.tableWrapper}>
            <CoreTable className={classes.table} aria-labelledby="tableTitle">
              <TableBody>
                {data
                  .sort(this.getSorting(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map(n => {
                    const isSelected = this.isSelected(n.id);
                    return (
                      <TableRow
                        //hover
                        //onClick={event => this.handleClick(event, n.id)}
                        role="checkbox"
                        aria-checked={isSelected}
                        tabIndex={-1}
                        key={n.id}
                        selected={isSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox checked={isSelected} onClick={event => this.handleClick(event, n.id)} />
                        </TableCell>
                        <TableCell onClick={(event) => this.props.removeHandler(event,n.id)} padding="none" component="th" scope="row">
                          <IconButton  className={classes.button} aria-label="Delete">
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                        <TableCell onClick={event => this.props.handleClickTableCell(event, n.id)} component="th" scope="row" padding="none">
                          {n.title}
                        </TableCell>
                        <TableCell><Moment format="DD/MM/YYYY" unix>{n.dueDate}</Moment></TableCell>
                        <TableCell><Moment format="YYYY/MM/DD HH:mm" unix>{n.createdAt}</Moment></TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 49 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
                
              </TableBody>
            </CoreTable>
          </div>
        </Paper>
      );
    }
  }
  
  Table.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(Table);