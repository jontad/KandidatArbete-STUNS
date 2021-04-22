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

void raw_destroy(struct raw_packet_t* pack);

char* raw_read_string(const char* buf, const int cur_pos, int* len);

int raw_skip_field(const char* buf, const int cur_pos);

int raw_read_int(const char* buf, int cur_pos, void* result);

int raw_read_float(const char * buf, int cur_pos, float* result);

void raw_packet_parse(const char* buf, struct raw_packet_t* raw_pack);
#endif
