#ifndef __UTILS_H__
#define __UTILS_H__

#include <stdbool.h>
#include <string.h>
#include "common_public.h"

typedef union { 
  int   int_value;
  float float_value;
  char *string_value;
  char char_value;
} answer_t;

typedef bool (*check_func)(char *);
typedef answer_t (*convert_func)(char *);
typedef void (*menu_func) (void);

extern char *strdup(const char *);


unsigned long hash_function(elem_t key);
bool string_eq_function(elem_t a, elem_t b);
bool is_shelf(char *shelf);
char *to_string(int num);
int read_string(char *buf, int buf_siz);
bool is_number(char *str);
bool not_empty(char *str);
bool is_yn(char *str);
int ask_question_int(char *question);
char *ask_question_string(char *question);
char *ask_question_shelf(char *question);
char ask_question_menu(char *question);
char ask_question_yn(char *question);
int make_negative(int x);
void print(char *str);
void println(char *str);
answer_t ask_question(char *question, check_func check, convert_func convert);
#endif
