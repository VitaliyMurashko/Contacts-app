import PropTypes from 'prop-types'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Button from '@material-ui/core/Button';
import ClearIcon from '@material-ui/icons/Clear';
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { NATIONALITIES_HUMAN_NAME } from '../../../constants/nationality'

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(4),
    },
    filterContainer: {
      marginBottom: theme.spacing(2),
    },
    fieldGender: {
      minWidth: "120px",
    },
    fieldNationality: {
        minWidth: "140px",
      },
    outlined: {
      paddingBottom:"11px",
      paddingTop:"10px",
      
    },
    marginInput: {
        margin: "0 20px 0 0 !important"
    }
  })
);

export const ContactsFilters = ({ filters, updateFilter, clearFilters }) => {
    const classes = useStyles();

    const handleChangeFilter = (event) => {
        updateFilter(event.target.name, event.target.value)
      }
      
    return (
        <Box display="flex" justifyContent="space-between" marginBottom="10px">
            <Box display="flex" >
                <TextField label="Fullname" name="fullname" variant="outlined" 
                size="small" value={filters.fullname} onChange={handleChangeFilter} style={{margin:"0 20px 0 0"}}/>
                <FormControl variant="outlined" className={classes.fieldGender}>
                <InputLabel id="gender">Gender</InputLabel>
                    <Select
                    style={{margin:"0 20px 0 0"}}
                    labelId="gender"
                    id="demo-simple-select-outlined"
                    defaultValue=""
                    value={filters.gender}
                    onChange={handleChangeFilter}
                    classes={{
                        outlined: classes.outlined,
                    }}
                    label="Gender"
                    name ="gender"
                    >
                    <MenuItem value="all" >
                        <em>All</em>
                    </MenuItem>
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                    </Select>
                </FormControl>
                <FormControl variant="outlined" className={classes.fieldNationality}>
                <InputLabel id="nationality">Nationality</InputLabel>
                    <Select
                    labelId="nationality"
                    id="demo-simple-select-outlined"
                    defaultValue=""
                    value={filters.nationality}
                    onChange={handleChangeFilter}
                    classes={{
                        outlined: classes.outlined,
                        select: classes.marginInput
                    }}
                    label="Nationality"
                    name ="nationality"
                    >
                    <MenuItem value="all" >
                        <em>All</em> 
                    </MenuItem>
                    {Object.entries(NATIONALITIES_HUMAN_NAME).map(([key, value]) => <MenuItem value={key} key={key}>{value}</MenuItem>)}
                    </Select>
                </FormControl>
            </Box>
            <Button
                variant="outlined"
                startIcon={<ClearIcon />}
                size="small"
                onClick={clearFilters}
            >
                clear
            </Button>
          </Box>
    )
};

ContactsFilters.propTypes = {
    filters: PropTypes.object.isRequired,
    updateFilter: PropTypes.func.isRequired,
    clearFilters: PropTypes.func.isRequired

}