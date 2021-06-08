# HAN-meter-logger 

In this repository you find the files for extracting data with the mbus-circuit from the HAN-port. 
In *main.c* the curl is initialized and the data read. The data is then parsed in *han_packet.c*. 

## The parser currently supports the following meters 
* Kamstrup
* Kaifa


## Adding new meter to parser

Implementingen a new model for the parser is done through *han_packet.c*. 
The function *raw_packet_parse* begins by checking the version and calls a specific parser function for that meter (currently only checks for and kaifa and kamstrup)
2 things are needed when adding a new meter

### 1
Add if-statement checking the version of the new meter and call a new parser-function for that meter if the if-statement was true (see comments in han_packet.c)
### 2
If the meters dataset uses the same structure as Kamstrup or kaifa, no new parser is required. 
However, the if-statements must still be modified in order for the correct parser to be called.

If the meters dataset does not match the structure of previous meters, a new parser is needed.
This requires knowledge about the structure of the new meters dataset. This is since the parser requires you to specify wich index your data begins at.
Example used for kaifa meters (https://github.com/roarfred/AmsToMqttBridge/blob/master/Samples/Kaifa/obisdata.md).

A new parser uses the same structure as the previous parsers but you need to change the buf-indexes in order to read the date and the number of elements.
The variable *cur_pos* should be changed to the position of the meters "list version" 

The biggest differance between kaifa and kamstrups datasets are the lack of OBIS-identifiers in kaifas output. 
Therefor no bytes are required to be skipped (see difference between kaifa and kamstrup parser, kamstrup skips the OBIS-bytes between every read, kaifa does not).
Depending on how the meters dataset is structured you might need to skip bytes between reeds (see *raw_packet_parse_kamstrup*)

Read (and skip if necessary) as done in the other parsers and the parser should convert the data automatically.

