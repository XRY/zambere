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


//create the categories db. 
function createcatDB(tx) {
     tx.executeSql('CREATE TABLE IF NOT EXISTS CATEGORY(id unique, name,wage)');
     tx.executeSql('INSERT INTO CATEGORY (id, name, wage) VALUES (1, "Carpenter","12000")');
     tx.executeSql('INSERT INTO CATEGORY (id, name,wage) VALUES (2, "Mason","12000")');
}
  
 