.method main
.args 3
.locals 2
.define x = 1

  bipush 101
  dup
  goto test
  iadd
  iand
  ifeq test
  iflt test
  if_icmpeq test
  iinc (x - x), x  
  iload x
  invokevirtual test
  ior
  ireturn
  istore x
  isub
  ldc_w 10
  nop
  pop
  swap

test: // this is a comment
  test: //


ldc_w 1
ldc_w a
ldc_w 1 + x
ldc_w 1 - x
ldc_w (1 + x) - 1