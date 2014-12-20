
function Point(x,y,z){
	this.x = x;
	this.y = y;
	this.z = z;
}

function Polygon( points ){
	this.points = points;
}
Polygon.prototype.ui_draw = function(ctx) {
	ctx.beginPath();
	for (var i = 0, l = this.points.length; i < l; i += 1) {
		var a = this.points[i];
		var b = this.points[(i+1)%l];
		ctx.moveTo(a.x, a.y);
		ctx.lineTo(b.x, b.y);
	}
	ctx.stroke();
};

// based on http://paulbourke.net/geometry/polygonmesh/
function is_point_in_poly(polygon, point) {
    var nIntersections = 0;
    var i;
    var xIntersect;
    var p1, p2;
    var N = polygon.length;
    var p = point;
    p1 = polygon[0];
    for (i = 1; i <= N; i++) {
        p2 = polygon[i % N];
        var yMin = (p1.y <= p2.y) ? p1.y : p2.y;
        var yMax = (p1.y >= p2.y) ? p1.y : p2.y;
        var xMax = (p1.x >= p2.x) ? p1.x : p2.x;
        if (p.y > yMin) {
            if (p.y <= yMax) {
                if (p.x <= xMax) {
                    if (p1.y !== p2.y) {
                        xIntersect = (p.y - p1.y) * (p2.x - p1.x) / (p2.y - p1.y) + p1.x;
                        if (p1.x === p2.x || p.x <= xIntersect){
                            nIntersections += 1;
						}
                    }
                }
            }
        }
        p1 = p2;
    }

    if (nIntersections % 2 === 0) {
        return false;
    } else {
        return true;
    }
}
