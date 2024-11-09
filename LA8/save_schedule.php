<?php
$data = json_decode(file_get_contents("php://input"), true);

$date = $data['date'];
$time = str_replace(':', '-', $data['time']);
$filePath = "schedules/{$date}_{$time}.json";

// 이미 존재하면 실패
if (file_exists($filePath)) {
    echo "failed";
    http_response_code(400);
    exit;
}

if (!is_dir("schedules")) {
    mkdir("schedules");
}

$scheduleFiles = glob("schedules/*.json");
$count = 0;

foreach ($scheduleFiles as $file) {
    $fileName = basename($file, ".json");
    $fileDate = explode('_', $fileName)[0];
    if ($fileDate === $date) {
        $count++;
    }
}

$data['order'] = $count;

file_put_contents($filePath, json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));
echo "success";
http_response_code(200);
?>
