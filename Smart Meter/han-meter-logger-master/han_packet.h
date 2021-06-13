#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>

#ifndef HANPACKET
#define HANPACKET

struct raw_packet_t {
  int type;
  char* list_version;
  char* meter_id;
  char* meter_type;
  uint32_t active_power_p;
  uint32_t active_power_n;
  uint32_t reactive_power_p;
  uint32_t reactive_power_n;
  float i_l1;
  float i_l2;
  float i_l3;
  uint32_t u_l1;
  uint32_t u_l2;
  uint32_t u_l3;
  char* date;
} raw_packet_t;

/// @brief frees the pack struct from memory
/// @param pack(the packet to free from memory
/// @return ---
void raw_destroy(struct raw_packet_t* pack);

/// @brief reads a a string from buff
/// @param Buf(A buffer containing the data recieved from the serial port)
///        cur_pos(index to the buffer),
///        len(adress of cur_pos)
/// @return the string that has been read
char* raw_read_string(const char* buf, const int cur_pos, int* len);

/// @brief cur_pos+8
/// @param Buf(A buffer containing the data recieved from the serial port)
///        cur_pos(index to the buffer),
/// @return cur_pos + 8
int raw_skip_field(const char* buf, const int cur_pos);

/// @brief reads the value in the current index of the buffer
/// @param Buf(A buffer containing the data recieved from the serial port),
///        cur_pos(index to the buffer),
///        result(tmp)
/// @return 3 if succesfull read, else -1
int raw_read_int(const char* buf, int cur_pos, void* result);

/// @brief  reads the value in the current index of the buffer
/// @param Buf(A buffer containing the data recieved from the serial port),
///        cur_pos(index to the buffer),
///        result(tmp)
/// @return 5 if successful, else -1
int raw_read_float(const char * buf, int cur_pos, float* result);

/// @brief Reads values and places them into raw_pack, skips identifier-bytes between values (Used for Kamstrup) 
/// @param Buf(A buffer containing the data recieved from the serial port),
///        raw_pack(A pointer to an empty raw_pack struct)
///        cur_pos (Int with the position of the List-version, updates as new values are read)
/// @return ----
void raw_read_and_skip(const char* buf, struct raw_packet_t* raw_pack, int cur_pos)

/// @brief Reads values and places them into raw_pack, does not skip any bytes (Used for Kamstrup) 
/// @param Buf(A buffer containing the data recieved from the serial port),
///        raw_pack(A pointer to an empty raw_pack struct)
///        cur_pos (Int with the position of the List-version, updates as new values are read)
/// @return ----
void void raw_read_no_skip(const char* buf, struct raw_packet_t* raw_pack, int cur_pos);

/// @brief Checks which model is currently used and then calls specific parse-function.
/// @param Buf(A buffer containing the data recieved from the serial port),
///        raw_pack(A pointer to an empty raw_pack struct)
/// @return ----
void raw_packet_parse(const char* buf, struct raw_packet_t* raw_pack);


/// @brief Iterates through the data received from the serial port of a Kamstrup-meter and parses it and puts in data in raw_pack
/// @param Buf(A buffer containing the data recieved from the serial port),
///        raw_pack(A pointer to an empty raw_pack struct)
/// @return ----
void raw_packet_parse_kamstrup(const char* buf, struct raw_packet_t* raw_pack);

/// @brief Iterates through the data received from the serial port of a Kaifa-meter and parses it and puts in data in raw_pack
/// @param Buf(A buffer containing the data recieved from the serial port),
///        raw_pack(A pointer to an empty raw_pack struct)
/// @return ----
void raw_packet_parse_kaifa(const char* buf, struct raw_packet_t* raw_pack);
#endif
