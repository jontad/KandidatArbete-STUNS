#include <stdio.h>
#include <string.h>
#include "utils.h"
#include "common_public.h"
#include <stdlib.h>
#include <stdbool.h>
#include <ctype.h>

extern char *strdup(const char *);

bool not_empty(char *str)
{
  return strlen(str) > 0;
}

bool is_number(char *str)
{

  bool isNumber = true;
  int strLength = strlen(str);

  if(str[0] == '-' || isdigit(str[0])) {
    
    for(int i = 1; i <= strLength - 1; i++){
      
      if((isdigit(str[i])) == false){
        isNumber = false; 
      }
      
    }
  }  else{
    isNumber = false; 
  }
  return isNumber;
}


int clear_input_buffer(){

  int c;
  do
    {
      c = getchar();
    }
  while (c != '\n' && c != EOF);
  
  return 0;
}

int make_negative(int x)
{
  int to_negative = x * 2;
  return x - to_negative;
}


int read_string(char *buf, int buf_siz){
  
  int counter = 0;
  char tmp;
  int loop = 1;
  while(counter < buf_siz && loop == 1){
    tmp = getchar();
    if(tmp == '\n' || tmp == '\0' || tmp == EOF){ 
      loop = 0;
      buf[counter] = '\0';
    }else{
      buf[counter] = tmp;
      counter++;
    }
    
  }
  putchar('\n');

  if(counter == buf_siz-1){
     clear_input_buffer();
  }
  
  return counter;
  
}

/*
char *ask_question_string(char *question, char *buf, int buf_siz)
{
  int length = 0;
  do
    {
      printf("%s\n", question);
      length = read_string(buf, buf_siz);
      
    }
  while (length == 0);
  return strdup(buf);
}


int ask_question_int(char *question)
{

  int result = 0;
  int conversions = 0;
  do
    {
      printf("%s\n", question);
      conversions = scanf("%d", &result);
      clear_input_buffer();
      putchar('\n');
    }
  while (conversions < 1);
  return result;
}
*/


unsigned long hash_function(elem_t key)
{
  unsigned long result = 0;
  do
    {
      result = result * 31 + *key.string_val;
    }
  while (*++key.string_val != '\0');
  return (result); 
}

bool string_eq_function(elem_t a, elem_t b)
{
  if(strcmp(a.string_val, b.string_val) == 0)
    {
      return true; 
    }
  else return false;
}

bool is_shelf(char *shelf)
{
  if(isalpha(shelf[0]) && isdigit(shelf[1]) && isdigit(shelf[2]) && strlen(shelf) == 3)
    {
      shelf[0] = toupper(shelf[0]);
      return true;
    }
  return false;
  
}

char char_upper(char* c)
{
  *c = toupper(*c);
  return c[0];
}

bool is_menu(char *input)
{
  char *valid = "LlTtRrGgHhAa";
  
  for(int i=0; i < strlen(valid); i++)
    {
      if(input[0] == valid[i])
        {
          if(input[1] == '\0')
            {
              return true;
            }
          else
            {
              return false;
            }
        }
    }
  return false;
}

char *to_string(int num)
{
  int buf[20];
  int tnum;
  int index = 0;
  for(int i = 0 ; num >= 10; i++)
    {
      tnum = num % 10;
      buf[i] = tnum;
      num = (num - tnum) / 10;
      index = i;
    }
  index++;
  buf[index] = num;
  char str[index+1];
  int counter = 0;
  for(int i = index; i >= 0; i--)
    {
      str[counter] = buf[i]+48;
      counter++; 
    }
  return strdup(str);
}

bool is_yn(char *str)
{
  char s = str[0];
  if(s == 'y' || s == 'Y' || s == 'n' || s == 'N')
    {
      if(str[1] == '\0')
        {
          return true;    
        }
    }
  return false;
}


int ask_question_int(char *question)
{
  answer_t answer = ask_question(question, is_number, (convert_func) atoi);
  return answer.int_value; // svaret som ett heltal
}

char *ask_question_string(char *question)
{
  return ask_question(question, not_empty, (convert_func) strdup).string_value;
}

char *ask_question_shelf(char *question)
{
  return ask_question(question, is_shelf, (convert_func) strdup).string_value;
}

char ask_question_menu(char *question)
{
  return ask_question(question, is_menu, (convert_func) char_upper).char_value;
}

char ask_question_yn(char *question)
{
  return ask_question(question, is_yn, (convert_func) char_upper).char_value;
}

answer_t ask_question(char *question, check_func check, convert_func convert)
{
  int buf_siz = 255;
  char buf[buf_siz];
  do
    {
      printf("%s", question);
      read_string(buf, buf_siz);
    }
  while(!check(buf));
  return (convert(buf));
}
