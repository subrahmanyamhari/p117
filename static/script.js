$(document).ready(function(){

    console.log('Ready')

    var now = new Date()
    var date_detail = now.toLocaleDateString()
    //  Fetch the current date and update it in the DOM
    $(document).ready(function () {
    $("#date").text("Date : " + date_detail)
    })

    //  write an event, when Submit button is clicked
    $('#button').click(function(){

        //  get the text value from the textarea using the 'val()' method
        let text_value = $('#text').val()

        //  Convert it to JS object.
        //  Provide a 'key' here and in write the same in app.py file as well to extract data
        let input_text = {'text_data' : text_value}
        console.log(input_text)

        //  ajax request
        $.ajax({

            url : "/predict-data",
            //  type of web request
            type : "POST",

            //  Data to be sent in JSON format
            data : JSON.stringify(input_text),

            //  type of response expected is json
            dataType : 'json',

            //  contentType
            contentType : 'application/json',


            //  if everything is successful, run this function
            success : function(result){
                console.log(result)

                $("#sentiment").html(result.prediction)
                $("#emoji").attr('src', result.emoji);
                $("#sentiment").show()
                $("#emoji").show()
            },


            error: function (result) {
                alert(result.responseJSON.message)
            }
        })


        //  clearing the textbox after every button push
//        $('#text').val("")
    })
        
})