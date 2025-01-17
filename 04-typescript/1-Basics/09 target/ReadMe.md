Here we have a simple TypeScript class with the property, a constructor and a method.
Now, as mentioned before, TypeScript is configured using a Tsconfig.json file.
Within that file we've set the compiler options target to es5.
What this means is that when TypeScript will compile the TS file into its corresponding JS file, it
will emit a version of JavaScript that can be run on an es5 runtime.
Now classes are not something that are supported by Es5 runtimes.
However, they can be simulated by JavaScript functions and indeed that is the code that TypeScript
will generate when we have the target set to es5.
Now if we set the target to is 2015, which is also known as ES6, which is something that does support
JavaScript classes, you can see that when TypeScript transpiles the TS to a JS file, it generates
a JavaScript class that is very similar to the original TypeScript source code.
Now an even newer feature for JavaScript classes in modern specification is private fields.
Now they are very similar to the TypeScript specific private access modifier.
And the way they work is that we have to name the field with a hash in the beginning.
Now going back to the TypeScript compiler options, Es2015 is not something that supports private fields,
so TypeScript will generate JavaScript that can be run on an ES 2015 runtime.
However, it will be a bit more verbose in order to provide features similar to private fields.
Now this generated JavaScript relies on an ES 2015 feature known as Weakmap.
Now there is a special value within Target called ES Next, which is a way of saying that we want to
target the most bleeding edge JavaScript runtimes out there.
Now with the target set to ES next, you can see that the generated JavaScript is identical to the input
TypeScript source code except of course for the type annotations.
Now not all features of modern JavaScript can be transpiled into something that can be run on an older
JavaScript runtime.
As an example, let's go ahead and set our target back to es5.
Now, since private fields rely on an ES 2015 feature known as Weakmap that is not supported by Es5.
If we try to compile this code using TypeScript, it will give us an error specifying that the target
is too old.
Now, just as a side note for this particular example, we don't actually need to use private fields
within TypeScript as we can simply use the private access modifier.
Now, just like TypeScript type annotations, the private access modifier is something that is only
used for compile time type checking and does not actually need any JavaScript runtime support.
