<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;

class ProductMongo extends Model
{
    protected $conection = 'mongodb';

    protected $collection = 'products';

    protected $fillable = [
        'name',
        'onbasket',
    ];

    protected $attributes = [
        'onbasket' => false,
    ];

    public function toArray()
    {
        $array = parent::toArray();
        $array['id'] = (string) $this->_id;
        unset($array['_id']);
        return $array;
    }
}
