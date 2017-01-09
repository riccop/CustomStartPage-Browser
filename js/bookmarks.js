// A $( document ).ready() block.
// Shorthand for $( document ).ready()
$(function() {

    console.log( "document is ready!" );
    var xml = getBookmarks();
    var data;

    $( "#addbookmark" ).click(function() {
        console.log( "Handler add bookmark called!" );

        //code to add bookmark
        var category = $("#category").val();//null if no option selected
        var newUrl = $("#newUrl").val();// "" if no input
        var name = $("#displayName").val();

        if(newUrl = ''){
            alert('Webpage empty!');
            if(category = null)
                alert('Select category!');
        }
        else {
            newEle = xml.createElement("mark");
            newText=xml.createTextNode(name);
            newEle.setAttribute("ref",newUrl);
            newEle.appendChild(newText);
            xml.getElementsByTagName(category)[0].appendChild(newEle);

            //update data
            data = new XMLSerializer().serializeToString(xml);
        }

    });

    /*todo
        check if category exist and add, when added update all select categorys... update data
     */
    $( "#addctgr" ).click(function() {
        console.log("Handler add category called.");
        //code to add category

    });

    /*todo
     check if category exist and remove, when removed update all select categorys... update data
     */
    $( "#rmvctgr" ).click(function() {
        console.log("Handler remove category called.");
        //code to remove category...
    });

    $("#downloadConfigFile").click(function () {
        download(data, "links.xml", "xml");
    });

});



function getBookmarks() {
    if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }
    else
    {// code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.open("GET",'xml/links.xml',false);//file:///C:/xml/xxxx.xml
    xmlhttp.send();
    xmlDocument=xmlhttp.responseXML;
    //alert(xmlDocument);
    return xmlDocument;
}

// Function to download data to a file
function download(data, filename, type) {
    var a = document.createElement("a"),
        file = new Blob([data], {type: type});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 0);
    }
}