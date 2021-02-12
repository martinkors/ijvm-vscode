.method main // this is a comment
.args 3 // this is a comment
.locals 2 // this is a comment
.define x = 1 // this is a comment
 // this is a comment
  bipush 101 // this is a comment
  dup // this is a comment
  goto test // this is a comment
  iadd // this is a comment
  iand // this is a comment
  ifeq test // this is a comment
  iflt test // this is a comment
  if_icmpeq test // this is a comment
  iinc (x - x), x   // this is a comment
  iload x // this is a comment
  invokevirtual test // this is a comment
  ior // this is a comment
  ireturn // this is a comment
  istore x // this is a comment
  isub // this is a comment
  ldc_w 10 // this is a comment
  nop // this is a comment
  pop // this is a comment
  swap // this is a comment

LOOP: // this is a comment
  test: // this is a comment

ldc_w 1
ldc_w a
ldc_w 1 + x
ldc_w 1 - x
ldc_w (1 + x) - 1
