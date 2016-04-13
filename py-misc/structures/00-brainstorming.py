
class C(object):
    def __init__(self):
        self._x = None

    def getx(self):
        return self._x

    def setx(self, value):
        self._x = value

    def delx(self):
        del self._x

    x = property(getx, setx, delx, "I'm the 'x' property.")

c = C()
c.x = 123
print c.x

class A1(object):
	def __init__(self):
		self.a = 1

class B(A1,C):
	pass
	
b = B()
b.x = 123
print b.x

def ByteType1( name, endianness, cType, documentation ):
	class Tmp(object):
		pass
	def get_prop( self ):
		print 'Getting %s' % name
		return getattr( self, name )
	def set_prop( self, value ):
		print 'Setting %s' % name
		return setattr( self, name, value )
	def del_prop( self ):
		print 'Delling %s' % name
		return delattr( self, name )
	setattr( Tmp, 'get_%s' % name, get_prop )
	setattr( Tmp, 'set_%s' % name, set_prop )
	setattr( Tmp, 'del_%s' % name, del_prop )
	setattr( Tmp, '%s' % name, property(
		get_prop,
		set_prop,
		del_prop,
		documentation
	) )
	return Tmp

def genClass():
	class Tmp():
		pass
	return Tmp

def genGetter( name ):
	def get_prop( self ):
		print 'Getting %s' % name
		return getattr( self, name )
	return get_prop

def genSetter( name ):
	def set_prop( self, value ):
		print 'Setting %s' % name
		return setattr( self, name, value )
	return set_prop

def genDeller( name ):
	def del_prop( self ):
		print 'Delling %s' % name
		return delattr( self, name )
	return del_prop

def ByteType( name, endianness, cType, documentation ):
	Cls = genClass()
	#setattr( Cls, 'get_%s' % name, genGetter(name) )
	#setattr( Cls, 'set_%s' % name, genSetter(name) )
	#setattr( Cls, 'del_%s' % name, genDeller(name) )
	setattr( Cls, '%s' % name, property(
		genGetter(name),
		genSetter(name),
		genDeller(name),
		documentation
	) )
	return Cls

class Mixed(
	ByteType('x','<','c','Blah blah bah'),
	ByteType('y','<','c','Blah blah bah')
):
	pass

m = Mixed()
m.x = 10
m.y = 99
print m.x
print m.y

class C(object):
    def __init__(self):
        self._x = None

    def getx(self):
        return self._x

    def setx(self, value):
        self._x = value

    def delx(self):
        del self._x

    x = property(getx, setx, delx, "I'm the 'x' property.")

print dir(ByteType('y','<','c','Blah blah bah'))
print dir(C)
	

class Short( object ):
	def __init__( self, value=0 ):
		self.value = value
	def __get__( self, instance, owner ):
		print 'Getting'
		return self.value
	def __set__( self, instance, value ):
		print 'Setting'
		self.value = value

class Vector():
	x = Short()
	y = Short()

v = Vector()
v.x = 1.0
v.y = 2.0
print v.x
print v.y
