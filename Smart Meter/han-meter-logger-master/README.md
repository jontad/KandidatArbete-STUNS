# HAN-meter-logger 

In this repository you find the files for extracting data with the mbus-circuit from the HAN-port. 
In *main.c* the curl is initialized and the data is read. The data is then parsed in *han_packet.c*. 

## The parser currently supports the following meters 
* Kamstrup
* Kaifa


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

______________________________________________OMSKRIVEN VERSION - LÄS GÄRNA________________________________________________________

# HAN-meter-logger 

In this repository you find the program for extracting data with the mbus-circuit from the HAN-port, the program consists of:
* *main.c* - main file and where the curl is initialized and the data read.
* *han_packet.c* - the "collection" of parsers, certain parts will run depending on the model 

  ###### The parser currently supports the following meters:
  * Kamstrup
  * Kaifa


## Adding a new meter to parser 

Adding a new meter requires knowledge about the data-structure used by the new meters dataset and how to dechiper OBIS-code. This is needed since the parser needs you to specify which index the data begins at. See sample from Kaifa meters as an example - (https://github.com/roarfred/AmsToMqttBridge/blob/master/Samples/Kaifa/obisdata.md). This means that if the new meter uses the same data-datastructre as one of the previous meters, no new parser is needed - see the how to below.

In order to add a new meter the parser needs to be configured. This is done in *han_packet.c* at the function *raw_packet_parse()*, which checks the version and calls a specific parser function for that meter (currently only checks for and kaifa and kamstrup).


## How to add a new meter:

1. In *HAN_packet.c*, add a new if-statement checking the version of the new meter and call a new parser-function for that meter if the if-statement was true (see comments in han_packet.c).
2. Connect the new meter to a computer, open a terminal and run 

```
$ cd  \...\Smart Meter\han-meter-logger-master
$ ./hanclient/dev/USB0/

```
 ***NOTE: In order to use the HAN-meter logger you will need to know which USB-port it is connected to, In this case it was /dev/USB0***  

3. Check the dataset of the new meter
  -If the dataset uses the same structure as a previous meter, no new parser is required - skip to step 5.
  -If the meters dataset does not match the structure of any previous meters, a new parser is needed. Study the dataset (see Kaifa sample as an example) - move to step 4
4. A new parser uses the same structure as the previous parsers but you need to change the buf-indexes in order to read the date and the number of elements. The variable *cur_pos* should be changed to the position of the meters "list version" 

As an example, the biggest differance between Kaifa and Kamstrups datasets are the lack of OBIS-identifiers in Kaifas output. 
Therefor no bytes are required to be skipped (see difference between Kaifa and Kamstrup parser - Kamstrup skips the OBIS-bytes between every read, Kaifa does not).
Depending on how the meters dataset is structured you might need to skip bytes between reeds (see *raw_packet_parse_kamstrup()*)

Read (and skip if necessary) as done in the other parsers and the parser should convert the data automatically.

5. You have now added a new meter and it is ready to use!



