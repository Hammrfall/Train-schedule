var currentTrain = {
    trainName: "orient express",
    destination: "Istanbul",
    firstTrainTime: "10:00",
    frequency: 150
}

$(document).ready(function () {


});


var config = {
    apiKey: "AIzaSyChFkhV6bhl9IMX-VXY5fkwGbg8_3Jts4s",
    authDomain: "train-schedule-55b13.firebaseapp.com",
    databaseURL: "https://train-schedule-55b13.firebaseio.com",
    projectId: "train-schedule-55b13",
    storageBucket: "train-schedule-55b13.appspot.com",
    messagingSenderId: "755536802556"
};
firebase.initializeApp(config);

var database = firebase.database;
addRow(currentTrain);

function addRow(rowData) {
    var tableBody = $("#tablebody");
    var newRow = $("<tr>");
    $(newRow).addClass("lightestcontainer")

    var newCol1 = $("<th>");
    $(newCol1).attr("scope", "col");
    $(newCol1).text(rowData.trainName);
    $(newRow).append(newCol1);

    var newCol2 = $("<th>");
    $(newCol2).attr("scope", "col");
    $(newCol2).text(rowData.destination);
    $(newRow).append(newCol2);

    var newCol3 = $("<th>");
    $(newCol3).attr("scope", "col");
    $(newCol3).text(rowData.frequency);
    $(newRow).append(newCol3);

    $(tablebody).append(newRow);
}


// Call backs
$("#submitbutton").click ("click", function() {
    // TODO: need input validation
    currentTrain.trainName = $("#trainname").val().trim();
    currentTrain.destination = $("#destination").val().trim();
    currentTrain.firstTrainTime = $("#firsttraintime").val().trim();
    currentTrain.frequency = $("#frequency").val().trim();
    //TODO: send new values to database
    // let newTrainRef = database.
   
    // newTrainRef.setValue(obj.toDictionary())

});