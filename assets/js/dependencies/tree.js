$(document).ready(function () {

var userData = [];
var groupData = {};
var secGroupData = {};
var groupId = [];
var nimei;

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
            groupData.value = "Hello World";
            userData.push(groupData);
            
            var newQuery = new AV.Query(Group);
            newQuery.equalTo("parentGroupId", groupData.id);

            newQuery.find({
                success: function(secGroups){
                    for(var i = 0; i < secGroups.length; i++){
                        var group = secGroups[i];
                        secGroupData.id = group.attributes.userId;
                        secGroupData.parentid = group.attributes.parentGroupId;
                        secGroupData.text = group.attributes.name;
                        secGroupData.value = "Hello World-->"+i;

                        userData.push(secGroupData);

                        secGroupData = {};
                    }
                    // alert(userData.length);
                    /*var str;
                    for(var i = 0; i < userData.length; i++){
                        for(j in userData[i]){
                            str+=userData[i][j]+'\n';
                        }
                    }
                    alert(str);*/

                    for(var i = 0; i < userData.length; i++){
                        var ele = '<li><a class="right-menu" lid="'+ userData[i].parentid +'">'+ userData[i].text+ i +'</a></li>'
                        $(ele).find('.right-menu').click(function(e){
                            e.preventDefault();
                            $('.depName').val($(this).text());
                            $('.depValue').val($(this).attr('lid'));
                        }).end().appendTo($("ul.dep"));
                    }

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

                    var dataAdapter = new $.jqx.dataAdapter(source);
                    dataAdapter.dataBind();
                    var records = dataAdapter.getRecordsHierarchy('id', 'parentid', 'items', [{ name: 'text', map: 'label'}]);
                    $('#jqxWidget').jqxTree({ source: records, width: '300px'});

                },
                error: function(error){
                    alert("Error: "+ error.code + " "+ error.message);
                }
            });
        }
    },
    error: function(error){
        alert("Error: "+ error.code + " "+ error.message);
    }
});

    // prepare the data

    /*var source =
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
    };*/

    // create data adapter.

    /*var dataAdapter = new $.jqx.dataAdapter(source);*/

    // perform Data Binding.

    /*dataAdapter.dataBind();*/

    // get the tree items. The first parameter is the item's id. 
    //The second parameter is the parent item's id. The 'items' parameter represents 
    // the sub items collection name. Each jqxTree item has a 'label' property, 
    //but in the JSON data, we have a 'text' field. The last parameter 
    // specifies the mapping between the 'text' and 'label' fields.  
    /*var records = dataAdapter.getRecordsHierarchy('id', 'parentid', 'items', [{ name: 'text', map: 'label'}]);
    $('#jqxWidget').jqxTree({ source: records, width: '300px'});*/
});