/*
 * Modified STL ASCII saver from: Paul Kaplan, @ifitdidntwork
 * 
 * See further explanation here:
 * http://buildaweso.me/project/2013/2/25/converting-threejs-objects-to-stl-files
 */

function stringifyVector(vec){
	return ""+vec.x+" "+vec.y+" "+vec.z;
}
function stringifyVertex(vec){
	return "vertex "+vec.x+" "+vec.y+" "+vec.z+" \n";
}
 
// Given a THREE.Geometry, create an STL string
function generateSTL(geometry){
	var vertices = geometry.vertices;
	var tris = geometry.faces;
	
	var stl = "solid fold.js\n";
	for(var i = 0; i<tris.length; i++){
		stl += ("facet normal "+stringifyVector( tris[i].normal )+" \n");
		stl += ("outer loop \n");
		stl += stringifyVertex( vertices[ tris[i].a ] );
		stl += stringifyVertex( vertices[ tris[i].b ] );
		stl += stringifyVertex( vertices[ tris[i].c ] );
		stl += ("endloop \n");
		stl += ("endfacet \n");
	}
	stl += ("endsolid");
	 
	return stl;
}
 
// Use FileSaver.js 'saveAs' function to save the string
function saveSTL( geometry, filename ){
	var stlString = generateSTL( geometry );
	var blob = new Blob([stlString], {type: 'text/plain'});
	saveAs(blob, filename);
}
