// server address
let _baseUrl = "http://localhost";
let _port = "3000";

function getCars() {
    let list = document.getElementById("car-list");
    list.innerHTML = "";
    jQuery.get(`${_baseUrl}:3000/api/car`, function(data) {
        data.data.forEach((car) => {
            let newElement = document.createElement("li");
            let edit = `<a href='#' data-carid='${car.id}' data-carmake='${car.make}' data-carmodel='${car.model}' data-caryear='${car.year}' onclick='editCar(event)'>edit</a>`;
            let del = `<a href='#' data-carid='${car.id}' onclick='delCar(event)'>delete</a>`;
            newElement.innerHTML = `${car.id} Make: ${car.make} Model: ${car.model} Year: ${car.year} ${edit} | ${del}`;
            list.appendChild(newElement);
        });
    });
}

function addCar(e) {
    e.preventDefault();
    let make = $("#make");
    let model = $("#model");
    let carid = $("#carid");
    let year = $("#year");

    let makeVal = make.val();
    let modelVal = model.val();
    let yearVal = year.val();

    if(makeVal == "" || modelVal == "" || yearVal == "") {
        alert('Make and Model cannot be blank');
        return;
    }

    if (+carid.val() === 0) {
        jQuery.post(`${_baseUrl}:${_port}/api/car`, { make: makeVal, model: modelVal, year: yearVal }, function(data) {
            getCars();
        });
    } else {
        $.ajax({
                method: "PUT",
                url: `${_baseUrl}:${_port}/api/car/${carid.val()}`,
                data: { make: make.val(), model: model.val(), year: year.val() }
            })
            .done(function(msg) {
                getCars();
            });
    }

    carid.val(0);
    $("#car-submit").val('Add Car');
    model.val("");
    make.val("");
    year.val("");
}

function editCar(e) {
    e.preventDefault();
    let el = $(e.srcElement);
    let make = $("#make");
    let model = $("#model");
    let id = $("#carid");
    let year = $("#year");
    

    let makeVal = el.data("carmake");
    let modelVal = el.data("carmodel");
    let idVal = el.data("carid");
    let yearVal = el.data("caryear");

    $("#car-submit").val(`Edit Car #${idVal}`);
    make.val(makeVal);
    model.val(modelVal);
    id.val(idVal);
    year.val(yearVal);
}

function delCar(e) {
    e.preventDefault();
    
    let el = $(e.srcElement);
    let carid = el.data("carid");
    if(confirm(`Are you sure you want to delete car #${carid}`)) {
        $.ajax({
                method: "DELETE",
                url: `${_baseUrl}:${_port}/api/car/${carid}`
            })
            .done(function(msg) {
                getCars();
            });
    }
}

function clearEdit() {

}

// run getCars on 
$(function() {
    // server is running from same IP as front-end so get the hostname
    _baseUrl = `http://${window.location.hostname}`;
    getCars();
    $("#add-car").on('submit', addCar);
   
});