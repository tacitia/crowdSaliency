<? 
    $workerId = $_POST['workerId']; 
    $hasWorker = false;

    $con = mysql_connect("localhost", "root", "");
    if (!$con) {
        die('Could not connect: ' . mysql_error());
    }
    else {
        echo 'Connection successful' . "\n";
    }

    mysql_select_db("crowdSaliency", $con);
          
    $result = mysql_query("
        SELECT worker_id FROM WorkerProfile;
    ", $con);
    
    echo mysql_error($con) . "\n";
    
    while ($row = mysql_fetch_array($result)) {
        $currWorkerId = $row["worker_id"];
        echo $currWorkerId;
        if ($currWorkerId == $workerId) {
        	$hasWorker = true;
        }
    }
 
//    echo $query;
    echo mysql_error($con) . "\n";
              
    mysql_close($con);
    return $hasWorker;
?>
