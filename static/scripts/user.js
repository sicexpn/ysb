function registerUser(){
  try{
    var user_name = $("#user_name").val();
    var user_phone = $("#user_phone").val();
    var user_address = $("#user_address").val();
    var user_password = $("#user_password").val();
    var user_password1 = $("#user_password1").val();
    var user_email = $("#user_email").val();
    if(user_name == "" || user_phone == "" || user_address=="" || user_password == "" ||user_password1==""
      || user_email == ""){
       alert("字段不能为空");
       return false;
    }
    if(user_password!=user_password1){
       alert("密码不匹配");
       return false;
    }
    user_password = CryptoJS.SHA256(user_password).toString(CryptoJS.enc.Hex);

    var data ={"name":user_name, "phone":user_phone, "address": user_address, "password":user_password, "email":user_email, };
    alert(data.name)
    $.ajax(
    {
      beforeSend: function (xhr){ 
      	//xhr.setRequestHeader('Authorization', "Basic "+ btoa(username + ':' + password)); 
    	},
      type: "POST",
      url:"/users/rest_user",
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      data:JSON.stringify(data),
      complete: function(xhr){
        if (xhr.readyState == 4){
          if(xhr.status == 201){
		alert("register ok");
              //$(location).attr('href', "/users/login");
          }
          else if(xhr.status == 417)
              alert("Data: " + xhr.responseText+ "\nStatus: " + xhr.statusText);
          else
              alert("Data: " + xhr.responseText+ "\nStatus: " + xhr.statusText);
        }
        else
          alert("error status: "+ xhr.readyState);
      }
    }
    );
    return false;
  }
  catch(err){
    alert(err);
    return false;
  }
}

function loginUser(){
  try{
    var user_name = $("#user_name").val();
    var user_password = $("#user_password").val();
    user_password = CryptoJS.SHA256(user_password).toString(CryptoJS.enc.Hex);
    if(user_name == "" || user_password == ""){
       bootbox.alert("field can not be empty");
       return false;
    }
    var data ={name:user_name, password:user_password};
    $.ajax(
    {
      type: "POST",
      url:"/sessions/",
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      data:JSON.stringify(data),
      complete: function(xhr){
        if (xhr.readyState == 4){
          if(xhr.status == 200){
              var resp = JSON.parse(xhr.responseText);
              setCookie("user_name", resp.name); 
              setCookie("user_roles", resp.roles); 
              $(location).attr('href', "/ui/apps/");
          }
          if(xhr.status == 404){
              bootbox.alert("Your name and password not match");
          }
          else
              bootbox.alert("Data: " + xhr.responseText+ "\nStatus: " + xhr.statusText);
        }
        else
          bootbox.alert("error status: "+ xhr.readyState);
      }
    }
    );
    return false;
  }
  catch(err){
    bootbox.alert(err);
  }
}

function logout(){
    setCookie("user_name", ""); 
    setCookie("user_roles", ""); 
}


function updateUser(admin){
  try{
    var user_name = $("#user_name").text();
    var user_password = $("#user_password").val();
    var user_password1 = $("#user_password1").val();
    var user_email = $("#user_email").val();
    var user_sc = $("#user_sc").val();
    var user_company = $("#user_company").val();

    if(user_name == "" ){
       bootbox.alert("field can not be empty");
       return false;
    }
    var data ={name:user_name, type:"update"};
    
    if(user_password != "" ||user_password1!=""){
        if(user_password!=user_password1){
           bootbox.alert("password not match");
           return false;
        }
        user_password = CryptoJS.SHA256(user_password).toString(CryptoJS.enc.Hex);
        data["password"] = user_password;
    }
    if(user_email != ""){
        data["email"] = user_email;
    }
    if(user_sc !=""){
        data["sc"] = user_sc;
    }
    if(user_company != ""){
        data["company"] = user_company;
    }


    //var data ={name:user_name, password:user_password, email:user_email, company:"unknown"};
    var url = "";
    if(admin == true){
        url = "/admin/users/"+user_name;
    }
    else{
        url = "/users/"+user_name;
    }
    $.ajax(
    {
      type: "PUT",
      url: url,
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      data:JSON.stringify(data),
      complete: function(xhr){
        if (xhr.readyState == 4){
          if(xhr.status == 200){
              if(admin == true)
                  $(location).attr('href', "/ui/admin/users");
              else
                  $(location).attr('href', "/ui/users/");
          }
          else if(xhr.status == 417)
              bootbox.alert("Data: " + xhr.responseText+ "\nStatus: " + xhr.statusText);
          else
              bootbox.alert("Data: " + xhr.responseText+ "\nStatus: " + xhr.statusText);
        }
        else
          bootbox.alert("error status: "+ xhr.readyState);
      }
    }
    );
    return false;
  }
  catch(err){
    bootbox.alert(err);
  }
}

function applyDev(){
  try{
    var company = $("#user_company").val();
    var agree = $("#agree").attr('checked');
    if(company == null || company == ""){
       bootbox.alert("You must fill in your compnay");
       return false;
    }
    if(!agree){
       bootbox.alert("You must agree the terms first");
       return false;
    }
    var username = getCookie('user_name');
    var roles = getCookie('user_roles');
    if(roles == null || username == null){
        bootbox.alert("your information seems not be complete in this computer, please login again");
        return false;
    }
    var rarray = roles.split("|");
    rarray.push("dev");
    roles = rarray.join("|");
    var data ={roles:roles, company:company, type:"bedev"};
    $.ajax(
    {
      type: "PUT",
      url:"/users/"+username,
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      data:JSON.stringify(data),
      complete: function(xhr){
        if (xhr.readyState == 4){
          if(xhr.status == 200){
              bootbox.alert("You are a developer now.");
              resp = JSON.parse(xhr.responseText);
              setCookie("user_roles", resp.roles); 
              $(location).attr('href', "/");
          }
          else
              bootbox.alert("Data: " + xhr.responseText+ "\nStatus: " + xhr.statusText);
        }
        else
          bootbox.alert("error status: "+ xhr.readyState);
      }
    }
    );
    return false;
  }
  catch(err){
    alert(err);
    //bootbox.alert(err);
    return false;
  }
}
