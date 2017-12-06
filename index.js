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
            <img class="js-thumbnail" src=${JSON.stringify(result.snippet.thumbnails.medium.url)}>
        </div>`
}

function renderYoutubeSearchData(data) {
    const results= data.items.map((item, index) => renderResult(item));
    // console.log('found result:', results)
    $(`.js-search-results`).html(results);
}

function watchSubmit() {
    $(`.js-search-form`).submit(event => {
        event.preventDefault();
        const queryTarget = $(event.currentTarget).find(`.js-query`);
        const query = queryTarget.val()
        queryTarget.val("");
        // console.log("submit event found for query", query)
        getDataFromApi(query, renderYoutubeSearchData);
    });
}

$(watchSubmit);