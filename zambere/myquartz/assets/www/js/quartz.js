/*Created by Alex Nyika
 * The main function file 
 */
	var employees;
	var markedEmployees;
	var employeeid;
	var flags;
	var x = 0;
	var submitions;
	var identity;
	
 	function vibrate(){
 		//vibrate for 50 micro seconds
        navigator.notification.vibrate(50);
    }
 
 	function vibrateBeep(){
 		vibrate();
 		playBeep();
 	}
 	
    function playBeep(){
        navigator.notification.beep(1);
    }

  	function createDB(){
    	//var db = window.sqlitePlugin.openDatabase({name: "/mnt/sdcard/Quartz/quartz"});
	  	var db = window.sqlitePlugin.openDatabase({name: "quartz"});
 	}

	function errorCB(err){
    	alert("Error processing SQL: " + err.code);
	}

	function getVar(name){
    	get_string = document.location.search;         
        return_value = '';
        do 
        {
        	//This loop is made to catch all instances of any get variable.
           	name_index = get_string.indexOf(name + '=');
            if(name_index != -1)
           {
              get_string = get_string.substr(name_index + name.length + 1, get_string.length - name_index);
             
             end_of_value = get_string.indexOf('&');
             if(end_of_value != -1)                
               value = get_string.substr(0, end_of_value);                
             else                
               value = get_string;                
               
             if(return_value == '' || value == '')
                return_value += value;
             else
                return_value += ', ' + value;
             }
         } while(name_index != -1);
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
          
    function clickSave(){
      	 vibrate();
      	} 
 
 	function queryDb2(){
  		if(x<employees.length-1){
  			flags[x] = 1;
  			x++;
  			document.getElementById("demo").innerHTML=employees[x];
  			}
  			return;
  		}
  
  	function queryDb3(){
  		if(x<employees.length-1){
  			flags[x] = 0;
  			x++;
  			document.getElementById("demo").innerHTML=employees[x];
  			}
  		return;
  		}
   
   	function queryDb(){
      //var db = window.sqlitePlugin.openDatabase({name: "/mnt/sdcard/Quartz/quartz"});
       /*	var identity1 = document.getElementById("carpenter").id.onclick;
       	var identity2 = document.getElementById("mason").id;
       	var identity3 = document.getElementById("porter").id;
        var identity4 = document.getElementById("builder").id;
       	var identity5 = document.getElementById("fixer").id;
       	
       	//identity = identity1 || identity2 || identity3 || identity4 || identity5;
      	if (identity1){
      	identity = identity1;
      	}
      	else{
      	identity = identity2 || identity3 || identity4 || identity5;
      	}
       	*/
        var db = window.sqlitePlugin.openDatabase({name: "quartz"});
  		//db.transaction(returnEmplyees, errorCB);
  		//db.transaction(getEmployeesByCategory, errorCB);
  		document.getElementById("demo").innerHTML=employees[x];
  		flags = new Array(employees.length);
  		for(var d=0; d<flags.length; d++){
  			flags[d] = 0;	
  			}
  			markedEmployees = new Array();
  			markedEmployees.push(employeeid[x]);
  		}
  
  	function errorCB(err) {
   		 alert("Error processing SQL: "+err.code);
		}
    
    function doInsertion(){
    	//alert("am tyt");
    	var db = window.sqlitePlugin.openDatabase({name: "quartz"});
    	db.transaction(insertWorkers);
    	//db.transaction(testDbEntries, errorCB);
    	x = 0;
    }
    
    function checkInsertion(){
    	var db = window.sqlitePlugin.openDatabase({name: "quartz"});
    	
    	db.transaction(confirmDbEntries, errorCB);
    	
    	//document.getElementById("demo2").innerHTML=submitions[1];
    	var output;
    	for(var n = 0; n < submitions.length; n++){
    		//alert(submitions[n]);
    		output += '<p>'+submitions[n]+'</p>';
    		}
    	//output += '<a href="#0.2_page1"> Done </a>';
    	document.body.innerHTML = output;
    	}
      
    function confirmDbEntries(tx){
    	submitions = new Array();
    	tx.executeSql("select * from attendance;", [], function(tx, res) {
     		var len = res.rows.length;
    		for (var i=0; i<len; i++){
        		//alert(employeeid);
        		var empId = res.rows.item(i).employeeid;
        		var empName;
        		tx.executeSql("select * from workers where employeeid="+empId+";", [], function(tx, res) {
        			empName = res.rows.item(i).name;
        		});
        		//submitions[i] = res.rows.item(i).id +' '+ res.rows.item(i).date + ' '+ res.rows.item(i).employeeid +' '+res.rows.item(i).morning;
        		submitions[i] = empName;
        		}
        	});
        }
    
    function returnEmplyees(tx){
    		employees = new Array();
    		employeeid = new Array();
<<<<<<< HEAD:myquartz/assets/www/js/quartz.js
			tx.executeSql("select * from workers where catid=1;", [], function(tx, res) {
     			var len = res.rows.length;
    			for (var i=0; i<len; i++){
        			employees[i] = res.rows.item(i).name;
        			employeeid[i] = res.rows.item(i).id;
        			}
        		//alert(submitions.length);  
    			});
    		}
    		
    function returnEmplyees2(tx){
    		employees = new Array();
    		employeeid = new Array();
			tx.executeSql("select * from workers where catid=2;", [], function(tx, res) {
     			var len = res.rows.length;
    			for (var i=0; i<len; i++){
        			employees[i] = res.rows.item(i).name;
        			employeeid[i] = res.rows.item(i).id;
        			}
        		//alert(submitions.length);  
    			});
    		}
    		
    function returnEmplyees3(tx){
    		employees = new Array();
    		employeeid = new Array();
			tx.executeSql("select * from workers where catid=3;", [], function(tx, res) {
     			var len = res.rows.length;
    			for (var i=0; i<len; i++){
        			employees[i] = res.rows.item(i).name;
        			employeeid[i] = res.rows.item(i).id;
        			}
        		//alert(submitions.length);  
    			});
=======
    		
    		var date = new Date();
  			var hour = date.getHours();
  			//alert(hour);
  			
  			//if(hour > 13){
				tx.executeSql("select * from workers;", [], function(tx, res) {
     				var len = res.rows.length;
    				for (var i=0; i<len; i++){
        				employees[i] = res.rows.item(i).name;
        				employeeid[i] = res.rows.item(i).id;
        				}
        			
    				});
    			//}
    		/*else {
    				tx.executeSql("select * from attendance where morning=1;", [], function(tx, res) {
     				var len = res.rows.length;
    				for (var i=0; i<len; i++){
        				employees[i] = res.rows.item(i).name;
        				employeeid[i] = res.rows.item(i).id;
        				}
        			
    				});
    			}*/
>>>>>>> origin/master:zambere/myquartz/assets/www/js/quartz.js
    		}
    
    function insertWorkers(tx){
    	var date = new Date();
  		var hour = date.getHours();
  		var day = date.getDate();
  		var month = date.getMonth()+1;
  		var year = date.getFullYear();
  		var completeDate = day +"/"+ month +"/" + year;
  		//alert(completeDate);
    	//tx.executeSql('CREATE TABLE IF NOT EXISTS attendence (id integer primary key autoincrement not null unique, date text, morning integer, afternoon integer)');
    	tx.executeSql('CREATE TABLE IF NOT EXISTS attendance (id integer primary key autoincrement, date text, employeeid integer, morning integer, afternoon integer)');
    	for (var i=0; i<employeeid.length;i++){
    		//alert(flags.length);
    		var result = flags[i];
    		var finalEmployeeid = employeeid[i];
    		var newDate = completeDate;
    		tx.executeSql('INSERT INTO attendance (date , employeeid, morning, afternoon) VALUES ('+newDate+', '+finalEmployeeid+', '+result+', 0)');
    		//tx.executeSql('INSERT INTO attendance (date , employeeid, morning, afternoon) VALUES ('+completeDate+', '+employeeid[i]+', 1, 0)');
    		}
    	}
    
    /*function getMorningEmployees(tx){
    var date = new Date();
  	var hour = date.getHours();
  	var day = date.getDate();
  	var month = date.getMonth()+1;
  	var year = date.getFullYear();
  	var completeDate = day +"/"+ month +"/" + year;
    tx.executeSql("select * from attandance where date=completeDate and morning=1;", [], function(tx, res) {
    	var len = res.rows.length;
    	for (var i=0; i<len; i++){
       		employeeid[i] = res.rows.item(i).employeeid;
       	}
    }*/
<<<<<<< HEAD:myquartz/assets/www/js/quartz.js
    
    
    //New functions
    function getEmployeesByCategory(categoryId){
    	alert("Category ID is: " + categoryId);
    	employees = new Array();
		employeeid = new Array();
		var db = window.sqlitePlugin.openDatabase({name: "quartz"});
		return function(tx){
			tx.executeSql("select * from workers where catid="+ categoryId + ";", [], function(tx, res) 
			{
	 			var len = res.rows.length;
				for (var i=0; i<len; i++)
				{
	    			employees[i] = res.rows.item(i).name;
	    			employeeid[i] = res.rows.item(i).id;
	    		}
			}), errorCB);
		}
		
		db.transaction(function (tx){
			tx.executeSql("select * from workers where catid = " + categoryId + ";", [], function(tx, res){
			});
		});
		alert("Total employees in category is: " + employees.length);
  	}
=======
 
 
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
    	//Check point 1::reached
    	//alert("Before Execution");
    	tx.executeSql("select * from workers where catid = " + CategoryID + ";", [], function(tx, results){
    		var len = results.rows.length;
    		for(var i = 0; i<len;i++){
    			employees[i] = results.rows.item(i).name;
    			employeeid[i] = results.rows.item(i).id;
    		}
    		//Check point 3::reached
    		//alert("Total Employees Found: " + employees.length + "\nTotal Employee IDS are: " + employeeid.length);
    	});
    	//Check point 2::reached
    	//alert("After Execution");
    });
 	return;
 }
 
 /**
  * 
  * @returns {}::: null,  simply picks the name of the first employee from the initialized array of employees
  * and gets the rollcall ready 
  */
 function LoadEmployeesByCategory(){
 	document.getElementById("demo").innerHTML=employees[x];
 	flags = new Array(employees.length);
 	//alert("Done Initializing fields....\nGetting ready to proceed.");
 	return;
 }
 
>>>>>>> origin/master:zambere/myquartz/assets/www/js/quartz.js
 