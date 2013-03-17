<? 
    $actionData = $_POST['actionData']; 
    $sessionLength = $_POST['sessionLength'];
    $mapType = $_POST['mapType'];
    $uiVer = $_POST['uiVer'];
    $userID = $_POST['userID'];

    $con = mysql_connect("localhost", "root", "");
    if (!$con) {
        die('Could not connect: ' . mysql_error());
    }
    else {
        echo 'Connection successful' . "\n";
    }

    mysql_select_db("crowdSaliency", $con);
    
    mysql_query("
        INSERT INTO General (duration)
        VALUES ($sessionLength);
    ", $con);

    echo mysql_error($con) . "\n";
          
    $result = mysql_query("
        SELECT session_id FROM General ORDER BY session_id DESC LIMIT 1;
    ", $con);
    
    echo mysql_error($con) . "\n";
    $sessionId;
    
    while ($row = mysql_fetch_array($result)) {
        $sessionId = $row["session_id"];
    }
                      
    $actionDataLength = count($actionData);
    echo $actionDataLength;
        
    for ($i = 0; $i < $actionDataLength; ++$i) {
        $obj = $actionData[$i];
        $actionName = "'" . $obj["actionName"] . "'";
        $time = "'" . $obj["time"] . "'";
        $timeElapsed = intval($obj["timeElapsed"]);
        $mouseTrace = "'" . $obj["mouseTrace"] . "'";
        $actionParam = "'" . $obj["actionParam"] . "'";
        
        $query = "INSERT INTO Action (session_id, action_name, time, time_elapsed, mouse_trace, action_param) VALUES ($sessionId, $actionName, $time, $timeElapsed, $mouseTrace, $actionParam);";
        
        mysql_query($query, $con);
	}
 
//    echo $query;
    echo mysql_error($con) . "\n";
              
    mysql_close($con);
?>
