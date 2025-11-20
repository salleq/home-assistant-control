# Lightweight Home Assistant Control Panel

This project provides a lightweight and simple control panel for Home Assistant, specifically designed for devices with limited memory or browser capabilities that struggle with the full Home Assistant frontend.

## Features

*   **Simplified Interface:** A streamlined interface optimized for performance on resource-constrained devices.
*   **Essential Controls:** Focuses on core functionalities for controlling your smart home devices.

## Setup and Deployment

This application is designed to serve static web pages. For secure access and SSL/TLS encryption, it is essential to front this application with a reverse proxy, such as Nginx.

### SSL Certificates

Nginx, as configured in this project, primarily serves the web pages. It does **not** handle SSL certificate provisioning directly. You will need to configure your reverse proxy (e.g., Nginx) to obtain and manage SSL certificates (e.g., using Certbot) to secure your connection.

## Target Audience

This tool is ideal for users who:
*   Have older devices or devices with minimal resources.
*   Require a quick and responsive interface for basic Home Assistant interactions.
*   Want to avoid the overhead of the complete Home Assistant web interface on specific clients.

<img width="1215" height="630" alt="image" src="https://github.com/user-attachments/assets/7db3cf4d-d088-469c-a462-73419357273e" />
