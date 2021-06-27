import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
    },
  },
}));


export const PaginationRounded = ({page, setPage}) => {
    const classes = useStyles();

    const handleChange = (event, value) => {
        setPage(value);
      };

    return (
        <div className={classes.root}>
            <Pagination count={10} page={page} onChange={handleChange} variant="outlined" shape="rounded" />
        </div>
    )
}