#!/bin/bash

files="
 cv-lab.js

 util/util.js
 util/remap.js
 operator/operator.js
 operator/copy.js
 operator/generate-add-clip.js
 operator/generate-add-wrap.js
 operator/generate-contrast.js
 operator/invert.js

 converter/hsva-to-rgba.js
 converter/max-channel.js
 converter/min-channel.js
 converter/rgba-to-hsva.js
 converter/rgba-to-luma.js

 image/convert.js
 image/apply-operators.js

 image/adjust-brightness.js
 image/adjust-contrast.js
 image/adjust-hsva.js
 image/adjust-rgba.js
 image/convert-hsva-to-rgba.js
 image/convert-rgba-to-hsva.js
 image/convert-rgba-to-luma.js
 image/convert-to-max-channel.js
 image/convert-to-min-channel.js
 image/invert.js
"

for f in $files; do
	cat $f
done;

function whatIsNotInBuild(){
	echo 'The following javaScript files were not included in the build:'
	oldFunctions='old'
	newFunctions='new'
	echo "$files" | sort -u > $oldFunctions
	find . | grep '.js' | sed -e 's_^./_ _g' | sort -u > $newFunctions
	#diff --minimal --side-by-side $oldFunctions $newFunctions
	diff --minimal $oldFunctions $newFunctions | grep '>' | sed -e 's_^> __g'
	rm $oldFunctions $newFunctions
}
