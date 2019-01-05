function test() {

	a = 1
	b = 2
	c = 3
	d = 4
	e = 5
	f = 6
	g = 7

	return class Test {
		a = 1
		b = 2
		c = 3
		d = 4
		e = 5
		f = 6
		g = 7

		test() {

			a = 1
			b = 2
			c = 3
			d = 4
			e = 5
			f = 6
			g = 7

			return class {
				a = 1
				b = 2
				c = 3
				d = 4
				e = 5
				f = 6
				g = 7
			}
		}
	}

}
