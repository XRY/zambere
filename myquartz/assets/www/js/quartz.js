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
 

    // Beep Once
    function playBeep() {
        navigator.notification.beep(1);
    }

  function createDB()
  {
 
     var db = window.sqlitePlugin.openDatabase({name: "Quartz"});
      //db.transaction(populateDB);
	// db.transaction(queryDB, errorCB);
	db.transaction(createCat);
	db.transaction(testTx2, errorCB);   
	 
 }
 

//document.getElementById("present_btn").addEventListener("click", alert("am here"), false);
  function createCat(tx)
  {
      // tx.executeSql('DROP TABLE IF EXISTS category');
       tx.executeSql('CREATE TABLE IF NOT EXISTS category (id integer primary key, name text, wage data)');
       tx.executeSql('INSERT INTO category (id , name, wage) VALUES (1, "Carpenter", 12000)');
       tx.executeSql('INSERT INTO CATEGORY (id , name,wage) VALUES (2, "Mason","5000")');
       tx.executeSql('INSERT INTO CATEGORY (id , name,wage) VALUES (3, "Mpango","8000")');
       tx.executeSql('INSERT INTO CATEGORY (id , name,wage) VALUES (4, "Peter","10000")');
  }
  
  function testTx2(tx)
  {
  
   			tx.executeSql("select * from category;", [], function(tx, res) {
           var s ;
            s = " ";
     var len = res.rows.length;
    for (var i=0; i<len; i++){
        s= s + res.rows.item(i).name + " "+ res.rows.item(i).wage;
    }
    alert(s);  });
  }

function errorCB(err) {
    alert("Error processing SQL: "+err.code);
}

function insertDB()
{
 var db = window.sqlitePlugin.openDatabase({name: "Quartz"});
 
 
}

// load element by element


    

    //var employeeArray = returnEmplyees;
    
    
 /*   function loadNames(nameByname)
    {
    var num=0;
    //while(employees.length>num)
   // {
    document.getElementById("demo").innerHTML="my name";
    
   // num++;
   // }
    }*/
//}



/*function init(){
	document.addEventListener("deviceReady", queryDb, true);
}*/
 