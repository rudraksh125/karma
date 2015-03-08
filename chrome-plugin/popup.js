// set up the page once the DOM is loaded (the other plugin stuff has done it's business).
document.addEventListener('DOMContentLoaded', function() {

  // dynamically change the title based on the page source.
  try {
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
      console.log(tabs[0]);
      $("#pagetitle").html("Karma score for " +tabs[0].title);
    });
  }
  catch (ex) {
  }

  // get static references to the buttons.
  var $up = $("#up"),
      $dn = $("#dn"),
      $ticker = $("#ticker"),
  // mock up some dummy data.
      dummyData = [
        {'date': '2015-02-05', 'Karma': 10},
        {'date': '2015-02-06', 'Karma': 15},
        {'date': '2015-02-07', 'Karma': 12},
        {'date': '2015-02-08', 'Karma': 17},
        {'date': '2015-02-09', 'Karma': 10}
      ];

  // This function updates the time series based on the users click
  var updateGraph = function(newData){
    $ticker.empty();

    new Morris.Line({
      element: 'ticker',
      data: newData,
      'xkey': 'date',
      'ykeys': ['Karma'],
      'labels': ['Karma']
    });  
  }
  
  // The "like" button's click function. Add a few points to the Karma score,
  // and update the view to the user.
  $up.click(function(){
    // Add the clicked class to the button, changing the view.
    $up.addClass('clked').removeClass('unclked');
    // make sure the down button is not clicked.
    $dn.removeClass('clked').addClass('unclked');

    // update the karma score (make it higher), and show it to the user.
    dummyData[4]['Karma'] = 15;
    updateGraph(dummyData);
  });

  // This is the "dislike" button's click function. Does the opposite of the
  // click function.
  $dn.click(function(){
    $dn.addClass('clked').removeClass('unclked');
    $up.removeClass('clked').addClass('unclked');

    dummyData[4]['Karma'] = 5;
    updateGraph(dummyData);
  });  

  // show the initial Karma graph to the user.
  updateGraph(dummyData);
});


