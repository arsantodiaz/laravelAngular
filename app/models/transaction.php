<?php

class Transaction extends Eloquent 
{
    public function customer() {
        return $this->belongsTo('Customer');
    }
}