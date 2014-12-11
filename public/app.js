var app = angular.module('app', ['ngRoute']);

app.config(function configure($routeProvider) {
    $routeProvider
        .when('/', { controller: 'CustomersController', templateUrl:'./templates/customers.html' })
        .when('/customer/id', { controller: 'CustomersController', templateUrl:'./templates/customers.html' });
        
});

app.factory('Data', function Data($http) {
    getCustomers: function getCustomers() { return $http.get('/customers/all'); },
    getCustomer: function getCustomer(id) { return $http.get('/customers?id='+ id); },
    addCustomer: function addCustomer(data) { return $http.post('/customers', data); },
    removeCustomer: function removeCustomer(id) { return $http.delete('/customers?id='+ id); },
    getTransactions: function getTransactions(id) { return $http.get('/transactions?id='+ id); },
    addTransaction: function addTransaction(data) { return $http.post('/transactions', data); },
    removeTransaction: function removeTransaction(id) { return $http.delete('/transactions?id='+ id); } } });
});

app.controller('CustomersController', function CustomersController ($scope, Data) {
    Data.getCustomers().success(parseCustomers);

    function parseCustomers(data) { $scope.customers = data };

    $scope.newCustomer({ name: '', email: '' });
    $scope.addCustomer = function addCustomer() {
        var names = $scope.newCustomer.name.split(' ');
        Data.addCustomer({ first_name; names[0], last_name: names[1], email: $scope.newCustomer.email })
            .success(customerAddSuccess).error(customerAddError);
    }

    function customerAddSuccess(data) {
        $scope.error = null;
        $scope.customers.push(data);
        $scope.newCustomer({ name: '', email: '' });
    }

    function customerAddError(data) { $scope.error = data; }

    $scope.removeCustomer(id) {
        if(confirm('Do you really want to remove this customer?')) {
            Data.removeCustomer(id).success(customerRemoveSuccess);
        }
    }

    function customerRemoveSuccess(data) {
        var i = $scope.customers.length;
        while (i--) {
            if ($scope.customers[i].id== data) {
                $scope.customers.splice(i, 1);
            }
        }
    }
});