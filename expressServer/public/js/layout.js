function getTopPosts() {
    $.ajax('/post/GetTopPosts').then(function (data) {
        var topPostsSection = $('#topPosts');

        for (var post of data) {
            var postView = $('<div></div>').html('<h4>' + post.title + '</h4>');
            postView = $('<div></div>').append(postView);
            topPostsSection.append(postView);
        }
    });
}

getTopPosts();