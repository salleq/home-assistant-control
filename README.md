# home-assistant-control
Home Assistant Control

I wanted to create a lightweight webpage(s) for controlling my Home Assistant on devices that cannot work with the official HA Frontend that would also be relatively easy to edit.
I couldn't find such projects anywhere, at least not active.

You need to rename the config.example.js to config.js and then:
- Add the buttons/sliders you want to use as buttons in the HTML - note entity_id and the status-id
- Add entity_ids and status-id:s in the javascript as well - multiple places (sorry do not know how to consolidate them)

Expect bugs.
