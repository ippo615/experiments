import re
import glob
import json
import yaml

def genHtmlSection(data):

	jsName = data['functionName']
	cssName = camelCaseToDashed(jsName)

	output = '\n'
	output += '<section id="section-%s">\n' % cssName
	output += '\t<h2>%s</h2>\n' % data['title']

	# Input parameters panel
	output += '\t<div class="input-parameters-block" id="input-%s">\n' % cssName
	output += '\t\t<p>%s</p>\n' % data['description']
	for inputParm in data['inputs']:
		inputId = '%s-%s' % (cssName,inputParm['title'])
		output += '\n'
		output += '\t\t<div class="slider-group">\n'
		output += '\t\t\t<label for="%s" title="%s">%s</label>\n' % (
			inputId,
			inputParm['description'],
			inputParm['title']
		)
		output += '\t\t\t<input type="range" id="%s" ' % inputId

		if 'min' in inputParm:
			output += 'min="%s" ' % inputParm['min']

		if 'max' in inputParm:
			output += 'max="%s" ' % inputParm['max']

		if 'step' in inputParm:
			output += 'step="%s" ' % inputParm['step']
		elif 'type' in inputParm and inputParm['type'] == 'int':
			output += 'step="1" '
		
		if 'value' in inputParm:
			output += 'value="%s" ' % inputParm['value']

		output += '/>\n'

		output += '\t\t</div>\n'

	output += '\t\t<button id="%s-reset">Reset</button>\n\n' % cssName

	output += '\t</div>\n'
	
	# Input canvas preview
	for src in data['sources']:
		output += '\t<canvas id="%s-%s" width="320" height="320" ></canvas>\n' % (cssName,src['title'])
		
	# Output canvas preview
	for dst in data['destinations']:
		output += '\t<canvas id="%s-%s" width="320" height="320" ></canvas>\n' % (cssName,dst['title'])

	# Controlling script
	output += '\n'
	output += '\t<script type="text/javascript">\n'

	# Update function
	output += '\t\tfunction %sRun(){\n' % jsName
	for inputParm in data['inputs']:
		output += '\t\t\tvar %s = parseFloat( document.getElementById("%s-%s").value );\n' % (
			inputParm['title'],
			cssName,
			inputParm['title']
		)

	output += '\t\t\trunImageThingy( '
	output += 'document.getElementById("%s-src"), ' % cssName
	output += 'document.getElementById("%s-dst"), ' % cssName
	output += 'function(src,dst){\n'
	parmNames = ['src','dst']
	for inputParm in data['inputs']:
		parmNames.append( inputParm['title'] )
	output += '\t\t\t\t%s( %s );\n ' % (jsName, ', '.join(parmNames))
	output += '\t\t\t});\n'
	output += '\t\t}\n'

	# Reset function
	output += '\t\tfunction %sReset(){\n' % jsName
	for inputParm in data['inputs']:
		output += '\t\t\tdocument.getElementById("%s-%s").value = %s;\n' % (
			cssName,
			inputParm['title'],
			0
		)
	output += '\t\t\t%sRun();\n' % jsName
	output += '\t\t}\n'

	# UI Handlers
	output += '\t\tdocument.getElementById("input-%s").onmousemove = %sRun;\n' % (cssName,jsName)
	output += '\t\tdocument.getElementById("%s-reset").onclick = %sReset;\n' % (cssName,jsName)

	output += '\t</script>\n'

	output += '</section>\n'

	return output

def camelCaseToDashed(text):
    s1 = re.sub('(.)([A-Z][a-z]+)', r'\1-\2', text)
    return re.sub('([a-z0-9])([A-Z])', r'\1-\2', s1).lower()

#print genHtmlSection( yaml.load(open('image-adjust-brightness.yaml')) )
if __name__ == '__main__':
	for f in glob.glob('*.yaml'):
		#print '<!-- %s -->' % f
		#print genHtmlSection( yaml.load(open(f)) )
		print 'var %s = %s;' % (
			f.replace('.yaml',''),
			json.dumps( yaml.load(open(f)) )
		)

