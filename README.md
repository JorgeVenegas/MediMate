![image](https://github.com/user-attachments/assets/7c65f48a-aff3-42d0-81d9-8ea35afdefc0)

# MediMate

**MediMate** is a React Native application developed as part of the capstone project for the Mechatronics Design course. The app enables Bluetooth Low Energy (BLE) communication with an ESP32 microcontroller, which controls a motorized pill dispenser with four independent lines. Each line dispenses medication according to user-configured schedules, providing a smart solution for automating medication management.

This project demonstrates the application of React Native in IoT systems, integrating hardware and software to solve real-world challenges in healthcare.

![image](https://github.com/user-attachments/assets/44fe8373-8681-4d1e-a60d-1f987cac4af3)


## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Challenges & Solutions](#challenges--solutions)
- [Future Improvements](#future-improvements)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

MediMate was developed as part of a team project, where I served as the lead software developer. While my teammates focused on mechanical design and electronics, I took full responsibility for the app development using React Native. The app connects to an ESP32 microcontroller via Bluetooth Low Energy (BLE), enabling the user to configure medication schedules for up to four dispenser lines. Once configured, the ESP32 controls motors to dispense pills at the specified intervals.

The app provides a seamless interface for configuring:
- The name of the medication in each line.
- Frequency of intake in hours.
- Duration of the treatment in days.
- Pill size.

## Features

- **Bluetooth Low Energy (BLE) Connection**: Seamless pairing and communication with the ESP32 controller.
- **Medication Configuration**: Customize pill name, intake frequency, treatment duration, and pill size for each dispenser line.
- **Automated Dispensing**: After setup, the system automatically dispenses the correct dosage at the specified intervals.
- **Responsive Design**: Designed for mobile devices using React Native, ensuring a smooth user experience across platforms.

## Tech Stack

- **React Native**: For building cross-platform mobile applications.
- **Bluetooth Low Energy (BLE)**: For communication with the ESP32 controller.
- **ESP32**: Microcontroller used to control the motors responsible for dispensing pills.

## Installation

To install and run MediMate locally, follow these steps:

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/MediMate.git
    cd MediMate
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Run the app in a simulator or on your mobile device:

    ```bash
    npx react-native run-android    # For Android
    npx react-native run-ios        # For iOS
    ```

4. Pair with the ESP32 controller via Bluetooth, and start configuring the dispenser lines.

## Usage

1. **Pair with the Device**: Open the app and pair your phone with the ESP32 controller via Bluetooth.
2. **Configure the Dispenser**: In each dispenser line, enter the medication name, frequency, treatment period, and pill size.
3. **Start Dispensing**: Once configured, the app sends the settings to the controller, which starts dispensing pills at the configured times.
4. **Monitor & Adjust**: You can monitor the dispensing process and adjust the configuration as needed.

## Challenges & Solutions

While developing MediMate, several challenges were encountered, mainly due to mechanical design limitations. The dispenser motors were initially too fast, causing issues with pill handling. To address this, I implemented software-based solutions to decrease motor velocity, achieving more precise control over the dispensing process.

Additionally, managing the Bluetooth Low Energy (BLE) connection required fine-tuning to ensure stable communication between the mobile app and the ESP32 controller.

## Future Improvements

Although MediMate is a functional prototype, future improvements could greatly enhance its usability and reliability:

- **Database Integration**: Adding a centralized database to track user medication history and manage user profiles.
- **User Management**: Implementing a multi-user system to allow different profiles for various patients or users.
- **Cloud Sync**: Enabling cloud-based data storage and synchronization, so users can access their medication schedules from multiple devices.
- **Push Notifications**: Adding reminders and notifications to alert users when it's time to take their medication.

## Contributing

Since MediMate is still in the prototype phase, contributions are welcome! If you have ideas to improve the app or want to fix any issues, feel free to fork the repository, submit a pull request, or reach out.

1. Fork the repository.
2. Create your feature branch:

    ```bash
    git checkout -b feature/your-feature
    ```

3. Commit your changes:

    ```bash
    git commit -m 'Add new feature'
    ```

4. Push to the branch:

    ```bash
    git push origin feature/your-feature
    ```

5. Submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

---

MediMate showcases my skills in mobile app development, Bluetooth communication, and software-hardware integration. As a lead developer, I handled the entire app development process, ensuring it seamlessly integrated with hardware to provide a functional, real-world solution.
