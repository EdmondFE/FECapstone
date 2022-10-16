import React, { useRef, useState } from 'react';
import {Grow, Typography, Divider, Chip, TextField, Button } from '@material-ui/core';
import SimpleModal from '@material-ui/core/Modal';
import emailjs from 'emailjs-com';
import classNames from 'classnames';
import useStyles from './styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import EmailIcon from '@material-ui/icons/Email';
import FeedbackIcon from '@material-ui/icons/Feedback';
import { useFormContext } from 'react-hook-form';

const Modal = ({ isOpen, setIsOpen, showFeedback, setFeedback }) => {
  const {register, handleSubmit, watch, formState: { errors }} = useFormContext();
  const classes = useStyles();
  const formContext = useFormContext();
  const [emailState, setEmailState] = useState(false);
  const [nameState, setNameState] = useState(true);
  let body;
  if(isOpen === false && showFeedback === false) {
    formContext.setValue('name', '');
    formContext.setValue('email', '');
    formContext.setValue('feedback', '');
  }
  const inputChange = ()=>{ setEmailState(true); setNameState(false); alert('came here');};
  const sendEmail = (e) => {
      e.preventDefault();
      setIsOpen(false);
      setFeedback(false);
      alert('Feedback sent successfully! Wait for out support team to update you.');
      emailjs.sendForm('gmail', 'alan_ai', e.target, 'user_dhVImkgxaL27bxQ8pLPQ5')
        .then((result) => { console.log(result.text); }, (error) => { console.log(error.text); });
      formContext.setValue('name', '');
      formContext.setValue('email', '');
      formContext.setValue('feedback', '');
  };

  if (isOpen && showFeedback) {
    body = (
  
        <div className={classNames(classes.paper, 'modal')}>
          <Typography variant="h6">Something went wrong? Send us some feedback</Typography>
          <br />
          <form className={classes.form} onSubmit={sendEmail}>
            <TextField             
              name="name" 
              label="Your name" 
              variant="outlined"
              {...register('name', {required: true}) } 
              autoFocus={true}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
        
            />
            {errors.name && <span>Your name is required.</span>}
            <br />
            <TextField           
              name="email" 
              type="email" 
              label="Your email" 
              variant="outlined" 
              required
              helperText="Please provide a valid email address"
              {...register('email', {required: true}) } 
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                ),
              }}
            
            />
            <br />
            <TextField         
              name="feedback" 
              multiline 
              minRows={4} 
              helperText="Describe the problems that you've encontered." 
              label="Feedback" 
              variant="outlined"
              {...register('feedback') } 
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FeedbackIcon />
                  </InputAdornment>
                ),
              }}
             />
            <br />
            <Button 
              type="submit" 
              variant="contained" 
              color="primary"
              {...register('submit')}
            >
              Send
            </Button>
          </form>
        </div>

    );
  } else {
    body = (
      
        <div className={classNames(classes.paper, 'modal')} >
          <Typography variant="h4">Instructions</Typography>
          <Divider />
          <div className={classes.infoContainer}>
            <Typography variant="h6">News by Categories</Typography>
            <div className={classes.chipContainer}>{['Business', 'Entertainment', 'General', 'Health', 'Science', 'Sports', 'Technology'].map((category) => <Chip label={category} color="primary" className={classes.chip} />)}</div>
          </div>
          <Typography variant="body1" className={classes.trySaying}>Try saying: &quot;Give me the latest <strong><em>Business</em></strong> news&quot;</Typography>
          <Divider />
          <div className={classes.infoContainer}>
            <Typography variant="h6">News by Terms</Typography>
            <div className={classes.chipContainer}>{['Donald Trump', 'Bitcoin', 'PlayStation 5', 'Smartphones'].map((term) => <Chip label={term} color="primary" className={classes.chip} />)}<Chip label="...and more" className={classes.chip} /></div>
          </div>
          <Typography variant="body1" className={classes.trySaying}>Try saying: &quot;What&apos;s up with <strong><em>PlayStation 5</em></strong>&quot;</Typography>
          <Divider />
          <div className={classes.infoContainer}>
            <Typography variant="h6">News by Sources</Typography>
            <div className={classes.chipContainer}>{['CNN', 'Wired', 'BBC News', 'Time', 'IGN', 'Buzzfeed', 'ABC News'].map((source) => <Chip label={source} color="primary" className={classes.chip} />)}<Chip label="...and more" className={classes.chip} /></div>
          </div>
          <Typography variant="body1" className={classes.trySaying}>Try saying: &quot;Give me the news from <strong><em>CNN</em></strong>&quot;</Typography>
          <Divider />
          <div className={classes.infoContainer}>
            <Typography variant="h6">Other Commands</Typography>
            <div className={classes.chipContainer}>
              {[
                'Open article number {number}',
                'Read me the contents of article {number}',
                'Open Instructions', 'Close Instructions',
                'I want to send a feedback', 'go back', 'close feedback' ]
                .map((source) => <Chip label={source} color="primary" className={classes.chip} />)}
                <Chip label="...and more" className={classes.chip} />
            </div>
          </div>
          <Divider />
          <div className={classes.infoContainer}>
            <form className={classes.form} style={{marginBottom: '0'}}>
              <Typography variant='h6'>Send us some feedback.</Typography>
              <Button onClick={() => setFeedback(true) } type="submit" variant="contained" color="primary">Feedback Form</Button>
            </form>
          </div>
        
        </div>
     
    );
  }

  return (
      <SimpleModal open={isOpen} onClose={() => {setIsOpen(false); setFeedback(false);}}>
        {body}
      </SimpleModal>
  );
};

export default Modal;