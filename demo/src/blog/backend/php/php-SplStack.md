---
title: php SplStack的认识和使用
tag:
  - php
  - spl
  - php SplStack
category:
  - php
  - spl
---

>SPL是用于解决典型问题(standard problems)的一组接口与类的集合。

<!--more-->

在前面的文章中，我们单独说过什么是栈，栈(Stack)是一种特殊的线性表，因为它只能在线性表的一端进行插入或删除元素(即进栈和出栈)，SplStack继承自SplDoublyLinkedList，并且mode被限制为LIFO，即后进先出模式。

在php中SplStack类通过使用一个双向链表来提供栈的主要功能，其主要的接口如下,已经做了详细的说明:

```php
SplStack extends SplDoublyLinkedList implements Iterator , ArrayAccess , Countable {
/* 方法 */
__construct ( void )
void setIteratorMode ( int $mode )
/* 继承的方法 */
public void SplDoublyLinkedList::add ( mixed $index , mixed $newval )  // 该方法是在index的位置再插入一个值
public mixed SplDoublyLinkedList::bottom ( void ) // 取出最后一个值
public int SplDoublyLinkedList::count ( void ) // 返回该栈的个数
public mixed SplDoublyLinkedList::current ( void ) // 当前操作的是哪个值
public int SplDoublyLinkedList::getIteratorMode ( void ) // 当前迭代的索引
public bool SplDoublyLinkedList::isEmpty ( void ) // 当前栈是否是空栈
public mixed SplDoublyLinkedList::key ( void ) // 当前key
public void SplDoublyLinkedList::next ( void ) // 下一个项
public bool SplDoublyLinkedList::offsetExists ( mixed $index ) // 是否存在项
public mixed SplDoublyLinkedList::offsetGet ( mixed $index ) // 获取某项
public void SplDoublyLinkedList::offsetSet ( mixed $index , mixed $newval ) // 重新设置某项
public void SplDoublyLinkedList::offsetUnset ( mixed $index ) // 复位一个偏移位置的值
public mixed SplDoublyLinkedList::pop ( void ) // 弹出最后一个值
public void SplDoublyLinkedList::prev ( void ) // 上一项
public void SplDoublyLinkedList::push ( mixed $value ) // 该方法是在栈的最后添加一个值
public void SplDoublyLinkedList::rewind ( void ) // 重置迭代器
public string SplDoublyLinkedList::serialize ( void ) // 序列化
public void SplDoublyLinkedList::setIteratorMode ( int $mode )
public mixed SplDoublyLinkedList::shift ( void ) // 弹出第一个值
public mixed SplDoublyLinkedList::top ( void ) // 最后一个值
public void SplDoublyLinkedList::unserialize ( string $serialized ) // 反序列化
public void SplDoublyLinkedList::unshift ( mixed $value ) // 把一个值压入最底部
public bool SplDoublyLinkedList::valid ( void ) // 检查是否双挂钩列表包含更多的节点
}
```

下面是测试的例子：

```php
<?php

  // $stack = new SplStack();
  //
  // $stack->add(0, 'test0');
  //
  // for($i = 1; $i < 10; $i ++) {
  //   $stack->push('test'.$i);
  // }
  // $stack->add(5, 'test11');// 5 add test11
  // // var_dump($stack->current());
  // // var_dump($stack);
  // // var_dump($stack->next());
  // // var_dump($stack->offsetExists());
  // // var_dump($stack->pop());
  // // var_dump($stack->rewind());
  // var_dump($stack->valid());


  //======================================
  //======================================
  $stack = new SplStack();  //实例化堆栈
  $stack->push("a");        //向堆栈中加入数据
  $stack->push("b");
  $stack->push("c");
  /*
  $stack->offsetSet(0,'C');  //堆栈的节点0是top 的节点，设置节点的值
  $stack->rewind(); //双向链表的rewind和堆栈的rewind相反，堆栈的rewind使得当前指针指向TOP所在的位置，而双向链表调用之后指向bottom所在的位置


  echo "qq".$stack->next();  // 堆栈的next与双向链表相反
  echo "re".$stack->current()."</br>";
  //echo "bo".$stack->bottom()."</br>";
  //echo "top".$stack->top();

  print_r($stack);
  */
  //从TOP开始遍历
  $stack->rewind();
  while($stack->valid()){
      echo $stack->key()."=>".$stack->current()."</br>";
      $stack->next();
  }
  $pop = $stack->pop();
  echo $pop;
  //pop操作从堆栈里面提取出的最后一个元素（TOP位置），同时在堆栈删除该节点
 ?>
```

接下来是一道牛客网算法的实例题目:

> 题目描述: 输入两个整数序列，第一个序列表示栈的压入顺序，请判断第二个序列是否可能为该栈的弹出顺序。假设压入栈的所有数字均不相等。例如序列1,2,3,4,5是某栈的压入顺序，序列4,5,3,2,1是该压栈序列对应的一个弹出序列，但4,3,5,1,2就不可能是该压栈序列的弹出序列。（注意：这两个序列的长度是相等的）

实现代码如下:

```php
function IsPopOrder($pushV, $popV)
{
  // write code here
  $stack = new SplStack();
  $length = count($pushV);
  $j = 0;

  for($i = 0; $i < $length; $i ++) {
    $stack->push($pushV[$i]);
    while($j < $length && $popV[$j] == $stack->top()) {
      $stack->pop();
      $j++;
    }
  }

  return $stack->isEmpty();
}
```

原理是拿到弹出顺序的每一个值去对比栈的压入顺序，如果是，从栈里剔除。
