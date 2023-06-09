import React from 'react'
import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { deleteUser, getAllUsers } from '../actions/userActions'
import Loader from '../components/Loader'
import Error from '../components/Error'
import Adminscreen from './Adminscreen'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Userslist() {

    const getallusersstate = useSelector(state =>state.getAllUsersReducer)

    const {users , loading , error} = getallusersstate

    const dispatch = useDispatch()


    useEffect(() => {

        dispatch(getAllUsers())
        
    }, [])

    return (
        <div className='row justify-content-center'>
            <div className='col-md-10'>
            <Adminscreen/>
            {loading ? (<Loader/>) : (
                <>
                <h2>Users List</h2>
            <table className='table table-bordered table-dark table-responsive-sm '>

                <thead >
                    <tr>
                        <th>User Id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Delete</th>
                    </tr>
                </thead>

                <tbody>
                    
                    {error && (<Error error='Something went wrong'/>)}
                    {users && (users.map(user=>{
                        return <tr>
                            <td>{user._id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td> <i
                    className="fa fa-trash"
                    aria-hidden="true" onClick={()=>{dispatch(deleteUser(user._id))}}></i></td>
                        </tr>
                    }))}
                </tbody>

            </table>
                </>
            )}
            
            </div>
            
        </div>
    )
}
