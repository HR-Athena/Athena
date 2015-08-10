/*global describe, it, beforeEach, inject, spyOn, expect */
"use strict";

var angular = require("angular");

describe("some angular controller's test", function() {
    var scope, controller;

    beforeEach(angular.mock.module("app"));

    beforeEach(inject(function($rootScope, $controller) {
        scope = $rootScope.$new();
        controller = $controller("PasswordConfirmationController", {
            $scope: scope,
            password: "Hello12!",
            token: "112",
            Password: Password,
            $state: $state,
        });
    }));

    describe("Calling the password confirmation validator", function() {
        
        it("calls the Password service every time the password confirmation field is changed", function(){
            spyOn(Password, "confirmationValidator");
            scope.passwordConfirmation = "H";
            scope.$digest();
            expect(Password.confirmationValidator).toHaveBeenCalled();
        });

        it("passes the password, the re-typed password and the object of validated properties to the Password service", function(){
            spyOn(Password, "confirmationValidator");
            scope.passwordConfirmation = "H";
            scope.$digest();
            expect(Password.confirmationValidator).toHaveBeenCalledWith("Hello12!", "H", validatedProperties);
        });

        it("enables the 'Submit' button if the Password service successfully validates the password", function(){
            scope.passwordConfirmation = "Hello12";
            scope.$digest();
            expect(scope.submitButtonDisabled).toEqual(false);
        });

    });

    describe("back() function", function() {
        
        it("calls the $state service", function(){
            spyOn($state, "go");
            scope.back();
            expect($state.go).toHaveBeenCalled();
        });

        it("passes the necessary parameters to the $state service", function(){
            spyOn($state, "go");
            scope.back();
            expect($state.go).toHaveBeenCalledWith("password-create", {
                token: "112"
            });
        });

    });

    describe("submit() function", function() {
        
        it("calls the Password service", function(){
            spyOn(Password, "update").and.callThrough();
            scope.submit();
            expect(Password.update).toHaveBeenCalled();
        });

        it("passes the necessary parameters to the Password service", function(){
            spyOn(Password, "update").and.callThrough();
            scope.submit();
            expect(Password.update).toHaveBeenCalledWith("112", "Hello12!");
        });

    });

});
