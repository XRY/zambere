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
 