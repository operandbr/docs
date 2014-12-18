/**
 * Principal docblock do módulo, descrição do comportamento e uso do mesmo.
 * Sempre expor para seu módulo os objetos globais, para otimizar a minificação.
 * Nesse caso:
 * .o objeto global window;
 * .o DOM;
 * .a biblioteca jQuery;
 * Na chamada do módulo passe os objetos a partir do escopo global (window.jQuery)
 * na listagem dos parâmetros ja é permitido usar alias (window.jQuery --> $).
 */
(function (window, document, $) {
    /**
     * Ativa o modo estrito do Javascript, o que garante mais boas práticas ao projeto.
     */
    'use strict';

    /**
     * Valide a instancia de biblioteca de terceiros.
     * Caso alguma estiver faltando, apresente erro ao desenvolvedor. (nada de alert!!!!!!)
     */
    if (typeof $ === 'undefined') {
        console.error('Erro avisando ao dev que é necessário inserir a lib $.');
    }

    var Module = function () {
        /**
         * Definição de variável global do módulo, similar a um atributo.
         * @type {Tipo primitivo}
         */
        var attr = 'Lorem ipsum';

        /**
         * Definição de outro atributo global, porém este será uma propriedade do Módulo.
         * Nesses casos adicionar a anotação @public.
         * @public
         * @type {String}
         */
        var publicAttr = 'Public lorem ipsum.';

        /**
         * Método construtor.
         */
        var initialize = function () {
            document.body.dataset.lorem = attr;
            addListeners();
        };

        /**
         * Sempre adicionar um método exlusivo para monitoramento de eventos.
         */
        var addListeners = function () {
            $('.lorem-ipsum').show();
        };

        /**
         * Descrição do método.
         * @return {String} Descrição do retorno do método.
         */
        var method = function () {
            return 'Lorem ipsum dolor sit amet.';
        };

        /**
         * Descrição do método público, também se aplica a anotação @public.
         * @param  {String} param Descrição do parâmetro a ser recebido.
         * @return {String} Descrição do retorno do método.
         */
        var publicMethod = function (param) {
            /**
             * Sempre use var!
             * Var delimita escopo local!
             */
            var text = method();

            /**
             * Ao usar método do objeto global (window), sempre chamar da forma window.METODO,
             * assim evita conflito com métodos de seu módulo.
             * Métodos/ propriedades como 'close', 'top' e 'screen' podem facilmente serem utilizados em um módulo,
             * assim, a forma garantida de acessar o escopo global é usando a partir do window.
             */
            return window.btoa(param + text);
        };

        return function () {
            initialize();

            return {
                /**
                 * Publicação de método 'encapsulado'.
                 * window.Module.method = function(){a()};
                 */
                method: function (param) {
                    publicMethod(param);
                },
                prop: publicAttr // window.Module.prop
            };
        };
    };

    /**
     * "Instancia" o módulo, atribui o módulo ao objeto global.
     */
    window.Module = new Module();
}(window, document, window.jQuery));
