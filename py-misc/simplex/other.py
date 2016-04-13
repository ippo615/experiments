# ---------------------------------------------------------------------
# http://marioslapseofreason.blogspot.com/2011/01/two-phase-simplex-algorithm-python-code.html
# ---------------------------------------------------------------------

def printTableu(tableu):
	print '----------------------'
	for row in tableu:
		print row
	print '----------------------'
	return

def pivotOn(tableu, row, col):
	j = 0
	pivot = tableu[row][col]
	for x in tableu[row]:
		tableu[row][j] = tableu[row][j] / pivot
		j += 1
	i = 0
	for xi in tableu:
		if i != row:
			ratio = xi[col]
			j = 0
			for xij in xi:
				xij -= ratio * tableu[row][j]
				tableu[i][j] = xij
				j += 1
		i += 1
	return tableu


# assuming tablue in standard form with basis formed in last m columns
def phase_1_simplex(tableu):
	
	THETA_INFINITE = -1
	opt   = False
	unbounded  = False
	n = len(tableu[0])
	m = len(tableu) - 2
	
	while ((not opt) and (not unbounded)):
		min = 0.0
		pivotCol = j = 1
		while(j < (n-m)):
			cj = tableu[1][j]
			if (cj < min):
				min = cj
				pivotCol = j
			j += 1   
		if min == 0.0:
			opt = True
			continue
		pivotRow = i = 0
		minTheta = THETA_INFINITE
		for xi in tableu:
			if (i > 1):
				xij = xi[pivotCol]
				if xij > 0:
				 theta = (xi[0] / xij)
				 if (theta < minTheta) or (minTheta == THETA_INFINITE):
				  minTheta = theta
				  pivotRow = i
			i += 1
		if minTheta == THETA_INFINITE:
			unbounded = True
			continue
		tableu = pivotOn(tableu, pivotRow, pivotCol)
	return tableu
	
def simplex(tableu):
	
	THETA_INFINITE = -1
	opt   = False
	unbounded  = False
	n = len(tableu[0])
	m = len(tableu) - 1
	
	while ((not opt) and (not unbounded)):
		min = 0.0
		pivotCol = j = 0
		while(j < (n-m)):
			cj = tableu[0][j]
			if (cj < min) and (j > 0):
				min = cj
				pivotCol = j
			j += 1   
		if min == 0.0:
			opt = True
			continue
		pivotRow = i = 0
		minTheta = THETA_INFINITE
		for xi in tableu:
			if (i > 0):
				xij = xi[pivotCol]
				if xij > 0:
				 theta = (xi[0] / xij)
				 if (theta < minTheta) or (minTheta == THETA_INFINITE):
				  minTheta = theta
				  pivotRow = i
			i += 1
		if minTheta == THETA_INFINITE:
			unbounded = True
			continue
		tableu = pivotOn(tableu, pivotRow, pivotCol)
	return tableu
		
def drive_out_artificial_basis(tableu):
	n = len(tableu[0])
	j = n - 1
	isbasis = True
	while(j > 0):
		found = False
		i = -1
		row = 0
		for xi in tableu:
			i += 1
			if (xi[j] == 1):
				if (found):
				 isbasis = False
				 continue
				elif (i > 1):
				 row = i
				 found = True
			elif (xi[0] != 0):
				isbasis = False
				continue
		if (isbasis and found):
			if (j >= n):
				tableu = pivotOn(tableu, row, j)
			else:
				return tableu
		j -= 1
	return tableu
		
def two_phase_simpelx(tableu):
	infeasible  = False
	tableu = phase_1_simplex(tableu)
	sigma = tableu[1][0]
	if (sigma > 0):
		infeasible  = True
		print 'infeasible'
	else:
		#sigma is equals to zero
		tableu = drive_out_artificial_basis(tableu)
		m = len(tableu) - 2
		n = len(tableu[0])
		n -= m
		tableu.pop(1)
		i = 0
		while (i < len(tableu)):
			tableu[i] = tableu[i][:n]
			i += 1
		tableu = simplex(tableu)
	return tableu
	
def getTableu(c, eqs, b):
	#assume b >= 0 so if there is any b[i] negative make sure to enter
	#it possitive by multiplying (-1 * eqs[i]) and (-1 * b[i]) for all i
	tableu = []
	m = len(eqs)
	n = len(c)
	c.insert(0, 0.0)
	artificial = []
	sigma = [0.0]
	i = 0
	while (i < n):
		sigma.append(0.0)
		i += 1
	i = 0
	while (i < m):
		artificial.append(0.0)
		sigma.append(1.0)
		i += 1
	c.extend(artificial)
	tableu.append(c)
	tableu.append(sigma)
	i = 0
	for eq in eqs:
		eq.insert(0, b[i])
		eq.extend(artificial)
		eq[n+1+i] = 1.0
		tableu.append(eq)
		i += 1
	i = 0 
	for xi in tableu:
		if (i > 1):
			j = 0
			for xij in xi:
				tableu[1][j] -= xij
				j += 1
		i += 1
	return tableu

# ------
#  Main
# ------
# Minimize: z = x1 + x2 + x3 + x4 + x5
# Subject to: 3x1 + 2x2 + x3          = 1
#             5x1 +  x2 + x3 + x4     = 3
#             2x1 + 5x2 + x3 +    x5  = 4

c = [ 1.0, 1.0, 1.0, 1.0, 1.0,]

eq1 = [ 3.0 ,  2.0 , 1.0 ,  0.0,  0.0]
eq2 = [ 5.0 ,  1.0 , 1.0 ,  1.0,  0.0]
eq3 = [ 2.0 ,  5.0 , 1.0 ,  0.0,  1.0]

b = [1.0 , 3.0 , 4.0]

eqs = []
eqs.append(eq1)
eqs.append(eq2)
eqs.append(eq3)

tableu = getTableu(c,eqs,b)
printTableu(tableu)
tableu = two_phase_simpelx(tableu)
printTableu(tableu)
print 'minimum cost is = {}'.format( -tableu[0][0])

# 
# Minimize: Z = -2x -3y -4z
# Subject to:
#   3x + 2y +  z <= 10
#   2x + 5y + 3z <= 15
# 
# Minimize: Z = -2x -3y -4z + 0a + 0b
# Subject to:
#   3x + 2y +  z + a    = 10
#   2x + 5y + 3z    + b = 15
#

c = [ 2.0, 3.0, 4.0, 0.0, 0.0,]

eq1 = [ 3.0 ,  2.0 , 1.0 ,  1.0,  0.0]
eq2 = [ 2.0 ,  5.0 , 3.0 ,  0.0,  1.0]

b = [10.0, 15.0]

eqs = []
eqs.append(eq1)
eqs.append(eq2)

print ''
print 'Wikipedia Example'
tableu = getTableu(c,eqs,b)
printTableu(tableu)
tableu = two_phase_simpelx(tableu)
printTableu(tableu)
print 'minimum cost is = {}'.format( -tableu[0][0])

# ---------------------------------------------------------------------
# 
# ---------------------------------------------------------------------
import re
class Simplex():
	
	def __init__( self, objective, constraints, variables ):
		self.objective = objective
		self.constraints = constraints
		self.variables = variables

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

def normalize_contraint( equation ):
	if '<=' in equation:
		return convert_lteq( equation )
	if '>=' in equation:
		return convert_gteq( equation )
	return convert_eq( equation )

def convert_lteq( equation ):
	return equation.replace( '<=', '%s =' % '+slack' )

def convert_gteq( equation ):
	return equation.replace( '>=', '%s =' % '-surplus +artificial' )

def convert_eq( equation ):
	return equation.replace( '=', '=' )#'%s =' % '+artificial' )

def getConstantEqual( equation ):
	return float(equation.split('=')[1])

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



wikipedia = Simplex(
	'-2x -3y -4z = A', [
		'3x + 2y +  z <= 10',
		'2x + 5y + 3z <= 15'
	],
	'x,y,z'.split(',')
)

c = buildObjectiveMatrix(
	wikipedia.objective,
	wikipedia.constraints,
	wikipedia.variables
)

b = buildOtherMatrix(
	wikipedia.objective,
	wikipedia.constraints,
	wikipedia.variables
)

eqs = buildConstraintMatrix(
	wikipedia.objective,
	wikipedia.constraints,
	wikipedia.variables
)

print ''
print 'Wikipedia Example'
tableu = getTableu(c,eqs,b)
printTableu(tableu)
tableu = two_phase_simpelx(tableu)
printTableu(tableu)
print 'minimum cost is = {}'.format( -tableu[0][0])
