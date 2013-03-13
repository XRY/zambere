/*Created by Alex Nyika
 * The main function file 
 */
 
	var employees;
	var markedEmployees;
	var employeeid;
	var flags;
	var x = 0;
 function vibrate() {// vibrate for 50 micro seconds
        navigator.notification.vibrate(50);
        
        }
 
 function vibrateBeep()
 {
 vibrate();
 playBeep();
 
 }

    // Beep Once
    function playBeep() {
        navigator.notification.beep(1);
    }

  function createDB()
  {
    // var db = window.sqlitePlugin.openDatabase({name: "/mnt/sdcard/Quartz/quartz"});
 
	  var db = window.sqlitePlugin.openDatabase({name: "quartz"});
 }

	function errorCB(err) {
    	alert("Error processing SQL: "+err.code);
	}

	function getVar(name)
	{
    	get_string = document.location.search;         
         return_value = '';
         
        do { //This loop is made to catch all instances of any get variable.
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
           } while(name_index != -1)
            
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
 
 function queryDb2()
  {
  	if(x<employees.length-1){
  		flags[x] = "1";
  		x++;
  		document.getElementById("demo").innerHTML=employees[x];
  	}
  	return;
  }
  
  function queryDb3(){
  	if(x<employees.length-1){
  		flags[x] = "0";
  		x++;
  		document.getElementById("demo").innerHTML=employees[x];
  	}
  	return;
  }
   function queryDb()
  	{
      //var db = window.sqlitePlugin.openDatabase({name: "/mnt/sdcard/Quartz/quartz"});
       var db = window.sqlitePlugin.openDatabase({name: "quartz"});
  		db.transaction(returnEmplyees, errorCB);
  		document.getElementById("demo").innerHTML=employees[x];
  		flags = new Array(employees.length);
  		for(var d=0; d<flags.length; d++)
  		{
  			flags[d] = 0;
  			
  		}
  		markedEmployees = new Array();
  		markedEmployees.push(employeeid[x]);
  }
  
  function errorCB(err) {
    alert("Error processing SQL: "+err.code);
}
    
    function returnEmplyees(tx){
    	employees = new Array();
    	employeeid = new Array();
		tx.executeSql("select * from workers;", [], function(tx, res) {
     	var len = res.rows.length;
    	for (var i=0; i<len; i++){
        	employees[i] = res.rows.item(i).name;
        	employeeid[i] = res.rows.item(i).id;
        }
    //alert(employees.length);  
    });
    }
    
    function doInsertion()
    {
    	//alert("am tyt");
    	var db = window.sqlitePlugin.openDatabase({name: "quartz"});
    	db.transaction(insertWorkers);
    	//db.transaction(testDbEntries, errorCB);
    }
    
    function insertWorkers(tx)
    {
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
    		tx.executeSql('INSERT INTO attendance (date , employeeid, morning, afternoon) VALUES ('+completeDate+', '+employeeid[i]+', '+ flags[i] +', 0)');
    		//tx.executeSql('INSERT INTO attendance (date , employeeid, morning, afternoon) VALUES ('+completeDate+', '+employeeid[i]+', 1, 0)');
    	}
    	
    	//tx.executeSql('INSERT INTO attendance (date , employeeid, morning, afternoon) VALUES (completeDate, 2, 1, 0)');
   		// tx.executeSql('INSERT INTO attendance (date , employeeid, morning, afternoon) VALUES (completeDate, 3, 1, 0)');
    }
    
   /* function testDbEntries(tx)
    {
    	tx.executeSql("select * from attandance;", [], function(tx, res) {
     	var len = res.rows.length;
    	for (var i=0; i<len; i++){
        	alert(employeeid);
        }
    }*/
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
 