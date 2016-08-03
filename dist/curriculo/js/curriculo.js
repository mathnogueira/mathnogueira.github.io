// Arquivo de configuração da aplicação de venda de coxinhas

var curriculoApp = angular.module("curriculoApp", [
    "ngRoute",
]);

curriculoApp.config(['$routeProvider', function($routeProvider) {
	$routeProvider

		.otherwise("/")

		.when("/", {
			templateUrl: "./dist/curriculo/view/home.html",
		});
}]);
