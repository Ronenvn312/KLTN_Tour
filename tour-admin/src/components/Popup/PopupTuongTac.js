import React, { useEffect, useState } from 'react'
import clsx from "clsx"
import "./popupTuongTac.css"
import { motion } from "framer-motion"
import axios from 'axios'
import { parsePath } from 'react-router-dom'
import { Accordion } from 'react-bootstrap'

function PopupTuongTac(props) {

    return (props.trigger) ? (
        <div className='popuptt_container'>
            <motion.div animate={{ scale: 1 }} initial={{ scale: 0 }} className={clsx("popup-tt-inner", {
               "tuongTac": props.tuongTac
            })}>
                <button className='close-btn' onClick={() => props.setTrigger(!props.trigger)}>x</button>
                {props.children}
               
            </motion.div>
        </div>
    ) : ""
}

export default PopupTuongTac