$(document).ready(function () {

    
 


    // Getting jQuery references to the post body, title, form, and author select
    var bodyInput = $("#body");
    var topicInput = $("#topic");
    var initialsInput = $("#initials");
    var postForm = $("#post");
    // Adding an event listener for when the form is submitted
    //$(postForm).on("submit", handleFormSubmit);
    // Gets the part of the url that comes after the "?" (which we have if we're updating a post)
    var postId2 = $("#pK").attr("data-id");
    $.ajax({
        url: "/api/replies/" + postId2,
        method: "GET",
    }).then(function (response) {
        console.log(response);
        $.each( response, function( key, value ) {
            $("#replies").append(`<div class="reply-${key}"><h3>${response[key].name}</h3><p>${response[key].body}</p>`);

          });
    }).catch(function(error){
        console.log("error ", error);
    });

    

    // Sets a flag for whether or not we're updating a post to be false initially
    var updating = false;
    $("#submit").on("click", function (event) {
        event.preventDefault();
        // Wont submit the post if we are missing a body or a title

        if ($("#initials").val().trim() === "") {
            alert("Please enter your first and last initials!");
        } else if ($("#topic").val().trim() === "") {
            alert("Please enter a post topic!");
        } else if ($("#body").val().trim() === "") {
            alert("This field cannot be left empty!");
        } else {
            !initialsInput.val().trim() || !topicInput.val().trim() || !bodyInput.val().trim();
            {
            // Constructing a newPost object to hand to the database
            var newPost = {
                name: initialsInput.val().trim(),
                topic: topicInput.val().trim(),
                body: bodyInput.val().trim(),

            };
    
            // console.log(newPost);
            var queryURL = "https://ui-avatars.com/api?name=" + initialsInput.val().trim();
            console.log("it works");
            $.ajax({
                url: queryURL,
                method: "GET",
            }).then(function (response) {
                console.log("ajax success");
                console.log(response);
            }).catch(function (error) {
                console.log("error ", error);
            });
            // If we're updating a post run updatePost to update a post
            // Otherwise run submitPost to create a whole new post
            if (updating) {
                newPost.id = postId;
                updatePost(newPost);
            }
            else {
                submitPost(newPost);
            }
            // Submits a new post and brings user to forum page upon completion
            function submitPost(Post) {
                $.post("/api/post", Post, function () {
                    window.location.href = "/forum";
                });
            }
            }}
    });
    $("#searchForm").on('submit', event => {
        event.preventDefault()
        window.location.href = '/search/' + $("#searchQuery").val();
    });
});























