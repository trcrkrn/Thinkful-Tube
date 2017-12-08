const YoutubeSearchUrl = 'https://www.googleapis.com/youtube/v3/search'

function getDataFromApi(searchTerm, callback) {
    const query= {
        q: searchTerm,
        key: 'AIzaSyAImpxcZUlIREs1ZlWCjchLXKgKHFUWU3A',
        part: 'snippet'
    }
    $.getJSON(YoutubeSearchUrl, query, callback)
}

function renderResult(result) {
    // return `<div>${JSON.stringify(result)}</div>`
    return `<div>
        <a href="http://www.youtube.com/watch?v=${result.id.videoId}">
        <img class="js-thumbnail" target="_blank" src="${result.snippet.thumbnails.medium.url}" alt="${result.snippet.description}"></a>
        </div>`
}

function renderYoutubeSearchData(data) {
    const results= data.items.map((item, index) => renderResult(item));
    $(`.js-search-results`).html(results);
}

function watchSubmit() {
    $(`.js-search-form`).submit(event => {
        event.preventDefault();
        const queryTarget = $(event.currentTarget).find(`.js-query`);
        const query = queryTarget.val()
        queryTarget.val("");
        getDataFromApi(query, renderYoutubeSearchData);
    });
}

$(watchSubmit);