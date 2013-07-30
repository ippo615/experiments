var GROUP_MODULE = function ($self) {
    if (!$self) {
        $self = {};
    }

    var array_delete_index = function (anArray, index) {
        /// Deletes an element from anywhere in the array.
        /// anArray: array: The array in which the element will be deleted.
        /// index: int: The index of the element that will be deleted.
        // Ignore negative indicies and out of range indicies
        if (index === 0) {
            anArray.shift();
            return anArray;
        }
        if (index < 0) {
            return null;
        }
        if (index >= anArray.length) {
            return null;
        }
        // Remove the last element
        var lastElement = anArray.pop();
        // If the index wasn't the last element
        if (index < anArray.length) {
            anArray[index] = lastElement;
        }
        return anArray;
    };

    var remove_from_group = function (obj, group) {
        //console.info(obj);
        //console.info(group);
        // Look through all of the groups that this belongs to
        var i = obj.groups.length;
        while (i--) {
            // If we found a match
            if (obj.groups[i] === group) {
                // Remove it from that group
                array_delete_index(obj.groups, i);
            }
        }
        // Remove multiple copies if it is there
        // multiple times
        i = group.length;
        while (i--) {
            if (group[i] === obj) {
                array_delete_index(group, i);
            }
        }
    };

    $self.group_into = function (obj, group) {
        /// Adds the object to the array specified by group.
        // All objects keep track of all of the groups
        // that they belong to.
        if (!obj.groups) {
            obj.groups = [];
        }
        obj.groups.push(group);
        group.push(obj);
        return $self;
    };

    $self.group_into_these = function (obj, groups) {
        /// Adds the object to the arrays specified by groups (groups is an array
        /// of arrays).
        // All objects keep track of all of the groups
        // that they belong to.
        if (!obj.groups) {
            obj.groups = [];
        }
        var i = groups.length;
        while (i--) {
            obj.groups.push(groups[i]);
            groups[i].push(obj);
        }
        return $self;
    };

    $self.group_in_none = function (obj) {
        /// Removes the object from all of the groups it is currently in.
        var i = obj.groups.length;
        while (i--) {
            if (obj.groups[i]) {
                $self.group_out_of(obj.groups[i]);
            }
        }
        return $self;
    };

    $self.group_out_of = function (obj, group) {
        remove_from_group(obj, group);
        return $self;
    };

    $self.group_is_in = function (obj, group) {
        if (!obj.groups) {
            return false;
        }
        var i = obj.groups.length;
        while (i--) {
            // If we found a match
            if (obj.groups[i] === group) {
                return true;
            }
        }
        return false;
    };

    return $self;
};