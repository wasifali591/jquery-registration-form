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
var checkedRadioButtons = [];
var catagorytName;
//
$(function () {
	//check all the required field vallidation
	checkNameValidation();
	checkEmailValidation();
	checkPasswordValidation();
	//scroll up the screen
	goUp();
	//hide all the labels designed for error message
	hideErrorLabels();
	//before add the data into the table, required field checking.
	writeDataFormToTable();
	//to delete a row
	deleteRow()
});

/*
	function-name: hideErrorLabels
	description: hide all the labels designed for error message
	comments: 
*/
function hideErrorLabels() {
	$("#wrongName").hide();
	$("#wrongEmail").hide();
	$("#wrongPassword").hide();
	$("#wrongInput").hide();
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
	selectGender();
	selectCatagory();
	$("#tableData").append('<tr><td>' + $("#name").val() + '</td><td>' + email + '</td><td>' + $("#psw").val() + '</td><td>' + $("#add").val() + '</td><td>' + $("#bday").val() + '</td><td>' + checkedRadioButtons + '</td><td>' + catagorytName + '</td><td>' + checkedCheckbox + '</td><td><input type="button" value="Delete" id="delButton"></td></tr>');
	$("#wrongInput").hide();
	inlineEdit();
}

/*
	function-name: checkNameValidation() 
	description: add reali-time-validation on input for name
	comment: take the field-id(#name) as input, if the input does not matches with the validation show a error message
*/
function checkNameValidation() {
	$("#name").on('blur', function (event) {
		name = $("#name").val();
		if (name.length === 0) {
			$("#wrongName").html("Enter your Name.");
			$("#wrongName").show();
			errorName = 1;
		} else {
			$("#wrongName").hide();
			errorName = 0;
		}
	});

}

/*
	function-name: checkEmailValidation
	description: add reali-time-validation on input for email
	comment: take the field-id(#email) as input, if the input does not matches with the validation show a error message
*/
function checkEmailValidation() {
	$("#email").on('blur', function (event) {
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
	});

}

/*
	function-name: checkPasswordValidation
	description: add reali-time-validation on input for password
	comment: take the field-id(#psw) as input, if the input does not matches with the validation show a error message
*/
function checkPasswordValidation() {
	$("#psw").on('blur change', function (event) {
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
	});
}

/*
	function-name:selectCheckbox
	description: read the checked checkboxes value
	comment: read the values from a array(sub) and store into another global array(checkedCheckbox)
*/
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

/*
	function-name:selectGender
	description: read the checked radio buttons value
	comment: read the values from input(gender) and store into another global variable(checkedRadioButtons)
*/
function selectGender() {
	var radioButtons = $("input[name='gender']");
	var j = 0;
	for (var i = 0; i < radioButtons.length; i++) {
		if (radioButtons[i].checked) {
			checkedRadioButtons[j] = radioButtons[i].value;
			j++;
		}
	}
}

/*
	function-name:selectCatagory
	description: read the selected value from a drop down list
	comment: read the values from input(catagory) and store into another global variable(catagorytName)
*/
function selectCatagory() {
	catagorytName = $('#catagory').find(":selected").text();
}

/*
	function-name:resetForm
	description: reset all the input field
	comments: reset all the textfield and other like DOB except gender and catagory. gender and 
	catagory are reset into a general value 
*/
function resetForm() {
	$('#name').val("");
	$('#email').val("");
	$('#psw').val("");
	$('#add').val("");
	$('bday').val("");
	uncheckCheckbox();
	$('#Male').prop('checked', true);
	$('#catagory').prop('selectedIndex', 0);

}

/*
	function-name:uncheckCheckbox
	description: unchecked all the checkboxes
*/
function uncheckCheckbox() {
	$('#PHP').prop('checked', false);
	$('#JAVA').prop('checked', false);
	$('#HTML').prop('checked', false);
	$('#CSS').prop('checked', false);
}

/*
	function-name:goUp
	description: after refreshing the page , page will go on the top
*/
function goUp() {
	$("html").animate({ scrollTop: 0 }, "slow");
}

/*
	function-name:inlineEdit
	description:to edit table data, dpouble click on the table field
	comments:
*/
function inlineEdit() {
	$("td").on('dblclick', function (event) {
		var OriginalContent = $(this).html();

		var inputNewText = prompt("Enter new content for:", OriginalContent);

		if (inputNewText != null) {
			$(this).html(inputNewText)
		}
	});
}

/*
	function-name:writeDataFormToTable
	description: after clicking on the button(registerBtn) date store from the for to the table
	comments: before inserting the data into table flow goes through all the validation checking and 
	also for unique email
*/
function writeDataFormToTable() {
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
				goUp();
				resetForm();
			}
		} else {
			$("#wrongInput").html("Enter the required field");
			$("#wrongInput").show();
		}
	});
}

/*
	function-name:deleteRow
	description: delete a row from the table
	comments: row will be deleted after a confermation checking
*/
function deleteRow() {
	$("#registrationTable").on('click', 'input[id="delButton"]', function (event) {
		var choice = confirm('Do you really want to delete this record?');
		if (choice === true) {
			$(this).parent().parent().remove();
		}
	});
}