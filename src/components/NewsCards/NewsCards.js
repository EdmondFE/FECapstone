import React , { useState } from 'react';
import NewsCard from '../NewsCard/NewsCard';
import { Grid, Grow , Typography, Tooltip, IconButton , CardMedia } from '@material-ui/core';
import BsMicFill from '@material-ui/icons/MicNoneRounded';
import InfoIcon from '@material-ui/icons/HelpRounded';
import useStyles from './styles.js';
import './style.css';
import classNames from 'classnames';
import NewsNetwork from './images/newsnetwork.png';
import Categories from './images/categories.png';
import LatestNews from './images/latestnews.png';
import Terms from './images/terms.png';




//Info cards in main screen
const infoCards = [
    { img: LatestNews, title: 'Latest News', info: 'Gives you the latest news from any source available.', text: 'Give me the latest news' },
    { img: Categories, title: 'News by Categories', info: 'Business, Entertainment, General, Health, Science, Sports, Technology', text: 'Give me the latest Technology news' },
    { img: Terms, title: 'News by Terms', info: 'Bitcoin, PlayStation 5, Smartphones, Trending...', text: 'What\'s up with PlayStation 5' },
    { img: NewsNetwork, title: 'News by Sources', info: 'CNN, Wired, BBC News, Time, IGN, Buzzfeed, ABC News...', text: 'Give me the news from CNN' },
];

export default function NewsCards({ articles, activeArticle, setIsOpen }) {
    const classes = useStyles();
  
    const handleModal = ()=> setIsOpen(true);
  
    //Display this if no article data 
    if(!articles.length) {
       return (
            <div className='main-container'>
                {/* ToolTip for instructions and feedback form */}
                <Tooltip title="Info" className='tooltip'>
                    <IconButton aria-label='Info' onClick={handleModal}>
                        <InfoIcon style={{fontSize: 32, color: 'dodgerblue'}}/>
                    </IconButton>
                </Tooltip>
           
               {/* Logo Text */}
                <div className={classes.logoContainer}>
                    <h1 className={classNames(classes.logoTitle,'logo-title')}>Explore News... </h1>
                    <span className={classNames(classes.subTitle,'sub-title')}>with just few clicks and your voice.</span>
                </div>
                {/* Context container */}
                <Grow in>
                    <Grid className={classes.container} container alignItems='stretch' spacing={3}>
                    {
                        infoCards.map((infoCard) =>(
                        <Grid item xs={12} sm={6} md={4} lg={3} key={infoCard.title} className={classes.infoCard}>
        
                            <div className={classes.card}>
                                <CardMedia className={classes.media} image={infoCard.img}>  
                                    <Typography className={classNames(classes.typography, 'header')} variant='h5'><br/>{infoCard.title}</Typography>
                                </CardMedia>
                                <Typography className={classes.typography} variant='h5'><br/><br/></Typography>
                                { 
                                    infoCard.info ? (<Typography className={classes.infoDescp} variant="h6"><br/> {infoCard.info} </Typography>):null
                                }
                                <Typography  className={classes.infoDescp} variant='h6'><BsMicFill className={classes.iconMic}/> Try saying... <br/> <i>{infoCard.text}</i> </Typography>
                            </div>
                        </Grid>
                        ))
                    }
                    </Grid>
                </Grow>
            </div>
        )
    }
    return (
        // Cards for search results
        <Grow in>
            <Grid className={classes.container} container alignItems='stretch' spacing={3}>
                {
                    articles.map((article, index) => (
                        <Grid key={article.title} item xs={12} sm={6} md={4} lg={3} style={{ display: 'flex' }}>
                            <NewsCard article={article} index={index} activeArticle={activeArticle}/>
                        </Grid>
                    ))
                }
            </Grid>
        </Grow>
    )
}
