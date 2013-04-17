/* Created by Alex Nyika
 * The main function file 
 */
 var employees;
 var markedEmployees;
 var employeeid;
 var flags;
 var x;
 var submitions;
 var selectedTool;
 var selectedOption = "none";
 var userSelection;
 var selectedTl;
 var select;
 var finalRowCount; 
 /**
  * 50 micro-seconds vibration of the Device
  */
 function vibrate(){
    navigator.notification.vibrate(50);
 }
 
 /**
  *  Vibrate for 50 micro seconds and play beep sound on the Device
  */
 function vibrateBeep(){
 	vibrate();
 	playBeep();
 }

 /**
  * plays the beep sound on the Device
  */
 function playBeep() {
 	navigator.notification.beep(1);
 }

 /**
  * Creates the DB named quartz on the Device
  */
 function createDB(){
	//var db = window.sqlitePlugin.openDatabase({name: "/mnt/sdcard/Quartz/quartz"});
  	var db = window.sqlitePlugin.openDatabase({name: "quartz"});
 }

 /**
  * 
  * @param {} err of type SQLite error 
  * @returns {} an alert containing a message associated with the error of type err
  */
 function errorCB(err) {
 	alert("Error processing SQL: "+err.code);
 }

 /**
  * Henry knows about this function
  * @param {} name
  * @returns {} 
  */
 function getVar(name){
 	get_string = document.location.search;         
    return_value = '';
         
    do{ 
    	//This loop is made to catch all instances of any get variable.
        name_index = get_string.indexOf(name + '=');
        if(name_index != -1){
        	get_string = get_string.substr(name_index + name.length + 1, get_string.length - name_index);
            end_of_value = get_string.indexOf('&');
            if(end_of_value != -1) value = get_string.substr(0, end_of_value);                
            else value = get_string;                
               
            if(return_value == '' || value == '') return_value += value;
            else return_value += ', ' + value;
        }
    }while(name_index != -1)
    	//Restores all the blank spaces.
        space = return_value.indexOf('+');
        while(space != -1)
        	{ 
            	return_value = return_value.substr(0, space) + ' ' + 
            	return_value.substr(space + 1, return_value.length);
				space = return_value.indexOf('+');
            }
        return(return_value);        
 } 

 /**
  * Save and Vibrate function 
  */
 function clickSave(){
 	vibrate();
 }
  
 //New functions - Zigitch
 /**
  * 
  * @param {} CategoryID - the ID of the category whose employees to rollcall
  * @returns {}::: null,  simply initializes the list of employees and employeeIDs 
  * using their respective arrays
  */
 function getEmployeesByCategory(CategoryID){
 	//alert(CategoryID);
 	var db = window.sqlitePlugin.openDatabase({name: "quartz"});
 	employees = new Array();
    employeeid = new Array();
    db.transaction(function(tx){
    	tx.executeSql("select * from workers where catid = " + CategoryID + ";", [], function(tx, results){
    		var len = results.rows.length;
    		for(var i = 0; i<len;i++){
    			employees[i] = results.rows.item(i).name;
    			employeeid[i] = results.rows.item(i).id;
    		}
    	});
    });
 	return;
 }
 
 /**
  * 
  * @returns {}::: null,  simply picks the name of the first employee from the initialized array of employees
  * and gets the rollcall ready 
  */
 function LoadEmployeesByCategory(){
 	x = 0;
 	document.getElementById("demo").innerHTML=employees[x];
 	flags = new Array(employees.length);
 	userSelection = new Array(employees.length);
 	selectedTool = new Array(employees.length);
 	return;
 }
 
 /**
  * 
  * @param {} attendance - the value representing if an employee is absent(0) or present(1).
  * @returns {}  null
  */
 function AddEmployeeAttendance(attendance){
 	//GetSelected ();
 	var empLen = employees.length;
 	var endIndex = empLen - 1;
 	if(x<=endIndex){
 		userSelection[x] = GetSelected ();
 		selectedTool[x] = GetSelectedIndex ();
 		//if(userSelection[x] == "nothing selected"){
 			//alert("Please select a tool for the employee");
 			
 		//}else{
 			flags[x] =  attendance;
 			if(x==endIndex){
 				document.getElementById("demo").innerHTML = "Roll Call Over.";
 				//window.location = "submission.html";
 			}else{
 				x++;
 				document.getElementById("demo").innerHTML = employees[x];
 			}
 		//}
 	}
 }
 
 /**
  * The function is responsible for checking if a roll call is completed successfully and then saves it to the DB
  * @returns {} null
  */
 function SaveRollCall(){
 	var totalEmpRollcalled = x + 1;
 	if(totalEmpRollcalled==employees.length){
 		var db = window.sqlitePlugin.openDatabase({name: "quartz"});
 		db.transaction(function(tx){
 			tx.executeSql("CREATE TABLE IF NOT EXISTS attendance (id INTEGER PRIMARY KEY AUTOINCREMENT," + 
    				  	  "date DATETIME DEFAULT (CURRENT_TIMESTAMP), employeeid INTEGER, morning INTEGER, afternoon INTEGER, toolid INTEGER);");
    		for(var i = 0; i<employees.length; i++){
    			var empID = employeeid[i];
    			var attFlag = flags[i];
    			var attselectedTool = selectedTool[i];
    			if(attFlag ==1 ){
    				tx.executeSql("INSERT INTO attendance (employeeid, morning, afternoon, toolid) VALUES (" + empID + ", " + attFlag + ", 0 ," + attselectedTool + ");");
    				alert("saving present personnel");
    			 }
    		}
    		window.location = "rollcall1.html";
 		});
 	}else{
 		alert("Please complete the roll call\nbefore you can save.");
 		return;
 	}
 }
 
 /**
  *  The function is responsible for generating a table from which to confirm the presence status of employees
  *  and later edit them
  * @returns {} 
  */
 
 function GenerateRollCallTable(){
// loadPage = "submission.html";
 	var msg = "Detailed?";
 	var table = document.getElementById("rollcallTable");
 	var elem = userSelection[employees.length-1];
 	for(var x = 0; x<employees.length; x++){
 		var rowCount = table.rows.length;
 		var row = table.insertRow(rowCount);
 		var cell0 = row.insertCell(0);
 		var cell1 = row.insertCell(1);
 		var cell2 = row.insertCell(2);
 		var cell3 = row.insertCell(3);
 		//inserting values in the cellss
 		cell0.innerHTML = employees[x];
 		cell1.innerHTML = userSelection[x];
 		var flag = flags[x];
 		//var newOption = userSelection[x];
 		finalRowCount = rowCount - 1;
 		if(flag==0) cell2.innerHTML = "absent";
 		else cell2.innerHTML = "present";
 		//cell3.innerHTML = "<input type='button' onclick='ChangeStatus("+(rowCount - 1)+");' value='Change' />";
 		//cell3.innerHTML = "<a data-role='button' data-theme='d' href='EditEmpAttendance.html' onclick='SetEditEmployeeIndex("+(rowCount - 1)+");' >Change</a>";
 		myUrl = 'EditEmpAttendance.html';
 		cell3.innerHTML = "<a data-role='button' data-theme='d' click='confirmIt("+(rowCount - 1)+");'>Change</a>";
	 }
 }
 
    function confirmIt(myRowCount){
 	var x = confirm("Detailed?");
 	if(x == true){
 		window.location.href = 'EditEmpAttendance.html';
 		SetEditEmployeeIndex(myRowCount);
 		}
 	else{
 		//window.location = "submission.html";
 		ChangeStatus(myRowCount);
 		
 		}
 	}
 
 	/*function getUrl(url){
 		//url = 'EditEmpAttendance.html';
 	}*/
 	
 /**
  * 
  * @param {} employeeIndex - the index of the employee in the table and/or employees array
  * @returns {} nothing
  */
 function ChangeStatus(employeeIndex){
 	var table = document.getElementById("rollcallTable");
 	alert("Attempting to change employee data at index: " + employeeIndex);
 	var flag = flags[employeeIndex];
 	if(flag==0){
 		flags[employeeIndex] = 1;
 		table.rows[employeeIndex+1].cells[2].innerHTML = "present";
 	}else{
 		flags[employeeIndex] = 0;
 		table.rows[employeeIndex+1].cells[2].innerHTML = "absent";
 	}
 	return;
 }

 function GetSelected () {
            select = document.getElementById ("selid") || document.getElementById ("selOpt");
          //  var txt = "";
            for (var i = 0; i < select.options.length; i++) {
               	var isSelected = select.options[i].selected;
                isSelected = (isSelected)? "selected" : "not selected";
              	//  txt += "The " + i + " option is " + isSelected + "\n";
                if(isSelected == "selected"){
                	if(i==0){
                		//alert("Please select a tool");
            			selectedOption = "nothing selected"
                	}else{
                		selectedOption = select.options[i].text;
                	}
                }
            }
            
            	
           // alert (selectedOption);
            
            return selectedOption;
        }
        
         function GetSelectedIndex () {
            select = document.getElementById ("selid") || document.getElementById ("selOpt");
          //  var txt = "";
            for (var i = 0; i < select.options.length; i++) {
               	var isSelected = select.options[i].selected;
                isSelected = (isSelected)? "selected" : "not selected";
              	//  txt += "The " + i + " option is " + isSelected + "\n";
                if(isSelected == "selected"){
                	selectedTl = i;
                }
            }
            
            return selectedTl;
        }
        
         function EditEmployeeAttendanceData(employeeIndex){
 			var flag = flags[employeeIndex];
 			if(flag==0){
 			flags[employeeIndex] = 1;
 			}else{
 			flags[employeeIndex] = 0;
 			}
 			return;
 		}
        
        function SetEditEmployeeIndex(index){
 			editEmpIndex = index;
 			//alert(editEmpIndex);
 			//LoadEditPageData();
		 }
        
        function LoadEditPageData(){
        	//alert("request received");
 			var employeeName = employees[editEmpIndex];
 			//alert(employeeName);
 			document.getElementById("empNameLabel").innerHTML = employeeName;
 			//alert("Got document");
 			var flag = flags[editEmpIndex];
 			var uSelection = userSelection[editEmpIndex];
 			var sTool = selectedTool[editEmpIndex];
 			document.getElementById("currentTool").innerHTML = uSelection;
 			if(flag==0){
 			document.getElementById("currentStatus").innerHTML = "absent";
 			}else{
 			document.getElementById("currentStatus").innerHTML = "present";
 			}

 		}
 		
 		 function SaveNewAttendanceData(data){
 			flags[editEmpIndex] = data;

 		}
 		
 		function newstate(){
 			userSelection[editEmpIndex] = GetSelected ();
 			selectedTool[editEmpIndex] = GetSelectedIndex ();
 		}
 		
 	function LoadAfternoonEmployees(){
 		GetAfternoonEmployees();
 		x = 0;
 		document.getElementById("demo").innerHTML=employees[x];
 		flags = new Array(employees.length);
 		userSelection = new Array(employees.length);
 		selectedTool = new Array(employees.length);
 		return;
 		}
 		
 	function GetAfternoonEmployees(){
 		//alert(CategoryID);
 		var db = window.sqlitePlugin.openDatabase({name: "quartz"});
 		employees = new Array();
    	employeeid = new Array();
    	db.transaction(function(tx){
    		tx.executeSql("select * from workers ;", [], function(tx, results){
    			var len = results.rows.length;
    			for(var i = 0; i<len;i++){
    				employees[i] = results.rows.item(i).name;
    				employeeid[i] = results.rows.item(i).id;
    			}
    		});
    	});
 		return;
 	}
 		function checkStatus(){};
 