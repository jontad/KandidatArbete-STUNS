# han-meter-logger
A simple HAN-Bus interfacer, allows for reading data from the USB-Serial adapter - connected to the Smart Power Meter.
Listens for the starting tag of the Smart-Meter data transmission, starting with '0x7E'.

### Required:
- Install dependencies
- Compile
- Start listening via 'hanClient /dev/ttyUSBX'

### Known issues:
- If data extraction is started during an on-going transmission, no data will be read.
- Some minor hiccups with values occur sometimes.

Requires the Smart Meter API for successful POSTing of data.

### Dependencies
- libCurl 7.x
