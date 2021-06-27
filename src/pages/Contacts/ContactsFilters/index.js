import { memo, useCallback } from "react";
import PropTypes from "prop-types";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import ClearIcon from "@material-ui/icons/Clear";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { NATIONALITIES_HUMAN_NAME } from "../../../constants/nationality";

const useFieldGenderStyles = makeStyles((theme) =>
  createStyles({
    fieldGender: {
      minWidth: "120px",
    },
    outlined: {
      paddingBottom: "11px",
      paddingTop: "10px",
    },
  })
);

const useFieldNatiolnalityStyles = makeStyles((theme) =>
  createStyles({
    fieldGender: {
      minWidth: "120px",
    },
    outlined: {
      paddingBottom: "11px",
      paddingTop: "10px",
    },
  })
);
const FieldFullname = memo(({ value, onChange }) => {
  return (
    <TextField
      label="Fullname"
      name="fullname"
      variant="outlined"
      size="small"
      value={value}
      onChange={onChange}
      style={{ margin: "0 20px 0 0" }}
    />
  );
})
const FieldGender = memo(({ value, onChange }) => {
  const classes = useFieldGenderStyles();
  return (
    <FormControl variant="outlined" className={classes.fieldGender}>
      <InputLabel id="gender">Gender</InputLabel>
      <Select
        style={{ margin: "0 20px 0 0" }}
        labelId="gender"
        id="demo-simple-select-outlined"
        defaultValue=""
        value={value}
        onChange={onChange}
        classes={{
          outlined: classes.outlined,
        }}
        label="Gender"
        name="gender"
      >
        <MenuItem value="all">
          <em>All</em>
        </MenuItem>
        <MenuItem value="male">Male</MenuItem>
        <MenuItem value="female">Female</MenuItem>
      </Select>
    </FormControl>
  );
});

const FieldNatiolnality = memo(({ value, onChange }) => {
  const classes = useFieldNatiolnalityStyles();
  return (
    <FormControl variant="outlined" className={classes.fieldNationality}>
      <InputLabel id="nationality">Nationality</InputLabel>
      <Select
        labelId="nationality"
        id="demo-simple-select-outlined"
        defaultValue=""
        value={ value }
        onChange={ onChange }
        classes={{
          outlined: classes.outlined,
          select: classes.marginInput,
        }}
        label="Nationality"
        name="nationality"
      >
        <MenuItem value="all">
          <em>All</em>
        </MenuItem>
        {Object.entries(NATIONALITIES_HUMAN_NAME).map(([key, value]) => (
          <MenuItem value={key} key={key}>
            {value}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
});

export const ContactsFilters = memo(
  ({ filters, updateFilter, clearFilters }) => {

    const handleChangeFilter = useCallback(
      (event) => {
        updateFilter(event.target.name, event.target.value);
      },
      [updateFilter]
    );

    return (
      <Box display="flex" justifyContent="space-between" marginBottom="10px">
        <Box display="flex">
          <FieldFullname value={filters.fullname} onChange={handleChangeFilter}/>
          <FieldGender value={filters.gender} onChange={handleChangeFilter} />
          <FieldNatiolnality value={filters.nationality} onChange={handleChangeFilter}/>
        </Box>
        <Button
          style={{ color: "#f44336" }}
          startIcon={<ClearIcon />}
          size="small"
          onClick={clearFilters}
          title="очистка фильтров"
        >
          clear
        </Button>
      </Box>
    );
  }
);

ContactsFilters.propTypes = {
  filters: PropTypes.object.isRequired,
  updateFilter: PropTypes.func.isRequired,
  clearFilters: PropTypes.func.isRequired,
};
