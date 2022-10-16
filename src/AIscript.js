import React, { useEffect, useState, useCallback } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web'; //Alan Ai Initiate

import { Typography } from '@material-ui/core';
import NewsCards from './components/NewsCards/NewsCards';
import myLogo from './assets/images/myLogo.png'; 
import useStyles from './styles.js';
import wordsToNumbers from 'words-to-numbers';
import { useFormContext } from 'react-hook-form';
import Modal  from './components/Modal/Modal';

const ALAN_KEY = 'c06f02421d7ab25f9ae5da375ef8d73b2e956eca572e1d8b807a3e2338fdd0dc/stage';
export default function AIscript() {
    const [newsArticles, setNewsArticles] = useState([]);
    const classes = useStyles();
    const [activeArticle, setActiveArticle] = useState(-1);
    const [isOpen, setIsOpen] = useState(false);
    const [showFeedback, setFeedback] = useState(false);
  
    const formContext = useFormContext();

    const onSubmit = ()=>{
        alert('Feedback sent successfully! Wait for out support team to update you.');
    }
    const onErrors = ()=>{
        alert("There was an error submitting your form. Please try again.");
    }
    const handleSubmit = formContext.handleSubmit(onSubmit, onErrors);
    /**
     * Use effect to enable the Alan AI button in the app also use to get the commands from the AI
     */

    useEffect(() => {
     var alanInstance = alanBtn({
            key: ALAN_KEY,
            zIndex: "2000",
            onCommand: async ({ command, articles, number, value })=>{
                await alanInstance.activate();
                if(command === 'newHeadlines'){
                    setNewsArticles(articles);
                    setActiveArticle(-1);
                }
                else if (command === 'highlight'){
                    setActiveArticle((prevActiveArticle)=> prevActiveArticle+1);
                }
                else if (command === 'open'){
                    const parsedNumber = number.length > 2? wordsToNumbers(number, { fuzzy: true }) : number;
                    const article = articles[parsedNumber-1];
                    if(parsedNumber > articles.length){
                       alanInstance.playText('Please try that again...');
                    }
                    else if(article){
                        window.open(article.url, '_blank');
                        alanInstance.playText('Opening...');
                        setActiveArticle(parsedNumber-1);
                    }
                    else{
                        alanInstance.playText('Please try that again...');
                    }  
                }
                else if(command === 'read'){
                    const parsedNumber = number.length > 2? wordsToNumbers(number, { fuzzy: true }) : number;
                    const result = articles[parsedNumber-1].description;
                   if(!result){
                        alanInstance.playText(`Sorry, no description provided by the source.`);
                   }
                   else{
                        alanInstance.playText(`${result}`);
                   }
                   setActiveArticle(parsedNumber-1);
                }
                else if (command === 'open_instructions'){ 
                    alanInstance.playText('Opening instructions...');
                    setIsOpen(true);
                }
                else if (command === 'close_instructions'){
                    alanInstance.playText('Closing instructions...');
                    setIsOpen(false);     
                }
                else if (command === 'feedback'){
                    setIsOpen(true);
                    setFeedback(true);
                }
                else if (command === 'close_feedback'){
                    setIsOpen(false);
                    setFeedback(false);
                }
                else if(command === 'addUserName'){
                    formContext.setValue('name', value); 
                    // window.dispatchEvent( new KeyboardEvent('keydown', {key: '9'}));
                    formContext.setFocus('email', {shouldSelect: true});
                } 
                else if(command === 'addUserEmail'){
                    formContext.setValue('email', value.replace(/at/g, '@').replace(/\s/g, '')); 
                    formContext.setFocus('feedback', {shouldSelect: true});
                }
                else if(command === 'userFeedback'){
                    formContext.setValue('feedback', value); 
                    formContext.setFocus('submit', {shouldSelect: true});
                }
                else if(command === 'handleSubmit'){
                    handleSubmit();
                    alanInstance.playText('Thank you for your feedback, our support team will contact you soon.');
                    setIsOpen(false);
                    setFeedback(false);
                }
            }
        })
     
    }, []);

    return (
        <>  
             {/* Modal for instructions and Feedback form */}
             <Modal 
                isOpen={isOpen} 
                setIsOpen={setIsOpen} 
                showFeedback={showFeedback} 
                setFeedback={setFeedback}
            />
            <NewsCards 
                articles={newsArticles} 
                activeArticle={activeArticle} 
                setIsOpen={setIsOpen} 
                isOpen={isOpen} 
                setFeedback={setFeedback} 
                showFeedback={showFeedback}
            />
            {
                !newsArticles.length ? (
                <div className={classes.footer}>
                    <Typography variant="body1" component="h2">
                        Created by
                        <a className={classes.link} href="https://github.com/EdmondFE" target="_blank"> Edmond Esquilon</a> -
                        <a className={classes.link} href="https://www.facebook.com/Mon.BlackStar/" target="_blank">GnawrMax</a>
                    </Typography>
                    <img className={classes.image} src={myLogo} height="50px" alt="GnawrMax logo" />
                </div>
                ) : null
            }
        </>
    );
}
