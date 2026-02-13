let blogEmail;
document.getElementById("blogbtn").onclick = function() {
    blogEmail = document.getElementById("blogmail").value;
    console.log(blogEmail);
    alert("You have been Sign Up to our newsletter!");
}