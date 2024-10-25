
// Function to toggle entities on/off
window.toggleEntity = async function(entityId) {
    const statusIdMap = {
        'light.vierashuone': 'statusVierashuone',
        'input_boolean.guest_room_light_toggle': 'statusGuestRoomLightToggle',
        'light.gr_ambient': 'statusGrAmbient',
        'switch.shellyplug_s_80646f82707a': 'statusShellyPlug2',
        'switch.shellyplug_tyohuone_2': 'statusShellyPlug1',
        'switch.tp_link_washer': 'statusWasher',
        'switch.tp_link_dryer': 'statusDryer',
        'light.kylppari': 'statusKylpparinvalot',
        'switch.shelly1l_bathroomfan': 'statusKylpparintuuletin',
        'light.olohuone_vasen': 'statusVasenkattovalo',
        'light.livingroom_ceiling_right': 'statusOikeaKattovalo',
        'input_boolean.ceiling_lights': 'statusOikeaKattovaloToggle',
        'light.olkkarin_jalkalamppu_2': 'statusOlkkarinJalkalamppu',
        'switch.tiskikone': 'statusOlkkarinLaturi'
        // Add other entities as needed
    };

    const statusId = statusIdMap[entityId];
    const statusMessage = document.getElementById(statusId);
    const button = statusMessage.previousElementSibling;

    if (!statusMessage || !button) {
        console.error(`Element with ID ${statusId} not found`);
        return;
    }

    statusMessage.textContent = 'Processing...';

    try {
        const response = await fetch(`${homeAssistantUrl}/api/services/homeassistant/toggle`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ entity_id: entityId })
        });

        if (response.ok) {
            const data = await response.json();
            const newState = data.state === 'on';
            statusMessage.textContent = newState ? 'On' : 'Off';
            button.classList.toggle('active', newState);
            setTimeout(fetchInitialState, 1000);  // Delay 1 second before fetching updated state
        } else {
            const responseBody = await response.json();
            statusMessage.textContent = `Error: ${responseBody.message || 'Unknown error'}`;
        }
    } catch (error) {
        console.error('Error toggling entity:', error);
        statusMessage.textContent = 'An error occurred';
    }
};

// Function to update light brightness using a slider
window.updateBrightness = async function(entityId, brightness) {
    const statusId = `status-${entityId}`;
    const statusMessage = document.getElementById(statusId);

    if (!statusMessage) {
        console.error(`Element with ID ${statusId} not found`);
        return;
    }

    statusMessage.textContent = 'Updating brightness...';

    try {
        const response = await fetch(`${homeAssistantUrl}/api/services/light/turn_on`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                entity_id: entityId,
                brightness: parseInt(brightness)
            })
        });

        if (response.ok) {
            statusMessage.textContent = 'Brightness updated';
            setTimeout(fetchInitialState, 1000);  // Delay 1 second before fetching updated state
        } else {
            const responseBody = await response.json();
            statusMessage.textContent = `Error: ${responseBody.message || 'Unknown error'}`;
        }
    } catch (error) {
        console.error('Error updating brightness:', error);
        statusMessage.textContent = 'An error occurred';
    }
};

// Function to update light color temp using a slider
window.updateColorTemperature = async function(entityId, temperature) {
    const statusId = `status-${entityId}`;
    const statusMessage = document.getElementById(statusId);

    if (!statusMessage) {
        console.error(`Element with ID ${statusId} not found`);
        return;
    }

    statusMessage.textContent = 'Updating temperature...';

    try {
        const response = await fetch(`${homeAssistantUrl}/api/services/light/turn_on`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                entity_id: entityId,
                color_temp: parseInt(temperature)
            })
        });

        if (response.ok) {
            statusMessage.textContent = 'Temperature updated';
            setTimeout(fetchInitialState, 1000);  // Delay 1 second before fetching updated state
        } else {
            const responseBody = await response.json();
            statusMessage.textContent = `Error: ${responseBody.message || 'Unknown error'}`;
        }
    } catch (error) {
        console.error('Error updating temperature:', error);
        statusMessage.textContent = 'An error occurred';
    }
};

// Function to fetch initial state of entities when the page loads
window.fetchInitialState = async function() {
    const entities = [
        'light.vierashuone',
        'input_boolean.guest_room_light_toggle',
        'light.gr_ambient',
        'switch.shellyplug_s_80646f82707a',
        'switch.shellyplug_tyohuone_2',
        'switch.tp_link_washer',
        'switch.tp_link_dryer',
        'light.kylppari',
        'switch.shelly1l_bathroomfan',
        'light.olohuone_vasen',
        'light.livingroom_ceiling_right',
        'input_boolean.ceiling_lights',
        'switch.tp_link_washer',
        'switch.tp_link_dryer',
        'light.kylppari',
        'switch.shelly1l_bathroomfan',
        'light.olohuone_vasen',
        'light.livingroom_ceiling_right',
        'input_boolean.ceiling_lights',
        'light.olkkarin_jalkalamppu_2',
        'switch.tiskikone'
        // Add other entities as needed
    ];

    try {
        for (let entityId of entities) {
            const response = await fetch(`${homeAssistantUrl}/api/states/${entityId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const data = await response.json();
                updateUI(data);
            } else {
                console.error(`Failed to fetch state for ${entityId}`);
            }
        }
    } catch (error) {
        console.error('Error fetching initial states:', error);
    }
};

// Function to update the UI based on entity state
function updateUI(data) {
    const statusIdMap = {
        'light.vierashuone': 'statusVierashuone',
        'input_boolean.guest_room_light_toggle': 'statusGuestRoomLightToggle',
        'light.gr_ambient': 'statusGrAmbient',
        'switch.shellyplug_s_80646f82707a': 'statusShellyPlug2',
        'switch.shellyplug_tyohuone_2': 'statusShellyPlug1',
        'switch.tp_link_washer': 'statusWasher',
        'switch.tp_link_dryer': 'statusDryer',
        'light.kylppari': 'statusKylpparinvalot',
        'switch.shelly1l_bathroomfan': 'statusKylpparintuuletin',
        'light.olohuone_vasen': 'statusVasenkattovalo',
        'light.livingroom_ceiling_right': 'statusOikeaKattovalo',
        'input_boolean.ceiling_lights': 'statusOikeaKattovaloToggle',
        'light.olkkarin_jalkalamppu_2': 'statusOlkkarinJalkalamppu',
        'switch.tiskikone': 'statusOlkkarinLaturi'
        // Add other entities as needed
    };

    const statusId = statusIdMap[data.entity_id];
    const statusMessage = document.getElementById(statusId);
    const button = statusMessage?.previousElementSibling;

    if (statusMessage) {
        const isOn = data.state === 'on';
        statusMessage.textContent = isOn ? 'On' : 'Off';
        button?.classList.toggle('active', isOn);

        // Update sliders if light
        if (data.entity_id.startsWith('light.') && isOn) {
            const brightnessSlider = document.querySelector(`.brightness-slider-${data.entity_id.replace('.', '-')}`);
            const tempSlider = document.querySelector(`.temp-slider-${data.entity_id.replace('.', '-')}`);

            if (brightnessSlider && data.attributes.brightness) {
                brightnessSlider.value = data.attributes.brightness;
            }
            if (tempSlider && data.attributes.color_temp) {
                tempSlider.value = data.attributes.color_temp;
            }
        }
    }
}

// Call `fetchInitialState` on page load
document.addEventListener('DOMContentLoaded', fetchInitialState);

// Function to reload the page
window.reloadPage = function() {
    location.reload(); // Reloads the current page
}

