#include "han_packet.h"
#include <string.h>

void raw_destroy(struct raw_packet_t* pack) {
  free(pack->list_version);
  free(pack->meter_id);
  free(pack->meter_type);
  free(pack->date);
  free(pack);
}

char* raw_read_string(const char* buf, const int cur_pos, int* len) {
  //if (buf[cur_pos] != 0x0A) {
  //  fprintf(stderr, "Field not a string! (type = 0x%02X)\n", buf[cur_pos]);
  //  return 0;
  //}
  uint8_t size = buf[cur_pos+1];
  char* result = (char*) malloc((size + 2) * sizeof(char));

  memset(result, 0, (size + 2) * sizeof(char));
  
  for (int i = cur_pos + 2; i - (cur_pos + 2) < size; i++) {
    result[i - (cur_pos + 2)] = buf[i];
  }

  //memcpy(result, &buf[cur_pos + 2], size);

  printf("Read string (%d bytes + 2): %s\n", size, result);
  
  *len = *len + size + 2;
  return result;
}

int raw_skip_field(const char* buf, const int cur_pos) {
  uint8_t size = buf[cur_pos + 1];
  printf("Skipped %d + 2 bytes\n", size);
  //printf("Skip 8 bytes");
  return size + 2;
  //return 8;
}

int raw_read_int(const char* buf, int cur_pos, void* result) {
  uint8_t type = buf[cur_pos];
  if (type == 0x06) { // 32-bit
    uint32_t tmp = 0;
    tmp |= (buf[cur_pos + 1] & 0xff) << 24;
    tmp |= (buf[cur_pos + 2] & 0xff) << 16;
    tmp |= (buf[cur_pos + 3] & 0xff) << 8;
    tmp |= (buf[cur_pos + 4] & 0xff);
    *((uint32_t*)result) = tmp;
    printf("Read uint32_t: %d\n", *((uint32_t*)result));
    return 5;
  } else if (type == 0x12) {
    uint16_t tmp = 0;
    tmp |= (buf[cur_pos + 1] & 0xff) << 8;
    tmp |= (buf[cur_pos + 2] & 0xff);
    *((uint16_t*)result) = tmp;
    printf("Read uint16_t: %d (0x%02X 0x%02X)\n", *((uint16_t*)result), buf[cur_pos + 1], buf[cur_pos + 2]);
    return 3;
  } else {
    fprintf(stderr, "Field not a number! (type = 0x%02X)\n", type);
    return -1;
  }
}

int raw_read_float(const char * buf, int cur_pos, float* result) {
  if (buf[cur_pos] != 0x06) {
    fprintf(stderr, "Field not a float! (type = 0x%02X)\n", buf[cur_pos]);
    return -1;
  }
  uint32_t raw_num = buf[cur_pos+1] << 24 | buf[cur_pos+2] << 16 | buf[cur_pos+3] << 8 | buf[cur_pos+4];
  *result = raw_num / 100.0f;
  printf("Read float: %f\n", *result);
  return 5;
}

// Used for kamstrup parser 
void raw_read_and_skip(const char* buf, struct raw_packet_t* raw_pack, int cur_pos) {
  
  raw_pack->list_version = raw_read_string(buf, cur_pos, &cur_pos);
  printf("list_version (%p) = %s\n", raw_pack->list_version, raw_pack->list_version);
  //OBIS for ID
  cur_pos += raw_skip_field(buf, cur_pos);
  raw_pack->meter_id = raw_read_string(buf, cur_pos, &cur_pos);
  
  cur_pos += raw_skip_field(buf, cur_pos);
  raw_pack->meter_type = raw_read_string(buf, cur_pos, &cur_pos);

  cur_pos += raw_skip_field(buf, cur_pos);
  cur_pos += raw_read_int(buf, cur_pos, &raw_pack->active_power_p);

  cur_pos += raw_skip_field(buf, cur_pos);
  cur_pos += raw_read_int(buf, cur_pos, &raw_pack->active_power_n);

  cur_pos += raw_skip_field(buf, cur_pos);
  cur_pos += raw_read_int(buf, cur_pos, &raw_pack->reactive_power_p);

  cur_pos += raw_skip_field(buf, cur_pos);
  cur_pos += raw_read_int(buf, cur_pos, &raw_pack->reactive_power_n);

  cur_pos += raw_skip_field(buf, cur_pos);
  cur_pos += raw_read_float(buf, cur_pos, &raw_pack->i_l1);

  cur_pos += raw_skip_field(buf, cur_pos);
  cur_pos += raw_read_float(buf, cur_pos, &raw_pack->i_l2);

  cur_pos += raw_skip_field(buf, cur_pos);
  cur_pos += raw_read_float(buf, cur_pos, &raw_pack->i_l3);

  cur_pos += raw_skip_field(buf, cur_pos);
  cur_pos += raw_read_int(buf, cur_pos, &raw_pack->u_l1);

  cur_pos += raw_skip_field(buf, cur_pos);
  cur_pos += raw_read_int(buf, cur_pos, &raw_pack->u_l2);

  cur_pos += raw_skip_field(buf, cur_pos);
  cur_pos += raw_read_int(buf, cur_pos, &raw_pack->u_l3);

}

// Used for kaifa parser
void raw_read_no_skip(const char* buf, struct raw_packet_t* raw_pack, int cur_pos) {
 
  raw_pack->list_version = raw_read_string(buf, cur_pos, &cur_pos);
  printf("list_version (%p) = %s\n", raw_pack->list_version, raw_pack->list_version);
  
  //Since kaifa doenst have OBIS-identifiers in the data, no added skips are needed
  raw_pack->meter_id = raw_read_string(buf, cur_pos, &cur_pos);

  raw_pack->meter_type = raw_read_string(buf, cur_pos, &cur_pos);

  cur_pos += raw_read_int(buf, cur_pos, &raw_pack->active_power_p);

  cur_pos += raw_read_int(buf, cur_pos, &raw_pack->active_power_n);

  cur_pos += raw_read_int(buf, cur_pos, &raw_pack->reactive_power_p);

  cur_pos += raw_read_int(buf, cur_pos, &raw_pack->reactive_power_n);

  cur_pos += raw_read_float(buf, cur_pos, &raw_pack->i_l1);

  cur_pos += raw_read_float(buf, cur_pos, &raw_pack->i_l2);

  cur_pos += raw_read_float(buf, cur_pos, &raw_pack->i_l3);

  cur_pos += raw_read_int(buf, cur_pos, &raw_pack->u_l1);

  cur_pos += raw_read_int(buf, cur_pos, &raw_pack->u_l2);

  cur_pos += raw_read_int(buf, cur_pos, &raw_pack->u_l3);
}



// Parser functions
void raw_packet_parse_kamstrup(const char* buf, struct raw_packet_t* raw_pack) {

  // Read Date 
  uint16_t year = 0 | (((uint16_t)buf[17] << 8) & 0xff00) | ((uint16_t)buf[18] & 0x00ff);
  uint8_t month = buf[19];
  uint8_t day = buf[20];
  uint8_t hour = buf[22];
  uint8_t minute = buf[23];
  uint8_t second = buf[24];

  printf("Date: %04d-%02d-%02d %02d:%02d:%02d\n", year, month, day, hour, minute, second);
  raw_pack->date = (char*) malloc(32 * sizeof(char));
  sprintf(raw_pack->date, "%04d-%02d-%02d %02d:%02d:%02d", year, month, day, hour, minute, second);
  
  uint8_t num_elems = buf[30];
  printf("Number of elements: %d\n", num_elems);
  
  // Position of list version
  int cur_pos = 31;
  
  // Read data and place in raw_pack. Skips identifier-bytes between every read
  raw_read_and_skip(buf, raw_pack, cur_pos); 

}


void raw_packet_parse_kaifa(const char* buf, struct raw_packet_t* raw_pack) {
  
  // Read date 
  uint16_t year = 0 | (((uint16_t)buf[19] << 8) & 0xff00) | ((uint16_t)buf[20] & 0x00ff);
  uint8_t month = buf[21];
  uint8_t day = buf[22];
  uint8_t hour = buf[23];
  uint8_t minute = buf[24];
  uint8_t second = buf[25];

  printf("Date: %04d-%02d-%02d %02d:%02d:%02d\n", year, month, day, hour, minute, second);
  raw_pack->date = (char*) malloc(32 * sizeof(char));
  sprintf(raw_pack->date, "%04d-%02d-%02d %02d:%02d:%02d", year, month, day, hour, minute, second);
  
  uint8_t num_elems = buf[32];
  printf("Number of elements: %d\n", num_elems);

  // Position of list version
  int cur_pos = 33;
  
  // Read data and place in raw_pack
  raw_read_no_skip(buf, raw_pack, cur_pos); 
  
}


void raw_packet_parse(const char* buf, struct raw_packet_t* raw_pack) {

  // Check meter type
  
  // Array position of meter-version in buf from kaifa-meter.   
  int cur_pos = 33;
  char* version = raw_read_string(buf, cur_pos, &cur_pos);
  char* kaifa_version = "KFM_001";
 
  // Check if kaifa
  int is_kaifa = strcmp(version, kaifa_version);
  if(is_kaifa == 0) {
    raw_packet_parse_kaifa(buf, raw_pack); 
  } else {
    // Else call kamstrup parser (since only the two are currently implemented)
    raw_packet_parse_kamstrup(buf, raw_pack);
  }
  // Add additional if-statement for a new meters. 
}

