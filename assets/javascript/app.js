  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAx51SsffxnTe12uP2g68MJ-Etko9zhZH8",
    authDomain: "traintime-5f793.firebaseapp.com",
    databaseURL: "https://traintime-5f793.firebaseio.com",
    projectId: "traintime-5f793",
    storageBucket: "traintime-5f793.appspot.com",
    messagingSenderId: "843150274471"
  };
  firebase.initializeApp(config);


  var database = firebase.database();
//change the vars to relate to what im doing
  var name;
  var loc;
  var trainTime;
  var frequency;
  var nextArrival;
  var minutesAway;
  var currentTime;
  var trainTimeConverted;
  var timeDifference;
  var timeApart;


  function nextTrain() {  
    trainTimeConverted = moment(trainTime, "hh:mm").subtract(1, "days");
    console.log(trainTimeConverted);

    // gets the current time
    currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the train times
    timeDifference = moment().diff(moment(trainTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + timeDifference);

    // Time apart (time since the last train)
    timeApart = timeDifference % frequency;

    // Minute Until Train
    minutesAway = frequency - timeApart;
    console.log("MINUTES TILL NEXT TRAIN: " + minutesAway);

    // Next Train
    nextArrival = moment().add(minutesAway, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextArrival).format("hh:mm"));
    nextArrival = moment(nextArrival).format("hh:mm");
}

  $("#submit").on("click", function(event) {
    event.preventDefault();
  	console.log("you are in the button");
  	name = $("#TrainName").val().trim();
  	loc = $("#Destination").val().trim();
  	trainTime = $("#FirstTime").val().trim();
  	frequency = $("#Frequency").val().trim();
    nextTrain()

  	database.ref().push({
  		name: name,
  		loc: loc,
  		frequency: frequency,
  		dateAdded: firebase.database.ServerValue.TIMESTAMP,
  		nextArrival: nextArrival,
  		minutesAway: minutesAway
  	
  	});
});

database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot){
	 	var newRow = $("<tr>");

	 	var nameCOL = $("<td>");
	 	var locCOL = $("<td>");
	 	var frequencyCOL = $("<td>");
	 	var nextArrivalCOL = $("<td>");
	 	var minutesAwayCOL = $("<td>");
	 	

	 	nameCOL.html(snapshot.val().name);
	 	locCOL.html(snapshot.val().loc);
	 	frequencyCOL.html(snapshot.val().frequency);
	 	nextArrivalCOL.html(snapshot.val().nextArrival);
	 	minutesAwayCOL.html(snapshot.val().minutesAway);
	 	

	 	newRow.append(nameCOL);
	 	newRow.append(locCOL);
	 	newRow.append(frequencyCOL);
	 	newRow.append(nextArrivalCOL);
	 	newRow.append(minutesAwayCOL);
	 	

	 	$("#forAdditions").append(newRow);


}); 


