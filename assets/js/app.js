/* gif madness */
// Initialize Firebase
var config = {
apiKey: "AIzaSyAb2apiV3KDh87P95icxaUsAPNPuFAeWS4",
authDomain: "trainscheduler-2ec99.firebaseapp.com",
databaseURL: "https://trainscheduler-2ec99.firebaseio.com",
projectId: "trainscheduler-2ec99",
storageBucket: "trainscheduler-2ec99.appspot.com",
messagingSenderId: "664536583406"
};
firebase.initializeApp(config);



let trainScheduler = (function(){
    // set defaults
    let db = firebase.database();
    let fields = ['trainName','destination','firstTrainTime','frequency'];
    let fieldsObj = {}; //to fill and push to firebase

    // bind events 
    $('.submit').on('click', validateTrain);
    $(document).on('click', 'button.edit', getTrain);
    $(document).on('click', 'button.remove', removeTrain);

    // cache elements
    trainIdEl = $('#trainId');
    trainNameEl = $('#trainName');
    destinationEl = $('#destination');
    frequencyEl = $('#frequency');
    firstTrainTimeEl = $('#firstTrainTime');
    successEl = $('.success');

    // get trains 
    loadTrainTable();
    

    function validateTrain(e) {
        e.preventDefault();
        e.stopPropagation();
        let theForm = document.getElementById('trainForm');
        // let regex = /(^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$)/;
        // console.log(regex.test($('#firstTrainTime').val()));
        if (theForm.checkValidity() === false){ //html5 method
            theForm.classList.add('was-validated');

        } else {
            let trainId = trainIdEl.val() == '' ? '' : trainIdEl.val();
            //console.log('validate trainId: ' + trainId);
            storeTrain(trainId);
            scrollToEl('.schedule-wrapper');
        }
    }
    
    function storeTrain(trainId){
        fields.map(function(field){
            fieldsObj[field + ''] = $('#' + field).val().trim();
            $('#' + field).val(''); // empty fields after getting vals
        });
        if (trainId != ''){
            //console.log('store trainId: ' + trainId);
            db.ref(trainId).set(fieldsObj);
            message = 'Train updated!';
        } else {
            db.ref().push(fieldsObj);
            message = 'Train added!';
        }
        showMessage(message);
        loadTrainTable();
    }

    function getTrain(){
        let trainId = $(this).attr('data-id');
        var ref = db.ref(trainId);
        ref.once('value').then(function(snapshot) {
            fields.map(function(field) {
                $('#' + field).val(snapshot.val()[field]);
            });
            trainIdEl.val(trainId);
        });
        $('.train-form h3').text('Update Train');
        scrollToEl('.train-form');
    }

    function removeTrain(){
        let trainId = $(this).attr('data-id');
        modal.initModal(function(x){
            let train = db.ref(trainId);
            train.remove()
                .then(function(){
                    showMessage('Train removed!');
                    loadTrainTable();
                });
        });
    }

    function loadTrainTable(){
        $('.schedule tbody').empty();
        db.ref().on('child_added', function(childSnapshot){
            fields.map(function(field){
                fieldsObj[field] = childSnapshot.val()[field];
            });
            let nextTime = getNextTime(fieldsObj['firstTrainTime'], fieldsObj['frequency'])

            let editBtn = $('<button>')
                .html('<i class="icon-pencil"></i>')
                .addClass('edit')
                .attr('data-id', childSnapshot.key);
            let deleteBtn = $('<button>')
                .html('<i class="icon-bin"></i>')
                .addClass('remove')
                .attr('data-id', childSnapshot.key);
            let newRow = $('<tr>').addClass('train');
            let newCol1 = $('<td>').text(fieldsObj['trainName']);
            let newCol2 = $('<td>').text(fieldsObj['destination']);
            let newCol3 = $('<td>').addClass('centered').text(fieldsObj['frequency']);
            let newCol4 = $('<td>').addClass('centered').text(nextTime.nextArrival);
            let newCol5 = $('<td>').text(nextTime.minutesAway);
            let newCol6 = $('<td>').append(editBtn).append(deleteBtn);
            
            newRow.append([newCol1,newCol2,newCol3,newCol4,newCol5,newCol6]);
            $('.schedule tbody').append(newRow);
        }, function(errorObj){
            console.log('the read failed: ' + errorObj.code);
        });
    }

    
    // utils
    function showMessage(message){
        successEl.slideDown(300,function(){
            successEl.text(message);
            var timer = setTimeout(function(){
                successEl.slideUp(300);
                clearTimeout(timer);
            },3000);
        });
    }

    function scrollToEl(el){
        $('html, body').animate({
            scrollTop: $(el).offset().top
        }, 500, 'linear');
    }

    function getNextTime(startTime, freq) {
        let nowTime = moment();
        let start = moment(startTime, 'HH:mm');
        let nextTime;
        do {
            nextTime = start.add(freq, 'm');
        }
        while(nextTime.isBefore(nowTime));
        return {
            nextArrival: nextTime.format('h:mm a'),
            minutesAway: nowTime.to(nextTime, 'm'),
        };
    }
    
});
trainScheduler();


let modal = (function(m){
    m = {};
    let modal = $('.modal');
    m.initModal = function(callback){
        modal.fadeIn(300);
        $('.modal .remove').on('click', function(){
            callback(true);
        });
    }

    $('.modal .modal_close, .modal .cancel').on('click', function(e){
        if (modal.is(':visible')) {
            modal.fadeOut('fast');
        }	
    });
    window.onclick = function(e) {
        if ($(e.target).hasClass('modal')) {
            modal.fadeOut('fast');
        }
    }
    return m;
})();