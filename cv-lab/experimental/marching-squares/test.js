/* start module: path */
$pyjs['loaded_modules']['path'] = function (__mod_name__) {
	if($pyjs['loaded_modules']['path']['__was_initialized__']) return $pyjs['loaded_modules']['path'];
	var $m = $pyjs['loaded_modules']['path'];
	$m['__repr__'] = function() { return '<module: path>'; };
	$m['__was_initialized__'] = true;
	if ((__mod_name__ === null) || (typeof __mod_name__ == 'undefined')) __mod_name__ = 'path';
	$m['__name__'] = __mod_name__;


	$m['Point2'] = (function(){
		var $cls_definition = new Object();
		var $method;
		$cls_definition['__module__'] = 'path';
		$method = $pyjs__bind_method2('__init__', function(x, y) {
			if (this['__is_instance__'] === true) {
				var self = this;
			} else {
				var self = arguments[0];
				x = arguments[1];
				y = arguments[2];
			}

			self['x'] = x;
			self['y'] = y;
			return null;
		}
	, 1, [null,null,['self'],['x'],['y']]);
		$cls_definition['__init__'] = $method;
		$method = $pyjs__bind_method2('__str__', function() {
			if (this['__is_instance__'] === true) {
				var self = this;
			} else {
				var self = arguments[0];
			}

			return $p['sprintf']('Point2(%s,%s)', $p['tuple']([$p['getattr'](self, 'x'), $p['getattr'](self, 'y')]));
		}
	, 1, [null,null,['self']]);
		$cls_definition['__str__'] = $method;
		var $bases = new Array(pyjslib['object']);
		var $data = $p['dict']();
		for (var $item in $cls_definition) { $data['__setitem__']($item, $cls_definition[$item]); }
		return $p['_create_class']('Point2', $p['tuple']($bases), $data);
	})();
	$m['Path'] = (function(){
		var $cls_definition = new Object();
		var $method;
		$cls_definition['__module__'] = 'path';
		$method = $pyjs__bind_method2('__init__', function() {
			if (this['__is_instance__'] === true) {
				var self = this;
			} else {
				var self = arguments[0];
			}

			self['points'] = $p['list']([]);
			return null;
		}
	, 1, [null,null,['self']]);
		$cls_definition['__init__'] = $method;
		var $bases = new Array(pyjslib['object']);
		var $data = $p['dict']();
		for (var $item in $cls_definition) { $data['__setitem__']($item, $cls_definition[$item]); }
		return $p['_create_class']('Path', $p['tuple']($bases), $data);
	})();
	return this;
}; /* end path */


/* end module: path */


