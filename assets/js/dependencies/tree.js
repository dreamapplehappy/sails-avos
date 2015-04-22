$(document).ready(function () {

var userData = [];
var groupData = {};

AV.initialize("b7747uhilejmtsyfgobccj8vhhrevwja5awh8lh3pt0fg5fr", "7sl5pumuxsly3tlbjifv2acjddilu7vzrwg67u8hqxd927hd");
var Group = AV.Object.extend("Group");

var query = new AV.Query(Group);
query.equalTo("name", "123");
query.find({
    success: function(groups){
        for(var i = 0; i < groups.length; i++){
            var group = groups[i];
            groupData.id = group.attributes.userId;
            groupData.parentid = group.attributes.parentGroupId;
            groupData.text = group.attributes.name;
            groupData.value = null;
            userData.push(groupData);
            alert(userData + "=====");
            // alert(group.attributes.name+group.attributes.userId);
            // alert(groupData.toString());
        }
    },
    error: function(error){
        alert("Error: "+ error.code + " "+ error.message);
    }
});

alert(userData);

    var tryData = [{"id": "2",
        "parentid": "1",
        "text": "Hot Chocolate",
        "value": "$2.3"}];

    var data = [
    { "id": "2",
        "parentid": "1",
        "text": "Hot Chocolate",
        "value": "$2.3"
    }, {
        "id": "3",
        "parentid": "1",
        "text": "Peppermint Hot Chocolate",
        "value": "$2.3"
    }, {
        "id": "4",
        "parentid": "1",
        "text": "Salted Caramel Hot Chocolate",
        "value": "$2.3"
    }, {
        "id": "5",
        "parentid": "1",
        "text": "White Hot Chocolate",
        "value": "$2.3"
    }, {
        "text": "Chocolate Beverage",
        "id": "1",
        "parentid": "-1",
        "value": "$2.3"
}, {
        "id": "6",
        "text": "Espresso Beverage",
        "parentid": "-1",
        "value": "$2.3"
    }, {
        "id": "7",
        "parentid": "6",
        "text": "Caffe Americano",
        "value": "$2.3"
        }, {
        "id": "8",
        "text": "Caffe Latte",
        "parentid": "6",
        "value": "$2.3"
    }, {
        "id": "9",
        "text": "Caffe Mocha",
        "parentid": "6",
        "value": "$2.3"
        }, {
        "id": "10",
        "text": "Cappuccino",
        "parentid": "6",
        "value": "$2.3"
    }, {
        "id": "11",
        "text": "Pumpkin Spice Latte",
        "parentid": "6",
        "value": "$2.3"
        }, {
        "id": "12",
        "text": "Frappuccino",
        "parentid": "-1"
    }, {
        "id": "13",
        "text": "Caffe Vanilla Frappuccino",
        "parentid": "12",
        "value": "$2.3"
        }, {
        "id": "15",
        "text": "450 calories",
        "parentid": "13",
        "value": "$2.3"
    }, {
        "id": "16",
        "text": "16g fat",
        "parentid": "13",
        "value": "$2.3"
        }, {
        "id": "17",
        "text": "13g protein",
        "parentid": "13",
        "value": "$2.3"
    }, {
        "id": "14",
        "text": "Caffe Vanilla Frappuccino Light",
        "parentid": "12",
        "value": "$2.3"
        }]
    // prepare the data
    var source =
    {
        datatype: "json",
        datafields: [
            { name: 'id' },
            { name: 'parentid' },
            { name: 'text' },
            { name: 'value' }
        ],
        id: 'id',
        localdata: userData
    };
    // create data adapter.
    var dataAdapter = new $.jqx.dataAdapter(source);
    // perform Data Binding.
    dataAdapter.dataBind();
    // get the tree items. The first parameter is the item's id. 
    //The second parameter is the parent item's id. The 'items' parameter represents 
    // the sub items collection name. Each jqxTree item has a 'label' property, 
    //but in the JSON data, we have a 'text' field. The last parameter 
    // specifies the mapping between the 'text' and 'label' fields.  
    var records = dataAdapter.getRecordsHierarchy('id', 'parentid', 'items', [{ name: 'text', map: 'label'}]);
    $('#jqxWidget').jqxTree({ source: records, width: '300px'});
});