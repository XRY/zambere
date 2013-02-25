/*Created by Alex Nyika
 * The main function file 
 * 
 * 
 * 
 * 
 */
 
 function vibrate() {// vibrate for 50 micro seconds
        navigator.notification.vibrate(50);
        
        }
 
 function vibrateBeep()
 {
 vibrate();
 playBeep();
 
 }
 
 // Show a custom alert
    //
    function showAlert() {
        navigator.notification.alert(
            'You are the winner!',  // message
            'Game Over',            // title
            'Done'                  // buttonName
        );
    }

    // Beep Once
    function playBeep() {
        navigator.notification.beep(1);
    }


  
  //show categories
  
 
 
 
 
  function createDB()
  {
  
  
     var db = window.sqlitePlugin.openDatabase({name: "/mnt/sdcard/Quartz/quartz"});
 	//db.transaction(testTx2, errorCB);   
	 
 }



 
  
  function testTx2(tx)
  {
  
   			tx.executeSql("select * from category;", [], function(tx, res) {
           var s ;
            s = " ";
     var len = res.rows.length;
    for (var i=0; i<len; i++){
        s= s + res.rows.item(i).id + " " +res.rows.item(i).name + " "+ res.rows.item(i).wage + "\n";
    }
    alert(s);  });
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
        
        
        
        
        var employees;
 var flags;
 var x = 0;
 
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
  	
      var db = window.sqlitePlugin.openDatabase({name: "/mnt/sdcard/Quartz/quartz"});
  	db.transaction(returnEmplyees, errorCB);
  	document.getElementById("demo").innerHTML=employees[x];
  	flags = new Array(4);
  	
  }
  
  function errorCB(err) {
    alert("Error processing SQL: "+err.code);
}

function queryNames(tx){
employees = new Array();
	tx.executeSql("select * from category;", [], function(tx, res) {
           //var s ;
           // s = " ";
     var len = res.rows.length;
    for (var i=0; i<len; i++){
       // s= s + res.rows.item(i).name;
        
        employees[i] = res.rows.item(i).name;
        //alert(employees[i]);
        
     }
     //document.getElementById("demo").innerHTML=employees[1];
    //var btn1 = document.getElementById("present_btn");
    flags = new Array(4);
   // for(var x=0; x<employees.length; x++){
   var x=0;
   // document.getElementById("demo").innerHTML=employees[x];
    if("absent_btn")
    {
    flags[x] = "0";
    }
    else if("present_btn")
    {
    flags[x] = "1";
    }
       
    alert(x);  
    });
    }
    
    function returnEmplyees(tx){
    	employees = new Array();
		tx.executeSql("select * from category;", [], function(tx, res) {
     	var len = res.rows.length;
    	for (var i=0; i<len; i++){
        	employees[i] = res.rows.item(i).name;
        }
    //alert(employees.length);  
    });
    }
 