Imports System

Module Program
	Public a = 1
	Public b = a

	Class SharedVar
		Public Shared a = 2
		Public Shared b = a
	End Class

	Class Instance
		Public a = 3
		Public b = a
	End Class

	Sub Main(args As String())
		Console.WriteLine($"{a} {b}")

		Console.WriteLine($"{SharedVar.a} {SharedVar.b}")

		Dim inst As New Instance
		Console.WriteLine($"{inst.a} {inst.b}")
	End Sub
End Module
