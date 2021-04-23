# Mindler_Test_Assignment

Task 2:
- Use PizzaMaker App and identify at least 5 features of this app that you would automate
- Write automation script(s) for verifying the functionality that you have identified


1. Validate that the number of available ingredients is 7
2. Test that ingredients are added to "Your pizza" area
3. Test that ingredients are removed from "Your pizza" area
4. Test that same ingredient counter is calculated properly
4. Test that total price value corresponds to added/removed ingredients and their amounts
5. Test that "Reset pizza" button resets the state and removes all added ingredients
6. Test that "Checkout" button is not active if no ingredients are added
7. Test that "Order summary" popup appears after click on "Checkout" button
8. Test that number of added ingredients on the Order summary popup corresponds to the number of ingredients added to "Your pizza"
9. Test that the total price on the "Order summary" popup correponds to the "Total" value on the Pizza builder
10. Test that "Cancel" button on the Order summary popup redirects back to the Pizza builder
11. Test that a browser native popup with the text "You continue!" appears after clicking on "Continue" button on the Order summary popup

Note:
afterEach function is added to stop the execution of the whole script if one of the test fails. 
