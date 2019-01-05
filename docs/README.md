Will class fields be the
new Bad Part
of JavaScript?


## class fields

class fields
[提案速览](?intro)

## public issues

- [语法二义性](?public-field-syntax)
- [ASI Hazard](?public-field-asi)
- [Own Property定义与原型继承不相容](?public-field-semantic)
- [static public fields 问题](?static-public-field)

## private issues

- [hard private 语义问题](docs/hard-private.md)
- [proxy 透明性问题](docs/proxy-transparency.md)
- [prototype 继承问题](docs/prototype-inheritence.md)
- [brand checking 语义问题](docs/brand.md)
- [static private 语义问题](docs/static-private-semantic.md)
- [解构和枚举问题](docs/destructuring-enumeration.md)

## other issues

- [初始化问题](docs/initializer.md)
- [protected/friend 问题](docs/protected-friend.md)
- [# 符号](docs/#.md)
- [this 绑定](docs/this-binding.md)
- [decorator 问题](docs/decorator.md)
- [接口实现和对象工厂的矛盾](docs/interface-implementation-vs-object-factory.md)
