/* gif madness */



$(document).ready(function() {


    let htmlTabs = (function(){
        let tabsEl = $('.tab a');
        tabsEl.on('click', function(e){
            e.preventDefault();
            tabsEl.removeClass('active');
            $(this).addClass('active');
            $('.tab-pane').hide('fast');
            $('#' + $(this).attr('href')).show('fast');
        });
    });
    htmlTabs();


    // var gifMadness = (function(){
        
    //     let topics = [
    //         'pizza',
    //         'pasta',
    //         'chicken wings',
    //         'broccoli',
    //         'apples',
    //         'coffee',
    //         'chocolate',
    //         'nachos',
    //         'sandwich',
    //         'gyro',
    //         'roast beef'
    //     ];
    //     let storedTopics = JSON.parse(localStorage.getItem('giphyTopics'));
    //     if (storedTopics != null) {
    //         topics = storedTopics;
    //     }
    //     let topicButtonsEl = $('.topic-buttons');
    //     let resContainerEl =  $('.results-container');

    //     let giphyKey = 'N2UEhSvASDO1KWZ51RTpFt61S39PNCvt';
    //     let getLimit = 9;
    //     let giphyOffset = 0;
    
    //     function init(){
    //         initButtons(topics);
    //         getGifs(topics[0], getLimit, giphyOffset);
    //         getNewGifs();
    //         loadMoreGifs();
    //     }
        
    //     function initButtons(topics){
    //         topicButtonsEl.empty();
    //         localStorage.setItem('giphyTopics', JSON.stringify(topics));
    //         topics.map(function(food) {
    //             let btnEl = $('<button>');
    //             btnEl.text(food)
    //                 .appendTo(topicButtonsEl)
    //                 .on('click', function(e){
    //                     e.preventDefault();
    //                     getGifs($(this).text(), getLimit, giphyOffset);
    //                 });
    //         });
    //     }

    //     function getGifs(topic, limit, offset){
    //         localStorage.setItem('giphyTopic', topic);
    //         let giphyApiUrl = 'http://api.giphy.com/v1/gifs/search?q=' + topic + '&api_key=' + giphyKey + '&limit=' + limit + '&offset=' + offset;
    //         $.ajax({
    //             'url': giphyApiUrl,
    //             'method': 'GET'
    //         }).then(function(response){
    //             // console.log(response);
    //             let giphyData = response.data;
    //             if(!offset){
    //                 resContainerEl.empty();
    //             }
    //             Object.keys(giphyData).forEach(function(key, index){
    //                 // console.log(giphyData[key]);
    //                 let divEl = $('<div>').addClass('gif-block');
    //                 let title = giphyData[key].title.trim() != '' ? giphyData[key].title : 'no title';
    //                 let titleEl = $('<h4>').text(title);
    //                 let metaEl = $('<p>').text('Rated: ' + giphyData[key].rating);
    //                 let source = giphyData[key].source_tld;
    //                 source = source.length > 22 ? source.substr(0,22) + '...' : giphyData[key].source_tld;
    //                 metaEl.append('<br><span title="' + giphyData[key].source_tld + '">Source: ' + source + '</span>');
    //                 let imgEl = $('<img>').attr('data-state', 'still').addClass('gif');
    //                 imgEl.attr('data-still', giphyData[key].images.fixed_width_still.url);
    //                 imgEl.attr('data-animate', giphyData[key].images.fixed_width.url);
    //                 imgEl.attr('src', giphyData[key].images.fixed_width_still.url);
    //                 imgEl.on('click', animateGif);
    //                 divEl.append(titleEl).append(metaEl).append(imgEl);
    //                 resContainerEl.append(divEl);
    //             });
    //         });
    //     }


    //     function animateGif(){
    //         let btn = $(this);
    //         if (btn.attr('data-state') === 'still') {
    //             btn.attr('src', btn.attr('data-animate'));
    //             btn.attr('data-state', 'animated');
    //         } else {
    //             btn.attr('src', btn.attr('data-still'));
    //             btn.attr('data-state', 'still');
    //         }
    //     }


    //     function loadMoreGifs(){
    //         $('.add-more').on('click', function(e){
    //             e.preventDefault();
    //             offset = getLimit + localStorage.getItem('giphyOffset');
    //             getGifs(localStorage.getItem('giphyTopic'),getLimit,parseInt(offset));
    //         });
    //     }

    //     function getNewGifs(){
    //         $('#submit-newgif').on('click', function(e){
    //             e.preventDefault();
    //             newGifEl = $('#newgif');
    //             newGif = newGifEl.val().trim();
    //             if (newGif.length) {
    //                 if (!topics.includes(newGif)){
    //                     topics.splice(0, 1, newGif);
    //                 }
    //                 newGifEl.val('');
    //                 getGifs(newGif, getLimit, giphyOffset);
    //                 initButtons(topics);
    //             } else {
    //                 alert('nothing entered');
    //             }
    //         })
    //     }
    //     init();
    // });
    // gifMadness();

    let tabs = [
        {
            'name': 'gifs',
            'topics': [
                'pizza',
                'pasta',
                'chicken wings',
                'broccoli',
                'apples',
                'coffee',
                'chocolate',
                'nachos',
                'sandwich',
                'gyro',
                'roast beef'
            ],
            'apiUrl': 'https://api.giphy.com/v1/gifs/search?api_key=N2UEhSvASDO1KWZ51RTpFt61S39PNCvt',
            'limit': 9,
            'offset': 0
        },
        {
            'name': 'news',
            'topics': [
                'economy',
                'tornados',
                'congress',
                'climate change',
                'jobs',
                'crime'
            ],
            'apiUrl': 'https://newsapi.org/v2/everything?apiKey=7a6e6d25f7614f219e252f2307d31182',
            'limit': 9,
            'offset': 10
        },
        {
            'name': 'movies',
            'topics': [
                'The Matrix', 
                'Slapshot',
                'Aladdin',
                'Indiana Jones and the Temple of Doom',
                'Alita'
            ],
            'apiUrl': 'https://www.omdbapi.com/?apikey=df4c19ba',
            'limit': 9,
            'offset': 0
        }
    ]

    function setupTabs(){
        Object.keys(tabs).forEach(function(key, index){
            let topics = tabs[key].topics;
            let name = tabs[key].name;
            window[tabs[key].name + 'Stored'] = JSON.parse(localStorage.getItem(name + 'Topics'));
            if (window[tabs[key].name + 'Stored'] != null) {
                topics = window[tabs[key].name + 'Stored'];
            }
            apiUrl = tabs[key].apiUrl;
            tabsInit(name, topics, tabs[key].apiUrl, tabs[key].limit, tabs[key].offset);
        });
    }
    setupTabs();
    function tabsInit(name, topics, apiUrl, limit, offset){
        initTopicButtons(name, topics, apiUrl, limit, offset);
        getApiData(name, topics[0], apiUrl, limit, offset);
        
        // loadMoreGifs();
    }

    function initTopicButtons(name, topics, apiUrl, limit, offset){
        let topicBtnsEl = $('#' + name).find('.topic-buttons');
        topicBtnsEl.empty();
        console.log(topics);
        localStorage.setItem(name + 'Topics', JSON.stringify(topics))
        topics.map(function(topic) {
            let btnEl = $('<button>');
            btnEl.text(topic)
                .appendTo(topicBtnsEl)
                .on('click', function(e){
                    e.preventDefault();
                    getApiData(name, topic, apiUrl, limit, offset);
                });
        });
    }


    function getApiData(name, topic, apiUrl, limit, offset){
        let ajaxUrl = apiUrl;
        switch(name){
            case 'gifs':
                ajaxUrl += '&q=' + topic + '&limit=' + limit + '&offset=' + offset;
                break;
            case 'news':
                ajaxUrl += '&q=' + topic + '&limit=' + limit + '&pageSize=' + offset;
                break;
            case 'movies':
                ajaxUrl += '&t=' + topic;
                break;
        }
        // console.log(ajaxUrl);
        $.ajax({
            'url': ajaxUrl,
            'method': 'GET'
        })
        .then(function(response){
            switch(name){
                case 'gifs':
                    //console.log(name);
                    renderGifs(response, offset);
                    break;
                case 'news':
                    renderNews(response, offset);
                    break;
                case 'movies':
                    renderMovies(response, offset);
                    break;
            }
        });
        
    }

    function renderGifs(res, offset) {
        let giphyData = res.data;
        // console.log(giphyData);
        if(!offset){
            $('#gifs .results-container').empty();
        }
        giphyData.map(function(gif){
            let divEl = $('<div>').addClass('result-block');
            let title = gif.title.trim() != '' ? gif.title : 'no title';
            let titleEl = $('<h4>').text(title);
            let metaEl = $('<p>').text('Rated: ' + gif.rating);
            let source = gif.source_tld;
            source = source.length > 22 ? source.substr(0,22) + '...' : gif.source_tld;
            metaEl.append('<br><span title="' + gif.source_tld + '">Source: ' + source + '</span>');
            let imgEl = $('<img>').attr('data-state', 'still').addClass('gif');
            imgEl.attr('data-still', gif.images.fixed_width_still.url);
            imgEl.attr('data-animate', gif.images.fixed_width.url);
            imgEl.attr('src', gif.images.fixed_width_still.url);
            imgEl.on('click', animateGif);
            divEl.append(titleEl).append(metaEl).append(imgEl);
            
            $('#gifs .results-container').append(divEl);
            
        });
    }

    function animateGif(){
        let btn = $(this);
        if (btn.attr('data-state') === 'still') {
            btn.attr('src', btn.attr('data-animate'));
            btn.attr('data-state', 'animated');
        } else {
            btn.attr('src', btn.attr('data-still'));
            btn.attr('data-state', 'still');
        }
    }

    function renderNews(res, offset) {
        let newsData = res.articles;
        if(!offset){
            $('#news .results-container').empty();
        }
        console.log(newsData);
        newsData.map(function(news){
            let divEl = $('<div>').addClass('result-block two-wide');
            let title = news.title.trim() != '' ? news.title : 'no title';
            let titleEl = $('<h4>').text(title);

            let metaEl = $('<p>').text('Published: ' + news.publishedAt);
            let source = news.source.name;
            source = source.length > 22 ? source.substr(0,22) + '...' : news.source.name;
            metaEl.append('<br><span title="' + news.source.name + '">Source: ' + source + '</span>');
            let content = news.content;
            content = content.length > 180 ? content.substr(0,180) + '...' : news.content;
            let contentEl = $('<p>').text(content);
            // let imgEl = $('<img>').attr('data-state', 'still').addClass('gif');
            // imgEl.attr('data-still', gif.images.fixed_width_still.url);
            // imgEl.attr('data-animate', gif.images.fixed_width.url);
            // imgEl.attr('src', gif.images.fixed_width_still.url);
            // imgEl.on('click', animateGif);
            divEl.append(titleEl).append(metaEl).append(contentEl);
            $('#news .results-container').append(divEl);
        });
        // publishedAt, url, source.name
    }

    function renderMovies(res, offset) {
        let newsData = res.data;
        if(!offset){
            $('#movies .results-container').empty();
        }

        // $('#gifs .results-container').append(divEl);
        // Object.keys(newsData).forEach(function(key, index){
        // });
    }


    function getNewTopic(){
        $('.submit-new').on('click', function(e){
            e.preventDefault();
            let tabPaneId = $(this).closest('.tab-pane').attr('id');
            newTopicEl = $('#' + tabPaneId).find('.new-topic');
            newTopic = newTopicEl.val();
            let tabObj = tabs.find(obj => { return obj.name === tabPaneId });
            let tabTopics = tabObj.topics;
            console.log(tabs);
            console.log(tabTopics);
            if (newTopic.length) {
                if (!tabTopics.includes(newTopic)){
                    tabTopics.splice(0, 0, newTopic);
                }
                newTopicEl.val('');
                getApiData(tabPaneId, newTopic, tabObj.apiUrl, tabObj.limit, tabObj.offset);
                initTopicButtons(tabPaneId, tabTopics, tabObj.apiUrl, tabObj.limit, tabObj.offset);
            } else {
                alert('nothing entered');
            }
        })
    }
    getNewTopic();

});
