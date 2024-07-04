<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;

class ProductMongo extends Model
{
    protected $connection = 'mongodb';

    protected $collection = 'products';

    public function toArray()
    {
        $array = parent::toArray();
        $array['id'] = (string) $this->_id;
        unset($array['_id']);
        return $array;
    }
}
