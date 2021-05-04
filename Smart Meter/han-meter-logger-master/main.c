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

#define SERVER_ADRESS "https://ramlosa.midgaard.nu/api"
//#define SERVER_ADRESS "https://text.npr.org/"

#ifndef NULL
#define NULL 0
#endif

CURL* curl;
volatile int* running;

static sigset_t susp;
static int serial_port = 0;

struct termios tty;

char* recv_buf;

void upload_data() {

}

void do_close(int sig) {
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
  //if (buf[0] != 0x7E) return NULL;
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
  //char* tmp = buf + 8;

  //read(serial_port, tmp, size - 6);

  if (size == 0 || raw_pack->type == 0) {
    printf("Got nothing\n");
    return NULL;
  }
  printf("Type: 0x%X\n", raw_pack->type);
  
  int cur_pos = 7;

  raw_packet_parse(buf, raw_pack);

  /*printf("Packet type 0x%02X from %s (List %s):\n", raw_pack->type, raw_pack->meter_id, raw_pack->list_version);
  printf("\t Meter type: %s\n", raw_pack->meter_type);
  printf("\t Active Power +: %dW\n", raw_pack->active_power_p);
  printf("\t Active Power -: %dW\n", raw_pack->active_power_n);
  printf("\t Reactive Power +: %dW\n", raw_pack->reactive_power_p);
  printf("\t Reactive Power -: %dW\n", raw_pack->reactive_power_n);
  printf("\t Current L1: %fA\n", raw_pack->i_l1);
  printf("\t Current L2: %fA\n", raw_pack->i_l2);
  printf("\t Current L3: %fA\n", raw_pack->i_l3);
  printf("\t Voltage L1: %dV\n", raw_pack->u_l1);
  printf("\t Voltage L2: %dV\n", raw_pack->u_l2);
  printf("\t Voltage L3: %dV\n", raw_pack->u_l3);*/

  return raw_pack;
}

char* generate_json(struct raw_packet_t* raw) {
  //printf("Got raw_pack %p\n", raw);
  //printf("Meter: %s\n", raw->meter_id);
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

  //headers = curl_slist_append(headers, "Expect:");
  headers = curl_slist_append(headers, "Content-Type: application/json");
  curl_easy_setopt(curl, CURLOPT_HTTPHEADER, headers);

  curl_easy_setopt(curl, CURLOPT_POSTFIELDS, json);
  printf("strlen(json) = %lu\n", strlen(json));
  curl_easy_setopt(curl, CURLOPT_POSTFIELDSIZE, strlen(json));
  
  int res = curl_easy_perform(curl);
  if(res != CURLE_OK && res != CURLE_WRITE_ERROR) {
    fprintf(stderr, "\nlibcurl: (%d) ", res);
    fprintf(stderr, "%s\n\n", curl_easy_strerror(res));
  }
  curl_slist_free_all(headers);
  free(json);
}

void test_json() {
  struct raw_packet_t* testp = (struct raw_packet_t*) malloc(sizeof(raw_packet_t));
  testp->list_version = "Kamstrup_0001";
  testp->meter_id = "0A07DA8S5D6SA5F";
  testp->meter_type = "0ABC";
  testp->active_power_n = 1;
  testp->active_power_p = 12;
  testp->reactive_power_p = 2;
  testp->active_power_n = 3;
  testp->i_l1 = 0.1;
  testp->i_l2 = 0.2;
  testp->i_l3 = 0.3;
  testp->u_l1 = 230;
  testp->u_l1 = 225;
  testp->u_l1 = 235;
  testp->date = "2020-02-18 16:46:55";

  generate_json(testp);
}

int main(int argc, char** argv) {
  printf("%s\n", curl_version());
  curl = (CURL*) malloc(sizeof(CURL));
  //test_json();
  if (argc < 2) {
    fprintf(stderr, "Not enough args\n\thanClient <serial port>\n");
    return 1;
  }

  serial_port = open(argv[1], O_RDWR);

  if (serial_port < 0) {
    fprintf(stderr, "Error %i when opening serial port: %s\n", errno, strerror(errno));
    return 2;
  }

  memset(&tty, 0, sizeof(tty));
  if (tcgetattr(serial_port, &tty) != 0) {
    fprintf(stderr, "Error %i when initializing serial port: %s\n", errno, strerror(errno));
    close(serial_port);
    return 3;
  }

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

  running = (int*) malloc(sizeof(int));
  *running = 1;

  curl_global_init(CURL_GLOBAL_ALL);
  curl = curl_easy_init();

  sigemptyset(&susp);
  
  if (curl) {
    printf("CURL initialized!\n");

    char *ADRESS = "localhost:3000";
    recv_buf = (char*) malloc(sizeof(char));
    curl_easy_setopt(curl, CURLOPT_URL, ADRESS);
    //curl_easy_setopt(curl, CURLOPT_HTTPGET, 1L);
    curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, printout);
    //curl_easy_setopt(curl, CURLOPT_WRITEDATA, recv_buf);

    // TESTS
    //CURLcode res;
    //res = curl_easy_perform(curl);
    //printf("%s\n", curl_easy_strerror(res));


    /*struct sigaction act = {0};
    struct timeval interval;
    struct itimerval period;

    act.sa_handler = do_work;
    sigaction(SIGALRM, &act, NULL);

    interval.tv_sec = TIMING;
    interval.tv_usec = 0;

    period.it_interval = interval;
    period.it_value = interval;

    setitimer(ITIMER_REAL, &period, NULL);
    
    struct sigaction intc = {0};
    intc.sa_handler = do_close;

    sigaction(SIGINT, &intc, NULL);

    printf("Timer inititalized!\n");*/
    
    /// @brief 
    /// @param 
    /// @return a bo
    while (*running) {
      //Läser datan från dongeln och lägger det i raw_pack
      struct raw_packet_t* raw_pack = retrieve_packet();
      post_data(raw_pack);
      raw_destroy(raw_pack);
    }
    curl_easy_cleanup(curl);
    close(serial_port);
  } else {
    printf("Could not initialize CURL\n");
  }
  
  curl_global_cleanup();
  return 0;
}
