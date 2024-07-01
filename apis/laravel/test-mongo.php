<?php
require 'vendor/autoload.php';

$client = new MongoDB\Client("mongodb://127.0.0.1:27017");
$collection = $client->basket->products;

$result = $collection->find()->toArray();
print_r($result);
