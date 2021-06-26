import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import { CopyToClipboardText } from '../../../componets/CopyToClipboardText/index';


const useStyles = makeStyles({
    root: {
      maxWidth: 275,
      minWidth:275,
      marginBottom:20
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
    date: {
        fontSize: 12,  
    },
    avatar: {
        width:"90px",
        height:"90px"
    },
    headCard: {
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-around"
    },
    cardContainer:{
        display:"grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        gridGap:"20px",
        alignItems: "stretch",
    }
  });

export const ContactsCard = ({ data }) => {
    const classes = useStyles();

    return (
        <div className={classes.cardContainer}>
        {data.map((contact) => (
        <Card className={classes.root} variant="outlined" key={contact.login.uuid}>
            <CardContent className={classes.headCard}>
              <div>  
                <Avatar alt={contact.name.first} src={contact.picture.medium} className={classes.avatar}/>
              </div> 
              <div>
              <Typography className={classes.title} gutterBottom>
              {contact.name.title} {contact.name.first} {contact.name.last}
              </Typography>
              <Typography  color="textSecondary">
              {contact.dob.age} years
              </Typography>
              <Typography color="textSecondary" className={classes.date}>
              {format(parseISO(contact.dob.date), 'MM/dd/yyyy')}
              </Typography>
              </div> 
            </CardContent>
            <CardContent>  
              <Typography align="left" color="textSecondary">address:</Typography>
              <Typography className={classes.pos}>
              {contact.location.country}, {contact.location.city}, {contact.location.street.name} {contact.location.street.number}
              </Typography>  
              <Typography  align="left" color="textSecondary">phone: </Typography> 
              <CopyToClipboardText text ={contact.phone}/>
              <br/>
              <Typography  align="left" color="textSecondary">email: </Typography> 
              <CopyToClipboardText text ={contact.email}/>
            </CardContent>
        </Card>
        ))}
        </div> 
    )
}