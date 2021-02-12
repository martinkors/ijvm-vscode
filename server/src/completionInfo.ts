export enum ArgumentType {
  EXPRESSION = 'expr',
  LABEL = 'label',
  METHOD = 'method',
  SYMBOL = 'symbol'
}

export interface IEntry {
  instruction: string;
  argumentTypes?: ArgumentType[];
  description: string;
  examples?: string[];
}

export const ijvmInfo: IEntry[] = [
  {
    instruction: 'bipush',
    argumentTypes: [
      ArgumentType.EXPRESSION
    ],
    description: 'Push a byte onto stack',
    examples: [
      '5',
      '1 + 2',
      '1 + a'
    ]
  },
  {
    instruction: 'dup',
    description: 'Copy top word on stack and push onto stack'
  },
  {
    instruction: 'goto',
    argumentTypes: [
      ArgumentType.LABEL
    ],
    description: 'Unconditional jump',
    examples: [
      'LOOP'
    ]
  },
  {
    instruction: 'iadd',
    description: 'Pop two words from stack; push their sum'
  },
  {
    instruction: 'ifeq',
    argumentTypes: [
      ArgumentType.LABEL
    ],
    description: 'Pop word from stack and branch if it is zero',
    examples: [
      'LOOP'
    ]
  },
  {
    instruction: 'iflt',
    argumentTypes: [
      ArgumentType.LABEL
    ],
    description: 'Pop word from stack and branch if it is less than zero',
    examples: [
      'LOOP'
    ]
  },
  {
    instruction: 'if_icmpeq',
    argumentTypes: [
      ArgumentType.LABEL
    ],
    description: 'Pop two words from stack and branch if they are equal',
    examples: [
      'LOOP'
    ]
  },
  {
    instruction: 'iinc',
    argumentTypes: [
      ArgumentType.EXPRESSION,
      ArgumentType.EXPRESSION
    ],
    description: 'Add a constant value to a local variable',
    examples: [
      'a, 5',
      'a, 1 + 2',
      '1, 1 + a'
    ]
  },
  {
    instruction: 'iload',
    argumentTypes: [
      ArgumentType.EXPRESSION
    ],
    description: 'Push local variable onto stack',
    examples: [
      'a',
      '1',
      '1 + 1'
    ]
  },
  {
    instruction: 'invokevirtual',
    argumentTypes: [
      ArgumentType.METHOD
    ],
    description: 'Invoke a method',
    examples: [
      'sort',
      'main',
      'frac'
    ]
  },
  {
    instruction: 'ior',
    description: 'Pop two words from stack; push Boolean OR'
  },
  {
    instruction: 'ireturn',
    description: 'Return from method with integer value'
  },
  {
    instruction: 'istore',
    argumentTypes: [
      ArgumentType.EXPRESSION
    ],
    description: 'Pop word from stack and store in local variable',
    examples: [
      'a',
      '1',
      '1 + 1'
    ]
  },
  {
    instruction: 'isub',
    description: 'Pop two words from stack; push their difference'
  },
  {
    instruction: 'ldc_w',
    argumentTypes: [
      ArgumentType.EXPRESSION
    ],
    description: 'Push constant from constant pool onto stack',
    examples: [
      '5',
      '1 + 2',
      '1 + a'
    ]
  },
  {
    instruction: 'nop',
    description: 'Do nothing'
  },
  {
    instruction: 'pop',
    description: 'Delete word from top of stack'
  },
  {
    instruction: 'swap',
    description: 'Swap the two top words on the stack'
  },
  {
    instruction: 'wide',
    description: 'Prefix instruction; next instruction has a 16-bit index'
  },
  {
    instruction: '.method',
    argumentTypes: [
      ArgumentType.SYMBOL
    ],
    description: 'Declare a new method',
    examples: [
      'main',
      'frac',
      'sort'
    ]
  },
  {
    instruction: '.args',
    argumentTypes: [
      ArgumentType.EXPRESSION
    ],
    description: 'Specify amount of arguments; default is 1',
    examples: [
      '1',
      '1 + 2'
    ]
  },
  {
    instruction: '.locals',
    argumentTypes: [
      ArgumentType.EXPRESSION
    ],
    description: 'Specify amount of local variables; default is 0',
    examples: [
      '1',
      '1 + 2'
    ]
  },
  {
    instruction: '.define',
    argumentTypes: [
      ArgumentType.SYMBOL,
      ArgumentType.EXPRESSION
    ],
    description: 'Define a symbolic variable',
    examples: [
      'a = 1',
      'b = 1 + 1'
    ]
  }
];