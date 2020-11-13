import React from 'react'
import './Song.css';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

export default function Song({song}) {
    return (
      <TableRow>
        <TableCell component="th" scope="row">
            {song.title}
        </TableCell>
        <TableCell align="left">{song.album}</TableCell>
        <TableCell align="left">LIKE</TableCell>
        <TableCell align="left">{song.duration}</TableCell>
      </TableRow>
    )
}
