const server_loc = "http://70.34.15.240:88";
var display_running = false;
var first_time_load = true;
var got_update = false;

function check_server_status() {
    var status_box = document.getElementById("status_panel");
    var rocket_status = document.getElementById("rocket_status");
    var tcp_status = document.getElementById("tcp_status");
    var rec = document.getElementById("status_recommendation");
    var refresh_button = document.getElementById("status_refresh");

    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status == 200) {
                rocket_status.textContent = "online";
                rocket_status.className = "okay";

                var tcp_state = xhr.responseText;
                tcp_status.textContent = tcp_state;
                update_fx_from_sever();
                got_update = true;
                setInterval(update_canvas, 20);

                if (tcp_state == "online") {
                    tcp_status.className = "okay";
                    rec.textContent = "You're all set!";
                    rec.className = "okay";
                    status_box.className = "panel okay_border";
                    refresh_button.hidden = true;
                    if (display_running == false) {
                        display_running = true
                    }
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

    let xhr = new XMLHttpRequest();
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

function update_fx_from_sever() {
    let xhr1 = new XMLHttpRequest();
    xhr1.onreadystatechange = function () {
        if (xhr1.readyState === 4) {
            if (xhr1.status == 200) {
                var fx = xhr1.responseText;
                var fx_list = document.getElementById("fx_list");
                fx_list.value = fx;
                load_sliders(fx);
            }
        }
    }
    xhr1.open('get', server_loc + "/fx/current", true);
    xhr1.send();

    let xhr2 = new XMLHttpRequest();
    xhr2.onreadystatechange = function () {
        if (xhr2.readyState === 4) {
            if (xhr2.status == 200) {
                var is_on = xhr2.responseText;
                if (is_on == "true") {
                    set_fx_button_stop();
                } else {
                    set_fx_button_start();
                }
            }
        }
    }
    xhr2.open('get', server_loc + "/fx/on", true);
    xhr2.send();
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
    var fx_list = document.getElementById("fx_list");
    fx_list.disabled = true;
    var button = document.getElementById("room_toggle");
    button.disabled = false;
    button.textContent = "STOP";
    button.className = "error error_border";
    button.onclick = on_stop;
}

function set_fx_button_start() {
    var fx_list = document.getElementById("fx_list");
    fx_list.disabled = false;
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

    let xhr = new XMLHttpRequest();
    xhr.open('post', server_loc + "/room/refresh", true);
    xhr.send();
}

function on_stop() {
    check_server_status();

    set_fx_button_start();
    var fx_list = document.getElementById("fx_list");
    fx_list.disabled = false;

    let xhr = new XMLHttpRequest();
    xhr.open('post', server_loc + "/room/stop", true);
    xhr.send();
}

function on_fx_change(new_fx) {
    load_sliders(new_fx);
    let xhr = new XMLHttpRequest();
    xhr.open('post', server_loc + "/fx/" + new_fx, true);
    xhr.send();
}

function componentToHex(c) {
    let hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}
function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return parseInt(result[1], 16) + " " + parseInt(result[2], 16) + " " + parseInt(result[3], 16);
}

function load_sliders(fx_name) {
    var slider_container = document.getElementById("sliders");
    slider_container.innerHTML = "";

    let xhr = new XMLHttpRequest();
    xhr.open('get', server_loc + "/fx/" + fx_name + "/sliders", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            var sliders = JSON.parse(xhr.responseText);
            for (let slider_name in sliders) {
                if (sliders.hasOwnProperty(slider_name)) {
                    var slider_element = document.createElement("div");
                    slider_element.className = "slider";
                    slider_container.appendChild(slider_element);

                    let input = document.createElement("input");

                    var slider = sliders[slider_name];
                    switch (slider["type"]) {
                        case "color":
                            var slider_label = document.createElement("span");
                            slider_label.textContent = slider_name.toUpperCase();
                            slider_element.appendChild(slider_label);

                            input.type = "color";
                            let hex = rgbToHex(slider["value"][0], slider["value"][1], slider["value"][2]);
                            input.value = hex;

                            input.addEventListener("input", function () {
                                let new_color = hexToRgb(input.value);
                                update_slider(fx_name, slider_name, new_color);
                            });

                            slider_element.appendChild(input);
                            break;
                        case "f32_clamped":
                            let range_container = document.createElement("div");
                            range_container.className = "range_container";

                            var slider_label = document.createElement("span");
                            slider_label.textContent = slider_name.toUpperCase() + ":\u00A0";
                            range_container.appendChild(slider_label);

                            let value_label = document.createElement("span");
                            value_label.textContent = slider["value"][0];
                            range_container.appendChild(value_label);

                            input.type = "range";
                            input.min = slider["value"][1];
                            input.max = slider["value"][2];
                            input.step = slider["value"][3];
                            input.value = slider["value"][0];

                            input.addEventListener("input", function () {
                                value_label.textContent = input.value;
                                update_slider(fx_name, slider_name, input.value + "");
                            });

                            range_container.appendChild(input);
                            slider_element.appendChild(range_container);
                            break;
                        case "f32":
                            var slider_label = document.createElement("span");
                            slider_label.textContent = slider_name.toUpperCase();
                            slider_element.appendChild(slider_label);

                            input.type = "number";
                            input.value = slider["value"];

                            input.addEventListener("input", function () {
                                update_slider(fx_name, slider_name, input.value + "");
                            });

                            slider_element.appendChild(input);
                            break;
                    }

                }
            }
        }
    }
    xhr.send();
}

function update_canvas() {
    if (got_update == false) { return; }
    got_update = false;
    let canvas_request = new XMLHttpRequest();
    let canvas = document.getElementById("display_canvas");
    var ctx = canvas.getContext('2d');

    let width = 500;
    let height = 500;

    canvas_request.onreadystatechange = function () {
        if (canvas_request.readyState === 4) {
            let json = eval('(' + canvas_request.responseText + ")");
            if (canvas.getContext) {

                //ctx.clearRect(0, 0, width, width);
                for (let i = 0; i < json.leds.length / 3; i++) {
                    let start = i * 3;
                    let color = "#" + json.leds[start];
                    let x = json.leds[start + 1];
                    let y = height - json.leds[start + 2];

                    ctx.fillStyle = color;
                    ctx.fillRect(x - 3, y - 3, 6, 6);
                }
                got_update = true;
            }
        }
    }
    canvas_request.open('get', server_loc + '/leds', true);
    canvas_request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    canvas_request.send();
}

function submit() {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            alert(xhr.responseText);
        }
    }
    xhr.open('get', 'http://localhost:8000/hello/John/58', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    xhr.send();
}

function update_slider(fx_name, slider_name, value) {
    let xhr = new XMLHttpRequest();
    xhr.open("post", server_loc + "/fx/" + fx_name + "/" + slider_name);
    xhr.send(value);
}
