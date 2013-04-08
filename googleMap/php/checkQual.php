<? 
    $workerId = $_POST['workerId']; 

    $con = mysql_connect("localhost", "root", "");
    if (!$con) {
        die('Could not connect: ' . mysql_error());
    }
    else {
        echo 'Connection successful' . "\n";
    }

    mysql_select_db("crowdSaliency", $con);
          
    $result = mysql_query("
        SELECT * FROM Qualified;
    ", $con);
    
    echo mysql_error($con) . "\n";
    
    while ($row = mysql_fetch_array($result)) {
        $sessionId = $row["session_id"];
    }
 
//    echo $query;
    echo mysql_error($con) . "\n";
              
    mysql_close($con);
?>
