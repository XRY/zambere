/*
 * Henry created this
*/
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
  	
  	var db = window.sqlitePlugin.openDatabase({name: "Quartz"});
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