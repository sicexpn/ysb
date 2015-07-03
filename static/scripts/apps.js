function hello(){
}
function buyApp(){
    var user_name=$("#user_name").val();
    var app_manifest=$("#app_manifest").val();
    if(user_name==""||app_manifest==""){
        bootbox.alert("buy app error");
        return;
    }
    $.ajax({
        type:"POST",
        url:"/ui/apps/rest/buy_app",
        dataType:'json',
        async:false,
        data:{
            "manifest":app_manifest,
            "name":user_name,
            "valid":true
        },
        success:function(result){
            bootbox.alert("buy app ok",
                function(){
                    location.reload();
                    });
        },
        error:function(result){
            bootbox.alert("buy app error");
        }
    });
}
function comment_publish(){
    var user_name=$("#user_name").val();
    var app_manifest=$("#app_manifest").val();
    var message=$("#user_comment").val();
    if(message==""||user_name==""||app_manifest==""){
        bootbox.alert("publish error");
        return;
    }
    $.ajax({
        type:"POST",
        url:"/ui/apps/rest/user_comment",
        dataType:'json',
        async:false,
        data:{
            "manifest":app_manifest,
            "name":user_name,
            "message":message
        },
        success:function(result){
            bootbox.alert("comment ok",
                function(){
                    location.reload();
                    });
        },
        error:function(result){
            bootbox.alert("comment error");
        }
    });
}
function downloadApp(a){
    var s=a.parentNode.parentNode.rowIndex;
    var manifest=$("#table_download tr:eq("+s+") td:nth-child(1)").html();
    var version=$("#table_download tr:eq("+s+") td:nth-child(2)").html();
    var appclient_ip=$("#table_download tr:eq("+s+") td:nth-child(3) option:selected").text();
    $.ajax({
            type:"POST",
            url:"/ui/apps/rest/downloadapp",
            dataType:'json',
            async: false,
            data:{
                "clientip" :appclient_ip,
                "manifest" :manifest,
                "version" :version,
            },
            success:function(result){
                var msg=result.msg;
                bootbox.alert(msg);
            },
            error:function(result){
                bootbox.alert("download app error");
            }
        }
    );
}
function uploadApp(a){
    var s=a.parentNode.parentNode.rowIndex;
    var manifest=$("#table_upload tr:eq("+s+") td:nth-child(1)").html();
    var version=$("#table_upload tr:eq("+s+") td:nth-child(2)").html();
    var appserver_ip=$("#table_upload tr:eq("+s+") td:nth-child(3) option:selected").text();
    var appclient_ip=$("#clientip").val();
   // alert(manifest+","+version+","+appserver_ip+","+appclient_ip);
    $.ajax({
        type:"POST",
        url:"/ui/apps/rest/uploadapp",
        dataType:'json',
        async:false,
        data:{
            "manifest":manifest,
            "version":version,
            "serverip":appserver_ip,
            "clientip":appclient_ip
        },
        success:function(result){
            bootbox.alert(result.msg);
        },
        error:function(result){
            bootbox.alert("upload app error");
        }
    });
}
function deleteApp(a){
    var s=a.parentNode.parentNode.rowIndex;
    var manifest=$("#table_upload tr:eq("+s+") td:nth-child(1)").html();
    var version=$("#table_upload tr:eq("+s+") td:nth-child(2)").html();
    var appclient_ip=$("#clientip").val();
    $.ajax({
        type:"POST",
        url:"/ui/apps/rest/deleteapp",
        dataType:'json',
        async:false,
        data:{
            "manifest":manifest,
            "version":version,
            "clientip":appclient_ip
        },
        success:function(result){
            bootbox.alert(result.msg);
            location.reload();
        },
        error:function(result){
            bootbox.alert("delete app error");

        }
    });
}
function appstore_form(){
 try{
    var direction=$("#direction").val();
    var ip="";
    var url="";
    if(direction=="1")
    {   
        ip=$("#appserver_sel").val();
        url="/ui/apps/download/";
    }else if(direction=="0")
    {
        ip=$("#appclient_sel").val();
        url="/ui/apps/upload/";
    }else{
        return true;
    }
    url=url+ip;
    $(location).attr('href',url);
 }
 catch(e){
     bootbox.alert(e);
 }
 return false;
}
