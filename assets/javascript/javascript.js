$(document).ready(function() {


    var firebaseConfig = {
        apiKey: "AIzaSyCy-8oYXObO2DKmI6LBM84Nv4QiE71Dqm8",
        authDomain: "train-scheduler-73a83.firebaseapp.com",
        databaseURL: "https://train-scheduler-73a83.firebaseio.com",
        projectId: "train-scheduler-73a83",
        storageBucket: "train-scheduler-73a83.appspot.com",
        messagingSenderId: "723647348200",
        appId: "1:723647348200:web:acfeb80bc0def0bef6385d"
      };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    
    
      var database = firebase.database();
    
    
      $("body").on("click", "#submit-id" , function(event) {
      
      event.preventDefault();
    
      // Get the input values
      var trainName = $( "#trainNameId" ).val().trim();
      var destId = $( "#destId" ).val().trim();
      var firstTrainTime = $("#firstTrainId").val().trim();
      var freqId = $( "#freqId" ).val().trim();
    
    
      // Moment JS
      var firstTimeConverted = moment(firstTrainTime, "hh:mm A").subtract(10, "years");
      var timeRemainder = moment().diff(moment(firstTimeConverted), "minutes") % freqId;
      var minutesAway = freqId - timeRemainder;
      var nextTrain = moment().add(minutesAway, "minutes").format("hh:mm A");
      
      
        
        database.ref().push(
    
      {
        trainName: trainName,
        destination: destId,
        firstTrainTime: firstTrainTime,
        frequency: freqId,
        Arrival: nextTrain,
        minutesAway: minutesAway,
      });
    
      
    
        database.ref().on("child_added", function(childSnapshot) {
    
    
          var fireTrainName  = childSnapshot.val().trainName;
          var Firedest   = childSnapshot.val().destination;
          var fireArrival  = childSnapshot.val().Arrival;
          var fireFreq  = childSnapshot.val().frequency;
    
    
    
          // Appending data to the table
          $(".table").append("<tr><td> " + childSnapshot.val().trainName +
            " </td><td> " + childSnapshot.val().destination +
            " </td><td> " + childSnapshot.val().frequency +
            " </td><td> " + childSnapshot.val().Arrival + "</td><td> " + childSnapshot.val().minutesAway + "</td></tr>");
    
        
        })
    
    
    
      $( "#trainNameId" ).val("");
      $( "#destId" ).val("");
      $( "#firstTrainId" ).val("");
      $( "#freqId" ).val("");
    
     
    
    
    })
    
    
    });