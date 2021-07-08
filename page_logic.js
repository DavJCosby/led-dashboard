const server_loc = "http://192.168.1.169:8000";
var room_running = false;
var first_time_load = true;

function check_server_status() {
    var status_box = document.getElementById("status_panel");
    var rocket_status = document.getElementById("rocket_status");
    var tcp_status = document.getElementById("tcp_status");
    var rec = document.getElementById("status_recommendation");
    var refresh_button = document.getElementById("status_refresh");

    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status == 200) {
                rocket_status.textContent = "online";
                rocket_status.className = "okay";

                let tcp_state = xhr.responseText;
                tcp_status.textContent = tcp_state;
                if (first_time_load) {
                    set_fx_button_stop();
                    first_time_load = false;
                }

                if (tcp_state == "online") {
                    tcp_status.className = "okay";
                    rec.textContent = "You're all set!";
                    rec.className = "okay";
                    status_box.className = "panel okay_border";
                }
                else if (tcp_state == "offline") {
                    tcp_status.className = "error";
                    rec.textContent = "Restart the TCP server, then click the button below to refresh the RoomController.";
                    rec.className = "warn";
                    status_box.className = "panel warn_border";
                    refresh_button.hidden = false;
                    refresh_button.onclick = refresh_room;
                }
            }
            else {
                rocket_status.textContent = "offline";
                rocket_status.className = "error";
                tcp_status.textContent = "unreachable";
                tcp_status.className = "error";
                rec.textContent = "Restart the web server, then click the button below to refresh the page.";
                rec.className = "error";
                status_box.className = "panel error_border";
                refresh_button.hidden = false;
                refresh_button.onclick = refresh_page;
                set_fx_disabled();
            }
        }
    }

    xhr.open('get', server_loc + "/tcp_status", true);
    xhr.send();
}

function refresh_room() {
    var self = document.getElementById("status_refresh");
    var tcp_status = document.getElementById("tcp_status");

    var xhr = new XMLHttpRequest();
    xhr.open('post', server_loc + "/room/refresh", true);
    xhr.send();

    self.hidden = true;
    tcp_status.textContent = "checking...";
    tcp_status.className = "warn";
    check_server_status();
}

function refresh_page() {
    location.reload();
}

function set_fx_disabled() {
    var button = document.getElementById("room_toggle");
    var fx_list = document.getElementById("fx_list");
    button.disabled = true;
    fx_list.disabled = true;
    button.textContent = "...";
    button.className = "disabled disabled_border";
}

function set_fx_button_stop() {
    var button = document.getElementById("room_toggle");
    button.disabled = false;
    button.textContent = "STOP";
    button.className = "error error_border";
    button.onclick = on_stop;
}

function set_fx_button_start() {
    var button = document.getElementById("room_toggle");
    button.disabled = false;
    button.textContent = "START";
    button.className = "okay okay_border";
    button.onclick = on_start;
}

function on_start() {
    check_server_status();

    set_fx_button_stop();
    var fx_list = document.getElementById("fx_list");
    fx_list.disabled = true;
    check_server_status();

    var xhr = new XMLHttpRequest();
    xhr.open('post', server_loc + "/room/start", true);
    xhr.send();
}

function on_stop() {
    check_server_status();

    set_fx_button_start();
    var fx_list = document.getElementById("fx_list");
    fx_list.disabled = false;

    var xhr = new XMLHttpRequest();
    xhr.open('post', server_loc + "/room/stop", true);
    xhr.send();
}

function on_fx_change(new_fx) {
    var xhr = new XMLHttpRequest();
    xhr.open('post', server_loc + "/fx/" + new_fx, true);
    xhr.send();
}

function submit() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            alert(xhr.responseText);
        }
    }
    xhr.open('get', 'http://localhost:8000/hello/John/58', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    xhr.send();
}