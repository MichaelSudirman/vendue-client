import React, { Component, Fragment } from "react";
import { withRouter } from 'react-router-dom'
// Actions
// Material UI core imports
import withStyles from "@material-ui/core/styles/withStyles";
import InputBase from '@material-ui/core/InputBase';
// Material UI icons imports
import SearchIcon from '@material-ui/icons/Search';

const styles = (theme) => ({
    ...theme.global,
    root: {
        flexGrow: 1,
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        /**
         * Fixed fade dependency that produces error
         */
        // backgroundColor: fade(theme.palette.common.white, 0.15),
        // '&:hover': {
        //     backgroundColor: fade(theme.palette.common.white, 0.25),
        // },
        backgroundColor: '#5C6BC0',
        '&:hover': {
            backgroundColor: '#6F7DC8'
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
})


class SearchBar extends Component {
    state = {
        name: ""
    }
    handleChange = e => this.setState({ [e.target.name]: e.target.value });
    handleSubmit = (e, history) => {
        e.preventDefault()
        if (this.state.name !== "")
            history.push(`/auction?name=${this.state.name}`)
    }

    render() {
        const { classes, history } = this.props
        const { name } = this.state
        return (
            <Fragment>
                <form autoComplete='off' onSubmit={e => this.handleSubmit(e, history)}>
                    <div className={classes.root}>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase
                                id="name"
                                name="name"
                                label="name"
                                placeholder="Search…"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                inputProps={{ 'aria-label': 'search' }}
                                onChange={this.handleChange}
                                value={name}
                            />
                        </div>
                    </div>
                </form>
            </Fragment>
        )
    }
}

export default withRouter(withStyles(styles)(SearchBar))