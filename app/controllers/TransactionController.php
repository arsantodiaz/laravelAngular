<?php

class TransactionController extends BaseController {

	public function getIndex() {
        $id = Input::get('id');
        return User::find($id)->transactions;
    }

    public function postIndex() {
        if (Input::has('name', 'amount')) {
            $input = Input::all();
        } else {
            return Response::make('You need to fill all of the input fields', 400);
        }
        if ($input['name'] == '' || $input['amount'] == '') {
            return Response::make('You need to fill all of the input fields', 400);
        }
        $transaction = new Transaction;
        $transaction->name = $input['name'];
        $transaction->amount = $input['amount'];
        $id = $input['customer_id'];
        User::find($id)->transactions->save($transaction);
        
        return $transaction;
    }

    public function deleteIndex() {
        $id = Input::get('id');
        $transaction = Transaction::find($id);
        $transaction->delete();
        return $id;
    }

}
