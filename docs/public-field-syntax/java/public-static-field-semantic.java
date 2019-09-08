class PublicStaticFieldSemantic
 {
	public static void main(String[] args) {
		System.out.printf("%d %d\n", A.x, B.x);
		++A.x;
		System.out.printf("%d %d\n", A.x, B.x);
		++A.x;
		System.out.printf("%d %d\n", A.x, B.x);
		++B.x;
		System.out.printf("%d %d\n", A.x, B.x);
		++B.x;
		System.out.printf("%d %d\n", A.x, B.x);
	}
}

class A {
	public static int x = 1;
}

class B extends A {
}
