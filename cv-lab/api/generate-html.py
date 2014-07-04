import re
import glob
import json
import yaml

# sudo pip install 'simplejson<2.1.0'
# sudo pip install pystache
import pystache

def genFunctionArgumentsJs(data):

	inputParameters = []
	for src in data['sources']:
		inputParameters.append( src['title'] )
	for parm in data['inputs']:
		inputParameters.append( parm['title'] ) 

	return ', '.join(inputParameters)

def genFunctionDefinitionStartJs(data):
	return 'function %s( %s ){\n' % (data['functionName'],genFunctionArgumentsJs(data))

def genFunctionDefinitionEndJs(data):
	outputNames = []
	for dst in data['destinations']:
		outputNames.append( dst['title']+':' )
	for parm in data['outputs']:
		outputNames.append( parm['title']+':' )

	if len(outputNames) == 1:
		return '\treturn %s;\n}' % outputNames[0][:-1]
	else:
		return '\treturn {\n\t\t%s\n\t};\n}' % (' ,\n\t\t'.join(outputNames))

def genFunctionReturnValuesJs(data):
	outputNames = []
	for dst in data['destinations']:
		outputNames.append( dst['title']+':' )
	for parm in data['outputs']:
		outputNames.append( parm['title']+':' )

	if len(outputNames) == 1:
		return '%s' % outputNames[0][:-1]
	else:
		return '{\n\t\t%s\n\t}' % (' ,\n\t\t'.join(outputNames))

def genExampleJs(data):
	return 'var %s = %s( %s );\n' % (
		'result',
		data['functionName'],
		genFunctionArgumentsJs(data)
	)

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

def genHtmlFromTemplate(data):
	template = """
	<section id="section-{{dashedName}}">
		<h2>{{title}}</h2>
		<div class="input-parameters-block" id="input-{{dashedName}}">
			<p>{{description}}</p>

			{{ #inputs }}
			<div class="slider-group">
				<label for="{{dashedName}}-{{title}}" title="{{description}}">{{title}}</label>
				<input type="range" id="{{dashedName}}-{{title}}" min="{{min}}" max="{{max}}" step="1" />
			</div>
			{{ /inputs }}

			<button id="{{dashedName}}-reset">Reset</button>

		</div>

		{{ #sources }}
		<canvas id="{{dashedName}}-{{title}}" width="320" height="320" ></canvas>
		{{ /sources }}
		{{ #destinations }}
		<canvas id="{{dashedName}}-{{title}}" width="320" height="320" ></canvas>
		{{ /destinations }}

		<script type="text/javascript">
			function {{functionName}}Run(){
				{{ #inputs }}
				var {{title}} = parseFloat( document.getElementById("{{dashedName}}-{{title}}").value );
				{{ /inputs }}

				runImageThingy(
					document.getElementById("{{dashedName}}-src"),
					document.getElementById("{{dashedName}}-dst"),
					function( src, dst ){
						dst = imageAdjustHsva( {{allArguments}} );
		 			}
				);
			}
			function {{functionName}}Reset(){
				{{ #inputs }}
				document.getElementById("{{dashedName}}-{{title}}").value = {{value}};
				{{ /inputs }}

				{{functionName}}Run();
			}

			document.getElementById("input-{{dashedName}}").onmousemove = {{functionName}}Run;
			document.getElementById("{{dashedName}}-reset").onclick = {{functionName}}Reset;
		</script>
	</section>"""

	data['description'] = data['description'].replace('\n','')
	data['dashedName'] = camelCaseToDashed(data['functionName'])
	data['allArguments'] = genFunctionArgumentsJs( data )
	return pystache.render( template, data )

def genImageFunctionJs( data, body='' ):
	template = """
function {{functionName}}( {{allArguments}} ){

	return {{returnObject}};
}
"""

	data['description'] = data['description'].replace('\n','')
	data['dashedName'] = camelCaseToDashed(data['functionName'])
	data['allArguments'] = genFunctionArgumentsJs( data )
	data['returnObject'] = genFunctionReturnValuesJs( data )
	return pystache.render( template, data )

#print genHtmlSection( yaml.load(open('image-adjust-brightness.yaml')) )
if __name__ == '__main__':
	for f in glob.glob('*.yaml'):
		#print '<!-- %s -->' % f
		#print genHtmlSection( yaml.load(open(f)) )

		#print 'var %s = %s;' % (
		#	f.replace('.yaml',''),
		#	json.dumps( yaml.load(open(f)) )
		#)
		data = yaml.load(open(f))

		print genImageFunctionJs( data )

		#print genHtmlFromTemplate(data)

		#print genExampleJs( data )

		#print genFunctionDefinitionStartJs( data )
		#print genFunctionDefinitionEndJs( data )
