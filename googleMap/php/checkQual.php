<? 
    $workerId = $_POST['workerId']; 
    $hasWorker = False;

    $con = mysql_connect("localhost", "root", "goredsox");
    if (!$con) {
        die('Could not connect: ' . mysql_error());
    }
    else {
//        echo 'Connection successful' . "\n";
    }

    mysql_select_db("crowdSaliency", $con);
          
    $result = mysql_query("
        SELECT worker_id FROM WorkerProfile;
    ", $con);
    
    echo mysql_error($con) . "\n";
    
    while ($row = mysql_fetch_array($result)) {
        $currWorkerId = $row["worker_id"];
        if ($currWorkerId == $workerId) {
        	$hasWorker = True;
        }
    }
 
//    echo $query;
    echo mysql_error($con) . "\n";
    echo $hasWorker;              
    mysql_close($con);
?>
