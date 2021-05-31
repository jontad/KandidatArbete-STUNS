# Makefile for hanClient

#LDLIBS = -lcurl
#
#SOURCES = (main.c, libs/)
#OUT = hanClient
#
#.PHONY: all
#
#all: build
#
#build: hanClient
#	ld
#$(OUT): $(patsubst %.c,%.o,$(SOURCES))

src = $(wildcard *.c)
obj = $(src:.c=.o)
dep = $(obj:.o=.d)  # one dependency file for each source

LDFLAGS = -lcurl

hanClient: $(obj)
	$(CC) -o $@ $^ $(LDFLAGS)

debug: $(obj)
	$(CC) -o $@ $^ $(LDFLAGS) -g

-include $(dep)   # include all dep files in the makefile

# rule to generate a dep file by using the C preprocessor
# (see man cpp for details on the -MM and -MT options)
%.d: %.c
	@$(CPP) $(CFLAGS) $< -MM -MT $(@:.d=.o) >$@

.PHONY: clean
clean:
	rm -f $(obj) hanClient

.PHONY: cleandep
cleandep:
	rm -f $(dep)
