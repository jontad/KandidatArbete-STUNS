#pragma once
#include <stdbool.h>
#include <stdlib.h>


typedef struct shelf shelf_t;
typedef struct merch merch_t;
typedef union elem elem_t;
typedef struct option option_t;
typedef struct cart ioopm_cart_t;
typedef bool(*ioopm_eq_function)(elem_t a, elem_t b);

union elem
{
  int int_val;
  unsigned int unsigned_val;
  bool bool_val;
  float float_val;
  void *pointer_val;
  char *string_val;
  merch_t *merch_val;
  shelf_t *shelf_val;
  size_t size_val;
  ioopm_cart_t *car_val;
};


struct option
{
  bool success;
  elem_t value;
};
