#define _GNU_SOURCE
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdint.h> 
#include <fcntl.h>
#include <errno.h>
#include <termios.h>
#include <unistd.h>
#include <signal.h>
#include <curl/curl.h>
#include "han_packet.h"
#define SERVER_ADRESS "localhost:3000"

//#define SERVER_ADRESS "https://text.npr.org/"

#ifndef NULL
#define NULL 0
#endif

CURL* curl;
volatile int* running;

static sigset_t susp;
static int serial_port = 0;

struct termios tty;


void do_close(int sig) {
  printf("do_close används");
  if (sig == SIGINT) {
    *running = 0;
  }
}

void printout(void* ptr, size_t size, size_t count, void* stream) {
  printf("--== Response ==--\n%s\n", (char*) ptr);
  stream = ptr;
}

struct raw_packet_t* retrieve_packet() {
  char buf[1024] = {0};
  memset(&buf, 0, 1024);
  do {
    read(serial_port, &buf[0], 1);
  } while (buf[0] != 0x7E);
  printf("0x%02X ", buf[0]);
  fflush(stdout);
  int cur = 1;
  do {
    read(serial_port, &buf[cur], 1);
    printf("0x%02X ", buf[cur]);
    fflush(stdout);
    cur++;  
  } while (buf[cur-1] != 0x7E && cur < 1024);
  printf("\n Read bytes: %d\n", cur);
  
  struct raw_packet_t* raw_pack = (struct raw_packet_t*) malloc(sizeof(raw_packet_t));
  raw_pack->type = (buf[1] >> 4) & 0x0f;
  int size = cur;

  if (size == 0 || raw_pack->type == 0) {
    printf("Got nothing\n");
    return NULL;
  }
  printf("Type: 0x%X\n", raw_pack->type);
  
  int cur_pos = 7;

  raw_packet_parse(buf, raw_pack);

  return raw_pack;
}

char* generate_json(struct raw_packet_t* raw) {
  char* json;
  asprintf(&json, "{\"%s\": \"%s\", \"%s\": \"%s\", \"%s\": \"%s\", \"%s\": %d, \"%s\": %d, \"%s\": %d, \"%s\": %d, \"%s\": %f, \"%s\": %f, \"%s\": %f, \"%s\": %d, \"%s\": %d, \"%s\": %d, \"%s\": \"%s\"}", 
      "OBISIdentifier", raw->list_version, 
      "MeterID", raw->meter_id, 
      "MeterType", raw->meter_type,
      "ActivePowerPlus", raw->active_power_p,
      "ActivePowerMinus", raw->active_power_n,
      "ReactivePowerPlus", raw->reactive_power_p,
      "ReactivePowerMinus", raw->reactive_power_n,
      "IL1", raw->i_l1,
      "IL2", raw->i_l2,
      "IL3", raw->i_l3,
      "ULN1", raw->u_l1,
      "ULN2", raw->u_l2,
      "ULN3", raw->u_l3,
      "Timestamp", raw->date
  );
  printf("--== Retrieved Data ==--\n%s\n", json);
  return json;
}

void post_data(struct raw_packet_t* raw) {
  char* json = generate_json(raw);
  struct curl_slist* headers = NULL;
  char agent[1024] = { 0, }; 
  snprintf(agent, sizeof agent, "hanClient/libcurl/%s",
           curl_version_info(CURLVERSION_NOW)->version);
  agent[sizeof agent - 1] = 0;
  
  curl_easy_setopt(curl, CURLOPT_USERAGENT, agent);
  headers = curl_slist_append(headers, "Content-Type: application/json");
  curl_easy_setopt(curl, CURLOPT_HTTPHEADER, headers);
  
  curl_easy_setopt(curl, CURLOPT_POSTFIELDS, json);
  //printf("strlen(json) = %lu\n", strlen(json));
  curl_easy_setopt(curl, CURLOPT_POSTFIELDSIZE, strlen(json));
  
  
  int res = curl_easy_perform(curl);
  printf("\n RES = %d \n", res);
  
  if(res != CURLE_OK && res != CURLE_WRITE_ERROR) {
    fprintf(stderr, "\nlibcurl: (%d) ", res);
    fprintf(stderr, "%s\n\n", curl_easy_strerror(res));
  }
  
  curl_slist_free_all(headers);
  free(json);

}


////////////////////////////////// Main function ////////////////////////////////// 
int main(int argc, char** argv) {
  printf("%s\n", curl_version());
  curl = (CURL*) malloc(sizeof(CURL));

  //Check and test input port
  if (argc < 2) {
    fprintf(stderr, "Not enough args\n\thanClient <serial port>\n");
    free(curl);
    return 1;
  }

  serial_port = open(argv[1], O_RDWR);

  if (serial_port < 0) {
    fprintf(stderr, "Error %i when opening serial port: %s\n", errno, strerror(errno));
    free(curl);
    return 2;
  }

  memset(&tty, 0, sizeof(tty));
  if (tcgetattr(serial_port, &tty) != 0) {
    fprintf(stderr, "Error %i when initializing serial port: %s\n", errno, strerror(errno));
    close(serial_port);
    free(curl);
    return 3;
  }
  
  // Driver programming
  tty.c_cflag &= ~PARENB;
  tty.c_cflag &= ~CSTOPB;
  tty.c_cflag |= CS8;
  tty.c_cflag &= ~CRTSCTS;
  tty.c_cflag |= CREAD | CLOCAL;

  tty.c_lflag &= ~ICANON;
  tty.c_lflag &= ECHO;
  tty.c_lflag &= ECHOE;
  tty.c_lflag &= ECHONL;
  tty.c_lflag &= ISIG;

  tty.c_iflag &= ~(IXON | IXOFF | IXANY);
  tty.c_iflag &= ~(IGNBRK|BRKINT|PARMRK|ISTRIP|INLCR|IGNCR|ICRNL);

  tty.c_oflag &= ~OPOST;
  tty.c_oflag &= ~ONLCR;

  tty.c_cc[VMIN] = 1;
  tty.c_cc[VTIME] = 10;

  cfsetispeed(&tty, B2400);
  cfsetospeed(&tty, B2400);
  
  if (tcsetattr(serial_port, TCSANOW, &tty) != 0) {
    fprintf(stderr, "Error %i when initializing serial port: %s\n", errno, strerror(errno));
    close(serial_port);
    return 4;
  }

  // Input port initialized, no errors 

  curl_global_init(CURL_GLOBAL_ALL);
  curl = curl_easy_init();

  
  sigemptyset(&susp); 
  
  if (curl) {
    
    printf("CURL initialized!\n");    
    curl_easy_setopt(curl, CURLOPT_URL, SERVER_ADRESS);
    curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, printout);
    
    struct sigaction intc = {0};
    intc.sa_handler = do_close;
    sigaction(SIGINT, &intc, NULL);

    printf("Timer inititalized!\n");*/
    
    /// @brief 
    /// @param 
    /// @return a bo
    running = 1;
    while (running) {

      //Läser datan från dongeln och lägger det i raw_pack
      struct raw_packet_t* raw_pack = retrieve_packet();
      post_data(raw_pack);
      raw_destroy(raw_pack);    
    }
    
    close(serial_port);
    
  } else {
    printf("Could not initialize CURL\n");
  }
  
  curl_easy_cleanup(curl);
  curl_global_cleanup();
  return 0;
}
