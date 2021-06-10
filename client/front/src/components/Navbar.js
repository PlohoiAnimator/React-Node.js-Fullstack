import React, { useContext } from 'react'
import { Context } from '..'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { NavLink } from 'react-router-dom'
import {Button, Container} from 'react-bootstrap'
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from '../utils/consts'
import {observer} from 'mobx-react-lite'
import {useHistory} from 'react-router-dom'

const NavBar = observer( () => {
    const {user} = useContext(Context)
    const history = useHistory()

    const logout = () => {
        user.setUser({})
        user.setIsAuth(false)
    }

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <NavLink style={{color: '#fff'}} to={SHOP_ROUTE}>ДорСтандартПроект</NavLink>
                        {user.isAuth ? <Nav className="ml-auto" style={{color:'white'}}>
                        <Button
                            variant={'outline-light'}
                            className={"ml-2"}
                            onClick={() => logout()}>
                            Выйти
                        </Button>
                        </Nav> :
                        <Nav className="ml-auto" style={{color:'white'}}>
                        <Button variant={'outline-light'} onClick={() => history.push(LOGIN_ROUTE)}>Авторизация</Button>
                    </Nav>
                }
            </Container>
        </Navbar>
    )
})
export default NavBar