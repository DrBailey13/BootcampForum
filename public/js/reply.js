$(document).ready(function () {
    // Getting jQuery references to the post body, and initials
    var replyInput = $("#replyBody");
    var replyInitials = $("#replyInitials");
    var postId = $("#pK");
    // Gets the part of the url that comes after the "?" (which we have if we're updating a post)
    // var replyId;
    // Sets a flag for whether or not we're updating a post to be false initially
    // var updating = false;

    $("#submitReply").on("click", function(event) {
        event.preventDefault();

        
        // Wont submit the post if we are missing a body or a title
        if ($("#replyInitials").val().trim() === "") {
            alert("Please enter your first and last initials!");
        } else if ($("#replyBody").val().trim() === "") {
            alert("Reply field cannot be left blank!");
        } else { !replyInput.val().trim() || !replyInitials.val().trim();
            console.log("it really works");
        }
        // Constructing a newPost object to hand to the database
        var newReply = {
            name: replyInitials.val().trim(),
            body: replyInput.val().trim(),
            post_id: postId.attr("data-id"),
        };
        // console.log(newPost);
       var queryURL = "https://ui-avatars.com/api?name=" + replyInitials.val().trim();
       console.log("it works");
       $.ajax({
        url: queryURL,
        method: "POST",
    }).then(function (response) {
       console.log("ajax success");
        console.log(response);
    }).catch(function(error){
        console.log("error ", error);
    });
    submitReply(newReply);
        
        // Submits a new reply and reloads forum page upon completion
        function submitReply(Reply) {
            $.post("/api/reply", Reply, function () {
                location.reload();
            });
        }
        
    });

});



// for e