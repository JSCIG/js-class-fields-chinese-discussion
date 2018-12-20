<?php

const a = 1;
const b = a * a;

echo a, ' ', b, "\n";

class ClassConst {
	const a = 2;
	const b = a * a;
}

echo ClassConst::a, ' ', ClassConst::b, "\n";

class Instance {
	public $a = 3;
	// PHP require initializer to be const expression, so this is invalid
	// public $b = $a * $a;
}
