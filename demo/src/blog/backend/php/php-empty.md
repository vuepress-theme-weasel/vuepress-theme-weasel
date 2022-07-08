---
title: 关于empty判断是否为空的的使用误区
tag:
  - php
category:
  - php
---

## empty使用的误区

最近在学习php正则表达式，学习完成之后在写一个验证类工具的时候有一段代码如下：
<!-- more -->

```php
public function isUrl($subject){
   $res = $this->regex('url' , $subject);
   return $this->changeBool($res);
}
protected function changeBool($res){
  if ( empty($res) || $res === false ){
      return false;
   }else{
     return true;
   }
}
```

其中isUrl是判断是否是url，返回bool类型，其中的regex()方法会根据实例化时预定义的变量来确定的值实preg_match的返回值还是preg_match_all的匹配结果。实例化函数如下：

```php
public function __construct( $isReturnRes = false , $modifier = '' ){
    $this->isReturnRes = $isReturnRes;
    $this->modifier = $modifier;
}
```

其中isReturnRes代表是否返回结果集，modifier是正则的修正符，即Ui等。
当实例化isReturnRes为true并且无结果匹配时，res会返回一个空的二维数组。如下：

```php
array(1) {
  [0]=>
     array(0) {
     }
}
```

而此时使用empty()判断这个值是否为空时，则返回false

```php
$subject = "aaaa@qq.com";

preg_match_all('/d+/',subject,matches);

var_dump(matches);vardump(empty(matches));
array(1) { [0]=> array(0) { } } bool(false)
```

所以，empty是不能判断二维或者多维数组是否为空的。
empty判断为空的条件如下：

```php
NULL
0 （int下为0的值）
0.0 (float下为0的值，当然0.00000也是为空的)
"0" (string下为0的值，0.0就不是空了)
[] (空数组）
"" (空值)
false (bool为false)
var(声明过var)
$var;
var_dump(empty(""));  // bool(true)
var_dump(empty(0)); // bool(true)
var_dump(empty(0.0)); // bool(true)
var_dump(empty("0")); // bool(true)
var_dump(empty(null)); // bool(true)
var_dump(empty(false)); // bool(true)
var_dump(empty($var)); // bool(true)
var_dump(empty([])); // bool(true)
```

所以，要想判断二维数组是否为空，可以使用如下方法

```php
array_filter函数来过滤空值，然后使用empty或者count函数
var=[[],[],[]];echocount(var); // 3
echo "";
echo count(array_filter(var));//0echo"";vardump(empty(arrayfilter(var))); // true
```

## empty和isset的使用场景

相信作为新手的我们，每次用到empty()和isset()时等都会有这样的疑惑：这二者有何区别？什么时候需要用empty()？什么时候用isset()?
首先，isset()的返回值如下：

如果 var 存在并且值不是 NULL  则返回 TRUE ，否则返回 FALSE 。
empty的返回值如下：

当var存在，并且是一个非空非零的值时返回 FALSE  否则返回 TRUE .
以下的东西被认为是空的：

```php
1. "" (空字符串)
2. 0 (作为整数的0)
3. 0.0 (作为浮点数的0)
4. "0" (作为字符串的0)
5. NULL
6. FALSE
7. array() (一个空数组)
8. $var; (一个声明了，但是没有值的变量)

$var;
var_dump(empty(""));  // bool(true)
var_dump(empty(0)); // bool(true)
var_dump(empty(0.0)); // bool(true)
var_dump(empty("0")); // bool(true)
var_dump(empty(null)); // bool(true)
var_dump(empty(false)); // bool(true)
var_dump(empty($var)); // bool(true)
var_dump(empty([])); // bool(true)
```
根据以上可以看出，只要$var存在且不为null,isset就会返回true。
例子如下：

```php
$var;
var_dump(isset($var));     // false
$var = "";
var_dump(isset($var));     // true
$var = 0;
var_dump(isset($var));     // true
$var = [];
var_dump(isset($var));     // true
$var = null;
var_dump(isset($var));     // false
$var = ['a' => 1 , 'b' => 2 , "c" => 3 , "d" => "" , "e" => null];
var_dump(isset($var["d"]));     // true
var_dump(isset($var["e"]));     // false
var_dump(isset($var["f"]));     // false
unset($var["d"]);
var_dump(isset($var["d"]));     // false
```

由此可以看出，isset()判断的变量，要是不存在、没有被赋值或者赋值为null或者被unset时，会返回false,其余情况都会返回true；而empty()在值为0、0.0或者为空时都会返回true，这意味着，我们在使用变量处理函数时，当该变量可能出现0或者空的的值，使用 empty() 要小心，这个时候用 isset 取代它更明智一些。
因此可以得出结论：

当要判断一个变量是否已经声明的时候可以使用isset函数。
当要判断一个变量是否已经赋予数据且补位空，可以用empty函数。
当要判断一个变量存在且不为空，先isset函数，再用empty函数。
