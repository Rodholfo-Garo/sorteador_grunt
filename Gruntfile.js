/* 1ª Configuração nicial */

module.exports = function(grunt){
    grunt.initConfig({
        pkg:grunt.file.readJSON('package.json'),
        /* 2ª Configurando plugin less */
        less:{
            /* Ambiente de desenvolvimento, é a nossa maquina (local)*/
            development:{
                files:{
                    /* Arqivo destino e origem */
                    'dev/styles//main.css':'./src/styles/main.less'
                }
                /* Criar ambiente de Produção */
            },
            /* Ambiente de produção, é onde */
            production:{
                options:{
                    compress:true,
                },
                files:{
                    'dist/styles/main.min.css':'src/styles/main.less'
                }
            }
        },

        watch:{
            less:{
                files:['src/styles/**/*.less'],
                tasks:['less:development'],               
            },
            html:{
                files:['src/index.html'],
                tasks:['replace:dev']            
            }
        },

        replace:{
            dev:{
                options:{
                    patterns:[
                        {
                            match:'ENDERECO_DO_CSS',
                            replacement:'./styles/main.css'
                        },
                        {
                            match:'ENDERECO_DO_JS',
                            replacement:'../src/scripts/main.js'
                        }
                    ]
                },
                files:[{
                    expand:true,
                    flatten:true,
                    src:['src/index.html'],
                    dest:'dev/'
                    }
                ]
            },
            dist:{
                options:{
                    patterns:[
                        {
                            match:'ENDERECO_DO_CSS',
                            replacement:'./styles/main.min.css'
                        },
                        {
                            match:'ENDERECO_DO_JS',
                            replacement:'./scripts/main.min.js'
                        }
                    ]
                },
                files:[{
                    expand:true,
                    flatten:true,
                    src:['prebuild/index.html'],
                    dest:'dist/'
                    }
                ]
            }
        },
        htmlmin:{
            dist:{
                options:{
                    removeComments:true,
                    collapseWhitespace:true
                },
                files:{
                    /* 1 - minificacao */
                    'prebuild/index.html':'src/index.html'
                    /* 2 - substituicao */
                }                
            }
        },
        clean:['prebuild'],
        uglify:{
            target:{
                files:{
                    'dist/scripts/main.min.js': 'src/scripts/main.js'
                }
            }
        }
        
    })

    /* 1ª Carregar plugins Insataldos -Configurando plugin less */
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    

    /* Criar tarefa default */
    /* O array pode conter o nome de todas as tarefas que serão executas pelo grunt */

    grunt.registerTask('default', ['watch']);

    /* Usado para publicar nossa aplicação */
    grunt.registerTask('build', ['less:production', 'htmlmin:dist', 'replace:dist','clean', 'uglify']);
}
