import React , { useState, useEffect, createRef } from 'react';
import { Card, CardActions, CardActionArea, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import useStyles from './styles.js';
import classNames from 'classnames';
export default function NewsCard({ article: { description, publishedAt, source, title, url, urlToImage }, index, activeArticle }) {
    const classes = useStyles();
    const [elRefs, setElRefs] = useState([]);

    /**
     * for automatic scorlling
     * for first useEffect is to set the refs
     * second ref is for the changes of the active article
     */
   
     const scrollToRef = (ref) => window.scroll(0, ref.current.offsetTop - 50);
   
     useEffect(() => {
       window.scroll(0, 0);
   
       setElRefs((refs) => Array(20).fill().map((_, j) => refs[j] || createRef()));
     }, []);
   
     useEffect(() => {
       if (index === activeArticle && elRefs[activeArticle]) {
         scrollToRef(elRefs[activeArticle]);
       }
     }, [index, activeArticle, elRefs]);

    return (
        <Card ref={elRefs[index]} className={classNames(classes.card, (activeArticle === index)? classes.activeCard : null)}>
            <CardActionArea href={url} target='_blank'>
                <CardMedia className={classes.media} image={urlToImage || 'https://www.ready4jobs.asia/images/news.png'}/>
                <div className={classes.details}>
                    <Typography variant="body2" color="textSecondary" component="h2">{(new Date(publishedAt)).toDateString()}</Typography>
                    <Typography variant="body2" color="textSecondary" component="h2">{source.name}</Typography>
                </div>
                <Typography className={classes.title} gutterBottom  variant='h5'>{title}</Typography>
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">{description}</Typography>
                </CardContent>  
            </CardActionArea>
            <CardActions className={classes.cardActions}>
                    <Button href={url} className={classes.button} target='_blank' size="small" color="primary">Learn More</Button>
                    <Typography variant="h5" color="textSecondary">{index+1}</Typography> 
            </CardActions>  
        </Card>
    )
}
