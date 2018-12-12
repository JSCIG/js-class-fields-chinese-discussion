#include <stdio.h>

class Static {
	public:
		static const int a = 2;
		static const int b = a * a;
};

class Instance {
	public:
		int a = 3;
		int b = a * a;
};

int main() {
	int a = 1;
	int b = a * a;

	printf("%d %d\n", a, b);

	printf("%d %d\n", Static::a, Static::b);

	Instance inst;
	printf("%d %d\n", inst.a, inst.b);
}
