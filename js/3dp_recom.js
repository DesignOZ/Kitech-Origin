const wb_model = await tf.loadLayersModel("model/tfjs_Width_bead/model.json");
const hb_model = await tf.loadLayersModel("model/tfjs_Height_bead/model.json");
const db_model = await tf.loadLayersModel("model/tfjs_Depth_bead/model.json");
const wh_model = await tf.loadLayersModel("model/tfjs_Width_HAZ/model.json");
const dh_model = await tf.loadLayersModel("model/tfjs_Depth_HAZ/model.json");


let index = 1;
var option = 0;

$(document).ready(function(){

    $('ul.tabs li').click(function(){
        var tab_id = $(this).attr('data-tab');

        switch (tab_id) {
            case 'tab-1':
                option = 0;
                $('#search_val').attr('placeholder','520~1170');
                $('#search_val').val('');
                break;
            case 'tab-2':
                option = 1;
                $('#search_val').attr('placeholder','70~150');
                $('#search_val').val('');
                break;
            case 'tab-3':
                option = 2;
                $('#search_val').attr('placeholder','10~170');
                $('#search_val').val('');
                break;
            case 'tab-4':
                option = 3;
                $('#search_val').attr('placeholder','800~1500');
                $('#search_val').val('');
                break;
            case 'tab-5':
                option = 4;
                $('#search_val').attr('placeholder','210~470');
                $('#search_val').val('');
                break;
            default:
                break;
        }
        
        $('ul.tabs li').removeClass('current');
        //$('.tab-content').removeClass('current');

        $(this).addClass('current');
        //$("#"+tab_id).addClass('current');

    })
    
})



$("#search_btn").click(function(){

    $('#table_data > tbody > tr').remove();
    index = 1;

    var _arr_ = [];
    var search_val = $("#search_val").val();
    var __LP__, __SS__, __Tj__, __Ts__, __Tp__, __Tc__, __HC__ = 0;
    var _low_, _high_ = 0;

    var min, max;
    
    if($("#search_val").val() == ""){
        $("#search_input_error").text("값을 입력해 주세요!!");
        return false;
    } else{
        $("#search_input_error").text("\u00a0");
    }

    switch (option) {
        case 0:
            min = 520;
            max = 1170;
            break;
        case 1:
            min = 70;
            max = 150;
            break;
        case 2:
            min = 10;
            max = 170;
            break;
        case 3:
            min = 800;
            max = 1500;
            break;
        case 4:
            min = 210;
            max = 470;
            break;
        default:
            break;
    }

    if($("#search_val").val() == ""){
        alert("입력 오류");
        return false;
    } else{
        if($("#search_val").val() < min || $("#search_val").val() > max){
            alert("입력 오류");
            $("#search_val").val("");
            return false;
        } else{
            $("#reco_error").text("\u00a0");
        }
    }

    function rand(min, max) {
        return Math.random() * (max - min + 1) + min;
    }

    _low_ = search_val * 0.9;
    _high_ = search_val * 1.1;

    console.log(_low_, _high_);

    var model;
    var tab = 'tab-1';

    switch (option) {
        case 0:
            model = wb_model;
            tab = 'tab-1';
            break;
        case 1:
            model = hb_model;
            tab = 'tab-2';
            break;
        case 2:
            model = db_model;
            tab = 'tab-3';
            break;
        case 3:
            model = wh_model;
            tab = 'tab-4';
            break;
        case 4:
            model = dh_model;
            tab = 'tab-5';    
            break;
        default:
            break;
    }

    console.log("option : " + option, tab);
    console.log(model);

    $('.tab-content').removeClass('current');
    $("#"+tab).addClass('current');

    for(var i=0;i<=1000;i++){
        __LP__ = Math.floor(rand(260, 500));
        __SS__ = Math.floor(rand(5, 25));
        __Tj__ = parseFloat(rand(21, 22)).toFixed(3);
        __Ts__ = parseFloat(rand(21, 27)).toFixed(3);
        __Tp__ = parseFloat(rand(25, 29)).toFixed(3);
        __Tc__ = parseFloat(rand(20, 26)).toFixed(3);
        __HC__ = parseFloat(rand(26, 38)).toFixed(3);

        _arr_ = [__LP__, __SS__, __Tj__, __Ts__, __Tp__, __Tc__, __HC__];

        //console.log(_arr_);
        
        let result = model.predict(tf.tensor(_arr_, [1,_arr_.length])).arraySync();
        result = parseInt(result);

        //console.log(result);

        if(result >= _low_ && result<=_high_){
            let table_data = "<tr id=table_list"+index+">";
            table_data += "<td>"+index+"</td>";
            table_data += "<td>"+_arr_[0]+"</td>";
            table_data += "<td>"+_arr_[1]+"</td>";
            table_data += "<td>"+_arr_[2]+"</td>";
            table_data += "<td>"+_arr_[3]+"</td>";
            table_data += "<td>"+_arr_[4]+"</td>";
            table_data += "<td>"+_arr_[5]+"</td>";
            table_data += "<td>"+_arr_[6]+"</td>";
            table_data += "<td>"+result+"</td>";
            table_data += "<tr>";

            index++;
            $("#table_data > tbody").append(table_data)

            if(index>11){
                break;
            }
        }


    }

})


/*
$("#wb").click(function(){
    search("wb");
    $("#wb").removeClass("choose_tab");
    $("#hb").removeClass("choose_tab");
    $("#db").removeClass("choose_tab");
    $("#wh").removeClass("choose_tab");
    $("#dh").removeClass("choose_tab");
    $("#wb").toggleClass("choose_tab");
})

$("#hb").click(function(){
    search("hb");
    $("#wb").removeClass("choose_tab");
    $("#hb").removeClass("choose_tab");
    $("#db").removeClass("choose_tab");
    $("#wh").removeClass("choose_tab");
    $("#dh").removeClass("choose_tab");
    $("#hb").toggleClass("choose_tab");
})

$("#db").click(function(){
    search("db");
    $("#wb").removeClass("choose_tab");
    $("#hb").removeClass("choose_tab");
    $("#db").removeClass("choose_tab");
    $("#wh").removeClass("choose_tab");
    $("#dh").removeClass("choose_tab");
    $("#db").toggleClass("choose_tab");
})

$("#wh").click(function(){
    search("wh");
    $("#wb").removeClass("choose_tab");
    $("#hb").removeClass("choose_tab");
    $("#db").removeClass("choose_tab");
    $("#wh").removeClass("choose_tab");
    $("#dh").removeClass("choose_tab");
    $("#wh").toggleClass("choose_tab");
})

$("#dh").click(function(){
    search("dh");
    $("#wb").removeClass("choose_tab");
    $("#hb").removeClass("choose_tab");
    $("#db").removeClass("choose_tab");
    $("#wh").removeClass("choose_tab");
    $("#dh").removeClass("choose_tab");
    $("#dh").toggleClass("choose_tab");
})
*/