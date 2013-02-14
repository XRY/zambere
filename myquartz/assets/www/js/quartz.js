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


//create the categories table. 
function createcategories(tx) {
     tx.executeSql('CREATE TABLE IF NOT EXISTS CATEGORY(id unique, name,wage)');
     tx.executeSql('INSERT INTO CATEGORY (id, name, wage) VALUES (1, "Carpenter","12000")');
     tx.executeSql('INSERT INTO CATEGORY (id, name,wage) VALUES (2, "Mason","12000")');
}
  
  //show categories
  function showCats()
  {
   var s = "";
   
   var db = window.sqlitePlugin.openDatabase({name: "quartz"});
   
  db.transaction(function(tx) {
      tx.executeSql("select * from CATEGORY order by name asc", [], function(tx, results) {
       for(var i=0; i<results.rows.length; i++) {
            s += results.rows.item(i).name + " " + results.rows.item(i).wage ;
            }
            
     }); 
  
    }); //results
   alert(s);
  
  }
  
 
 
 
 
  function createDB()
  {
 
     var db = window.sqlitePlugin.openDatabase({name: "Quartz"});
      //db.transaction(populateDB);
	// db.transaction(queryDB, errorCB);
	db.transaction(createCat);
	db.transaction(testTx2, errorCB);   
	 
 }
  
  
  function createCat(tx)
  {
       tx.executeSql('DROP TABLE IF EXISTS category');
       tx.executeSql('CREATE TABLE IF NOT EXISTS category (id integer primary key, name text, wage data)');
       tx.executeSql('INSERT INTO category (name, wage) VALUES ("Carpenter", 12000)');
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
  
  
   function populateDB(tx) {
        tx.executeSql('DROP TABLE IF EXISTS DEMO');
        tx.executeSql('CREATE TABLE IF NOT EXISTS DEMO (id unique, data)');
        tx.executeSql('INSERT INTO DEMO (id, data) VALUES (1, "First row")');
        tx.executeSql('INSERT INTO DEMO (id, data) VALUES (2, "Second row")');
    }
  
  function queryDB(tx) {
    tx.executeSql('SELECT * FROM DEMO', [], querySuccess, errorCB);
}


function querySuccess(tx, results) {
    var len = results.rows.length;
    var s ;
    s = "DEMO table: " + len + " rows found.";
    for (var i=0; i<len; i++){
        s= s + "Row = " + i + " ID = " + results.rows.item(i).id + " Data =  " + results.rows.item(i).data;
    }
    
    alert(s);
}

function errorCB(err) {
    alert("Error processing SQL: "+err.code);
}

function insertDB()
{
 var db = window.sqlitePlugin.openDatabase({name: "Quartz"});
 
 
}

  
 