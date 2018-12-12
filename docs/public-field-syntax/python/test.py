a = 1
b = a * a

print(a, b)


class ClassVar:
	a = 2
	b = a * a

print(ClassVar.a, ClassVar.b)


from dataclasses import dataclass

@dataclass
class Instance:
	a = 3
	b = a * a

inst = Instance()
print(inst.a, inst.b)
