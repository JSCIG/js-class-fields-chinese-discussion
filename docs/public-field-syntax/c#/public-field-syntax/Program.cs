class Program
{
	static void Main(string[] args)
	{
		int a = 1;
		int b = a * a;
		System.Console.WriteLine($"{a} {b}");

		System.Console.WriteLine($"{Static.a} {Static.b}");
	}
}

class Static {
	public static int a = 2;
	public static int b = a * a;
}

class Instance {
	int a = 3;
	// A field initializer cannot reference the non-static field, method, or property
	// int b = a * a;
}
