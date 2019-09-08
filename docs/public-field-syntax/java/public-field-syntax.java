class PublicFieldSyntax {
	public static void main(String[] args) {
		int a = 1;
		int b = a * a;

		System.out.printf("%d %d\n", a, b);

		System.out.printf("%d %d\n", Static.a, Static.b);

		Instance inst = new Instance();
		System.out.printf("%d %d\n", inst.a, inst.b);
	}
}

class Static {
	public static int a = 2;
	public static int b = a * a;
}

class Instance {
	public int a = 3;
	public int b = a * a;
}
