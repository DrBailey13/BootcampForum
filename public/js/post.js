$(document).ready(function () {
    // Getting jQuery references to the post body, title, form, and author select
    var bodyInput = $("#body");
    var topicInput = $("#topic");
    var initialsInput = $("#initials");
    var postForm = $("#post");
    // Adding an event listener for when the form is submitted
    //$(postForm).on("submit", handleFormSubmit);
    // Gets the part of the url that comes after the "?" (which we have if we're updating a post)
    var postId;
    // Sets a flag for whether or not we're updating a post to be false initially
    var updating = false;
    $("#submit").on("click", function handleInputSubmit(event) {
        // event.preventDefault();
        // Wont submit the post if we are missing a body or a title
        if (!initialsInput.val().trim() || !topicInput.val().trim() || !bodyInput.val().trim()) {
            return;
        }
        // Constructing a newPost object to hand to the database
        var newPost = {
            name: initialsInput.val().trim(),
            topic: topicInput.val().trim(),
            body: bodyInput.val().trim(),
        };
        console.table(newPost);

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
        
    });
});

















