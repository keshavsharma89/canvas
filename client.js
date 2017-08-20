const objdrag= new drager();

var getImages = function(cb){
    $.get("/images", function(data) {
        cb(data);
    })
}

getImages(function(files){
    if(objdrag.SessionData){
        var imagesInSession = objdrag.SessionData.imgArr;
    }else{
        var imagesInSession = [];
    }

    $.each(files, function(index, value){
        if(imagesInSession.indexOf(value) === -1){
            $("#img-container").append("<li class=\"move_to_canvas\" ><img src=" + value + "  /></li> ");
        }
    });
});


$(document).ready(function(){
    if(window.sessionStorage){
        objdrag.SessionData = JSON.parse(sessionStorage.getItem("SessionObjects"));
        if(objdrag.SessionData){
            if(objdrag.SessionData.html != ''){
                $("#block").html(objdrag.SessionData.html);
            }
            if(objdrag.SessionData.txtValue != null){
                $("#text_element").remove();
            }
        }
    }

    $("#addimage").submit(function(){
        if($("#upload").val() === ''){
            console.log("please upload a file");
            return false;
        }
        $(this).ajaxSubmit({
            error: function(xhr) {
                console.log('Error: ' + xhr.status);
            },
            success: function(response){
                $("#img-container").append("<li class=\"move_to_canvas\" ><img src=" + response.file + "  /></li> ");
                $("#upload").val('');
            }
        });
        return false;
    });

    $("#addText").click(function() {
        let elem = $("#text_element");
        elem.attr("ondragstart", "return false");
        elem.addClass("draggable_element");
        $(".block").append(elem[0]);
    });

    $('body').on('mousedown', '#block .draggable_element', function(event) {
		objdrag.start_drag(this, event);
    });

    $('body').on('mousemove', '#block', function(event) {
        objdrag.while_drag(event);
    });

    $('body').on('mouseup', '#block', function(event) {
        objdrag.stop_drag();
    });

    $('body').on('dblclick', '.move_to_canvas', function() {
        let elem = $(this).find('img');
        elem.attr("ondragstart", "return false");
        elem.addClass("draggable_element");
        $(".block").append(elem[0]);
        $(this).remove();
    });

    $('body').on('dblclick', '.draggable_element', function() {
        let elem = $(this).clone();
        elem.removeAttr("ondragstart");
        elem.removeClass("draggable_element");
        if (elem.is('img')) {
            $("#img-container").append('<li class=\"move_to_canvas\" ></li>');
            $("ul li").last().html(elem);
        } else {
            $("#addText").before(elem);
        }
        $(this).remove();
    });

    $('body').on('dragstart', 'img', function(event) {
        event.preventDefault();
    });

    $(window).unload(function(){
        let arrImgs = [];
        let textVal = null;

        $('#block').children('img').each(function() {
            arrImgs.push(this.src); // "this" is the current element in the loop
        })

        $('#block').children('img').each(function() {
            arrImgs.push(this.src); // "this" is the current element in the loop
        })

        let spanElem = $("#block span");
        if(spanElem !== null){
            textVal = spanElem.find('h4').html();
        }
        if(window.sessionStorage){
            sessionStorage.setItem("SessionObjects", "");
            objdrag.SessionData = {
                'html': $("#block").html(),
                'imgArr': arrImgs,
                'txtValue': textVal
            };
            sessionStorage.setItem("SessionObjects", JSON.stringify(objdrag.SessionData));
        }
    });
});
