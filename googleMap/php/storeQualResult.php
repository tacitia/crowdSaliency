<? 
	$workerId = "'" . $_POST['workerId'] . "'";
    $q1answer = $_POST['q1answer']; 
    $q2answer= $_POST['q2answer'];
    $q3answer = $_POST['q3answer'];

    $con = mysql_connect("localhost", "root", "goredsox");
    if (!$con) {
        die('Could not connect: ' . mysql_error());
    }
    else {
        echo 'Connection successful' . "\n";
    }

    mysql_select_db("crowdSaliency", $con);
    
    $query = "
        INSERT INTO WorkerProfile (`worker_id`, `crt_1`, `crt_2`, `crt_3`)
        VALUES ($workerId, $q1answer, $q2answer, $q3answer);
    ";
    
    
    mysql_query($query, $con);
    echo mysql_error($con) . "\n";
    mysql_close($con);
?>
