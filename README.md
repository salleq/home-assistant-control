# home-assistant-control
Home Assistant Control

I wanted to create a lightweight webpage(s) for controlling my Home Assistant on devices that cannot work with the official HA Frontend that would also be relatively easy to edit.
I couldn't find such projects anywhere, at least not active. HA Component Kit was too complicated for me to even set up so this is something even more simple, however adding new entities isn't simple in itself, but the UI is lightweight and should work on really old browsers as well.

If I ever get to know how to get Component Kit working, I might create a repo for guide to do that....

Supported functions right now:
- Toggle buttons with status (works for input_boolean, light etc. anything that works by calling homeassistant toggle service/action - also input_button works with different function)
- Sliders for brightness / color temperature
- Different pages for different rooms
- MDI icons

Planned functions:
- Color slider for lights
- Separate files for better manageability
- Maybe something else, but most of the functionality I need is already baked in - this is NOT meant for replacing HA dashboard completely, instead it's a quick loading web page to toggle the switches you most need.
- Authentication is NOT planned. It's baked in. Gotta find out how to make that a bit more secure (ie. token not in plain text for client to get.)

You need to rename the config.example.js to config.js and then:
- Add the buttons/sliders you want to use as buttons in the HTML - note entity_id and the status-id
- Add entity_ids and status-id:s in the javascript as well - multiple places (sorry do not know how to consolidate them)
- Front the nginx with some other reverse proxy (or just get certificates for nginx) and get the CORS stuff working with Home Assistant...it won't work with only IP.

Bugs are expected.

<img width="983" alt="image" src="https://github.com/user-attachments/assets/25a28e8f-d17b-4531-86a3-2583171ca152">
