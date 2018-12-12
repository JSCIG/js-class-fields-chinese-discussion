```js
class X {
	@deco #x
}
```

PrivateName

WeakMap + Brand checking

```js
get(instance)
set(instance, value)
```

Can be proxied!

You can trap **all** private
states of **all** instances

Symbol

You can only get the private
state when you have the instance

Too powerful!

Security issue

Vue, MobX

- Need to decorate all responsive properties
- Need to filter all properties of all instances

Performance?
