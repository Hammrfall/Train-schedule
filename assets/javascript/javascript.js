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
const childObjects = parentObject.child('Train');

$(document).ready(function () {

});

function addRow(rowData) {
    var tableBody = $("#tablebody");
    var newRow = $("<tr>");
    $(newRow).addClass("lightestcontainer")
    $(newRow).attr("data-index", rowData.index);
    $(newRow).append(addColumn(rowData.trainName));
    $(newRow).append(addColumn (rowData.destination));
    $(newRow).append(addColumn(rowData.frequency));

    $(tablebody).append(newRow);
}

function addColumn(value) {
    var newCol = $("<th>");
    $(newCol).attr("scope", "col");
    $(newCol).text(value);
    return newCol;
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
   parentObject.push(currentTrain)
    // newTrainRef.setValue(obj.toDictionary())

});

// const parentObject = firebase.database().ref().child('Trains');



parentObject.on("child_added", snapshot => {
    console.log(snapshot);
    currentTrain.index = snapshot.key
    currentTrain.trainName = snapshot.val().trainName;
    currentTrain.destination = snapshot.val().destination;
    currentTrain.firstTrainTime = snapshot.val().firstTrainTime
    currentTrain.frequency = snapshot.val().frequency
    addRow(currentTrain);
});