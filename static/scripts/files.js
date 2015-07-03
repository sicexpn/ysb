
$(function () {
    'use strict';
    var url = '/apps/images/' ,
        uploadButton = $('<button/>')
            .attr('id', 'upload')
            .addClass('btn btn-primary')
            .prop('disabled', true)
            .text('Processing...')
            .on('click', function () {
                var $this = $(this),
                    data = $this.data();
                $this
                    .off('click')
                    .text('Abort')
                    .on('click', function () {
                        $this.remove();
                        data.abort();
                    });
                data.submit().always(function () {
                    $this.remove();
                });
            });
    $('#fileupload_appimage').fileupload({
        url: url,
        dataType: 'json',
        //autoUpload: true,
        acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
        maxFileSize: 1000000000, 
        // Enable image resizing, except for Android and Opera,
        // which actually support image resizing, but fail to
        // send Blob objects via XHR requests:
        previewMaxWidth: 100,
        previewMaxHeight: 100,
        previewCrop: true
    }).on('fileuploadadd', function (e, data) {
        $('#files_appimage').html("");
        data.context = $('<div/>').appendTo('.files_image');
        $.each(data.files, function (index, file) {
            $('#app_image').val(file.name);
            $('#files_appimage').html(file.name);
            var node = $('<p/>')
                    .append($('<span/>').text(file.name));
            data.context.html(node);
        //    $('#app_image').val("");
        /*
            if (!index) {
                node
                    .append('<br>')
                    .append(uploadButton.clone(true).data(data));
            }
        */
        });
    }).on('fileuploadprocessalways', function (e, data) {
        var index = data.index,
            file = data.files[index],
            node = $(data.context.children()[index]);
        if (file.preview) {
            node
                .prepend('<br>')
                .prepend(file.preview);
        }
        if (file.error) {
            node
                .append('<br>')
                .append($('<span class="text-danger"/>').text(file.error));
        }
        /*
        if (index + 1 === data.files.length) {
            data.context.find('button')
                .text('Upload')
                .prop('disabled', !!data.files.error);
        }
        */
    }).on('fileuploadprogressall', function (e, data) {
        var progress = parseInt(data.loaded / data.total * 100, 10);
        if(progress == 100){
            $('#progress_appimage').css("display", "none");
        }
        else
            $('#progress_appimage').css("display", "inline");
        $('#progress_appimage .progress-bar').css(
            'width',
            progress + '%'
        );
    }).on('fileuploaddone', function (e, data) {
        var result = JSON.parse(data.result);
        $.each(result, function (index, file) {
            if (file.name) {
                $('#app_image').val(file.name);
            } else if (file.error) {
                var error = $('<span class="text-danger"/>').text(file.error);
                $(data.context.children()[index])
                    .append('<br>')
                    .append(error);
            }
        });
    }).on('fileuploadfail', function (e, data) {
        $.each(data.files, function (index) {
            alert("fileuploadfail");
            var error = $('<span class="text-danger"/>').text('File upload failed.');
            $(data.context.children()[index])
                .append('<br>')
                .append(error);
        });
    }).prop('disabled', !$.support.fileInput)
        .parent().addClass($.support.fileInput ? undefined : 'disabled');
});





$(function () {
    'use strict';
    var url = '/apps/files/' ,
        uploadButton = $('<button/>')
            .attr('id', 'upload')
            .addClass('btn btn-primary')
            .prop('disabled', true)
            .text('Processing...')
            .on('click', function () {
                var $this = $(this),
                    data = $this.data();
                $this
                    .off('click')
                    .text('Abort')
                    .on('click', function () {
                        $this.remove();
                        data.abort();
                    });
                data.submit().always(function () {
                    $this.remove();
                });
            });
    $('#fileupload_appfile').fileupload({
        url: url,
        dataType: 'json',
        //autoUpload: true,
        acceptFileTypes: /(\.|\/)(zip|rar|jar)$/i,
        maxFileSize: 1000000000, 
        // Enable image resizing, except for Android and Opera,
        // which actually support image resizing, but fail to
        // send Blob objects via XHR requests:
        previewMaxWidth: 100,
        previewMaxHeight: 100,
        previewCrop: true
    }).on('fileuploadadd', function (e, data) {
        $('.files_appfile').html("");
        data.context = $('<div/>').appendTo('.files_appfile');
        $.each(data.files, function (index, file) {
            var node = $('<p/>')
                    .append($('<span/>').text(file.name));
            data.context.html(node);
            $('#app_file').val("");
        /*
            if (!index) {
                node
                    .append('<br>')
                    .append(uploadButton.clone(true).data(data));
            }
        */
        });
    }).on('fileuploadprocessalways', function (e, data) {
        var index = data.index,
            file = data.files[index],
            node = $(data.context.children()[index]);
        if (file.preview) {
            node
                .prepend('<br>')
                .prepend(file.preview);
        }
        if (file.error) {
            node
                .append('<br>')
                .append($('<span class="text-danger"/>').text(file.error));
        }
        /*
        if (index + 1 === data.files.length) {
            data.context.find('button')
                .text('Upload')
                .prop('disabled', !!data.files.error);
        }
        */
    }).on('fileuploadprogressall', function (e, data) {
        var progress = parseInt(data.loaded / data.total * 100, 10);
        if(progress == 100)
            $('#progress_appfile').css("display", "none");
        else
            $('#progress_appfile').css("display", "inline");
        $('#progress_appfile .progress-bar').css(
            'width',
            progress + '%'
        );
    }).on('fileuploaddone', function (e, data) {
    try{
        var result = JSON.parse(data.result);
        $.each(result, function (index, file) {
            if (file.name) {
                $('#app_file').val(file.name);
                //var link = $('<a>')
                //    .attr('target', '_blank')
                //    .prop('href', file.url);
                //$(data.context.children()[index])
                //    .wrap(link);
            } else if (file.error) {
                var error = $('<span class="text-danger"/>').text(file.error);
                $(data.context.children()[index])
                    .append('<br>')
                    .append(error);
            }
        });
        }catch(err){  alert(err);}
    }).on('fileuploadfail', function (e, data) {
        $.each(data.files, function (index) {
            var error = $('<span class="text-danger"/>').text('File upload failed.');
            $(data.context.children()[index])
                .append('<br>')
                .append(error);
        });
    }).prop('disabled', !$.support.fileInput)
        .parent().addClass($.support.fileInput ? undefined : 'disabled');
});




function registerNewAPP(){
   try{ 
    var app_icon = $('#app_image').val();
    if(app_icon == null || app_icon == ""){
       bootbox.alert("app icon not uploaded");
       return false;
    }
    /*var app_file = $('#app_file').val();
    if(app_file == null || app_file == ""){
       bootbox.alert("app file not uploaded");
       return false;
    }*/
    var app_images="";
    $('#app_images option:selected').each(function(){
        app_images+=$(this).text()+",";
    });
    app_images=app_images.substring(0,app_images.length-1);
    if(app_images == null || app_images==""){
        bootbox.alert("app images not selected");
        return false;
    }
    var app_name = $('#app_name').val();
    if(app_name == null || app_name == ""){
       bootbox.alert("app name not set");
       return false;
    }
    var app_manifest = $('#app_manifest').val();
    if(app_manifest == null || app_manifest == ""){
       bootbox.alert("app manifest not set");
       return false;
    }
    var app_version = $('#app_version').val();
    if(app_version == null || app_version == ""){
       bootbox.alert("app version not set");
       return false;
    }
    var dev_name = $('#dev_name').val();
    if(dev_name == null || dev_name == ""){
       bootbox.alert("developer name not set");
       return false;
    }
    var dev_company = $('#dev_company').val();
    if(dev_company == null || dev_company == ""){
       bootbox.alert("developer company not set");
       return false;
    }
    var dev_email = $('#dev_email').val();
    if(dev_email == null || dev_email == ""){
       bootbox.alert("developer email not set");
       return false;
    }
    //alert(app_images);
    //var data ="{name:app_name, manifest:app_manifest, version:app_version,author:dev_name, company:dev_company, email:dev_email, app_icon:app_icon, app_images:app_images}";
    $.ajax(
    {
      type: "POST",
      url:"/apps/",
    //  contentType: "application/json; charset=utf-8",
      dataType: "json",
      //async:false,
      data:{
        "name":app_name,
        "manifest":app_manifest,
        "version":app_version,
        "author":dev_name,
        "company":dev_company,
        "email":dev_email,
        "icon":app_icon,
        "content":app_images
      },
      complete: function(xhr){
        if (xhr.readyState == 4){
          if(xhr.status == 201){
              $(location).attr('href', "/");
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
    return false;
  }
}
