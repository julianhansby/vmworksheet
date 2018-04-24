/* ------------- GLOBAL VARIABLES ----------------- */

var pageUrl = location.href;


/* ------------ LOGIN ---------------*/

/*
if(localStorage.getItem('username') && pageUrl.indexOf('partials') <= -1){
    alert("you are loggin in with username"+ localStorage.getItem('username'));
    window.location = "/partials/home.html";
    loadDashboard();  
}*/


if(location.search.indexOf('error') > -1){
    alert("your username and password does not match");
}

$(".login_btn").on("click",function () {

    var input_username = $("#inputUsername").val();
    var input_password = $("#inputPassword").val();

    alert(input_username+" "+input_password)

    let input_data = {
        username: input_username,
        password: input_password
    }

    // check API
    $.ajax({
        url: '/api/vmw/login',
        type: "GET",
        data: { input_data: input_data },
        dataType: "json",
        success: function(data){
            console.log(data);
        }
    })

    /*
    if(username == 'traceyH' && password == 'ackermans1'){
        alert("successfull login");
        localStorage.setItem('username',username);
        window.location = "/partials/home.html";
        loadDashboard();       
    } else {
        alert("your details are incorrect. Please try again!");
        $("#inputPassword").val('');
    }*/
});

/* ---------------- DASHBOARD -------------------- */

function loadDashboard(){
    alert("DASHBOARD!!")
}

/* --------------- LOG OUT --------------------*/

$(".signout-link").click(function(e){ e.preventDefault(); signOut(); })

function signOut(){
    alert("lets sign out")
    localStorage.removeItem('username');
    window.location = "/";
}

/* ========== ADD WORKSHEET ENTRY ========== */

let addWorkSheetEntry = function(inputName){
    $.ajax({
        url: "/api/vmw/addworksheet",
        type: "POST",
        data: {
            name: inputName
        },
        success: function(data){
            console.log(data)
        }
    })
};

$('.addWorksheet-btn').click(function(){
    var getNameVal = $("#nameField").val();
    addWorkSheetEntry(getNameVal);
    $("#nameField").val("");
})