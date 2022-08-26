---
title: node request promise 封装
tag:
  - node
  - request
category:
 - node
 - javascript
---

request 是nodejs最常用的库之一，大多时候我们是需要将其promise化的方便我们的项目使用，具体的封装如下：

<!-- more -->

```javascript
const request = require( 'request' )
const query = require( 'qs' )

/**
 * http 请求封装
 * @param    {[string]}                     type   [请求类型]
 * @param    {[string]}                     url    [请求地址]
 * @param    {[json/array]}                 data   [请求数据]
 * @param    {[object]}                     header [请求header]
 * @param    {[bool]}                       debug  [是否打印请求信息]
 * @return   {[promise]}                            [promise]
 * @Author:  slade
 * @DateTime :2017-09-15T10:30:42+080
 */
export const httpRequest = ( url, data = {}, type = 'GET', header = {}, debug = false ) => {
	// 数据
	let options = {
		url: url,
		headers: header,
		method: type
	}
	if ( type.toLowerCase() === 'post' ) {
		options = Object.assign( options, {
			form: data
		} )
	} else if ( type.toLowerCase() === 'get' ) {
		options.url = url + '?' + query.stringify( data )
	}
	// console.log('请求参数',options)
	// 调用
	return new Promise( ( resolve, reject ) => {
		request( options, ( error, response, body ) => {
			if ( debug ) {
				console.log( '请求返回\n', response )
				console.log( '请求返回内容\n', body )
				console.error( '请求错误\n', error )
			}
			if ( !error && response.statusCode == 200 ) {
				try {
					var info = typeof body === 'Object' ? body : JSON.parse( body )
					resolve( info )
				} catch ( e ) {
					console.log( '请求返回内容\n', body )
					reject( e )
				}
			} else {
				console.log( '请求返回内容\n', body )
				reject( error )
			}
		} )
	} )
}
```
typescript版本：

```typescript
import request from 'request'
import query from 'qs'

type TRequestType = 'GET' | 'POST'

/**
 * http 请求封装
 * @param    {[string]}                     type   [请求类型]
 * @param    {[string]}                     url    [请求地址]
 * @param    {[json/array]}                 data   [请求数据]
 * @param    {[object]}                     header [请求header]
 * @param    {[bool]}                       debug  [是否打印请求信息]
 * @return   {[promise]}                            [promise]
 * @Author:  slade
 * @DateTime :2017-09-15T10:30:42+080
 */
export const httpRequest = <T = any>(
  url: string,
  data: any = {},
  type: TRequestType = 'GET',
  header: Record<string, string> = {},
  debug: boolean = false
): Promise<T> => {
	// 数据
	let options = {
		url: url,
		headers: header,
		method: type
	}
	if ( type.toLowerCase() === 'post' ) {
		options = Object.assign( options, {
			form: data
		} )
	} else if ( type.toLowerCase() === 'get' ) {
		options.url = url + '?' + query.stringify( data )
	}
	// console.log('请求参数',options)
	// 调用
	return new Promise( ( resolve, reject ) => {
		request( options, ( error: Error, response: any, body: unknown ) => {
			if ( debug ) {
				console.log( '请求返回\n', response )
				console.log( '请求返回内容\n', body )
				console.error( '请求错误\n', error )
			}
			if ( !error && response.statusCode == 200 ) {
				try {
					var info = typeof body === 'object' ? body : JSON.parse( body as string )
					resolve( info )
				} catch ( e ) {
					console.log( '请求返回内容\n', body )
					reject( e )
				}
			} else {
				console.log( '请求返回内容\n', body )
				reject( error )
			}
		} )
	} )
}
```

request 的另外一种用法，和koa配合转发防盗链链接

```javascript
/**
 * 外链图片转成本域
 * @type {[type]}
 */
export const imageRequest = async ( ctx, next ) => {
	await new Promise( function ( resolve, reject ) {
			let url = ctx.query.url
			// console.log( url );
			var req = request( {
				method: 'GET',
				encoding: null,
				uri: url
			}, function ( err, response, body ) {
				if ( err ) {
					return reject( err )
				}
				resolve( body )
			} )
		} )
		.then( ( body ) => {
			ctx.status = 200
			ctx.type = 'jpg'
			ctx.length = Buffer.byteLength( body )
			ctx.body = body
		} )
		.catch( ( err ) => {
			console.error( err )
		} )
}
```
