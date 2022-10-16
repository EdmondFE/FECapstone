intent('What (is|can I) (do|) with this app (for|)?', 'What can I do here?',
      reply('This app is built to explore news with just few (clicks|interactions) and voice commands, it can provide the most recent headlines in mainstream media, to start you could say, give me the latest news. You can also get news with certain topics, categories and more.')
);

const API_KEY = 'b69c9b6eb096470b99b8aeb87836259a';
let savedArticles = [];

//Get by source
intent('Give me the news from $(source* (.+))', (p) => {
    let NEWS_API_URL = `https://newsapi.org/v2/top-headlines`;
    
    if(p.source.value) {
        NEWS_API_URL = `${NEWS_API_URL}?sources=${p.source.value.toLowerCase().split(" ").join("-")}&apiKey=${API_KEY}`
    }

    api.request(NEWS_API_URL, {headers: {"user-agent": 'user agent' }}, (error, response, body) => {
        const { totalResults, articles } = JSON.parse(body);

        if(totalResults == 0) {
            p.play('Sorry, please try searching for news from a different source');
            return;
        }

        savedArticles = articles;
        console.log(articles);
        console.log(NEWS_API_URL);
        p.play({ command: 'newHeadlines', articles });
        p.play(`Here are the (latest|recent) news from ${p.source.value}.`);

        p.play('Do you want me to read the news headlines?');
        p.then(confirmation);

    });
})

//Get by terms
intent('what\'s up with $(term* (.+))', (p) => {
    let NEWS_API_URL = `https://newsapi.org/v2/everything`;
    
    if(p.term.value) {
        p.term.value=p.term.value.toLowerCase().split(" ").join("-");
        NEWS_API_URL = `${NEWS_API_URL}?q=${p.term.value}&apiKey=${API_KEY}`
    }

    api.request(NEWS_API_URL, {headers: {"user-agent": 'user agent' }}, (error, response, body) => {
        const { totalResults, articles } = JSON.parse(body);

        if(totalResults == 0) {
            p.play('Sorry, please try searching for something (different|else).');
            return;
        }

        savedArticles = articles;
        console.log(articles);
        console.log(NEWS_API_URL);
        p.play({ command: 'newHeadlines', articles });
        p.play(`Here are the (latest|recent) articles on ${p.term.value}.`);

        p.play('Do you want me to read the news headlines?');
        p.then(confirmation);

    });
})

//Get by categories
const CATEGORIES = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];
const CATEGORIES_INTENT = `${CATEGORIES.map((category) => `${category}~${category}`).join('|')}`;

intent(`(show|what is|tell me|what's|what are|what're|read) (the|) (recent|latest|) $(N news|headlines) (in|about|on|) $(C~ ${CATEGORIES_INTENT})`,
  `(read|show|get|bring me|give me) (the|) (recent|latest) $(C~ ${CATEGORIES_INTENT}) $(N news|headlines)`, (p) => {
    let NEWS_API_URL = `https://newsapi.org/v2/top-headlines`;
    
    if(p.C.value) {
        NEWS_API_URL = `${NEWS_API_URL}?category=${p.C.value}&country=ph&apiKey=${API_KEY}`;
    }

    api.request(NEWS_API_URL, {headers: {"user-agent": 'user agent' }}, (error, response, body) => {
        const { totalResults, articles } = JSON.parse(body);

        if(totalResults == 0 || undefined) {
            p.play('Sorry, please try searching for a different category.');
            return;
        }

        savedArticles = articles;
        console.log(articles);
        console.log(NEWS_API_URL);
        p.play({ command: 'newHeadlines', articles });
        if(p.C.value) {
           p.play(`Here are the (latest|recent) articles on ${p.C.value}.`);
        }
        else{
            p.play(`Here are the (latest|recent) news.`);
        }
        

        p.play('Do you want me to read the news headlines?');
        p.then(confirmation);
    });
})

//Give the latest news
intent('(Show|Give) me the (latest|recent) (news|headlines).', (p)=>{
     let NEWS_API_URL = `https://newsapi.org/v2/top-headlines?country=ph&apiKey=${API_KEY}`;
    api.request(NEWS_API_URL, {headers: {"user-agent": 'user agent' }}, (error, response, body) => {
        const { totalResults, articles } = JSON.parse(body);

        if(totalResults == 0) {
            p.play('Sorry, please try again later... bad request. Trying to fetch data at different source.');
            return;
        }

        savedArticles = articles;
   
        p.play({ command: 'newHeadlines', articles });
        p.play(`Here are the (latest|recent) news.`);

        p.play('Do you want me to read the news headlines?');
        p.then(confirmation);

    });
})
//read the news headlines again



//open instructions
intent('Open instructions','how do this work?', (p)=>{
    p.play({ command: 'open_instructions'});
})
intent('Close instructions','I\'m done with the instuctions.', (p)=>{
    p.play({ command: 'close_instructions'});
})

//go back to the main
intent('Go back', (p)=>{
   p.play('(Okay|Sure), (going|heading) back...');
    p.play({ command: 'newHeadlines', articles:[] })
});

//for context with alan ai
const confirmation = context(()=>{
    intent('yes', 'sure', async (p)=>{
        for(let i=0; i < savedArticles.length; i++){
            p.play({ command: 'highlight', article: savedArticles[i] });
            p.play(`${savedArticles[i].title}`);
        }
    });
    intent('no', 'stop', (p)=>{
        p.play('Sure, sounds good to me.')
    });
});
//read me the content
intent('(Read|Tell) me the (contents|story|about) (of|article) (number|) $(N* (.+)).', (p)=>{
    if(p.N.value){            
        p.play({ command: 'read', articles: savedArticles, number: p.N.value});
    }
})


//opening articles by number
intent('Open (the|) (article|) (number|) $(number* (.+))', (p)=>{
    if(p.number.value){
        p.play({ command: 'open', number: p.number.value, articles: savedArticles });
       // p.play('Opening...');
    }
});

//Send feedback
intent('I (want|have) (a|to) (send|) (a|) feedback', (p)=>{
    p.play({ command: 'feedback' });
    //p.play('Opening feedback form...')
   
    p.play('Would you like me to assist you?');
    p.then(formConfirmation);
});
intent('Close (feedback|form)', (p)=>{
    p.play('Closing feedback form...');
    p.play({ command: 'close_feedback' });
})

const formConfirmation = context(()=>{
    let name = false;
    let email = false;
    let feedback = false;
    intent('(yes|sure)', async (p)=>{
         p.play('(Awesome|That\'s great)! Can I get your name for the feedback?')
        name = true;
    });
    if(!name){
        intent('(Sure|) my name is $(Name* (.+))', (o)=>{
            o.play({ command: 'addUserName', value: o.Name.value })
            o.play(`Got it ! Thanks ${o.Name.value}`, 
                   `Alrighty ! Thanks ${o.Name.value}`, 
                   `Ok ! Thanks ${o.Name.value}`); 
            o.play('Please provide a valid email.');
            email = true;
        });
    }
    if(!email){
        intent('(Sure|) my email is $(Email* (.+))', (p)=>{
           p.play({ command: 'addUserEmail', value: p.Email.value});
           p.play('(great!|awesome!|got it!)');
           p.play('Tell us your feedback.');
           feedback = true;
        });
    }
    if(!feedback){
        intent('(Sure|) my feedback is $(Feedback* .+)', (p)=>{
            p.play({ command: 'userFeedback', value: p.Feedback.value});
            p.play('(Got it|that\'s nice|).');
            p.play('Would you like me to send your feedback now?');
            p.then(submitFeedback);
        });
    }
    
    intent('No', (p)=>{
        p.play(
            'Sure, just ask me if you need assistance.',
            'Okay, just tell me if you need something.',
            'Sure, sounds good to me...',
            'Yes, that sounds excellent to me.'
        );
        name = false;
    })
})

const submitFeedback = context(()=>{
    intent('(Yes|sure)', (p)=>{
        p.play({ command: 'handleSubmit'});
    });
    intent('No', (p)=>{
        p.play(
            'Sure, just ask me if you need assistance.',
            'Okay, just tell me if you need something.',
            'Sure, sounds good to me...',
            'Yes, that sounds excellent to me.'
        );
    })
})