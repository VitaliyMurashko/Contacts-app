import React from 'react';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { CopyToClipboardText } from '../../../componets/CopyToClipboardText/index';
import { NATIONALITIES_HUMAN_NAME } from '../../../constants/nationality';

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });  

export const ContactsTable = ({data}) => {
    const classes = useStyles();
    return (
    <TableContainer component={Paper} data-testid="contacts-table-container">
      <Table className={classes.table} size="small" aria-label="contacts table">
        <TableHead>
          <TableRow>
            <TableCell>Avatar</TableCell>
            <TableCell >Full name</TableCell>
            <TableCell >Birthday</TableCell>
            <TableCell >Email</TableCell>
            <TableCell >Phone</TableCell>
            <TableCell >Location</TableCell>
            <TableCell >Nationality</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((contact) => (
            <TableRow key={contact.login.uuid}>
              <TableCell component="th" scope="row">
              <Avatar alt={contact.name.first} src={contact.picture.thumbnail} />
              </TableCell>
              <TableCell>{contact.name.title} {contact.name.first} {contact.name.last}</TableCell>
              <TableCell>
                  <Typography>{format(parseISO(contact.dob.date), 'MM/dd/yyyy')}</Typography>
                  <Typography>{contact.dob.age} years</Typography>
                </TableCell>
              <TableCell><CopyToClipboardText text ={contact.phone}></CopyToClipboardText></TableCell>
              <TableCell><CopyToClipboardText text ={contact.email}></CopyToClipboardText></TableCell>
              <TableCell>
                <Typography>{contact.location.country}</Typography>
                <Typography>{contact.location.city}, {contact.location.street.name} {contact.location.street.number}</Typography>
                
              </TableCell>
              <TableCell>{NATIONALITIES_HUMAN_NAME[contact.nat]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    )
}