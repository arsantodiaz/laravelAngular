<?php

class Customer extends Eloquent
{
    public function transactions() {
        return $this->hasMany('Transaction');
    }
}