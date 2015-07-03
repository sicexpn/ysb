function addapporchestration(a){
    var s=a.parentNode.parentNode.rowIndex;
    var triggerType=$("#apporchestration tr:eq("+s+") td:nth-child(1) #triggerType").val();
    var triggerCondition=$("#apporchestration tr:eq("+s+") td:nth-child(1) #triggerCondition").val();
    var eventType=$("#apporchestration tr:eq("+s+") td:nth-child(2) #eventType").val();
    var eventAction=$("#apporchestration tr:eq("+s+") td:nth-child(2) #eventAction").val();
    var url="/ui/apporchestration/rest/add";
    $.ajax({
        type:"POST",
        url:url,
        dataType:"JSON",
        data:
        {
           "triggerType":triggerType,
           "triggerCondition":triggerCondition,
           "eventType":eventType,
           "eventAction":eventAction
        },
        success:function(){
            bootbox.alert("ok");
        },
        error:function(){
            bootbox.alert("error")
        }
    });    
}
