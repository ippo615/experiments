#!/usr/bin/python

class DependencyGrapher( ):
	def __init__( self, name, ignoreList=[] ):
		self.name = name
		self.importLines = []
		self.moduleNames = []
		self.imports = []
		self.ignoreList = []
		for item in ignoreList:
			self.ignore( item )
	
	def ignore( self, ignorable ):
		if ignorable not in self.ignoreList:
			self.ignoreList.append( ignorable )
	
	def extractModule( self, line ):
		if 'from' in line:
			return
	
	def importLine( self, line ):
		self.importLines.append( line )
		moduleName = self.getModuleName( line )
		if moduleName not in self.ignoreList:
			if moduleName not in self.moduleNames:
				self.moduleNames.append( moduleName )

	def getModuleName( self, line ):
		name = ''
		
		# from x import y
		if name == '':
			try:
				name = self.getModuleNameFrom( line )
			except ValueError:
				pass
		
		# import x
		if name == '':
			try:
				name = self.getModuleNameImport( line )
			except ValueError:
				pass
		
		return self.trimModuleName(name)

	def trimModuleName( self, name ):
		lastDotIndex = name.rfind('.')
		lastDotIndex += 1
		return name[lastDotIndex:]

	def getModuleNameImport( self, line ):
		# handles: 'import os' -> os
		matchStart = 'import '
		startIndex = line.index(matchStart)+len(matchStart)
		try:
			endIndex = line.index(' ',startIndex)
		except ValueError:
			endIndex = len( line )-1
		return line[startIndex:endIndex]

	def getModuleNameFrom( self, line ):
		# handles: 'from os import x' -> os
		# handles: 'import x from os' -> os
		matchStart = 'from '
		startIndex = line.index(matchStart)+len(matchStart)
		try:
			endIndex = line.index(' ',startIndex)
		except ValueError:
			endIndex = len( line )
		return line[startIndex:endIndex]

	def processFile( self, fHandle ):
		for line in fHandle:
			if 'import' in line:
				self.importLine( line )

	def __str__( self ):
		rows = [ '%s,%s,%s' % (
			self.name,
			x,
			1.0
		) for x in self.moduleNames ]
		return '\n'.join( rows )

if __name__ == '__main__':
	import fnmatch
	import os

	matches = []
	for root, dirnames, filenames in os.walk('webapp/modules/'):
		for filename in fnmatch.filter(filenames, '*.py'):
			if filename != '__init__.py':
				matches.append({
					'path': os.path.join(root, filename),
					'name': filename[0:-3]
				})
	
	def run( moduleName, filename ):
		depends = DependencyGrapher(moduleName, [
			# Built-in
			'os',
			'sys',
			'logging',
			'time',
			'errno',
			'shutil',
			'zipfile',
			'glob',
			'threading',
			'subprocess',
			're',
			'random',
			'csv',
			'math',
			'cStringIO',
			# 3rd party
			'PIL',
			# Own
			'logger',
			'point_2d',
			'point_3d'
		])
		with open( filename ) as f:
			depends.processFile( f )
		print depends
	
	print matches

	for match in matches:
		run( match['name'], match['path'] )
