let shopEmail;
document.getElementById("shopbtn").onclick = function () {
    shopEmail = document.getElementById("shopmail").value;
    console.log(shopEmail);
    alert("You have been Sign Up to our newsletter!");
}

// Sidebar toggling is handled in script.js