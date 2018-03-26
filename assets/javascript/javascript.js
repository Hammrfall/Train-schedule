var currentTrain = {index: "",trainName: "",
    destination: "", firstTrainTime: "", frequency: ""}

var config = {
    apiKey: "AIzaSyChFkhV6bhl9IMX-VXY5fkwGbg8_3Jts4s",
    authDomain: "train-schedule-55b13.firebaseapp.com",
    databaseURL: "https://train-schedule-55b13.firebaseio.com",
    projectId: "train-schedule-55b13",
    storageBucket: "train-schedule-55b13.appspot.com",
    messagingSenderId: "755536802556"
};

firebase.initializeApp(config); //creates connection to firebase
const database = firebase.database;
const parentObject = database().ref().child('Trains');

function addRow(rowData) { //retrieves data and adds data rows to display
    var calcResults = nextArrival(rowData.firstTrainTime, rowData.frequency)
    var nextTrainTime = moment(calcResults[0]).format("hh:mm a")
    var minutesUntilArrival = calcResults[1]
    var tableBody = $("#tablebody");
    var newRow = $("<tr>");
    $(newRow).addClass("lightestcontainer")
    $(newRow).attr("data-index", rowData.index)
        .append(addColumn(rowData.trainName))
        .append(addColumn(rowData.destination))
        .append(addColumn(rowData.frequency))
        .append(addColumn(nextTrainTime))
        .append(addColumn(minutesUntilArrival))
    $(tablebody).append(newRow);
}

function addColumn(value) { //called by addRow to populate cells
    var newCol = $("<th>");
    $(newCol).attr("scope", "col").text(value);
    return newCol;
}

function nextArrival(firstTrain, frequency) { //does the time calculations
    var nextTrainTime = moment(firstTrain, "HH:mm");
    checkValue = -1
    while (checkValue < 0) {
        checkValue = moment(nextTrainTime).diff(moment(), "minutes");
        if (checkValue < 0) {
            nextTrainTime.add(Number(frequency), 'minutes');
        }
    }
    var returnobject = [nextTrainTime, checkValue]
    return returnobject;
}

function validData(data) { //checks input and provides user feedback
    returnValue = true;
    if (data.trainName == "") {
        window.alert("You must have a name for the train");
        $("#trainname").val("").focus();
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

function isMilitaryTime(time) { //called by validData to validate military time
    var returnValue = true;
    var hours = time.slice(0, 2)
    var minutes = time.slice(-2)
    if (time.length !== 5) {
        returnValue = false;
    } else if (time.charAt(2) !== ":") {
        returnValue = false;
    } else if (isNaN(hours) || hours > 24 || hours < 0 ) {
        returnValue = false;
    } else if (isNaN(minutes) || minutes >= 60 || minutes < 0) {
        returnValue = false;
    }
    return returnValue;
}
// Call backs
$("#submitbutton").click("click", function () {
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