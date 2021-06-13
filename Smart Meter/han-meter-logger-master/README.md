# HAN-meter-logger 
In this repository you find the files needed for extracting data with the mbus-circuit from the HAN-port.
* *main.c* - main file and where the curl is initialized and the data read.
* *han_packet.c* - Collection of functions needed to parse the data.   

### The parser currently supports the following meters 
* Kamstrup
* Kaifa

## Running the HAN-meter-logger
Connect the new meter to a computer, open a terminal and run 

```
$ cd  \...\Smart Meter\han-meter-logger-master
$ ./hanclient/dev/USB0/

```
 ***NOTE: In order to use the HAN-meter logger you will need to know which USB-port it is connected to, In this case it was /dev/USB0***  

## Adding new meter to parser

Implementing a new model for the parser is done through *han_packet.c*. 
The function *raw_packet_parse()* begins by checking the version and calls a specific parser function for that meter (currently only checks for kaifa and kamstrup).
2 things are needed when adding a new meter

### 1
Add if-statement checking the version of the new meter and call a new parser-function for that meter if the if-statement was true (see comments in han_packet.c).
### 2
If the meters dataset uses the same structure as Kamstrup or kaifa, no new parser is required. 
**However**, the if-statements must still be modified in order for the correct parser to be called.

If the meters dataset does not match the structure of previous meters, a new parser is needed.
This requires knowledge about the structure of the new meters dataset. This is needed since the parser requires you to specify wich index your data begins at.
Example used for kaifa meters (https://github.com/roarfred/AmsToMqttBridge/blob/master/Samples/Kaifa/obisdata.md).

A new parser uses the same structure as the previous parsers but you need to change the buf-indexes in order to read the date and the number of elements.
The variable *cur_pos* should be changed to the position of the meters "list version" 

The biggest differance between kaifa and kamstrups datasets are the lack of OBIS-identifiers in kaifas output. 
Therefor no bytes are required to be skipped (see difference between kaifa and kamstrup parser, kamstrup skips the OBIS-bytes between every read, kaifa does not).
Depending on how the meters dataset is structured you might need to skip bytes between reeds (see *raw_packet_parse_kamstrup()*)

Read (and skip if necessary) as done in the other parsers and the parser should convert the data automatically.

