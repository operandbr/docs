Workflow CSS da Softers
====================================================

# Setup

### Plugins do Sublime

* Editorconfig
* Sass sintax highlighter

### Servidor

É necessário ter instalado na máquina:
* NodeJS
* NPM
* Gulp

Para verificar se os mesmo já estão instalados:

```sh
nodejs -v
npm -v
gulp -v
```

Caso contrário, para realizar instalação:

```sh
sudo apt-get install nodejs-legacy npm --y
sudo npm i gulp -g
```

### Ferramentas utilizadas

* **Node + NPM**:
NodeJS é uma plataforma (não uma linguagem) para desenvolvimento Javascript server-side. NPM é o gerenciador de pacotes Node (como Composer/ PHP, Gem/ Ruby).

* **Gulp**:
Automatizador de tarefas, executa tarefas definidas no gulpfile.js, como minificação e concatenação de arquivos, tarefas que se feitas de maneira manual, custam muito tempo ao desenvolvedor.

* **SASS + Compass**:
Pré-processador de CSS, permite que defina variáveis, snippets (mixins) e desenvolva CSS modular. Compass permite que desenvolva Sass com uma sintaxe similar ao CSS nativo, como {}, e não apenas baseado em indentação.

* **Módulos do Node**:

    * **gulp-sass**: Módulo para pré-processamento de Sass, compila Sass para CSS.

    * **gulp-cssp**: Módulo para minificação de CSS.

    * **gulp-autoprefixer**: Módulo helper de prefixação automática de propriedades (e valores) no CSS. Procura ocorrências de propriedades que necessitem prefixo (de acordo com lista de browser especificada) e faz de forma automatizada.

    * **gulp-csscomb**: Ordena CSS de acordo com lista especificada (./csscomb.json): em servidores com gzip, folhas de estilo com propriedades organizadas em ordem alfabética tem melhor performance de carregamento [goo.gl/roiEs8](goo.gl/roiEs8).

### Estruturação do diretório dos estilos (public/assets/css)

```
dist
    module.min.css
    module-2.min.css
src
    module
        base
            _base.scss
            _reset.scss
        layout
            _layout.scss
            _content-container.scss
            _icons-container.scss
        main.scss
    module-2
        base
            _base.scss
            _reset.scss
        layout
            _layout.scss
            _content-container.scss
            _icons-container.scss
        main.scss
```

* *dist*: diretório dos arquivos CSS compilados (minificados/ otimizados)

* *src*: diretório dos arquivos Sass separados pelo componente/ módulo

    * *module/ module-2*: diretório dos módulos/ componentes

        * separação dos arquivos do componente, utilizar a estrutura necessária para o componente.
            * **.scss*: arquivos Sass modulares do componente

        * *main.scss*: principal arquivo do componente, importará as demais partials, mixins e variáveis.

### Estruturação do diretório das tarefas do Gulp

```
tasks
   theme.js
   default.js
.csscomb.json
gulpfile.js
```

* *tasks*: diretório com de arquivos de tarefas para build de arquivos de determinado módulo.

    * *theme.js*: Suite de tarefas relacionadas ao módulo/ componente theme.
    * *default.js*: Suite de tarefas padrões do Gulp.

* *.csscomb.json*: Arquivo de configuração para build de CSS, utilizado pelo módulo *gulp-csscomb*.

* *gulpfile.js*: Arquivo de configuração das tarefas do Gulp, importa módulos e tarefas.

### Definição de tarefas

No diretório *.tasks*, crie um arquivo Javascript com o nome de seu módulo (ex: widgets.js), em seu conteúdo utilize [esta estrutura](http://goo.gl/7cc6NE).

> **Atenção:** este arquivo contém também tarefas de build de arquivos Javascript, caso seu módulo componente não utilize assets JS, pode tirar tais tarefas ;). Sem medo... eu garanto... sério!

> **Code styles:** as tarefas deverão ter nomes como: NOME_MODULO-css, NOME_MODULE-watch.

A estrutura padrão nos oferece duas varíaveis para setar arquivos Sass.
```js
/**
 * Arquivo principal do módulo, ele será compilado.
 */
var scssMain = [CSS.PATH + 'src/module/main.scss'];

/*
 * Arquivos a serem "assistidos" pelo Gulp, inclui mixins globais do sistema e
 * arquivos Sass do módulo, além quaisquer outros arquivos que,
 * se alterados influenciam no código compilado do módulo.
 */
var cssWatch = CSS.watch.concat([CSS.PATH + 'src/module/*.scss']);
```
Para criar a tarefa para compilar o estilos de seu módulo, há duas opções:

A tarefa padrão do Gulp, que realizará:
* Compilação do Sass para CSS.
* Prefixação de propriedades para suporte aos navegadores (versões):
    * Firefox (>= 30);
    * Safari (>= 5);
    * Chrome (>= 35);
* Ordenação das propriedades em ordem alfabética (lembra da otimização para gzip?).
* E por fim a minifacação do arquivo final.

Para utilização desta feature:
```js
/**
 * Build dos estilos do módulo.
 * Utiliza tarefa padrão definida no ./gulpfile.js
 */
Main.gulp.task('NOME_MODULO-css', function () {
    /**
     * scssMain: arquivo principal definido no início do arquivo (falamos dele acima).
     * 'NOME_MODULO': nome do módulo (--'), este será o nome do arquivo compilado (NOME_MODULO.min.css)
     */
    CSS.task(scssMain, 'NOME_MODULO');
});
```
Caso esta tarefa não realize a ação que deseja, você pode criar a sua baseando-se nela. ~vai na fé irmão~.

Adicione esta tarefa à tarefa principal do módulo e atarefa de watch.
```js
/**
 * All module tasks.
 */
Main.gulp.task('NOME_MODULO', function () {
    Main.gulp.run('NOME_MODULO-css');
});

/**
 * Watch task
 */
Main.gulp.task('NOME_MODULO-watch', function () {
    Main.gulp.run('NOME_MODULO');

    Main.gulp.watch(cssWatch, function () {
        Main.gulp.run('NOME_MODULO-css');
    });
});
```
Por fim adicione seu módulo ao *gulpfile.js*:

```js
/**
 * Importação de tarefas para build do NOME_MODULO.
 */
require(Main.PATH + 'NOME_MODULO.js').task(Main, JS, CSS);
```

### Execução de tarefas

> Bora pro terminal!

Para rodar a tarefa uma única vez:
```sh
gulp NOME_MODULO
```
Para deixar a tarefa executando toda vez que você alterar um  arquivo do móudlo:
```sh
gulp NOME_MODULO-watch
```
Automaticamente as tarefas do seu módulo serão inseridas na tarefa principal do Gulp, então para rodar as tarefas do projeto:
```sh
gulp main
```