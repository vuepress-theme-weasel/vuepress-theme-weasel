---
title: php计算两个经纬度地点之间的距离
tag:
  - php
category:
  - php
---

```php
/**
 * 求两个已知经纬度之间的距离,单位为米
 *
 * @param lng1 $ ,lng2 经度
 * @param lat1 $ ,lat2 纬度
 * @return float 距离，单位米
 * @author www.Alixixi.com
 */
function getdistance($lng1, $lat1, $lng2, $lat2) {
    // 将角度转为狐度
    $radLat1 = deg2rad($lat1); //deg2rad()函数将角度转换为弧度
    $radLat2 = deg2rad($lat2);
    $radLng1 = deg2rad($lng1);
    $radLng2 = deg2rad($lng2);
    $a = $radLat1 - $radLat2;
    $b = $radLng1 - $radLng2;
    $s = 2 * asin(sqrt(pow(sin($a / 2), 2) + cos($radLat1) * cos($radLat2) * pow(sin($b / 2), 2))) * 6378.137 * 1000;
    return $s;
}

```
<!--more-->
### pow()
***
>定义和用法
pow() 函数返回 x 的 y 次方。

>语法
	pow(x,y)
	参数	描述
	x	必需。一个数。
	y	必需。一个数。

>说明
返回 x 的 y 次方的幂。如果可能，本函数会返回 integer。
如果不能计算幂，将发出一条警告，pow() 将返回 false。PHP 4.2.0 版开始 pow() 不要产生任何的警告。

例子
```php
<?php
echo pow(4,2);
echo pow(6,2);
echo pow(-6,2);
echo pow(-6,-2);
echo pow(-6,5.5);
?>
```
输出类似：
```php
16
36
36
0.0277777777778
-1
```
