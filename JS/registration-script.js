/**
* File Name  : registration-script
* Description : css to design the registration-form
* Created date : 17/01/2019
* Author  : Md Wasif Ali
* Comments : 
*/
var nameHasError = 1;
var emailHasError = 1;
var passwordHasError = 1;
var emailArray = [];
var registeredEmailIndex = 0;
var checkedCheckbox = [];
var checkedRadioButtons = [];
var casteCatagoryName;
var selectedCountry;
var selectedState;
var SelectedCity;
var editableContentsArray=[];
var editableContentIndex;

//relationship between country state and city
var countries = getCountries();

//
$(function () {
	//check all the required field vallidation
	selectCountriesDetails();
	checkNameValidation();
	checkEmailValidation();
	checkPasswordValidation();
	//scroll up the screen
	goUp();
	//hide all the labels designed for error message
	hideErrorLabels();
	//before address the data into the table, required field checking.
	writeDataFormToTable();
	//to delete a row
	deleteRow();
	editDataTable();
	inlineEdit();
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
	function-name: showResultOnTable
	description: store the data taken from the form into the table
	comment:
*/
function showResultOnTable() {
	email = $("#email").val();
	emailArray[registeredEmailIndex] = email;
	registeredEmailIndex++;
	selectCheckbox();
	selectGender();
	selectCatagory();
	selectedCountryStateCityDetails()
	$("#tableData").append('<tr><td class="editableColumns">' + $("#name").val() + '</td><td class="editableColumns">' + email + '</td><td class="editableColumns" >' + $("#password").val() + '</td><td class="editableColumns" >' + $("#address").val() + '</td><td class="editableColumns" >' + selectedCountry + '</td><td class="editableColumns" >' + selectedState + '</td><td class="editableColumns" >' + SelectedCity + '</td><td class="editableColumns" >' + $("#dateOfBirth").val() + '</td><td class="editableColumns" >' + checkedRadioButtons + '</td><td class="editableColumns" >' + casteCatagoryName + '</td><td class="editableColumns" >' + checkedCheckbox + '</td><td><input type="button" value="Edit" id="editButton"><input type="button" value="Delete" id="deleteButton"><input type="button" value="Save" id="saveButton" style="display:none"><input type="button" value="Cancel" id="cancelButton" style="display:none"></td></tr>');
	$("#wrongInput").hide();
	inlineEdit();
}

/*
	function-name: checkNameValidation() 
	description: address reali-time-validation on input for name
	comment: take the field-id(#name) as input, if the input does not matches with the validation show a error message
*/
function checkNameValidation() {
	$("#name").on('blur', function (event) {
		name = $("#name").val();
		if (name.length === 0) {
			$("#wrongName").html("Enter your Name.");
			$("#wrongName").show();
			nameHasError = 1;
		} else {
			$("#wrongName").hide();
			nameHasError = 0;
		}
	});

}

/*
	function-name: checkEmailValidation
	description: address reali-time-validation on input for email
	comment: take the field-id(#email) as input, if the input does not matches with the validation show a error message
*/
function checkEmailValidation() {
	$("#email").on('blur', function (event) {
		email = $("#email").val();
		var re = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
		if (!re.test(email)) {
			$("#wrongEmail").html("You have entered a wrong e-mail address. Please try again");
			$("#wrongEmail").show();
			emailHasError = 1;
		} else {
			$("#wrongEmail").hide();
			emailHasError = 0;
		}
	});

}

/*
	function-name: checkPasswordValidation
	description: address reali-time-validation on input for password
	comment: take the field-id(#password) as input, if the input does not matches with the validation show a error message
*/
function checkPasswordValidation() {
	$("#password").on('blur change', function (event) {
		password = $("#password").val();
		var re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
		if (!re.test(password)) {
			$("#wrongPassword").html("Password must contain the following:<br>1.A lower case letter<br>2.A capital letter<br>3.A number<br>4.Minimum 8 characters");
			$("#wrongPassword").show();
			passwordHasError = 1;
		} else {
			$("#wrongPassword").hide();
			passwordHasError = 0;
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
	comment: read the values from input(catagory) and store into another global variable(casteCatagoryName)
*/
function selectCatagory() {
	casteCatagoryName = $('#casteCatagory').find(":selected").text();
}

/*
	function-name:resetForm
	description: reset all the input field
	comments: reset all the textfield and other like DOB except gender and catagory. gender and 
	catagory are reset into a general value 
*/
function resetForm() {
	$('#stateName').hide();
	$('#cityName').hide();
	$('#name').val("");
	$('#email').val("");
	$('#password').val("");
	$('#address').val("");
	$('dateOfBirth').val("");
	uncheckCheckbox();
	$('#Male').prop('checked', true);
	$('#casteCatagory').prop('selectedIndex', 0);
	$('#selectCountry').prop('selectedIndex', 0);
	$('#selectState').prop('selectedIndex', 0);
	$('#selectCity').prop('selectedIndex', 0);
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
		$(this).prop('contenteditable', true);
	});
}

/*
	function-name:writeDataFormToTable
	description: after clicking on the button(registerButtonn) date store from the for to the table
	comments: before inserting the data into table flow goes through all the validation checking and 
	also for unique email
*/
function writeDataFormToTable() {
	$("#registerButtonn").click(function () {
		if (nameHasError == 0 && emailHasError == 0 && passwordHasError == 0) {
			email = $("#email").val();
			var flag = false;
			for (var i = 0; i < emailArray.length; i++) {
				if (emailArray[i] == email) {
					flag = true;
				}
			}
			if (flag) {
				alert("Email-Id is already used.Please try with a new Email-Id.")
				resetForm();
			} else {
				showResultOnTable();
				goUp();
				resetForm();
			}
		} else {
			$("#wrongInput").html("Enter the required field");
			$("#wrongInput").show();
			goUp();
		}
	});
}

/*
	function-name:deleteRow
	description: delete a row from the table
	comments: row will be deleted after a confermation checking
*/
function deleteRow() {
	$("#registrationTable").on('click', 'input[id="deleteButton"]', function (event) {
		var choice = confirm('Do you really want to delete this record?');
		if (choice === true) {
			$(this).parent().parent().remove();
		}
	});
}

function selectCountriesDetails() {
	//hide staes and city
	$('#stateName').hide();
	$('#cityName').hide();
	// $('#selectState').hide();
	// $('#selectCity').hide();
	//Get html elements
	var selectCountry = $("#selectCountry");
	var selectState = $("#selectState");
	var selectCity = $("#selectCity");

	var options = "<option value='' selected='selected'>-- Select Country --</option>";
	//Load countries
	jQuery.each(countries, function (key, value) {
		options += "<option value='" + value.countryName + "'>" + value.countryName + "</option>";
	});
	selectCountry.html(options);
	//according to country( on change event) state will be populated
	$('#selectCountry').on('change', function () {
		$('#stateName').show();
		var countryName = $('#selectCountry').val();
		var stateOptions = "<option value='' selected='selected'>-- Select States --</option>";
		jQuery.each(countries, function (key, value) {
			if (countryName == value.countryName) {
				console.log(value.states);
				jQuery.each(value.states, function (key, value) {
					stateOptions += "<option value='" + value.stateName + "'>" + value.stateName + "</option>";
				});
			}
		});
		selectState.html(stateOptions);
	});
	//according to state( on change event) city will be populated
	$('#selectState').on('change', function () {
		$('#cityName').show();
		var countryName = $('#selectCountry').val();
		var stateName = $('#selectState').val();
		var cityOptions = "<option value='' selected='selected'>-- Select City --</option>";
		jQuery.each(countries, function (key, value) {
			if (countryName == value.countryName) {
				//console.log(value.states);
				jQuery.each(value.states, function (key, value) {
					if (stateName == value.stateName) {
						//console.log(value.cities);
						jQuery.each(value.cities, function (key, value) {
							cityOptions += "<option value='" + value.cityName + "'>" + value.cityName + "</option>";
						});
					}
				});
			}
		});
		selectCity.html(cityOptions);
	});
}

/*
	function-name:selectedCountryStateCityDetails
	description: fetch the value from dropdown list and store into corosponding variables
	comments:
*/
function selectedCountryStateCityDetails() {
	selectedCountry = $('#selectCountry').find(":selected").text();
	selectedState = $('#selectState').find(":selected").text();
	SelectedCity = $('#selectCity').find(":selected").text();
}

/*
	function-name:editDataTable
	description:toggle bewteen edit,delete(editButton,deleteButton) and save,cancel(saveButton,cancelButton)
	comments: till now this function is not working properly
*/
function editDataTable() {
	$("#registrationTable").on('click', 'input[id="editButton"]', function (event) {
		editableContentIndex=0;
		$(this).hide();
		$("#deleteButton").hide();
		$("#saveButton").show();
		$("#cancelButton").show();
		$(this).parents('tr').find('td.editableColumns').each(function () {
			$(this).prop('contenteditable', true);
			editableContentsArray[editableContentIndex]=$(this).html();
			editableContentIndex++;

		});
	});

	$("#registrationTable").on('click', 'input[id="saveButton"]', function (event) {
		$(this).parents('tr').find('td.editableColumns').each(function () {
			$(this).prop('contenteditable', false);
		});
		$(this).hide();
		$("#deleteButton").show();
		$("#editButton").show();
		$("#cancelButton").hide();
	});

	$("#registrationTable").on('click', 'input[id="cancelButton"]', function (event) {
		editableContentIndex=0;
		$(this).parents('tr').find('td.editableColumns').each(function () {
			$(this).prop('contenteditable', false);
			$(this).html(editableContentsArray[editableContentIndex]);
			editableContentIndex++;

		});
		$(this).hide();
		$("#deleteButton").show();
		$("#saveButton").hide();
		$("#editButton").show();
	});
}