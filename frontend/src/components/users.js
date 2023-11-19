import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container} from 'react-bootstrap'
import { fetchUsers } from '../actions/userActions'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

function UsersScreen() {

    const dispatch = useDispatch()
    const listUsers = useSelector(state => state.listUser)
    const { error, loading, users } = listUsers

    useEffect(() => {
        dispatch(fetchUsers())
    }, [dispatch])

    return (
        <Container >

            <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell><h5>User</h5></TableCell>
            <TableCell align="left"><h5>name</h5></TableCell>
            <TableCell align="left"><h5>username</h5></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow
              key={user.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <p>{user.name}</p>
              </TableCell>
              <TableCell align="left"><p>{user.username}</p></TableCell>
              <TableCell align="left"><p>{user.email}</p></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        

</Container>
     )     }

export default UsersScreen
