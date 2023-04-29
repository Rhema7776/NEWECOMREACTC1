import React, { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { CgShoppingCart } from 'react-icons/cg';
import { Twirl as Hamburger } from 'hamburger-react';
import Navlocker from './Navlocker';
import { useStateContext } from '../lib/ContextApi';

export default function Navhead() {
    const [isOpen, setOpen] = useState(false)
    const {bagQuantity} = useStateContext()

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        }else {
            document.body.style.overflow = 'unset'
        }
    }, [isOpen])
  return (
    <div className='position-fixed top-0 w-100' style={{ zIndex: '10' }}>
        <Container className='d-flex align-items-center justify-content-between p-2' >
            <div className='d-flex align-items-center gap-3 gap-md-5' style={{zIndex: '10'}}>
                <Hamburger toggled={isOpen} toggle={setOpen} size={20}/>
                <NavLink className='fs-1 text-black align-self-center' to='/'>
                    ESTore
                </NavLink>
            </div>
            <div className='d-flex justify-content-center align-items-center gap-5'>
                <NavLink to='/search' className='text-dark text-decoration-underline'>
                    Search
                </NavLink>
                <div className='d-flex gap-3'>
                    <NavLink className='text-secondary'>LOG IN</NavLink>
                    <NavLink to='/cart'>
                        <div className='position-relative'>
                         <CgShoppingCart size='1.5rem' className='text-secondary'/>
                         <p className='position-absolute top-0 start-100 translate-middle'>
                            {bagQuantity > 0 ? bagQuantity: 0}
                         </p>
                        </div>
                        
                    </NavLink>
                </div>
            </div>
        </Container>
        {isOpen && <Navlocker/>}
    </div>
  )
}
