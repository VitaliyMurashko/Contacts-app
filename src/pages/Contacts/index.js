import { useState, useCallback } from "react";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { ContactsFilters } from "./ContactsFilters";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import Box from "@material-ui/core/Box";
import { useContacts } from "./useContacts";
import { ContactsTable } from "./ContactsTable/index";
import { ContactsCard } from "./ContactsCard/index";
import { ToggleDataViewMode } from './ToggleDataViewMode/index';
import { DATA_VIEW_MODES } from './constants';
import { useDataViewMode } from './useDataViewMode';
import { PaginationRounded } from './Pagination/index'


const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(4),
      flexWrap:"wrap"
    },
    paginationContainer: {
      display:"flex",
      justifyContent:"center"
    }
  })
);

const FiltersDefaultValue = {
  fullname: "",
  gender: "all",
  nationality: "all",
};

const filterByFullName = ({first, last}, fullname) => 
  first?.toLowerCase().includes(fullname.toLowerCase()) || 
  last?.toLowerCase().includes(fullname.toLowerCase());

const filterByGender = (gender, filterGender) => {
  if(filterGender === "all"){
    return true
  }
  return gender === filterGender
};

const filterByNationality = (value, nationality) => {
  if(nationality === "all"){
    return true
  }
  return value === nationality
}


export const Contacts = () => {
  const classes = useStyles();
  const [page, setPage] = useState(1);
  const contacts = useContacts(page);
  const [dataViewMode, setDataViewMode] = useDataViewMode();
  const [filters, setFilters] = useState(FiltersDefaultValue);
  

  const updateFilter = useCallback((name, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]:value,
    }));
  }, []);

const filteredContacts = contacts.data
.filter(c => filterByFullName(c.name, filters.fullname))
.filter(c => filterByGender(c.gender, filters.gender))
.filter(c => filterByNationality(c.nat, filters.nationality));

const clearFilters = useCallback(() => {
  setFilters(FiltersDefaultValue)
}, []);

  return (
    <Container className={classes.root}>
      <Grid container>
        <Grid item xs={12}>
          <Box display="flex" justifyContent="space-between" padding="10px">
            <Typography
              variant="h4"
              component="h1"
            >
              Contacts
            </Typography>
            <ToggleDataViewMode dataViewMode={dataViewMode} setDataViewMode={setDataViewMode}/>
          </Box>
        </Grid>
        <Grid item xs={12} className={ classes.filterContainer } >
          <ContactsFilters filters={filters} updateFilter={updateFilter} clearFilters ={clearFilters}/>
        </Grid>
        <Grid item xs={12}>
        
        <Grid item xs={12}></Grid>  
          {(() => {
            if (contacts.isLoading) {
              return <CircularProgress data-testid="contacts-loader"/>;
            }

            if (contacts.isError) {
              return <div>Error...</div>;
            }
            if (dataViewMode === DATA_VIEW_MODES.TABLE) {
              return <ContactsTable data={filteredContacts} />;
            }
            if (dataViewMode === DATA_VIEW_MODES.GRID) {
              return <ContactsCard data={filteredContacts}/>;
            }
            return null;
          })()}
        </Grid>
        <Grid item xs={12} className={classes.paginationContainer}>
          <PaginationRounded page={page} setPage={setPage}/>
        </Grid>
      </Grid>
    </Container>
  );
};
