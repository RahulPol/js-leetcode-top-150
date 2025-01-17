## What are four basic principles of Object Oriented Programming?

There are 4 major principles that make an language Object Oriented. These are Encapsulation, Data Abstraction, Polymorphism and Inheritance. These are also called as four pillars of Object Oriented Programming.

![OOP Principle](./OOP%20Principles.png)

### Encapsulation

Encapsulation is the mechanism of hiding of (private)data. It is implementation by restricting access to properties / methods. Instance variables are kept private and accessor methods are made public to achieve this.

For example, we are hiding the name and dob attributes of person class in the below code snippet.

Encapsulation — private instance variable and public accessor methods.

```java
public class Employee {
    private String name;
    private Date dob;
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public Date getDob() {
        return dob;
    }
    public void setDob(Date dob) {
        this.dob = dob;
    }
}
```

### Abstraction

In OOP, abstraction allows you to focus on what an object does rather than how it does it. It involves defining a clear interface for interacting with an object while hiding its internal implementation details. This separation between interface and implementation enables developers to work with high-level concepts without needing to understand all the intricate inner workings.Using abstract class/Interface we express the intent of the class rather than the actual implementation. In a way, one class should not know the inner details of another in order to use it, just knowing the interfaces should be good enough.

### Inheritance

Inheritance allows classes to inherit properties and behaviors (methods and fields) from other classes. It enables code reuse and promotes the creation of a hierarchy of classes where subclasses inherit from superclasses.
Inheritances expresses “is-a” and/or “has-a” relationship between two objects. Using Inheritance, In derived classes we can reuse the code of existing super classes. In Java, concept of “is-a” is based on class inheritance (using extends) or interface implementation (using implements).

For example, FileInputStream "is-a" InputStream that reads from a file.

### Polymorphism

It means one name many forms. It is further of two types — static and dynamic. Static polymorphism is achieved using method overloading and dynamic polymorphism using method overriding. It is closely related to inheritance. We can write a code that works on the superclass, and it will work with any subclass type as well.
