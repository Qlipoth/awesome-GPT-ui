import { JSBeautifyOptions } from 'js-beautify';

export const PRETTIER_OPTIONS = {
  indent_size: 2,
  indent_char: ' ',
  indent_with_tabs: false,
  editorconfig: false,
  eol: '\n',
  end_with_newline: false,
  indent_level: 0,
  preserve_newlines: true,
  max_preserve_newlines: 10,
  space_in_paren: false,
  space_in_empty_paren: false,
  jslint_happy: false,
  space_after_anon_function: false,
  space_after_named_function: false,
  brace_style: 'collapse',
  unindent_chained_methods: false,
  break_chained_methods: false,
  keep_array_indentation: false,
  unescape_strings: false,
  wrap_line_length: 0,
  e4x: false,
  comma_first: false,
  operator_position: 'before-newline',
  indent_empty_lines: false,
  templating: ['auto'],
  disabled: false,
  test_output_raw: false,
  space_before_conditional: true,
} as JSBeautifyOptions;

export const AVAILABLE_LANG_LABELS = [
  'javascript',
  'jsx',
  'react',
  'html',
  'css',
  'css',
  'js',
  'python',
  'CSS',
  'SCSS',
];

export const OPEN_AI_QUESTION_URL =
  'http://localhost:5001/api/completion?text=';
