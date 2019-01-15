/**
* File Name  : registrationScript
* Description : css to design the registration-form
* Created date : 15/01/2019
* Author  : Md Wasif Ali
* Comments : 
*/
var errorName = 1;
var errorEmail = 1;
var errorPassword = 1;
var emailArray = [];
var e = 0;
var checkedCheckbox = [];
//
$(function () {
	//
	hideErrorLabels();
	//
	attachEventListeners();
});

function hideErrorLabels() {
	$("#wrongName").hide();
	$("#wrongEmail").hide();
	$("#wrongPassword").hide();
	$("#wrongInput").hide();
}

function attachEventListeners() {
	$("#name").on('blur', function (event) {
		check_name();
	});

	$("#email").on('blur', function (event) {
		check_email();
	});

	$("#psw").on('blur', function (event) {
		check_password();
	});

	//before add the data into the table, required field checking.
	$("#registerBtn").click(function () {
		if (errorName == 0 && errorEmail == 0 && errorPassword == 0) {
			email = $("#email").val();
			var flag = false;
			for (var i = 0; i < emailArray.length; i++) {
				if (emailArray[i] == email) {
					flag = true;
				}
			}
			if (flag) {
				alert("Already registered.")
			} else {
				show_result();
			}
		} else {
			$("#wrongInput").html("Enter the required field");
			$("#wrongInput").show();
		}
	});

	//to delete a row
	$("#registrationTable").on('click', 'input[id="delButton"]', function (event) {
		var choice = confirm('Do you really want to delete this record?');
		if (choice === true) {
			$(this).parent().parent().remove();
		}
	});
}

/*
	function-name: show_result
	description: store the data taken from the form into the table
	comment:
*/
function show_result() {
	email = $("#email").val();
	emailArray[e] = email;
	e++;
	selectCheckbox();
	$("#tableData").append('<tr><td>' + $("#name").val() + '</td><td>' + email + '</td><td>' + $("#psw").val() + '</td><td>' + $("#add").val() + '</td><td>' + $("#bday").val() + '</td><td>' + '</td><td>' + '</td><td>' + checkedCheckbox + '</td><td><input type="button" value="Delete" id="delButton"></td></tr>');
	$("#wrongInput").hide();
}

/*
	function-name: check_name
	description: add reali-time-validation on input for name
	comment: take the field-id(#name) as input, if the input does not matches with the validation show a error message
*/
function check_name() {
	name = $("#name").val();
	if (name.length === 0) {
		$("#wrongName").html("Enter your Name.");
		$("#wrongName").show();
		errorName = 1;
	} else {
		$("#wrongName").hide();
		errorName = 0;
	}
}

/*
	function-name: check_email
	description: add reali-time-validation on input for email
	comment: take the field-id(#email) as input, if the input does not matches with the validation show a error message
*/
function check_email() {
	email = $("#email").val();
	var re = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
	if (!re.test(email)) {
		$("#wrongEmail").html("Enter valid email address.");
		$("#wrongEmail").show();
		errorEmail = 1;
	} else {
		$("#wrongEmail").hide();
		errorEmail = 0;
	}
}

/*
	function-name: check_password
	description: add reali-time-validation on input for password
	comment: take the field-id(#psw) as input, if the input does not matches with the validation show a error message
*/
function check_password() {
	psw = $("#psw").val();
	var re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
	if (!re.test(psw)) {
		$("#wrongPassword").html("Password must contain the following:<br>1.A lower case letter<br>2.A capital letter<br>3.A number<br>4.Minimum 8 characters");
		$("#wrongPassword").show();
		errorPassword = 1;
	} else {
		$("#wrongPassword").hide();
		errorPassword = 0;
	}
}

function selectCheckbox() {
	var checkboxes = $("input[name='sub[]']");
	var j = 0;
	for (var i = 0; i < checkboxes.length; i++) {
		if (checkboxes[i].checked) {
			checkedCheckbox[j] = checkboxes[i].value;
			j++;
		}
	}
}
