
import re
import copy

# Objective Function
# Constraints
# Variables

class Simplex():
	
	def __init__( self ):
		self.equations = []
		self.variables = []
	
	def add_variable( self, variable ):
		self.variables.append( variable )
		return self
	
	def add_equation( self, equation ):
		self.equations.append( equation )
		return self
	
	def change_variables( self, name='x' ):
		equations = []
		for eq in self.equations:
			equations.append( copy.deepcopy( eq ) )
		for i in range(len(self.variables)):
			for j in range(len(equations)):
				equations[j] = equations[j].replace( self.variables[i], '%s%s' % (name,i) )
		return equations

def convert_lteq( equation ):
	return equation.replace( '<=', '%s =' % '+slack' )

def convert_gteq( equation ):
	return equation.replace( '>=', '%s =' % '-surplus +artificial' )

def convert_eq( equation ):
	return equation.replace( '=', '=' )#'%s =' % '+artificial' )
	
def normalize_contraint( equation ):
	if '<=' in equation:
		return convert_lteq( equation )
	if '>=' in equation:
		return convert_gteq( equation )
	return convert_eq( equation )

def get_variable_count( equations, variables ):
	normalizedEquations = []
	for eq in equations:
		normalizedEquations.append( normalize_contraint( eq ) )
	
	count = len( variables )
	for eq in normalizedEquations:
		count += 1 if ('surplus' in eq) else 0
		count += 1 if ('artificial' in eq) else 0
		count += 1 if ('slack' in eq) else 0
	
	return count

def getCoefficient( equation, variable ):
	rNumber = r'(?:[-+]?[0-9]*\.?[0-9]*(?:[eE][-+]?[0-9]+)?){0,1}'
	rOperator = r'\s*\*{0,1}\s*'
	match = re.search( '(%s)(%s)(%s)' % (
		rNumber,
		rOperator,
		variable
	), equation )
	
	# No match means implicit 0 coefficient
	if match == None:
		return 0.0
	
	#print '\n%s' % equation
	#print 'Number: %s' % match.group(1)
	#print 'Operator: %s' % match.group(2)
	#print 'Variable: %s' % match.group(3)
	
	# No coefficient is an implicit 1.0
	if match.group(1) in ['','+']:
		return 1.0
	if match.group(1) == '-':
		return -1.0
	
	# Multiple occurances is an error (or weird inner word regex match)
	groups = match.groups()
	if len(groups) != 3:
		raise ValueError( 'Equation: %s has %s instances of variable %s.\nPlease make sure "%s" only apears once.' % (
			equation,
			len(groups) / 3,
			variable,
			variable
		) )
	
	# Normal
	return float(match.group(1))

def getConstantEqual( equation ):
	return float(equation.split('=')[1])

def buildTableau( objective, constraints, variables ):
	equations = [objective]
	equations.extend( constraints )
	nTotalVariables = get_variable_count( equations, variables )
	rows = []
	for i in range(len(equations)):
		row = []
		for j in range(nTotalVariables):
			if j < len(variables):
				row.append( getCoefficient(equations[i],variables[j]) )
			else:
				jOff = j-len(variables)
				row.append( 1.0 if jOff==i else 0.0 )
		row.append( getConstantEqual( equations[i] ) )
		rows.append( row )
	return rows

def test_human_getCoefficient( equation, variable ):
	print '%s => %s, %s' % (
		equation,
		variable,
		getCoefficient( equation, variable )
	)

def print_table_2d( table ):
	return '[ %s ]' % ('\n  '.join( ['%s' % row for row in table] ))

if __name__ == '__main__':
	simplex = Simplex()
	simplex.add_variable( 'x' )
	simplex.add_variable( 'y' )
	simplex.add_equation( '3*x + 2*y' )
	simplex.add_equation( '2*x + y <= 18' )
	print simplex.change_variables()

	print convert_lteq( '2*x + 2*y <= 17' )
	print convert_gteq( 'z >= 4' )
	print convert_eq( '1+x = 5' )

	print get_variable_count( [
		'2*x + 2*y <= 17',
		'z >= 4',
		'1+x = 5'
	], ['x','y','z'])

	test_human_getCoefficient( '1e-1x+2y=12', 'x' )
	test_human_getCoefficient( '20.1*x+2y=12', 'x' )
	test_human_getCoefficient( '-3.023 *x+2y=12', 'x' )
	test_human_getCoefficient( '+4.987* x+2y=12', 'x' )
	test_human_getCoefficient( '5.0e+3 *  x+2y=12', 'x' )
	test_human_getCoefficient( 'x+y=12', 'x' )
	test_human_getCoefficient( 'x+y=12', 'z' )

	tableau = buildTableau(
		'x+y-z <= 5', [
			'2x-3y+z <= 3',
			'-x+2y-z <= 1'
		],
		'x,y,z'.split(',')
	)
	print print_table_2d( tableau )

	# https://en.wikipedia.org/wiki/Simplex_algorithm
	tableau = buildTableau(
		'A + 2x +3y +4z = 0', [
			'3x + 2y +  z <= 10',
			'2x + 5y + 3z <= 15'
		],
		'A,x,y,z'.split(',')
	)
	print print_table_2d( tableau )

class Simplex():
	
	def __init__( self, objective, constraints, variables ):
		self.objective = objective
		self.constraints = constraints
		self.variables = variables

wikipedia = Simplex(
	'-2x -3y -4z = A', [
		'3x + 2y +  z <= 10',
		'2x + 5y + 3z <= 15'
	],
	'x,y,z'.split(',')
)

def buildObjectiveMatrix( objective, constraints, variables ):
	equations = [objective]
	equations.extend( constraints )
	nTotalVariables = get_variable_count( equations, variables )
	row = []
	for j in range(nTotalVariables):
		if j < len(variables):
			row.append( getCoefficient(objective,variables[j]) )
		else:
			row.append( 0 )
	return row

def getExtras( equation, startIndex, totalExtras ):
	extras = [ 0.0 for x in range(startIndex) ]
	if '<=' in equation:
		extras.append( 1.0 )
	extras.extend( [ 0.0 for x in range(totalExtras-len(extras))] )
	return extras

def buildConstraintMatrix( objective, constraints, variables ):
	equations = [objective]
	equations.extend( constraints )
	nTotalVariables = get_variable_count( equations, variables )
	nVariables = len(variables)
	nExtras = nTotalVariables - nVariables
	rows = []
	for i in range(len( constraints )):
		row = []
		for j in range(nVariables):
			row.append( getCoefficient(constraints[i],variables[j]) )
		row.extend( getExtras( constraints[i], i, nExtras ) )
		rows.append( row )
	return rows

def buildOtherMatrix( objective, constraints, variables ):
	# NOTE: this should be treated like a column (but it is stored as
	# a row)
	rows = []
	for i in range(len( constraints )):
		rows.append( getConstantEqual(constraints[i]) )
	return rows

print buildObjectiveMatrix(
	wikipedia.objective,
	wikipedia.constraints,
	wikipedia.variables
)
print buildConstraintMatrix(
	wikipedia.objective,
	wikipedia.constraints,
	wikipedia.variables
)
print buildOtherMatrix(
	wikipedia.objective,
	wikipedia.constraints,
	wikipedia.variables
)
