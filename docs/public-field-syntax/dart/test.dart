void main() {
	var a = 1;
	var b = a * a;
	print('$a $b');

	print('${Static.a} ${Static.b}');
}

class Static {
	static var a = 2;
	static var b = a * a;
}


class Instance {
	var a = 3;
	// Error: Can't access 'this' in a field initializer to read 'a'.
	// var b = a * a;
}
