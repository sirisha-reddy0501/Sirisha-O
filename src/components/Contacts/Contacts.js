// src/components/Contacts/Contacts.js

import React, { useContext, useState } from 'react';
import { Snackbar, IconButton, SnackbarContent } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import emailjs from 'emailjs-com';
import isEmail from 'validator/lib/isEmail';
import { makeStyles } from '@material-ui/core/styles';
import {
    FaLinkedinIn,
    FaGithub,
} from 'react-icons/fa';
import { AiOutlineSend, AiOutlineCheckCircle } from 'react-icons/ai';
import { FiPhone, FiAtSign } from 'react-icons/fi';
import { HiOutlineLocationMarker, HiOutlineMail } from 'react-icons/hi';
import { SiLeetcode } from 'react-icons/si';

import { ThemeContext } from '../../contexts/ThemeContext';
import { socialsData } from '../../data/socialsData';
import { contactsData } from '../../data/contactsData';
import './Contacts.css';

function Contacts() {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(false);
    const [errMsg, setErrMsg] = useState('');

    const { theme } = useContext(ThemeContext);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setOpen(false);
    };

    const useStyles = makeStyles(() => ({
        input: {
            border: `4px solid ${theme.primary80}`,
            backgroundColor: `${theme.secondary}`,
            color: `${theme.tertiary}`,
            fontFamily: 'var(--primaryFont)',
            fontWeight: 500,
            '&:focus': { border: `4px solid ${theme.primary600}` },
        },
        message: {
            border: `4px solid ${theme.primary80}`,
            backgroundColor: `${theme.secondary}`,
            color: `${theme.tertiary}`,
            fontFamily: 'var(--primaryFont)',
            fontWeight: 500,
            '&:focus': { border: `4px solid ${theme.primary600}` },
        },
        label: {
            backgroundColor: `${theme.secondary}`,
            color: `${theme.primary}`,
            fontFamily: 'var(--primaryFont)',
            fontWeight: 600,
            fontSize: '0.9rem',
            padding: '0 5px',
            transform: 'translate(25px,50%)',
            display: 'inline-flex',
        },
        socialIcon: {
            width: '45px',
            height: '45px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '21px',
            backgroundColor: theme.primary,
            color: theme.secondary,
            '&:hover': {
                transform: 'scale(1.1)',
                backgroundColor: theme.tertiary,
            },
        },
        detailsIcon: {
            backgroundColor: theme.primary,
            color: theme.secondary,
            borderRadius: '50%',
            width: '45px',
            height: '45px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '23px',
            '&:hover': {
                transform: 'scale(1.1)',
                backgroundColor: theme.tertiary,
            },
        },
        submitBtn: {
            backgroundColor: theme.primary,
            color: theme.secondary,
            '&:hover': {
                transform: 'scale(1.08)',
                backgroundColor: theme.tertiary,
            },
        },
    }));

    const classes = useStyles();

    const handleContactForm = (e) => {
        e.preventDefault();

        if (name && email && message) {
            if (isEmail(email)) {
                const templateParams = {
                    from_name: name,
                    from_email: email,
                    message: message,
                };

                emailjs.send(
                    contactsData.serviceID,
                    contactsData.templateID,
                    templateParams,
                    contactsData.userID
                ).then(() => {
                    setSuccess(true);
                    setErrMsg('');
                    setName('');
                    setEmail('');
                    setMessage('');
                }).catch((error) => {
                    setErrMsg('Something went wrong. Try again later.');
                    setOpen(true);
                    console.error(error);
                });

            } else {
                setErrMsg('Invalid email');
                setOpen(true);
            }
        } else {
            setErrMsg('Enter all the fields');
            setOpen(true);
        }
    };

    return (
        <div className='contacts' id='contacts' style={{ backgroundColor: theme.secondary }}>
            <div className='contacts--container'>
                <h1 style={{ color: theme.primary }}>Contacts</h1>
                <div className='contacts-body'>
                    <div className='contacts-form'>
                        <form onSubmit={handleContactForm}>
                            <div className='input-container'>
                                <label htmlFor='Name' className={classes.label}>Name</label>
                                <input
                                    placeholder='Enter your Name'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    type='text'
                                    name='Name'
                                    className={`form-input ${classes.input}`}
                                />
                            </div>
                            <div className='input-container'>
                                <label htmlFor='Email' className={classes.label}>Email</label>
                                <input
                                    placeholder='Enter your Email Address'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    type='email'
                                    name='Email'
                                    className={`form-input ${classes.input}`}
                                />
                            </div>
                            <div className='input-container'>
                                <label htmlFor='Message' className={classes.label}>Message</label>
                                <textarea
                                    placeholder='Type your message....'
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    name='Message'
                                    className={`form-message ${classes.message}`}
                                />
                            </div>
                            <div className='submit-btn'>
                                <button type='submit' className={classes.submitBtn}>
                                    <p>{!success ? 'Send' : 'Sent'}</p>
                                    <div className='submit-icon'>
                                        <AiOutlineSend
                                            className='send-icon'
                                            style={{
                                                animation: !success ? 'initial' : 'fly 0.8s linear both',
                                                position: success ? 'absolute' : 'initial',
                                            }}
                                        />
                                        <AiOutlineCheckCircle
                                            className='success-icon'
                                            style={{
                                                display: !success ? 'none' : 'inline-flex',
                                                opacity: !success ? '0' : '1',
                                            }}
                                        />
                                    </div>
                                </button>
                            </div>
                        </form>
                        <Snackbar
                            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                            open={open}
                            autoHideDuration={4000}
                            onClose={handleClose}
                        >
                            <SnackbarContent
                                action={
                                    <IconButton size='small' aria-label='close' color='inherit' onClick={handleClose}>
                                        <CloseIcon fontSize='small' />
                                    </IconButton>
                                }
                                style={{
                                    backgroundColor: theme.primary,
                                    color: theme.secondary,
                                    fontFamily: 'var(--primaryFont)',
                                }}
                                message={errMsg}
                            />
                        </Snackbar>
                    </div>

                    <div className='contacts-details'>
                        <a href={`mailto:${contactsData.email}`} className='personal-details'>
                            <div className={classes.detailsIcon}><FiAtSign /></div>
                            <p style={{ color: theme.tertiary }}>{contactsData.email}</p>
                        </a>
                        <a href={`tel:${contactsData.phone}`} className='personal-details'>
                            <div className={classes.detailsIcon}><FiPhone /></div>
                            <p style={{ color: theme.tertiary }}>{contactsData.phone}</p>
                        </a>
                        <div className='personal-details'>
                            <div className={classes.detailsIcon}><HiOutlineLocationMarker /></div>
                            <p style={{ color: theme.tertiary }}>{contactsData.address}</p>
                        </div>

                        <div className='socialmedia-icons'>
                            {socialsData.github && (
                                <a href={socialsData.github} target='_blank' rel='noreferrer' className={classes.socialIcon}>
                                    <FaGithub />
                                </a>
                            )}
                            {socialsData.linkedIn && (
                                <a href={socialsData.linkedIn} target='_blank' rel='noreferrer' className={classes.socialIcon}>
                                    <FaLinkedinIn />
                                </a>
                            )}
                            {socialsData.leetcode && (
                                <a href={socialsData.leetcode} target='_blank' rel='noreferrer' className={classes.socialIcon}>
                                    <SiLeetcode />
                                </a>
                            )}
                            {socialsData.gmail && (
                                <a href={`mailto:${socialsData.gmail}`} target='_blank' rel='noreferrer' className={classes.socialIcon}>
                                    <HiOutlineMail />
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <img src={theme.contactsimg} alt='contacts' className='contacts--img' />
        </div>
    );
}

export default Contacts;
