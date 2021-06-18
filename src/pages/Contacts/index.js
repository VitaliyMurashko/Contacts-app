import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import Box from "@material-ui/core/Box";
import { useContacts } from "./useContacts";
import { ContactsTable } from "./ContactsTable/index";
import { ToggleDataViewMode } from './ToggleDataViewMode/index';
import { DATA_VIEW_MODES } from './constants';
import { useDataViewMode } from './useDataViewMode';


const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(4),
    },
    headContainer: {
      
    },
  })
);

export const Contacts = () => {
  const classes = useStyles();
  const contacts = useContacts();
  const [dataViewMode, setDataViewMode] = useDataViewMode();

  return (
    <Container className={classes.root}>
      <Grid container>
        <Grid item xs={12}>
          <Box display="flex" justifyContent="space-between" padding="10px">
            <Typography
              variant="h4"
              component="h1"
              className={classes.headContainer}
            >
              Contacts
            </Typography>
            <ToggleDataViewMode dataViewMode={dataViewMode} setDataViewMode={setDataViewMode}/>
          </Box>
        </Grid>
        <Grid item xs={12}>
          {(() => {
            if (contacts.isLoading) {
              return <CircularProgress />;
            }

            if (contacts.isError) {
              return <div>Error...</div>;
            }
            if (dataViewMode === DATA_VIEW_MODES.TABLE) {
              return <ContactsTable data={contacts.data} />;
            }
            if (dataViewMode === DATA_VIEW_MODES.GRID) {
              return "grid";
            }
            return null;
          })()}
        </Grid>
      </Grid>
    </Container>
  );
};
