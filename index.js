/*
	execution context
		1. creation phase
			1. window | global
			2. this
			3. save variables to heap
			4. save full function declation
			5. lexial enviroinment

		2. execution phase
			1. initialize all variables
			2. call functions
			3. execute code

	1. global exection context
	1. functoin exection context

	hoisting
*/

/*
	global execution context
*/

// console.log(number)
// console.log(plus(10, 20))

// var object = { name: 'ali' }
// var number = 20

// console.log(number)

// function plus (a, b) {
// 	// function execution context
// 	var t = 10
// 	return a + b
// }



/*

		-----------------------------------------------
		declation | declation & assignment | re-declaration | re-declaration & assignment | re-assignment
let       true                 true              false                       false               true
const     false                true              false                       false               false
var       true                 true              true                        true                true
class     -                    true               -                          false                true
function  -                     true              -                           true               true
*/

/*
		    hoisting                        'use strict'
let	   		 false
const  		 false
var    		 true
class  		 false
function     true

			 re-declaration
let	   		 false
const  		 false
var    		 true
class  		 false
function     true

*/

// function plus () {}
// function plus () {}


// plus = 10



let x = 10


function x () {}
