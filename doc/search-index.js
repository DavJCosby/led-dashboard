var searchIndex = JSON.parse('{\
"slc":{"doc":"SLC - Spatial Lighting Controller","t":[0,11,11,11,0,0,0,0,0,8,8,3,3,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,10,10,10,11,11,11,11,11,11,11,11,11,11,11,11,3,11,11,11,11,11,11,11,11,11,11,11,11,11,3,11,11,11,11,11,11,11,11,11,11,11,12,11,11,11,11,11,11,11,11,11,3,11,11,12,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,6,6,8,6,6,6,10,10,10],"n":["devices","intersects","len","lerp","prelude","room","room_controller","room_data","util","InputDevice","OutputDevice","RoomControllerInputHandle","RoomControllerOutputHandle","borrow","borrow","borrow_mut","borrow_mut","clone","clone","clone_into","clone_into","from","from","into","into","is_poisoned","is_poisoned","new","new","read","read","start","start","stop","to_owned","to_owned","try_from","try_from","try_into","try_into","try_read","try_read","try_write","type_id","type_id","write","Room","add_output_device","borrow","borrow_mut","from","get_input_device","into","new","set_input_device","start","stop","try_from","try_into","type_id","RoomController","borrow","borrow_mut","from","get_color_at_room_dir","get_led_at_room_dir","into","map_angle_to_color","map_angle_to_color_clamped","map_dir_to_color","map_dir_to_color_clamped","new","room_data","set","set_all","set_at_room_angle","set_at_room_dir","set_at_view_angle","set_at_view_dir","try_from","try_into","type_id","RoomData","borrow","borrow_mut","brightness","density","from","get_pos_at_t","into","leds","new_from_file","set_led","strips","try_from","try_into","type_id","view_angle_to_room_angle","view_dir_to_room_dir","view_pos","view_rot","Color","LineSegment","LineSegmentTrait","Point","Strip","Vector2D","intersects","len","lerp"],"q":["slc","","","","","","","","","slc::devices","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","slc::room","","","","","","","","","","","","","","slc::room_controller","","","","","","","","","","","","","","","","","","","","","","slc::room_data","","","","","","","","","","","","","","","","","","","slc::util","","","","","","","",""],"d":["","Returns the point of intersection between two …","Returns the length of the LineSegment, obtained using the …","Interpolates between line_segment.0 and line_segment.1 at …","","","","","","Trait for anything that should send input to the …","Trait for anything that reads from the RoomController.","Wrapper struct around an Arc<RwLock> to provide …","Wrapper struct around an Arc<RwLock> to provide …","","","","","","","","","","","","","Determines whether the lock is poisoned.","Determines whether the lock is poisoned.","","","Locks this rwlock with shared read access, blocking the …","Locks this rwlock with shared read access, blocking the …","Tells the driver to start sending input to the …","Tells the driver to reading data from the RoomController.","Tells the driver to stop sending input to the …","","","","","","","Attempts to acquire this rwlock with shared read access.","Attempts to acquire this rwlock with shared read access.","Attempts to lock this rwlock with exclusive write access.","","","Locks this rwlock with exclusive write access, blocking …","","Adds an output device to the room.","","","","Returns the current input device.","","Constructs a Room from a room config (.rcfg) file.","Changes the input device associated with the room. If an …","starts all connected input and output devices.","stops all connected input devicces.","","","","","","","","Returns the color of the led at the given room-space …","Casts a ray in the given direction, in room coordinate …","","Allows the user to pass in a Color-returning function to …","Allows the user to pass in a Color-returning function to …","Allows the user to pass in a Color-returning function to …","Allows the user to pass in a Color-returning function to …","Creates a RoomController by first creating and consuming …","","Sets the color of a given led","Sets the color of all leds in the room","Sets the color of the pixel at a given angle, relative to …","Uses get_led_at_room_dir() to color an led at a given …","Sets the color of the pixel at a given angle, relative to …","Sets the color of the pixel in a given direction, …","","","","","","","Brightness of the leds on a 0-255 scale.","read-only access to the density field.","","Interpolates down the chain of strips to return the point …","","read-only access to the leds field.","constructs a room from a .rcfg file.","Sets the led at index to the given color.","read-only access to the srips field.","","","","Transforms an angle in view space to room space.","Transforms a direction in view space to room space.","read-only access to the view_pos field.","read-only access to the view_rot field.","24-bit color tuple alias.","Line segment stretching from line_segment.0 to …","","Point with x = point.0 and y = point.1.","LED light strip stretching from strip.0 to strip.1. Does …","Vector with x = point.0 and y = point.1.","","",""],"i":[0,1,1,1,0,0,0,0,0,0,0,0,0,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,4,5,4,2,3,2,3,2,3,2,3,2,2,3,2,0,6,6,6,6,6,6,6,6,6,6,6,6,6,0,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,0,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,0,0,0,0,0,0,9,9,9],"f":[null,[[["linesegment",6]],[["point",6],["option",4]]],[[],["f32",15]],[[["f32",15]],["point",6]],null,null,null,null,null,null,null,null,null,[[]],[[]],[[]],[[]],[[]],[[]],[[]],[[]],[[]],[[]],[[]],[[]],[[],["bool",15]],[[],["bool",15]],[[["rwlock",3],["arc",3]]],[[["rwlock",3],["arc",3]]],[[],[["rwlockreadguard",3],["lockresult",6]]],[[],[["rwlockreadguard",3],["lockresult",6]]],[[["roomcontrollerinputhandle",3]]],[[["roomcontrolleroutputhandle",3]]],[[]],[[]],[[]],[[],["result",4]],[[],["result",4]],[[],["result",4]],[[],["result",4]],[[],[["rwlockreadguard",3],["trylockresult",6]]],[[],[["rwlockreadguard",3],["trylockresult",6]]],[[],[["rwlockwriteguard",3],["trylockresult",6]]],[[],["typeid",3]],[[],["typeid",3]],[[],[["lockresult",6],["rwlockwriteguard",3]]],null,[[["send",8],["sync",8],["outputdevice",8]]],[[]],[[]],[[]],[[],["box",3]],[[]],[[["str",15]]],[[["send",8],["sync",8],["inputdevice",8]]],[[]],[[]],[[],["result",4]],[[],["result",4]],[[],["typeid",3]],null,[[]],[[]],[[]],[[["vector2d",6]],["color",6]],[[["vector2d",6]],["option",4]],[[]],[[["fn",8]]],[[["fn",8],["f32",15]]],[[["fn",8]]],[[["fn",8],["f32",15]]],[[["str",15]],["roomcontroller",3]],null,[[["usize",15],["color",6]]],[[["color",6]]],[[["color",6],["f32",15],["bool",15]]],[[["color",6],["bool",15],["vector2d",6]]],[[["color",6],["f32",15],["bool",15]]],[[["color",6],["bool",15],["vector2d",6]]],[[],["result",4]],[[],["result",4]],[[],["typeid",3]],null,[[]],[[]],null,[[],["f32",15]],[[]],[[["f32",15]],["point",6]],[[]],[[],["vec",3]],[[["str",15]]],[[["usize",15],["color",6]]],[[],["vec",3]],[[],["result",4]],[[],["result",4]],[[],["typeid",3]],[[["f32",15]],["f32",15]],[[["vector2d",6]],["vector2d",6]],[[],["point",6]],[[],["f32",15]],null,null,null,null,null,null,[[["linesegment",6]],[["point",6],["option",4]]],[[],["f32",15]],[[["f32",15]],["point",6]]],"p":[[6,"LineSegment"],[3,"RoomControllerInputHandle"],[3,"RoomControllerOutputHandle"],[8,"InputDevice"],[8,"OutputDevice"],[3,"Room"],[3,"RoomController"],[3,"RoomData"],[8,"LineSegmentTrait"]]}\
}');
if (window.initSearch) {window.initSearch(searchIndex)};