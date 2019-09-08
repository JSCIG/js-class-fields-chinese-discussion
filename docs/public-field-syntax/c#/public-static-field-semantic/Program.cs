class PublicStaticField
{
	static void Main(string[] args)
	{
		System.Console.WriteLine($"{A.x} {B.x}");
		++A.x;
		System.Console.WriteLine($"{A.x} {B.x}");
		++A.x;
		System.Console.WriteLine($"{A.x} {B.x}");
		++B.x;
		System.Console.WriteLine($"{A.x} {B.x}");
		++B.x;
		System.Console.WriteLine($"{A.x} {B.x}");
	}
}

class A {
	public static int x = 1;
}

class B: A {
}
