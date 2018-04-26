/* ------------- GLOBAL VARIABLES ----------------- */

var pageUrl = location.href;

/* ------------------ SET USERNAME ON PAGE ----------------------- */
if(pageUrl.indexOf('addworksheet') > -1){
    //alert("yo yo")
    $("#user-input").val(localStorage.getItem('username'));
}

/* ------------------ LOGIN PAGE ----------------------- */

$(".btn-submit").on("click",function () {

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
        type: "POST",
        data: input_data,
        success: function(data){
            //console.log(data);
            if(data.length > 0){
                localStorage.setItem('username',data[0].username);
                window.location = "/";
            } else {
                alert("you have entered the incorrect details! please try again!")
            }
        }
    });
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

let storeListData = [
    {
        sbuName: "south",
        stores: [
            { name: "south a" },
            { name: "south b" },
            { name: "south c" },
            { name: "south d" },
            { name: "south e" },
            { name: "south f" },
            { name: "south g" },
            { name: "south h" },
            { name: "south i" },
            { name: "south j" },
            { name: "south k" },
            { name: "south l" },
            { name: "south m" },
            { name: "south n" },
            { name: "south o" },
            { name: "south p" },
            { name: "south q" },
            { name: "south r" }                        
        ]
    },
    {
        sbuName: "north",
        stores: [
            { name: "north a" },
            { name: "north b" },
            { name: "north c" },
            { name: "north d" },
            { name: "north e" },
            { name: "north f" },
            { name: "north g" },
            { name: "north h" },
            { name: "north i" },
            { name: "north j" },
            { name: "north k" },
            { name: "north l" },
            { name: "north m" },
            { name: "north n" },
            { name: "north o" },
            { name: "north p" },
            { name: "north q" },
            { name: "north r" }                        
        ]
    },
    {
        sbuName: "central",
        stores: [
            { name: "central a" },
            { name: "central c" },
            { name: "central b" },
            { name: "central d" },
            { name: "central e" },
            { name: "central f" },
            { name: "central g" },
            { name: "central h" },
            { name: "central i" },
            { name: "central j" },
            { name: "central k" },
            { name: "central l" },
            { name: "central m" },
            { name: "central n" },
            { name: "central o" },
            { name: "central p" },
            { name: "central q" },
            { name: "central r" }                        
        ]
    },
    {
        sbuName: "pta",
        stores: [
            { name: "pta a" },
            { name: "pta c" },
            { name: "pta b" },
            { name: "pta d" },
            { name: "pta e" },
            { name: "pta f" },
            { name: "pta g" },
            { name: "pta h" },
            { name: "pta i" },
            { name: "pta j" },
            { name: "pta k" },
            { name: "pta l" },
            { name: "pta m" },
            { name: "pta n" },
            { name: "pta o" },
            { name: "pta p" },
            { name: "pta q" },
            { name: "pta r" }                        
        ]
    },
    {
        sbuName: "coastal",
        stores: [
            { name: "coastal a" },
            { name: "coastal c" },
            { name: "coastal b" },
            { name: "coastal d" },
            { name: "coastal e" },
            { name: "coastal f" },
            { name: "coastal g" },
            { name: "coastal h" },
            { name: "coastal i" },
            { name: "coastal j" },
            { name: "coastal k" },
            { name: "coastal l" },
            { name: "coastal m" },
            { name: "coastal n" },
            { name: "coastal o" },
            { name: "coastal p" },
            { name: "coastal q" },
            { name: "coastal r" }                        
        ]
    },
    {
        sbuName: "jhb",
        stores: [
            { name: "jhb a" },
            { name: "jhb c" },
            { name: "jhb b" },
            { name: "jhb d" },
            { name: "jhb e" },
            { name: "jhb f" },
            { name: "jhb g" },
            { name: "jhb h" },
            { name: "jhb i" },
            { name: "jhb j" },
            { name: "jhb k" },
            { name: "jhb l" },
            { name: "jhb m" },
            { name: "jhb n" },
            { name: "jhb o" },
            { name: "jhb p" },
            { name: "jhb q" },
            { name: "jhb r" }                        
        ]
    }                    
];

// init date picker
const picker = datepicker('.date-picker');

/* SBU / Store select swopper func */
$("#sbu_list").on("change", function(){

    // always clear store list first
    $("#store_list").empty();

    if($(this).val().length > 0){
        var getThisIndex = $(this).find(":selected").index() - 1;
        var getStoreList = storeListData[getThisIndex].stores;
        var html = "";
        for(var i = 0; i <= getStoreList.length - 1; i++){
            html += "<option value='"+getStoreList[i].name+"'>"+getStoreList[i].name+"</option>";
        }
        $("#store_list").prepend(html);
    }
});

let addWorkSheetEntry = function(dataObj){
    //console.log(dataObj);
    $.ajax({
        url: "/api/vmw/addworksheet",
        type: "POST",
        data: {
            allData: dataObj
        },
        success: function(data){
            console.log(data)
        }
    })
};

$(".save-btn").click(function(){

    var inputHasError = false;

    if($("#date-input").val() == ''){
        $("#date-input").addClass("error");
        inputHasError = true;
    } else {
        inputHasError = false;
    }

    $("select").each(function(k,v){
        if($(this).find(":selected").val() == '--Please Select--'){
            $(this).addClass("error");
            inputHasError = true;
        }
    });    

    if(inputHasError){ $(".error-text").show() } else { $(".error-text").hide() }

});

// onChange each select option item AND calculate % PER cat

let arrayData = {
    people: [],
    merBasicPrinc: [],
    housekeeping: [],
    valMsgElem: [],
    seasSpec: [],
    promotional: []
}

$("select").on("change", function(k,v){
    // always validate all select values first before submitting
    if($(this).val() != '--Please Select--'){

        // some bg color coding per select option - based on value
        if($(this).val() == '0' || $(this).val() == '1'){
            $(this).attr("style","background-color: red");
        } else if($(this).val() == '2'){
            $(this).attr("style","background-color: orange");
        } else {
            $(this).attr("style","background-color: white");
        }

        // remove error since we now have a valid value
        $(this).removeClass('error');

        let getParentClass = $(this).parent().parent().parent().parent().parent().attr('class').split(" ")[1];
        let getThisIndex = $(this).parent().parent().attr('class');
        let trAmount = $(this).parent().parent().parent().find("tr").length * 3;

        arrayData[getParentClass].splice(getThisIndex, 1, $(this).val() == 'na' ? 0: parseInt($(this).val(),10));
        let addUpVals = arrayData[getParentClass].reduce(function(i,v){ return parseInt(i,10) + parseInt(v,10) },0);
        let calculateValsFormula = addUpVals / parseInt(trAmount) * 100;     
        $("."+getParentClass+" .perc span").html(calculateValsFormula.toFixed(2));
    } else {
        $(this).attr("style","background-color: white");
    }
});

$('.addWorksheet-btn').click(function(){

    let worksheetData = [
        {
            username: localStorage.getItem('username'),
            date: $("#date-input").val(),
            sbu: $("#sbu_list").find(":selected").val(),
            store: $("#store_list").find(":selected").val()
        }
    ];


    //addWorkSheetEntry(worksheetData);

})