## 会议流程
1. *10m* 开场
    1. 主持人欢迎致辞
    1. 参会者签到并介绍
    1. host设施介绍（如洗手间、茶水等）
    1. 如需要志愿者担任会议记录员，召集志愿者
    1. 主持人介绍会议议程和规则
    1. 如使用会议流程工具，会议流程工具介绍
1. *10m* class fields现状介绍
    1. [提案简介](../../docs/intro.md)
    1. [提案演变历史简介](https://github.com/tc39/proposal-class-fields#development-history)
    1. [争议简介](https://github.com/tc39/proposal-class-fields/issues?utf8=✓&q=is%3Aissue+sort%3Acomments-desc+)
    1. 沉没成本
1. *10m* 背景介绍
    1. TC39简介
    1. 360决议和后续情况简介
    1. 会议目标
1. *75m* public fields相关issues
    1. *10m* [`[x] = ...`语法二义性](../../docs/public-fields-syntax-ambiguity-1.md)
    1. *15m* [``a = 'world'; b = `Hello ${a}!` ``语法二义性](../../docs/public-fields-syntax-ambiguity-2.md)
    1. *20m* [ASI hazard](../../docs/public-fields-asi.md)
    1. *20m* [Define own property 语义与原型继承不相容](../../docs/public-fields-semantics.md)
    1. *10m* [public static fields 子类问题](../../docs/static-public-fields.md)
1. *15m* coffee break / buffer
1. *60m* private fields相关issues
    1. *15m* [hard private](../../docs/hard-private.md)
    1. *10m* [brand checking](../../docs/brand.md)
    1. *20m* [proxy透明性](../../docs/proxy-transparency.md)
    1. *5m* [prototype继承透明性](../../docs/prototype-inheritence.md)
    1. *10m* [private static fields 子类问题](../../docs/static-private-semantic.md)
1. *30m* 对TypeScript的影响
    1. *5m* 为什么要考虑TS
    1. *10m* breaking change
        1. 无initializer时的语义
        1. `[[Define]]` vs `[[Set]]`
        1. 投票
    1. *15m* 迁移路径
        1. 两种private机制
        1. 无protected
        1. 投票
1. *5m* 针对提案整体的投票（根据时间情况可提前到TS议程之前）
1. *10m* coffee break / buffer
1. *60m* 其他issues
   1. *15m* 初始化顺序，在initializer中调用可能被子类override的成员的风险
   1. *15m* Object API适用性，对象（属性集）工厂 vs 接口（封装）实现，OOP实践（语言中立）
   1. *15m* 语法对称而语义不对称，own property存储，解构和枚举问题，"field" 术语问题
   1. *15m* `#`符号
1. *15m* 总结
   1. 投票结果更新（如果需要的话）+总结
   1. 后续计划（整理会议纪要、翻译、宣传、提交给tc39）
   1. 建立讨论组和下次会议的计划
   1. 感谢host
1. *30m* buffer
1. 晚餐

## 备选内容（未来会议内容）
1. 内建 vs decorator
    1. placement
    1. this 绑定问题
    1. 可见性：protected, friend, internal, package private 等
    1. 修饰：readonly、自动accessor、abstract、final、override、open 等
1. 已经被否决的alternative提案介绍
   1. private symbol
   1. classes 1.1
   1. symbol literal
1. 核心设计要素
   1. 什么样的提案对TS才是友好的
   1. 什么样的提案符合OOP最佳实践
   1. 什么样的提案符合JS程序员预期
   1. 可能的public语义
      1. [[Define]] own property
      1. [[Set]]
      1. [[Define]] property on prototype
      1. [[Define]] accessors with backstore private state
   1. 可能的private语义
      1. symbol
      1. private symbol
      1. WeakMap
   1. `this.x` vs `x` 的语法约束
   1. 可能的private语法
      1. Sigil: `o.#x` `o.@x`
      1. Operator: `o->x` `o::x` `x@o`
      1. 特殊构造 `private.x` + `private(o).x`
      1. `x` + `o[private.x]`
   1. 关键字
1. TC39流程问题
