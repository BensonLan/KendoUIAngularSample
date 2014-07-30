var app = angular.module('kendoapp', ['kendo.directives']);

app.controller('kendoUIControl',['$scope',function($scope)
{
    //drop-down-list
    $scope.selectedThing=''
    $scope.datePickerAsDate=''
    $scope.datePickerAsString=''
    $scope.thingsOptions = {
        dataSource: {
            data: [{ name: "Thing 1", id: 1 },
                { name: "Thing 2", id: 2 },
                { name: "Thing 3", id: 3 }]
        },
        dataTextField: "name",
        dataValueField: "id",
        optionLabel: "Select A Thing"
    };

    //kendo-list-view
    $scope.changeTemplate = function() {
        $scope.template = "<p>Text is: {{ dataItem.text }}</p>";
    };
    $scope.data = [
        { text: "Foo" },
        { text: "Bar" },
        { text: "Baz" }
    ];
    $scope.template ='<p>{{dataItem.text}}</p>';

    //k-button
    $scope.populate = function() {
        $scope.gridOptions = {
            columns: [ { field: "text" } ],
            dataSource: [
                { text: "Foo" },
                { text: "Bar" },
                { text: "Baz" }
            ]
        };
    };

    //grid
    $scope.mainGridOptions = {
        dataSource: {
            type: "odata",
            transport: {
                read: "http://demos.telerik.com/kendo-ui/service/Northwind.svc/Employees"
            },
            pageSize: 5,
            serverPaging: true,
            serverSorting: true
        },
        sortable: true,
        pageable: true,
        detailTemplate: kendo.template($("#template").html()),
        dataBound: function() {
            this.expandRow(this.tbody.find("tr.k-master-row").first());
        },
        columns: [{
            field: "FirstName",
            title: "First Name",
            width: "120px"
        },{
            field: "LastName",
            title: "Last Name",
            width: "120px"
        },{
            field: "Country",
            width: "120px"
        },{
            field: "City",
            width: "120px"
        },{
            field: "Title"
        }]
    };


    $scope.detailGridOptions = function(dataItem) {
        return {
            dataSource: {
                type: "odata",
                transport: {
                    read: "http://demos.telerik.com/kendo-ui/service/Northwind.svc/Orders"
                },
                serverPaging: true,
                serverSorting: true,
                serverFiltering: true,
                pageSize: 5,
                filter: { field: "EmployeeID", operator: "eq", value: dataItem.EmployeeID }
            },
            scrollable: false,
            sortable: true,
            pageable: true,
            columns: [
                { field: "OrderID", title:"ID", width: "56px" },
                { field: "ShipCountry", title:"Ship Country", width: "110px" },
                { field: "ShipAddress", title:"Ship Address" },
                { field: "ShipName", title: "Ship Name", width: "190px" }
            ]
        };
    };

}])

