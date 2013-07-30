#!/usr/bin/python

# identify -ping -format "%f %w %h\n" *gif 2>/dev/null | ./make-atlas.py outfile.gif > atlas.json

import sys, subprocess

class Image:
	def __init__(self,srcString):
		fields=srcString.split(' ');
		#print(srcString);
		self.name = fields[0];
		self.xSize = float(fields[1]);
		self.ySize = float(fields[2]);
		self.xMin = 0;
		self.yMin = 0;
		self.xMax = self.xMin + self.xSize;
		self.yMax = self.yMin + self.ySize;
		self.isPlaced = False;

	def __str__(self):
		return self.name + " @ " + str(self.xMin) + ',' + str(self.yMin) + ' - ' + str(self.xSize) + "," + str(self.ySize);

def isColliding(aImage,bImage):
	if( aImage.xMin >= bImage.xMax ): return False;
	if( aImage.xMax <= bImage.xMin ): return False;
	if( aImage.yMin >= bImage.yMax ): return False;
	if( aImage.yMax <= bImage.yMin ): return False;
	return True;

images = [];
for line in sys.stdin.readlines():
	tmp = line.strip('\n');
	if( ' ' in tmp ):
		images.append( Image(line.strip('\n')) );
		#print( images[len(images)-1] );

# Sort by largest dimension size:
images.sort( key=lambda image: max(image.xSize,image.ySize), reverse=True )
#for iImage in images:
#	print iImage

# Start with 0,0 as the first valid placement point
placePoints = [[0,0,0]]

# Keep track of theh required canvas size
canvasMinX = 0
canvasMaxX = 0
canvasMinY = 0
canvasMaxY = 0

for iImage in images:
	# print iImage
	for jPoint in placePoints:

		# Compute a score for this point, start at 0
		jPoint[2] = 0
		
		# Place the image at this point
		iImage.xMin = jPoint[0]
		iImage.yMin = jPoint[1]
		iImage.xMax = iImage.xMin + iImage.xSize
		iImage.yMax = iImage.yMin + iImage.ySize

		# if it collides with any other image, we cannot use this spot
		for other in images:
			if other.isPlaced == True and other != iImage and isColliding(iImage,other):
				# The score is decreased by a big amount
				jPoint[2] -= 999999

		# We don't want it to expand the boundary
		# Note, we can only grow right (+x) & down (+y)
		# The score is decreased by how much area an expansion would add
		jPoint[2] += (canvasMaxX - ( jPoint[0] + iImage.xSize )) * canvasMaxY
		jPoint[2] += (canvasMaxY - ( jPoint[1] + iImage.ySize )) * canvasMaxX

	# Sort the points by score 
	placePoints.sort(key=lambda pt: pt[2],reverse=True)
	# print placePoints;
	
	# Put the object at the first point
	iImage.xMin = placePoints[0][0]
	iImage.yMin = placePoints[0][1]
	iImage.xMax = iImage.xMin + iImage.xSize
	iImage.yMax = iImage.yMin + iImage.ySize
	iImage.isPlaced = True

	# Remove that point from the list 
	del placePoints[0]	

	# Expand the boundary if we need to
	if( iImage.xMax > canvasMaxX ):
		canvasMaxX = iImage.xMax
	if( iImage.yMax > canvasMaxY ):
		canvasMaxY = iImage.yMax

	# Add the top right, and bottom left corners to the list of valid points
	placePoints.append([iImage.xMax,iImage.yMin,0])
	placePoints.append([iImage.xMin,iImage.yMax,0])

# Print the command to make the atlas
imageMagickCommand = ""
imageMagickCommand += 'convert -size '+ str(int(canvasMaxX)) + 'x' + str(int(canvasMaxY)) + ' xc:none \\\n'
for iImage in images:
	imageMagickCommand += ' -draw \'image over '+str(int(iImage.xMin))+','+str(int(iImage.yMin))+' 0,0 "'+iImage.name+'"\' \\\n'
imageMagickCommand += ' '+sys.argv[1]

# Run the imagemagick command
subprocess.call(imageMagickCommand, shell=True)

def printAtlasJson():
	json = 'atlas["'+sys.argv[1]+'"] = {\n';
	json += '	"name": "'+sys.argv[1]+'",\n';
	json += '	"domMaster": null,\n';
	json += '	"domAvailable": [],\n';
	json += '	"domUsed": [],\n';
	for iImage in images:
		json += '	"'+iImage.name+'":{\n'
		json += '		"cssLeft":"-' + str(100 * (iImage.xMin / iImage.xSize)) + '%",\n';
		json += '		"cssTop" :"-' + str(100 * (iImage.yMin / iImage.ySize)) + '%",\n';
		json += '		"cssWidth":"' + str(100 * (canvasMaxX / iImage.xSize)) + '%",\n';
		json += '		"cssHeight":"'+ str(100 * (canvasMaxY / iImage.ySize)) + '%" \n';
		json += '	},\n'
	json = json[:-2]+'\n'
	json += '};'
	return json

# Plop the json file to stdout - the user can redirect it to a file
# ie > file.json
# f = open(sys.argv[1]+'.json', 'w')
# f.write(printAtlasJson())
# f.close()
print printAtlasJson()

