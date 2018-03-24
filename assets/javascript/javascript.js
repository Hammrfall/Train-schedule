var currentTrain = {
    index: "",
    trainName: "",
    destination: "",
    firstTrainTime: "",
    frequency: ""
}

var config = {
    apiKey: "AIzaSyChFkhV6bhl9IMX-VXY5fkwGbg8_3Jts4s",
    authDomain: "train-schedule-55b13.firebaseapp.com",
    databaseURL: "https://train-schedule-55b13.firebaseio.com",
    projectId: "train-schedule-55b13",
    storageBucket: "train-schedule-55b13.appspot.com",
    messagingSenderId: "755536802556"
};

firebase.initializeApp(config);
const database = firebase.database;
const parentObject = database().ref().child('Trains');

$(document).ready(function () {

});

function addRow(rowData) {
    var tableBody = $("#tablebody");
    var newRow = $("<tr>");
    $(newRow).addClass("lightestcontainer")
    $(newRow).attr("data-index", rowData.index)
        .append(addColumn(rowData.trainName))
        .append(addColumn(rowData.destination))
        .append(addColumn(rowData.frequency));
    $(tablebody).append(newRow);
}

function addColumn(value) {
    var newCol = $("<th>");
    $(newCol).attr("scope", "col").text(value);
    return newCol;
}

function validData(data) {
    returnValue = true;
    var militaryTime = data.firstTrainTime;
    var firstString = militaryTime.charAt(2);
    var secondString = militaryTime.slice(0, 2);
    var thirdString = militaryTime.slice(-2);
    if (data.trainName == "") {
        window.alert("You must have a name for the train");
        $("#trainname").val("").focus();
        // $("#trainname").focus();
        returnValue = false;
    } else if (data.destination == "") {
        window.alert("You must have a train destination");
        $("#destination").val("").focus();
        returnValue = false;
    } else if (isMilitaryTime(data.firstTrainTime) == false) {
        window.alert("You must use valid military time format HH:mm");
        $("#firsttraintime").val("").focus();
        returnValue = false;
    } else if (isNaN(data.frequency) || data.frequency == "") {
        window.alert("You must input train frequency (in minutes)");
        $("#frequency").val("").focus();
        returnValue = false;
    }
    return returnValue;
}

function isMilitaryTime(time) {
    returnValue = true;
    if (time.length !== 5) {
        returnValue = false;
    } else if (time.charAt(2) !== ":") {
        returnValue = false;
    } else if (isNaN(time.slice(0, 2))) {
        returnValue = false;
    } else if (isNaN(time.slice(-2))) {
        returnValue = false;
    }
    return returnValue;
}
// Call backs
$("#submitbutton").click("click", function () {
    // TODO: need input validation
    currentTrain.trainName = $("#trainname").val().trim()
    currentTrain.destination = $("#destination").val().trim()
    currentTrain.firstTrainTime = $("#firsttraintime").val().trim()
    currentTrain.frequency = $("#frequency").val().trim();
    if (validData(currentTrain)) {
        parentObject.push(currentTrain)
    }
});

parentObject.on("child_added", snapshot => {
    currentTrain.index = snapshot.key
    currentTrain.trainName = snapshot.val().trainName
    currentTrain.destination = snapshot.val().destination
    currentTrain.firstTrainTime = snapshot.val().firstTrainTime
    currentTrain.frequency = snapshot.val().frequency;
    addRow(currentTrain);
});