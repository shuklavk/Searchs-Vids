// Searchbar Handler

$(function(){
    var searchField = $('#query');
    var icon = $('#searchButton');

    // Focus Event Handler
    $(searchField).on('focus', function(){
        $(this).animate({
            width:'100%'
        },400);
        
        $(icon).animate({
            right:'10px'
        },400);
    });

    // Blur Event Handler
    $(searchField).on('blur', function(){
        if(searchField.val() === ''){
            $(searchField).animate({
                width:'45%'
            },400, function(){});
            $(icon).animate({
                right:'360px'
            },400);
        }
    });

    $('#searchForm').submit(function(e){
        e.preventDefault();
    })
})

var search = () =>{
    // Clear Results
    $('#results').html('');
    $('#buttons').html('');

    // Get Form Input 

    var q = $('#query').val();

    // Run GET Request on API
    $.get(
        "https://www.googleapis.com/youtube/v3/search", {
            part:'snippet, id',
            q: q,
            type: 'video',
            key : 'AIzaSyC20wY3RydFpiTSpM1WDmxwp2OnKW1VPy4'
        }, function (data){
            var nextPageToken = data.nextPageToken;
            var prevPageToken = data.prevPageToken;

            console.log(data);

            $.each(data.items,function(i, item){
                // Get Output
                var output = getOutput(item);

                // Display results
                $('#results').append(output);
            });

            var buttons = getButtons(prevPageToken, nextPageToken);


            // Display Buttons
            $('#buttons').append(buttons);
        }
    );
};


// Build Output 
var getOutput = (item) => {
    var videoID = item.id.videoId;
    var title = item.snippet.title;
    var description = item.snippet.description;
    var thumb = item.snippet.thumbnails.high.url;
    var channelTitle = item.snippet.channelTitle;
    var videoDate = item.snippet.publishedAt;

    // Build Output stream 
    var output = '<li>' +
    '<div class= "list-left">' + 
    `<img src= "${thumb}">` +
    `</div>` +
    `<div class= 'list-right'>` +
    `<h3>${title}</h3>` + 
    `<small>By <span class="cTitle">${channelTitle}</span> on ${videoDate}</small>` +
    `<p>${description}</p>`+
    `</div> </li>` +
    `<div class="clearFix"></div>` +
    '';
    return output;
}

// var getButtons = (prevPageToken, nextPageToken) => {
//     if(!prevPageToken){
//         var btnOutput = ''
//     }
// }