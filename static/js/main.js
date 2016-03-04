var socket = io()
function submit() {
    var e = document.getElementById("select");
    var div = document.getElementById('append');
    var batFile = [e.options[e.selectedIndex].value, md5(document.getElementById("password").value)]
    socket.emit("bat", batFile, function(packet) {
        console.log(packet)
        if (packet == "invalid") {
            div.innerHTML = div.innerHTML + "<span style='color:red'>Invalid Password</span><br />"
        } else if (packet) {
            div.innerHTML = div.innerHTML + "<span style='color:green'>Success!</span><br />"
            div.innerHTML = div.innerHTML + "Output: " + packet + "<br />"
        }
        else {
            div.innerHTML = div.innerHTML + "<span style='color:red'>Failure :(</span><br />"
            div.innerHTML = div.innerHTML + "Log: " + packet + "<br />"
        }
    });
}
function load() {
    socket.emit("files", "data", function(bat) {
        $.each(bat, function(key, value) {   
            $('#select')
                .append($("<option></option>")
                .attr("value",key)
                .text(value)); 
        });
    })
}