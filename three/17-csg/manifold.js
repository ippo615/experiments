
var Manifold = (function(THREE){
	function Manifold(geometry,options){
		this.geometry = geometry.clone();
		this.original = geometry;
		this.goodEdges = [];
		this.badEdges = [];
	}

	Manifold.prototype.insertEdge = function( a, b, face, epsilon ){
		// Good Edges should only have 2 faces so we check if this will
		// break any good edges
		for( var i=0, l=this.goodEdges.length; i<l; i+=1 ){
			var edge = this.goodEdges[i];

			// If they are in the same order
			var aaIsExact = Math.abs(edge.a - a) <= epsilon;
			var bbIsExact = Math.abs(edge.b - b) <= epsilon;
			if( aaIsExact && bbIsExact ){
				edge.faces.push( face );
				this.badEdges.push( edge );
				this.goodEdges.splice( i, 1 );
				return this;
			}

			// the edge could be in a different order
			var abIsExact = Math.abs(edge.a - b) <= epsilon;
			var baIsExact = Math.abs(edge.b - a) <= epsilon;
			if( abIsExact && baIsExact ){
				edge.faces.push( face );
				this.badEdges.push( edge );
				this.goodEdges.splice( i, 1 );
				return this;
			}
		}

		// Bad edges may have 1 edge so we see if this "corrects" them
		for( var i=0, l=this.badEdges.length; i<l; i+=1 ){
			var edge = this.badEdges[i];

			// If they are in the same order
			var aaIsExact = Math.abs(edge.a - a) <= epsilon;
			var bbIsExact = Math.abs(edge.b - b) <= epsilon;
			if( aaIsExact && bbIsExact ){
				edge.faces.push( face );
				if( edge.faces.length === 2 ){
					this.goodEdges.push( edge );
					this.badEdges.splice( i, 1 );
				}
				return this;
			}

			// the edge could be in a different order
			var abIsExact = Math.abs(edge.a - b) <= epsilon;
			var baIsExact = Math.abs(edge.b - a) <= epsilon;
			if( abIsExact && baIsExact ){
				edge.faces.push( face );
				if( edge.faces.length === 2 ){
					this.goodEdges.push( edge );
					this.badEdges.splice( i, 1 );
				}
				return this;
			}
		}

		// We made it this far, no match has been found, add it to the
		// bad edges
		this.badEdges.push( {
			a: a,
			b: b,
			faces: [ face ]
		} );

		return this;
	};

	Manifold.prototype.classifyEdges = function(){

		// Work on the copy and merge all of the possible points
		this.geometry.mergeVertices();

		// Find all of the edges that are not connected to 2 faces
		var edges = [];
		for( var i=0, l=this.geometry.faces.length; i<l; i+=1 ){
			var face = this.geometry.faces[i];
			this.insertEdge( face.a, face.b, face, 0 );
			this.insertEdge( face.b, face.c, face, 0 );
			this.insertEdge( face.c, face.a, face, 0 );
		}

		console.info( this.badEdges );
		console.info( this.goodEdges );
		
	};

	Manifold.prototype.closeHoles = function( epsilon ){
		var vertices = this.geometry.vertices;
		for( var i=0, l=vertices.length; i<l; i+=1 ){
			var vi = vertices[i];
			for( var j=i+1; j<l; j+=1 ){
				var vj = vertices[j];
				if( Math.abs(vi.distanceTo(vj)) < epsilon ){
					vj.copy( vi );
				}
			}
		}
		this.geometry.mergeVertices();
		console.info( this.geometry );
	};

	Manifold.prototype._closeHoles = function( scale ){
		var hashMap = {};
		// put all verticies in a hash map based on location
		for( var i=0, l=this.geometry.vertices.length; i<l; i+=1 ){;
			var v = this.geometry.vertices[i];
			var hash = Math.round(v.x * scale) + '_' + Math.round(v.y * scale) + '_' + Math.round(v.z * scale);
			if( hashMap.hasOwnProperty( hash ) ){
				hashMap[hash].push( {
					index: i,
					vertex: v
				} );
			}else{
				hashMap[hash] = [ {
					index: i,
					vertex: v
				} ];
			}
		}
		console.info( hashMap );

	};

	Manifold.prototype._closeHoles = function( epsilon ){
		// Moves ONLY vertices on badEdges so that there are no gaps
		// bigger than epsilon in the geometry but it does not work
		// too well. 

		var badEdges = this.badEdges;
		var badIndicesHash = {};
		for( var i=0, l=badEdges.length; i<l; i+=1 ){
			badIndicesHash[ badEdges[i].a ] = badEdges[i].a;
			badIndicesHash[ badEdges[i].b ] = badEdges[i].b;
		}
		var badIndices = [];
		for( var idx in badIndicesHash ){
			badIndices.push( badIndicesHash[idx] );
		}
		
		var candidatePoints = [];
		for( var i=0, l=badIndices.length; i<l; i+=1 ){
			candidatePoints.push( {
				index: badIndices[i],
				vertex: this.geometry.vertices[ badIndices[i] ]
			} );
		}

		var clusters = [];
		while( candidatePoints.length ){
			var changed = false;
			for( var i=0, l=clusters.length; i<l; i+=1 ){
				var points = clusters[i];
				for( var j=0, jl=points.length; j<jl; j+=1 ){
					if( candidatePoints[0].vertex.distanceTo( points[j].vertex ) <= epsilon ){
						points.push( candidatePoints[0] );
						candidatePoints.splice( 0, 1 );
						changed = true;
						j = jl; // break
						i = l;  // break
					}
				}
			}
			if( ! changed ){
				clusters.push( [
					candidatePoints.pop()
				] );
			}
		}

		for( var i=0, l=clusters.length; i<l; i+=1 ){
			var points = clusters[i];
			for( var j=0, jl=points.length; j<jl; j+=1 ){
				this.geometry.vertices[ points[j].index ].copy( points[0].vertex );
			}
		}

		this.goodEdges = [];
		this.badEdges = [];
	};

	return Manifold;
})(THREE);
