var DRAW_MODULE = function ($self) {
    if (!$self) {
        $self = {};
    }

    var freeNodes = [];
    $self.draw_nodeSerialNumber = 0;

    $self.draw_get_node = function () {
        var node;
        if (freeNodes.length > 0) {
            node = freeNodes.pop();
        } else {
            node = document.createElement('div');
            node.id = 'id' + $self.draw_nodeSerialNumber;
            $self.draw_nodeSerialNumber += 1;
        }
        node.style.position = 'absolute';
        node.style.overflow = 'hidden';
        node.style.visibility = 'visible';
        node.style.boxSizing = 'border-box';
        return node;
    };

    $self.draw_attach_node_to = function (node, parent) {
        parent.appendChild(node);
    };

    $self.draw_set_min = function (node, xMin, yMin) {
        node.style.top = yMin + 'px';
        node.style.left = xMin + 'px';
    };

    $self.draw_set_max = function (node, xMax, yMax) {
        node.style.right = xMax + 'px';
        node.style.bottom = yMax + 'px';
    };

    $self.draw_set_size = function (node, xSize, ySize) {
        node.style.width = xSize + 'px';
        node.style.height = ySize + 'px';
    };

    $self.draw_set_fill = function (node, fillStyle) {
        node.style.background = fillStyle;
    };

    $self.draw_set_border = function (node, size, style) {
        node.style.border = size + 'px ' + style;
    };

    $self.draw_set_z = function (node, z) {
        node.style.zIndex = z;
    };

    $self.draw_set_text = function (node, text) {
        node.innerHTML = text;
    };

    $self.draw_set_text_size = function (node, size) {
        node.style.fontSize = size+'px';
    };

    $self.draw_set_text_align = function (node, hor) {
        node.style.textAlign = hor;
    };

    $self.draw_set_text_font = function (node, fontFamily) {
        node.style.fontFamily = fontFamily;
    };

    $self.draw_set_padding = function (node, pad) {
        node.style.padding = pad + 'px';
    };

    $self.draw_hide = function (node) {
        node.style.visibility = 'hidden';
    };

    $self.draw_unhide = function (node) {
        node.style.visibility = 'visible';
    };

    $self.draw_free_node = function (node) {
        if (node.parentNode) {
            node.parentNode.removeChild(node);
        }
        freeNodes.push(node);
    };

    // Testing 'advanced' css
    var _testDiv = $self.draw_get_node();
    var prop;
    $self.draw_set_opacity = function (node, opacity) {};
    $self.draw_set_rotation = function (node, deg) {};
    $self.draw_set_scale = function (node, scale) {};
    $self.draw_set_transform = function (node, xScale, yScale, deg) {};
    $self.draw_set_corners = function (node, radius) {};
    for (prop in _testDiv.style) {
        if (prop === 'opacity') {
            $self.draw_set_opacity = function (node, opacity) {
                node.style.opacity = opacity;
            };
        } else if (prop === 'MozOpacity') {
            $self.draw_setOpacity = function (node, opacity) {
                node.style.MozOpacity = opacity;
            };
        } else if (prop === 'KhtmlOpacity') {
            $self.draw_set_opacity = function (node, opacity) {
                node.style.KhtmlOpacity = opacity;
            };
        }
        if (prop === 'MozBorderRadius') {
            $self.draw_set_corners = function (node, radius) {
                node.style.MozBorderRadius = radius + 'px';
            };
        } else if (prop === 'WebkitBorderRadius') {
            $self.draw_set_corners = function (node, radius) {
                node.style.WebkitBorderRadius = radius + 'px';
            };
        } else if (prop === 'borderRadius') {
            $self.draw_set_corners = function (node, radius) {
                node.style.borderRadius = radius + 'px';
            };
        }

        if (prop.match(/MozTransform/i)) {
            $self.draw_set_rotation = function (node, deg) {
                node.style.MozTransform = "rotate(" + deg + "deg)";
            };
            $self.draw_set_scale = function (node, scale) {
                node.style.MozTransform = "scale(" + scale + ")";
            };
            $self.draw_set_transform = function (node, xScale, yScale, deg) {
                node.style.MozTransform = "rotate(" + deg + "deg) scale(" + xScale + "," + yScale + ")";
            };
        } else if (prop.match(/WebkitTransform/i)) {
            $self.draw_set_rotation = function (node, deg) {
                node.style.WebkitTransform = "rotate(" + deg + "deg)";
            };
            $self.draw_set_scale = function (node, scale) {
                node.style.WebkitTransform = "scale(" + scale + ")";
            };
            $self.draw_set_transform = function (node, xScale, yScale, deg) {
                node.style.WebkitTransform = "rotate(" + deg + "deg) scale(" + xScale + "," + yScale + ")";
            };
        } else if (prop.match(/OTransform/i)) {
            $self.draw_set_rotation = function (node, deg) {
                node.style.OTransform = "rotate(" + deg + "deg)";
            };
            $self.draw_set_scale = function (node, scale) {
                node.style.OTransform = "scale(" + scale + ")";
            };
            $self.draw_set_transform = function (node, xScale, yScale, deg) {
                node.style.OTransform = "rotate(" + deg + "deg) scale(" + xScale + "," + yScale + ")";
            };
        } else if (prop.match(/MsTransform/i)) {
            $self.draw_set_rotation = function (node, deg) {
                node.style.MsTransform = "rotate(" + deg + "deg)";
            };
            $self.draw_set_scale = function (node, scale) {
                node.style.MsTransform = "scale(" + scale + ")";
            };
            $self.draw_set_transform = function (node, xScale, yScale, deg) {
                node.style.MsTransform = "rotate(" + deg + "deg) scale(" + xScale + "," + yScale + ")";
            };
        } else if (prop === 'transform') {
            $self.draw_set_rotation = function (node, deg) {
                node.style.transform = "rotate(" + deg + "deg)";
            };
            $self.draw_set_scale = function (node, scale) {
                node.style.transform = "scale(" + scale + ")";
            };
            $self.draw_set_transform = function (node, xScale, yScale, deg) {
                node.style.transform = "rotate(" + deg + "deg) scale(" + xScale + "," + yScale + ")";
            };
        }
        /*
        if (prop.match(/filter/)) {
	    console.info(prop);
            $self.draw_set_opacity = function (node, opacity) {
                var o = Math.round(opacity * 100);
                node.style.MsFilter = 'alpha(opacity=' + o + ');'; // new ie
                node.style.MsFilter = 'progid:DXImageTransform.Microsoft.Alpha(Opacity=' + o + ');'; // new ie
                node.style.filter = 'alpha(opacity=' + o + ');'; // old ie
            };
        }
        */
    }
    $self.draw_free_node(_testDiv);

    return $self;
};