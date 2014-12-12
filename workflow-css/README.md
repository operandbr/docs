Workflow CSS para o AS
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

### Definição de tarefas

Estruturação do projeto:

```
tasks
   theme.js
   default.js
.csscomb.json
gulpfile.js
```

* *.tasks*: diretório com de arquivos de tarefas para build de arquivos de determinado módulo.

    * *theme.js*: Suite de tarefas relacionadas ao módulo/ componente theme.
    * *default.js*: Suite de tarefas padrões do Gulp.

* *.csscomb.json*: Arquivo de configuração para build de CSS, utilizado pelo módulo *gulp-csscomb*.

* *gulpfile.js*: Arquivo de configuração das tarefas do Gulp, importa módulos e tarefas.

### Execução de tarefas

> Bora pro terminal!

