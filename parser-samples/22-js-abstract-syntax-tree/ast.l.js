%lex
// States - Begin
// States - End

// Code - Begin
%{

ast_make_number = function(number){
	return {
		type: 'number',
		operator: null,
		args: null,
		value: parseFloat(number),
		str: ""+number
	};
};
ast_make_variable = function(str){
	return {
		type: 'variable',
		operator: null,
		args: null,
		value: null,
		str: str
	};
};
ast_make_function = function(operator,args){
	return {
		type: 'function',
		operator: operator,
		args: args,
		value: null,
		str: ""
	};
};

ast_is_number = function(ast){
	return (ast.type === 'number');
};
ast_is_variable = function(ast){
	return (ast.type === 'variable');
};
ast_is_function = function(ast){
	return (ast.type === 'function');
};

ast_print_infix = function(ast){ 
	if( ast_is_number(ast) ){ return ast.str; }
	if( ast_is_variable(ast) ){ return ast.str; }
	var op = ast.operator;

	if( op === 'ADD' ){ return ast_print_infix(ast.args[0]) +'+'+ ast_print_infix(ast.args[1]) ; }
	if( op === 'SUB' ){ return ast_print_infix(ast.args[0]) +'-'+ ast_print_infix(ast.args[1]) ; }
	if( op === 'MUL' ){ return ast_print_infix(ast.args[0]) +'*'+ ast_print_infix(ast.args[1]) ; }
	if( op === 'DIV' ){ return ast_print_infix(ast.args[0]) +'/'+ ast_print_infix(ast.args[1]) ; }
	if( op === 'POW' ){ return ast_print_infix(ast.args[0]) +'^'+ ast_print_infix(ast.args[1]) ; }
	if( op === 'GROUP' ){ return '('+ ast_print_infix(ast.args[0]) +')'; }
	return '??';
};

ast_print_scheme = function(ast){ 
	if( ast_is_number(ast) ){ return ast.str; }
	if( ast_is_variable(ast) ){ return ast.str; }
	var op = ast.operator;
	if( op === 'ADD' ){ return '(+ '+ ast_print_scheme(ast.args[0]) +' '+ ast_print_scheme(ast.args[1]) +')' ; }
	if( op === 'SUB' ){ return '(- '+ ast_print_scheme(ast.args[0]) +' '+ ast_print_scheme(ast.args[1]) +')'; }
	if( op === 'MUL' ){ return '(* '+ ast_print_scheme(ast.args[0]) +' '+ ast_print_scheme(ast.args[1]) +')'; }
	if( op === 'DIV' ){ return '(/ '+ ast_print_scheme(ast.args[0]) +' '+ ast_print_scheme(ast.args[1]) +')'; }
	if( op === 'POW' ){ return '(^ '+ ast_print_scheme(ast.args[0]) +' '+ ast_print_scheme(ast.args[1]) +')'; }
	if( op === 'GROUP' ){ return ast_print_scheme(ast.args[0]) ; }
	return '??';
};

ast_compute = function(ast){
	if( ast_is_number(ast) ){ return ast.value; }
	if( ast_is_variable(ast) ){ return ast.str; }
	var op = ast.operator;
	if( op === 'ADD' ){ return ast_compute(ast.args[0]) + ast_compute(ast.args[1]); }
	if( op === 'SUB' ){ return ast_compute(ast.args[0]) - ast_compute(ast.args[1]); }
	if( op === 'MUL' ){ return ast_compute(ast.args[0]) * ast_compute(ast.args[1]); }
	if( op === 'DIV' ){ return ast_compute(ast.args[0]) / ast_compute(ast.args[1]); }
	if( op === 'POW' ){ return Math.pow(ast_compute(ast.args[0]),ast_compute(ast.args[1])); }
	if( op === 'GROUP' ){ return ast_compute(ast.args[0]); }
	return '??';
};


%}
// Code - End

// Tokens - Begin
%%

("**")            { return 'POW'; }
("^")             { return 'POW'; }
("*")             { return 'MUL'; }
("/")             { return 'DIV'; }
("+")             { return 'ADD'; }
("-")             { return 'SUB'; }

([0-9]+\.*[0-9]*) { return 'NUMBER'; }
("\n")            { return 'EOL'; }
<<EOF>>           { return 'EOF'; }
("(")             { return 'LPAREN'; }
(")")             { return 'RPAREN'; }
(.)               { ; }
%%
// Tokens - End

/lex

/* operator associations and precedence */

%left 'ADD' 'SUB'
%left 'MUL' 'DIV'
%left 'POW'
%left 'UMINUS'

%start expressions

%% /* language grammar */

expressions
    : e EOF
        { return ast_print_scheme($1);
          // return ast_print_infix($1);
          // return ast_compute($1);
        }
    ;

e
    : e 'ADD' e  {$$ = ast_make_function('ADD',[$1,$3]);}
    | e 'SUB' e  {$$ = ast_make_function('SUB',[$1,$3]);}
    | e 'MUL' e  {$$ = ast_make_function('MUL',[$1,$3]);}
    | e 'DIV' e  {$$ = ast_make_function('DIV',[$1,$3]);}
    | e 'POW' e  {$$ = ast_make_function('POW',[$1,$3]);}
    | 'LPAREN' e 'RPAREN'  {$$ = ast_make_function('GROUP',[$2]);}
    | NUMBER     {$$ = ast_make_number(yytext);}
    ;
